import winston from "winston"

const logInfo = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: './logs/info.log', level: 'info' }),
    ],
});

const logError = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    ],
});

export const loggerInfo = (msg: any, metadata = {}) => {
    logInfo.log({
        level: "info",
        message: msg,
        timestamp: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
        metadata: metadata
    })
}

export const loggerError = (msg: any, metadata = {}) => {
    logError.log({
        level: "error",
        message: msg,
        timestamp: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
        metadata: metadata
    })
}