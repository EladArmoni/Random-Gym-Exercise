const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    name: String,
    muscle: String,
    difficulty: Number,
    description: String
});

module.exports = mongoose.model('Exercise', ExerciseSchema);
