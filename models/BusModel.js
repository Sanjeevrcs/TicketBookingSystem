import mongoose from 'mongoose';

const busSchema = new mongoose.Schema({
    busName : {
        type : String,
        required : "Bus Name is Required"
    },
    busType : {
        type : String,
        required : "Bus Type is Required"
    },
    busNumber : {
        type : String,
        required : "Bus Number is Required"
    },
    capacity : {
        type : Number,
        required : "Capacity is Required"
    }
})

export const Bus = mongoose.model('Bus',busSchema);