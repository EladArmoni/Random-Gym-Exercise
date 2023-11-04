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
        const randomExercise = await Exercise.aggregate([
            { $match: { muscle: muscle } },
            { $sample: { size: 1 } }
        ]);
        if (!randomExercise)
            res.status(404).json({ "msg": "No exercises was found" });
        else {
            res.status(200).json(randomExercise);
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

export { getAllExercises, getRandomExercise, getExerciseByName }
