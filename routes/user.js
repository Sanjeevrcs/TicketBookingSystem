import express from "express";
import { profile } from '../controllers/profile.js'
import {verifySession} from '../middleware/verifySession.js';
import  Validate  from "../middleware/validate.js"


const userRouter = express.Router();

userRouter.get('/profile', verifySession, profile)

export default userRouter