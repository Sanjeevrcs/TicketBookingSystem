import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import connectDB from "./configs/connectDB.js";
const app = express();

connectDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get("/", (req, res) => res.send("Hello World"));

app.get("/playground", (req, res) => res.send("This is our Playground"));
