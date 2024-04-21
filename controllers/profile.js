import {Booking} from '../models/BookingModel.js';
import {Trip} from '../models/TripModel.js';
import {Seat} from '../models/SeatModel.js';
import {Bus} from '../models/BusModel.js';

export const profile = async (req,res) => {
    const user = req.user;
    const bookings = await Booking.find({user: user._id});

    for(let i = 0; i < bookings.length; i++) {
        bookings[i].trip = await Trip.findById(bookings[i].trip);
        bookings[i].seat = await Seat.findById(bookings[i].seat);
    }

    return res.status(200).send({
        user,
        bookings,
    })
}


