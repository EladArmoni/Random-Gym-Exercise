import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    favoriteExercises: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Exercise' // Reference the "Exercise" model
        }
    ]
});

const model = mongoose.model('User', UserSchema);

export default model;
