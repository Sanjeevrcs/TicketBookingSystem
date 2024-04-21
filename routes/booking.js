import express from "express";
import { searchBuses, getSeat, bookSeat } from '../controllers/searchBus.js';
import {verifySession} from '../middleware/verifySession.js';
import  Validate  from "../middleware/validate.js";
import { cancelBooking } from '../controllers/searchBus.js';

const bookingRouter = express.Router();

bookingRouter.get('/searchBus', verifySession, Validate, searchBuses);
bookingRouter.get('/getSeats/:busId/:tripId', verifySession, Validate, getSeat);
bookingRouter.post('/bookSeat', verifySession, Validate, bookSeat)
bookingRouter.post('/cancelBooking/:id', verifySession, Validate, cancelBooking)

export default bookingRouter