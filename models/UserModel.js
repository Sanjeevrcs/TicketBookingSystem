import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
    DOB:{
        type: Date,
        required: true,
    }
});

export const User = mongoose.model('User', userSchema);
