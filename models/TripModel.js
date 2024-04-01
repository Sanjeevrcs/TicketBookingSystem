import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({

    route : {
        type : Schema.Types.ObjectID,
        ref : "Route"
    },
    bus : {
        type : Schema.Types.ObjectID,
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