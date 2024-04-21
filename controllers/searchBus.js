import { User } from '../models/UserModel.js';
import { Booking } from '../models/BookingModel.js';
import { Trip } from '../models/TripModel.js';
import { Seat } from '../models/SeatModel.js';
import { Bus } from '../models/BusModel.js';
import { Route } from '../models/RouteModel.js';
import { Location } from '../models/LocationModel.js';
import { convertDateTime } from '../utils/utilityFunctions.js';

export const searchBuses = async (req,res) => {
    try{    

    let { from , to , date } = req.query;
    console.log(from, to, date)

    from = await Location.findOne({_id:from});
    to = await Location.findOne({_id:to});
    const routes = await Route.find({ from:from, to:to });
    
    const parts = date.split('-');
    const year = parseInt(parts[2]);
    const month = parseInt(parts[1]) - 1;
    const day = parseInt(parts[0]);

    const startDate = new Date(year, month, day);
    const endDate = new Date(year, month, day + 1); 

    const trips = await Trip.find({
    route: routes,
    departureTime: {
        $gte: new Date(startDate),
        $lt: new Date(endDate)
    }
    });

    console.log(trips)

    let buses = [];

    for (let i = 0; i < trips.length; i++) {
        let trip = trips[i];
        let bus = await Bus.findOne({ _id: trip.bus });
        buses.push({
            _id: bus._id,
            tripId: trip._id,
            busName: bus.busName,
            busType: bus.busType,
            busNumber: bus.busNumber,
            capacity: bus.capacity,
            busId: bus._id,
            departureTime: convertDateTime(trip.departureTime),
        })
    }
 
    res.status(200).send({
        buses
    })
}catch(err){
    console.log(err)
    res.status(500).send({
        status: "error",
        message: "Internal Server Error"
    })
}}

export const getSeat = async (req, res) =>{
    try{
    const busId = req.params.busId;
    console.log(busId,"ssss")
    const bus = await Bus.findOne({_id: busId});
    console.log(bus)
    if (!bus) {
        return res.status(404).send({
            status: "error",
            message: "Bus not found"
        })
    }
    const seats = await Seat.find({ bus: busId });
    return res.status(200).send({
        "busId" : bus._id,
        "seats": seats,
    })
}catch(err){
    console.log(err)
    res.status(500).send({
        status: "error",
        message: "Internal Server Error"
    })
}}

export const bookSeat = async (req, res) =>{

    try{
    const { seatId, tripId } = req.body;
    const userId = req.user._id;
    
    console.log(req.body)

    const trip = await Trip.findOne({ _id: tripId });

    if(!trip){
        return res.status(404).send({
            status: "error",
            message: "Invalid Trip"
        })
    }
    let bookings = [];
    if(seatId.length === 0){
        return res.status(400).send({
            status: "error",
            message: "Please Select atlest one seat for booking"
        })
    }
    for(let i=0;i<seatId.length;i++){
        

        const seat = await Seat.findOne({ _id: seatId[i] });

        if (!seat) {
            return res.status(404).send({
                status: "error",
                message: "Seat not found"
            })
        }
        const bus = seat.bus;
    
        const bookingExists = await Booking.findOne({ user: userId, trip: tripId, seat: seat, status: "Booked", });
        console.log(bookingExists)
        if (bookingExists) {
            return res.status(409).send({
                status: "error",
                message: "Seat already booked"
            })
        }

        const booking = new Booking({
            user: userId,
            trip: tripId,
            seat: seat,
            status: "Booked",
            date: Date.now()
        });
        booking.save();
        bookings.push(booking);
    }
    
    return res.status(201).send({
        status: "success",
        message: "Seat booked successfully",
        booking: bookings
    })
}catch(err){
    console.log(err)
    res.status(500).send({
        status: "error",
        message: "Internal Server Error"
    })
}
}





