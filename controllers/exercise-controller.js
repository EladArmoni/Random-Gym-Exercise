import Exercise from "../models/Exercise.js";

const getAllExercises = async (req, res, next) => {
    try {
        const exercises = await Exercise.find({}).sort({ muscle: 1, difficulty: 1 });
        if (exercises.length == 0)
            res.status(404).json({ "msg": "No exercises was found" });
        else
            res.status(200).json(exercises);
    }
    catch (error) {
        next(error)
    }
}

const getRandomExercise = async (req, res, next) => {
    try {
        const muscle = req.params.muscle;
        const exercises = await Exercise.find({ "muscle": muscle });
        if (exercises.length == 0)
            res.status(404).json({ "msg": "No exercises was found" });
        else {
            const exercise = randomExercise(exercises);
            res.status(200).json(exercise);
        }
    }
    catch (error) {
        next(error)
    }
}

const getExerciseByName = async (req, res, next) => {
    try {
        const exerciseName = req.params.exercise;
        const exercise = await Exercise.findOne({ "name": exerciseName });
        if (!exercise)
            res.status(404).json({ "msg": "Exercise not found." });
        else {
            res.status(200).json(exercise);
        }
    }
    catch (error) {
        next(error)
    }
}

//Generate random exercise
function randomExercise(exercises) {
    const index = Math.floor(Math.random() * (exercises.length));
    return exercises[index];
}

export { getAllExercises, getRandomExercise, getExerciseByName }
