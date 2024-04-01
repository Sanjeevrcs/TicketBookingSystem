import express from "express";
import { registerUser, deleteUser, loginUser, logoutUser } from "../controllers/auth.js"
import { userValidationSchema } from "../schema/registerSchema.js";
import { verifySession } from '../middleware/verifySession.js';
import  Validate  from "../middleware/validate.js"

const auth = express.Router();

auth.post('/register', userValidationSchema, Validate, registerUser)
auth.post('/login', loginUser)
auth.delete('/delete',deleteUser)
auth.get('/logout', verifySession, logoutUser)

auth.get('/dashboard',verifySession,(req,res)=>{console.log("ss");res.send("Hello User")})


export default auth;