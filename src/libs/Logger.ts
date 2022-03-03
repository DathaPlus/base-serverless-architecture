import "reflect-metadata";
import { serializeError } from "serialize-error";

const enum LogLevelEnum {
    INFO = "[INFO]",
    WARN = "[WARN]",
    ERROR = "[ERROR]",
}

export class Logger {
    public info(message: string | Error, metadata?: object): void {
        console.log(Logger._message(LogLevelEnum.INFO, message, metadata));
    }

    public warn(message: string | Error, metadata?: object) {
        console.warn(Logger._message(LogLevelEnum.WARN, message, metadata));
    }

    public error(message: string | Error, metadata?: object | Error): void {
        if (message instanceof Error) {
            console.error(`${LogLevelEnum.ERROR} ${message.stack}`);
        }

        if (metadata instanceof Error) {
            console.error(`${LogLevelEnum.ERROR} ${metadata.stack}`);
        }

        console.error(
            Logger._message(
                LogLevelEnum.ERROR,
                message,
                metadata instanceof Error ? serializeError(metadata) : metadata
            )
        );
    }

    private static _message(
        logLevel: LogLevelEnum,
        message: string | Error,
        metadata?: object
    ) {
        try {
            const msg: string = `${logLevel} ${message}`;

            if (metadata) return `${msg} \n ${JSON.stringify(metadata, null, 2)}`;

            return msg;
        } catch (error) {
            return `Error: ${error.message}`;
        }
    }
}