import express from 'express';
import connectDB from './configs/connectDB.js';
const app = express();


connectDB()

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get('/',(req,res) => res.send('Hello World'))

app.get('/playground',(req,res) => res.send('This is our Playground')) 

