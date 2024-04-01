import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema({
    from : {
        type : Schema.Types.ObjectID,
        ref : "Location"
    },
    to : {
        type : Schema.Types.ObjectID,
        ref : "Location"
    }
    distance : {
        type : Number,
        required : "Distance is Required"
    }
}) 

export const Route = mongoose.model('Route', routeSchema)