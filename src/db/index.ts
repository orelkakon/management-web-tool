import { MongoClient } from "mongodb";
import config from "config";
import { loggerError, loggerInfo } from "../utils/logger";

const mongoURL: string = config.get("mongo.url");
export const client = new MongoClient(mongoURL);

export const connect = async () => {
    try {
        await client.connect();
        loggerInfo("Success to connect mongoDB");
    } catch (error) {
        loggerError(error);
    }
};

export const disconnect = () => {
    client.close();
};
