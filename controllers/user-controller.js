import User from "../models/User.js";

const signupUser = async (req, res, next) => {
    const { email, password, firstName, lastName } = req.body;
    try {
        // Check if a user with the same email already exists
        const user = await User.findOne({ email: email });
        if (user) {
            res.status(409).json({ message: "User with the same email already exists." });
        }
        else {
            // Create a new user if no user with the same email is found
            const newUser = new User({
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                favoriteExercises:[]
            });

            newUser.save()
                .then(user => {
                    res.status(200).json({ user: user, message: 'Signed up successfully' });
                })
                .catch(error => {
                    next(error);
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
        // Check if the user exists in your databases
        const user = await User.findOne({ email: email });

        if (!user) {
            res.status(401).json({ message: 'User with this email does not exist' });
        }

        // Check if the provided password matches the stored password
        if (user.password != password) {
            res.status(401).json({ message: 'Invalid password' });
        }
        //user logged in successfully
        res.status(200).json({ user: user, message: 'Logged in successfully' });
    }
    catch (err) {
        next(err);
    }
}

const addExerciseToFavorites = async (req, res, next) => {
    try {
        // Update the user and get the updated user data
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.body.user_id },
            { $push: { favoriteExercises: req.body.exerciseName } },
            { new: true } // This option returns the updated document
        );

        if (!updatedUser) {
            res.status(404).json({ message: 'User not found'});
        }
        res.status(200).json({ message: 'Added Successfully', user: updatedUser });
    } catch (error) {
        next(error);
    }
}
// const getUserFavoritesExercises = async (req, res, next) => {
//     try {
//         const favoritesExercises = await UserExercises.find({}).sort({ muscle: 1, difficulty: 1 });
//         if (exercises.length == 0)
//             res.status(404).json({ "msg": "No exercises was found" });
//         else
//             res.status(200).json(exercises);
//     }
//     catch (error) {
//         next(error)
//     }
// }


export { loginUser, signupUser,addExerciseToFavorites }
