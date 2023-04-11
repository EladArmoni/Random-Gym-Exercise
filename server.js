import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db_connect.js"
import exercise_router from './routes/exercise-router.js';
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import cors from 'cors';


dotenv.config();
const app=express();
app.use(cors());

connectDB();

app.use(express.json());

app.use('/api/exercise',exercise_router);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port=process.env.PORT||5000
app.listen(port,()=>{
    console.log(`Serving on port ${port}.`)
});