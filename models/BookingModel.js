import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    trip : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Trip"
    },
    seat : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Seat"
    },
    status : {
        type : String,
        required : "Status is Required",
        enum: ['Booked', 'Canceled']
    },
    date : {
        type : Date,
        required : "Date is Required"
    }
})

export const Booking = mongoose.model('Booking',bookingSchema);