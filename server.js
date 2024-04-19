import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import connectDB from "./configs/connectDB.js";
import auth from "./routes/auth.js";
import userRouter from "./routes/user.js"
import bookingRouter from "./routes/booking.js"
import { listAll } from "./utils/fetchData.js";
const app = express();

connectDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get("/", (req, res) => res.send("Hello World"));

app.use("/api/v1/auth", auth)
app.use("/api/v1/", userRouter)
app.use("/api/v1/", bookingRouter)
app.get("/api/v1/listall/:modelName", listAll);

app.get("/playground", (req, res) => res.send("This is our Playground"));
