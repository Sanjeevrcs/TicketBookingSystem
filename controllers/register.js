import User from '../models/UserModel'

export const Register = async (req,res) => {
    
    const { name, email, password, phoneNumber, gender, dob } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser){
        return res.status(400).json({
            "status" : "error",
            "message" : "Account already exists"
        })
    }
    else{
        let newUser = new User({ name, email, password, phoneNumber, gender, dob });
        newUser = await newUser.save();
        res.status(200).json({
            "status" : "success",
            "message" : "Account has been successfully created"
        })
    }

}