import pino from "pino";

const config: pino.LoggerOptions = {};
switch (process.env.NODE_ENV) {
  case "test":
    config.enabled = false;
    break;
  default:
    config.enabled = true;
    config.level = "debug";
    break;
}

const logger = pino(config);
const originalError = logger.error.bind(logger);
logger.error = (error: any, ...args: any[]) => {
  originalError(error);
};

export default logger;
