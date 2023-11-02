import User from "../models/User.js";

const signupUser = async (req, res, next) => {
    const { userEmail, userPassword, userFirstName, userLastName } = req.body;
    // Check if a user with the same email already exists
    User.findOne({ email: userEmail }, (err, existingUser) => {
        if (err) {
            // Handle the error
            next(err);
        }

        else if (existingUser) {
            // A user with the same email already exists
            res.status(409).json({ message: "User with the same email already exists." });
        }

        else {
            // Create a new user if no user with the same email is found
            const newUser = new User({
                email: userEmail,
                password: userPassword,
                firstName: userFirstName,
                lastName: userLastName
            });

            newUser.save()
                .then(user => {
                    res.status(200).json({user:user,message: 'Signed up successfully' });
                })
                .catch(error => {
                    next(error);
                });
        }
    });
}

const loginUser = async (req, res, next) => {
    const { userEmail, userPassword } = req.body;
    try{
        // Check if the user exists in your databases
        const user = await User.findOne({ email: userEmail });
    
        if (!user) {
            res.status(401).json({ message: 'User with this email does not exist'});
        }
    
        // Check if the provided password matches the stored password
        if (user.password!=userPassword) {
            res.status(401).json({ message: 'Invalid password' });
        }
        //user logged in successfully
        res.status(200).json({user:user, message: 'Logged in successfully' });
    }
    catch(err)
    {
        next(err);
    }
}


const logoutUser = async (req, res, next) => {
    try {
        localStorage.removeItem('user'); 
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        next(err);
    }
}

export { loginUser, logoutUser, signupUser }
