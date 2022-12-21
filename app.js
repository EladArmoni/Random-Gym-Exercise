const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Exercise = require('./models/Exercise');
const dotenv = require('dotenv');
dotenv.config();

//mongoDB connection
const dbUrl = process.env.DB_URL
mongoose.connect(dbUrl, { useNewUrlParser: true })
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log("Error while connected to DB!", err);
    })

//set engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const muscles = ["Legs", "Back", "Chest", "Shoulders", "Biceps", "Triceps"];

//home page get route
app.get('/', (req, res) => {
    try {
        res.render('home');
    }
    catch {
        res.render('error');
    }
})

//muscles page get route
app.get('/muscles', (req, res) => {
    try {
        res.render('muscles', { muscles });
    }
    catch {
        res.render('error');
    }
})

let button = false;

//random exercise
app.get('/type', async (req, res) => {
    try {
        button = true;
        const chosenMuscle = req.query.muscle;
        const exercises = await Exercise.find({ "muscle": chosenMuscle });
        const exercise = randomExercise(exercises);
        res.render('showExercise', { exercise, button });
    }
    catch {
        res.render('error');
    }
})

//specific exercise
app.get('/exercise', async (req, res) => {
    try {
        button = false;
        const chosenExercise = req.query.exercise;
        const exercise = await Exercise.findOne({ "name": chosenExercise });
        res.render('showExercise', { exercise, button });
    }
    catch {
        res.render('error');
    }
})

//error page get route
app.get('/error', async (req, res) => {
    res.render('error')
})

//all exercises page get route
app.get('/showAll', async (req, res) => {
    try {
        const exercises = await Exercise.find({});
        res.render('showAll', { exercises });
    }
    catch {
        res.render('error');
    }
})

//random function
function randomExercise(exercises) {
    const index = Math.floor(Math.random() * (exercises.length));
    return exercises[index];
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
});