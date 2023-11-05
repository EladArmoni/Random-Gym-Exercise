import User from "../models/User.js";
import Exercise from "../models/Exercise.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const signupUser = async (req, res, next) => {
    const { email, password, firstName, lastName } = req.body;
    try {
        // Check if a user with the same email already exists
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(409).json({ message: "User with the same email is already exists." });
        }
        else {
            bcrypt.hash(password, 10, (error, hash) => {
                if (error) {
                    return res.status(500).json({ error });
                }
                // Create a new user if no user with the same email is found
                const newUser = new User({
                    email: email,
                    password: hash,
                    firstName: firstName,
                    lastName: lastName,
                    favoriteExercises: []
                });

                newUser.save()
                    .then(user => {
                        const token = Jwt.sign({
                            id: user._id,
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName
                        },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "1H"
                            }
                        );
                        res.status(200).json({ user: user, message: 'Signed up successfully' ,token});
                    })
                    .catch(error => {
                        if (error.name === 'ValidationError') {
                            next(error.message);
                        }
                        else {
                            next(error);
                        }
                    });
            });
        };
    }
    catch (err) {
        next(err);
    }
}

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists in your database
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ message: 'User with this email does not exist' });
        }

        // Check if the provided password matches the stored password
        bcrypt.compare(password, user.password, (error, passwordMatch) => {
            if (error) {
                return res.status(500).json({ message: 'Auth Failed' });
            }

            // User logged in successfully
            if (passwordMatch) {
                const token = Jwt.sign({
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1H"
                    }
                );
                return res.status(200).json({ user: user, message: 'Logged in successfully', token });
            } else {
                return res.status(401).json({ message: 'Invalid password' });
            }
        });

    } catch (err) {
        next(err);
    }
};


const addExerciseToFavorites = async (req, res, next) => {
    try {
        const exercise = await Exercise.findOne({ name: req.body.exerciseName });

        if (!exercise) {
            res.status(404).json({ message: 'Exercise not found' });
            return;
        }

        // Update the user and get the updated user data
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.body.user_id },
            { $push: { favoriteExercises: exercise._id } }, // Store the exercise ID
            { new: true }
        );

        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
        }
        else {
            res.status(200).json({ message: 'Added Successfully', user: updatedUser });
        }
    } catch (error) {
        next(error);
    }
}

const removeExerciseFromFavorites = async (req, res, next) => {
    try {

        const exercise = await Exercise.findOne({ name: req.body.exerciseName });
        if (!exercise) {
            res.status(404).json({ message: 'Exercise not found' });
            return;
        }

        // Update the user and get the updated user data
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.body.user_id },
            { $pull: { favoriteExercises: exercise._id } },
            { new: true } // This option returns the updated document
        );
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
        }
        else {
            res.status(200).json({ message: 'Removed Successfully', user: updatedUser });
        }
    } catch (error) {
        next(error);
    }
}


export { loginUser, signupUser, addExerciseToFavorites, removeExerciseFromFavorites }
