import mongoose from "mongoose";

export const openMongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("DocumentDB connection established.");
  } catch (err) {
    console.log(`Error to open DocumentDB Connection: ${err}.`);
    return;
  }
};

export const closeMongoConnection = async () => {
  try {
    await mongoose.connection.close();
    console.log("DocumentDB connection closed.");
  } catch (err: any) {
    console.log(`Error to close DocumentDB Connection: ${err}.`);
    return;
  }
};
