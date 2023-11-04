import Exercise from "../models/Exercise.js";
import Swal from "sweetalert2";

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

const addToFavorites = async (req, res, next) => {
    try {
        const { user_id, exerciseName } = req.body;

        if (!user_id || !exerciseName) {
            return res.status(400).json({ message: 'Bad Request: Missing user_id or exerciseName' });
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: user_id },
            { $push: { favoriteExercises: exerciseName } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'Added Successfully', user: updatedUser });
    } catch (error) {
        console.error(error); // Log the error for debugging
        next(error);
    }
};


export { getAllExercises, getRandomExercise, getExerciseByName, addToFavorites }
