import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    name: String,
    muscle: String,
    difficulty: Number,
    description: String
});

const model = mongoose.model('Exercise', ExerciseSchema);

export default model;