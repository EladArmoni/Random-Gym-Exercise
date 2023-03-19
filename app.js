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
    res.render('home.ejs');
})

//muscles page get route
app.get('/muscles', (req, res) => {
    res.render('muscles', { muscles });

})

let button = false;

//random exercise
app.get('/type', async (req, res) => {
    button = true;
    const chosenMuscle = req.query.muscle;
    const exercises = await Exercise.find({ "muscle": chosenMuscle });
    const exercise = randomExercise(exercises);
    res.render('showExercise', { exercise, button });
})

//specific exercise
app.get('/exercise', async (req, res) => {
    button = false;
    const chosenExercise = req.query.exercise;
    const exercise = await Exercise.findOne({ "name": chosenExercise });
    res.render('showExercise', { exercise, button });
})

//all exercises page get route
app.get('/showAll', async (req, res) => {
    const exercises = await Exercise.find({}).sort({ muscle: 1, difficulty: 1 });
    res.render('showAll', { exercises });
})

app.use((req, res) => {
    res.status(404).render('error')
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