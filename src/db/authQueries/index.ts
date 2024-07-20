import config from "config";
import { loggerError, loggerInfo } from "../../utils/logger";
import { client } from "./.."

const dbName: string = config.get("mongo.dbName");

export const signUp = async (data) => {
    const collectionName = "users" 
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    try {
        const insertResult = await collection.insertOne(data);
        loggerInfo(`${data.username} Success to join as a new user to mongoDB`);
        return insertResult;
    } catch (error: any) {
        loggerError(
            `${data.username} Failed to join as a new user to mongoDB. ${error}`
        );
    }
};


export const signIn = async (data) => {
    const collectionName = "users" 
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    try {
        const insertResult = await collection.insertOne(data);

        loggerInfo(`${data.username} Success to login`);
        return insertResult;
    } catch (error: any) {
        loggerError(
            `${data.username} Failed to login. ${error}`
        );
    }
};