const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Exercise = require('./models/Exercise');
const dotenv=require('dotenv');
dotenv.config(); 

const dbUrl=process.env.DB_URL;
mongoose.connect(dbUrl ,{ useNewUrlParser: true})
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log("Error while connected to DB!",err);
    })

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', (req, res) => {
    const muscles=["Legs","Back","Chest","Shoulders","Biceps","Triceps"];
    res.render('home');
})

app.get('/muscles', (req, res) => {
    const muscles=["Legs","Back","Chest","Shoulders","Biceps","Triceps"];
    res.render('muscles',{muscles});
})

app.get('/type', async (req, res) => {
    const chosenMuscle = req.query.muscle;
    const exercises = await Exercise.find({ "muscle": chosenMuscle });
    const random = randomExercise(exercises);
    res.render('random', { random });
})
app.get('/exercise', async (req, res) => {
    const chosenExercise = req.query.exercise;
    const exercise = await Exercise.findOne({ "name": chosenExercise });
    res.render('showExercise', { exercise });
})

app.get('/confirmation', (req, res) => {
    res.render('confirmation');
})
app.get('/showAll', async (req, res) => {
    const exercises = await Exercise.find({});
    res.render('showAll', { exercises });
})

function randomExercise(exercises) {
    const index = Math.floor(Math.random() * (exercises.length));
    return exercises[index];
}

const port = process.env.PORT||3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
});