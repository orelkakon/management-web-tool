
import config from "config";
import bcrypt from "bcryptjs";
import { client } from "./..";
import jwt from "jsonwebtoken";
import { loggerError } from "../../utils/logger";

const dbName: string = config.get("mongo.dbName");
const { secret } = config.get("auth")
const collectionName = "users"
const db = client.db(dbName);

export const verifyUserLogin = async (username: string, password: string) => {
    const collection = db.collection(collectionName);
    try {
        const user = await collection.findOne({ username })
        if (!user) {
            return { status: 'error', code: 404, error: 'user not found' }
        }
        if (bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ id: user._id, username: user.username, type: 'user' }, secret, { expiresIn: '2h' })
            return { status: 'ok', data: token }
        }
        return { status: 'error', code: 401, error: 'invalid password' }
    } catch (error) {
        loggerError(error);
        return { status: 'error', code: 500, error: 'timed out' }
    }
}

export const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }        
        req.userId = decoded.id;
        next();
    });
};

export const checkDuplicateUsernameOrEmail = (req, res, next) => {
    const collection = db.collection(collectionName);
    // Username
    collection.findOne({
        username: req.body.user
    }, ((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: "Failed! User is already in use!" });
            return;
        }

        // Email
        collection.findOne({
            email: req.body.email
        }, ((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (user) {
                res.status(400).send({ message: "Failed! Email is already in use!" });
                return;
            }
            next();
        }));
    }));
}; 