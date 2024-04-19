import mongoose from 'mongoose';
const tripSchema = new mongoose.Schema({

    route : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Route"
    },
    bus : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Bus"
    },
    departureTime : {
        type : Date,
        required : "Departure time is Required"
    },
    availability : {
        type : Boolean,
    }

})

export const Trip = mongoose.model('Trip',tripSchema);