import mongoose from "mongoose";

const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;

const database = `mongodb+srv://${user}:${password}@dev.8smptdk.mongodb.net/TicketBookingSystem?retryWrites=true&w=majority&appName=dev`;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(database, {});
    console.log(`Mongo db connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB Connection Failed => ", err);
  }
};

export default connectDB;
