import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String
});

const model = mongoose.model('User', UserSchema);

export default model;