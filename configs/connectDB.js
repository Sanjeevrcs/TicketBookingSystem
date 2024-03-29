import mongoose from 'mongoose';

const database = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@development.pr33px5.mongodb.net/busTicketBooking`;

// database = `mongodb://localhost:27017/busTicketBooking

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    mongoose.connect(database, {});
    console.log('MongoDB Connection Success');
  } catch (err) {
    console.error('MongoDB Connection Failed => ', err)
  }
};

export default connectDB;
