import mongoose from 'mongoose';
import { User } from '../models/UserModel.js';
import { Booking } from '../models/BookingModel.js';
import { Trip } from '../models/TripModel.js';
import { Seat } from '../models/SeatModel.js';
import { Bus } from '../models/BusModel.js';
import { Route } from '../models/RouteModel.js';
import { Location } from '../models/LocationModel.js';
import { faker } from '@faker-js/faker';

const user = "sanjeevrcs";
const password = "LqOwRx5FiaSo4hxF";

console.log(user, password);

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


async function generateTestData(numSets) {
    try {
        for (let i = 0; i < numSets; i++) {
            // Create locations
            const location1 = await Location.create({ name: faker.address.city() });
            const location2 = await Location.create({ name: faker.address.city() });

            console.log('Locations created successfully!');

            const bus = await Bus.create({
                busName: faker.company.name(),
                busType: 'AC',
                busNumber: faker.random.alphaNumeric(6),
                capacity: 10
            });

            // Create route
            const route = await Route.create({
                from: location1._id,
                to: location2._id,
                distance: faker.number.int({ max: 100 }) 
            });

            // Create seats
            const seats = [];
            for (let j = 1; j <= bus.capacity; j++) {
                seats.push({
                    seatNumber: `${j}`,
                    bus: bus._id,
                    availability: true
                });
            }
            await Seat.insertMany(seats);

            // Create trip
            const trip = await Trip.create({
                route: route._id,
                bus: bus._id,
                departureTime: faker.date.future(),
                availability: true
            });

            console.log(`Test data set ${i + 1} created successfully!`);
        }
    } catch (error) {
        console.error('Error generating test data:', error);
    } finally {
        mongoose.disconnect();
    }
}

connectDB();
generateTestData(5);


