import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name is Required",
    },
    email: {
        type: String,
        required: "Email is required",
    },
    password: {
        type: String,
        required: "Password cannot be empty",
    },
    phoneNumber:{
        type: String,
        required: "Mobile Number is required",
    },
    gender:{
        type: String,
        required: "Gender is required",
    },
    dob:{
        type: Date,
        required: "Date of Birth is required",
    }
});

userSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified("password")) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

export const User = mongoose.model('User', userSchema);
