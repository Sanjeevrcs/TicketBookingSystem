import express from "express";
import { Register } from "../controllers/auth.js";
import { registerSchema } from "../schema/registerSchema";
import { Validate } from "../middleware/validate.js"

const router = express.Router();

router.post('/register',registerSchema,Validate,Register)


export default router