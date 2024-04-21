import { User } from '../models/UserModel.js';
import bcrypt from "bcrypt";

export const loginUser = async (req, res) => {

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        return res.status(400).json({
            "status": "error",
            "message": "Account does not exist"
        })
    }
    else {
        bcrypt.compare(password, existingUser.password, (err, result) => {
            if (err) {
                return res.status(400).json({
                    "status": "error",
                    "message": "Invalid Credentials"
                })
            }
        try{
            if (result) {
                var hour = 3600000;
                let options = {
                    maxAge: 14 * 24 * hour,
                    httpOnly: false,
                    sameSite: 'None',
                    secure: true,
                    withCredentials: true,
                    priority: 'High'
                };
                const token = existingUser.generateAccessToken(); 
                res.cookie("SessionID", token, options); 
                res.status(200).json({
                    status: "success",
                    message: "You have successfully logged in.",
                });
                
                return res
            }
        } catch(err) {
            console.log("err",err)
            return res.status(500).json({
                status: "error",
                code: 500,
                data: [],
                message: "Internal Server Error",
            });
        }
            return res.status(400).json({
                "status": "error",
                "message": "Invalid Credentials"
            })
        })
    }
}


export const deleteUser = async (req,res) => {
    const { email } = req.body;

    const existingUser = await User.findOne({
        email
    });

    if (!existingUser){
        return res.status(400).json({
            "status" : "error",
            "message" : "Account does not exist"
        })
    }
    else{
        await User.deleteOne
        ({ email });
        res.status(200).json({
            "status" : "success",
            "message" : "Account has been successfully deleted"
        })

    }
}

export const registerUser = async (req,res) => {
    
    console.log(req.body, "req.body")

    console.log(req.body)
    let { name, email, password, phoneNumber, gender, dob } = req.body;

    const existingUser = await User.findOne({ email });

    console.log(existingUser, "existingUser")
    
    if (existingUser){
        console.log("existingUser")
        return res.status(400).json({
            "status" : "error",
            "message" : "Account already exists"
        })
    }
    else{
        console.log(req.body, "req.body")

        const [day, month, year] = dob.split('-');
        dob = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        
        console.log(dob);

        let newUser = new User( { name, email, password, phoneNumber, gender, dob } );
        newUser.save();
        console.log(newUser, "newUser")
        res.status(200).json({
            "status" : "success",
            "message" : "Account has been successfully created"
        })
    }

}


export const logoutUser = (req,res) => {
    res.clearCookie('SessionID');
    res.status(200).json({
        "status" : "success",
        "message" : "Logout Successful"
    })
    // res.end()
    
}