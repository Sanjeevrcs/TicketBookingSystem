import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user : {
        type : Schema.Types.ObjectID,
        ref : "User"
    },
    trip : {
        type : Schema.Types.ObjectID,
        ref : "Trip"
    },
    seat : {
        type : Schema.Types.ObjectID,
        ref : "Seat"
    },
    status : {
        type : String,
        required : "Status is Required"
    },
    date : {
        type : Date,
        required : "Date is Required"
    }
})

export const Booking = mongoose.model('Booking',bookingSchema);