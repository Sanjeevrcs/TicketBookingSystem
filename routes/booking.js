import express from "express";
import { searchBuses, getSeat, bookSeat } from '../controllers/searchBus.js';
import {verifySession} from '../middleware/verifySession.js';
import  Validate  from "../middleware/validate.js";


const bookingRouter = express.Router();

bookingRouter.get('/searchBus', verifySession, Validate, searchBuses);
bookingRouter.get('/getSeats/:busId/', verifySession, Validate, getSeat);
bookingRouter.post('/bookSeat', verifySession, Validate, bookSeat)

export default bookingRouter