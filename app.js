const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Exercise = require('./models/Exercise');

mongoose.connect('mongodb://localhost:27017/gym-exercises', { useNewUrlParser: true, })
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log("Error while connected to DB!");
    })

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/', async (req, res) => {
    const chosenMuscle = req.body.muscle;
    const exercises = await Exercise.find({ "muscle": chosenMuscle });
    const random = randomExercise(exercises);
    res.render('random', { random });
})
app.post('/exercise', async (req, res) => {
    const chosenExercise = req.body.exercise;
    const exercise = await Exercise.findOne({ "name": chosenExercise });
    console.log(exercise);
    res.render('showExercise', { exercise });
})
app.post('/admin', (req, res) => {
    const email = req.body.Email;
    const password = req.body.Password;
    if (email === 'eladarmoni96@gmail.com' && password === 'Elad123') {
        res.redirect('createExercise');
    }
    else {
        res.render('invalid');
    }
})

app.get('/createExercise', async (req, res) => {
    res.render('createExercise');
})

app.post('/createExercise', async (req, res) => {
    const exercise = new Exercise(req.body);
    await exercise.save();
    res.redirect('/confirmation');
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

app.listen(3000, () => {
    console.log("Serving on port 3000")
});