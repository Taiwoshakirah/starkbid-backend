import mongoose from "mongoose";
import dotenv from 'dotenv';

async function mongoConnect() {
  try {
    // Make sure the MONGO_URI is defined
    if (!process.env.MONGO_URI) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }
    
    // Properly awaiting the connection
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB Connected!');
    return mongoose.connection;
  } catch (error) {
    console.error('Failed to connect DB!', error);
    throw error; // Re-throw to be handled by the caller
  }
}


export default mongoConnect;