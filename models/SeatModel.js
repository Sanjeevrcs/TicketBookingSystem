import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
    
    seatNumber : {
        type : String,
        required : "Seat Number is Required"
    },
    bus : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Bus"
    },
    availability : {
        type : Boolean,
    }
})

export const Seat = mongoose.model('Seat',seatSchema);