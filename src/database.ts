import mongoose from "mongoose";
import logger from "./config/logger";

export const openMongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    logger.info("DocumentDB connection established.");
  } catch (err) {
    logger.error(`Error to open DocumentDB Connection: ${err}.`);
    return;
  }
};

export const closeMongoConnection = async () => {
  try {
    await mongoose.connection.close();
    logger.info("DocumentDB connection closed.");
  } catch (err: any) {
    logger.error(`Error to close DocumentDB Connection: ${err}.`);
    return;
  }
};
