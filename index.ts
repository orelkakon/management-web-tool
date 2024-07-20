import express from "express";
import config from "config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connect } from "./src/db";
import { authRouter } from "./src/api/routes/auth";
import { loggerError, loggerInfo } from "./src/utils/logger";
import { verifyToken } from "./src/db/authQueries/utils";

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors())
app.use(express.json());
app.use(cookieParser());

const port = config.get("port")

const start = async () => {
    await connect();

    app.get('/sanity', async (_req, res) => {
        res.send("'Management Web Tool' server is online :)")
    });

    app.use('/api/auth', authRouter)
}


start()
    .then(() => app.listen(port, () => loggerInfo(`App listening at port ${port}`)))
    .catch((err) => loggerError("Failed to run server", err));
