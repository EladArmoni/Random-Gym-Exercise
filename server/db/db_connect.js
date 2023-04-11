import mongoose from "mongoose";

//mongoDB connection
const connectDB = () => {
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to DB!');
    }).catch((err) => {
        console.error('Error while connecting to MongoDB:', err);
    });
}

export default connectDB;