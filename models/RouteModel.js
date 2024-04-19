import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema({
    from : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Location"
    },
    to : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Location"
    },
    distance : {
        type : Number,
        required : "Distance is Required"
    }
}) 

export const Route = mongoose.model('Route', routeSchema)