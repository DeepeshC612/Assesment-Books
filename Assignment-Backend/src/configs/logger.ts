import winston, { format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";

const logDir = path.join(__dirname, "../logs");

// Define log format
const logFormat = format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

// Error log transport
const errorTransport = new DailyRotateFile({
    filename: path.join(logDir, "error-%DATE%.log"),
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    level: "error",
    format: format.combine(format.timestamp(), logFormat),
});

// Info log transport
const infoTransport = new DailyRotateFile({
    filename: path.join(logDir, "combined-%DATE%.log"),
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    level: "info",
    format: format.combine(format.timestamp(), logFormat),
});

// Create logger instance
const logger = winston.createLogger({
    level: "info",
    transports: [errorTransport, infoTransport],
});

export default logger;