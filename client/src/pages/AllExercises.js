import { Navbar } from '../components';
import { Footer } from '../components';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const muscles = ["Legs", "Back", "Chest", "Shoulders", "Biceps", "Triceps"];

const AllExercises = () => {
    const [exercises, setExercises] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState('');

    useEffect(() => {
        async function fetchExercises() {
            try {
                const response = await fetch('http://localhost:5000/api/exercise/');
                const data = await response.json();
                setExercises(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchExercises();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container-fluid text-light p-5 background d-flex" id="allExe">
                <div className="text-center m-auto">
                    <h1 className="f-size pb-5">All Exercises</h1>
                    <select className="form-select" aria-label="Default select example" name="exercise" onChange={(e) => setSelectedExercise(e.target.value)}>
                        {muscles.map((muscle) => {
                            return (
                                <optgroup label={muscle} key={muscle} >
                                    {exercises.map((exercise) => {
                                        if(exercise.muscle===muscle){
                                        return(
                                        <option className='option' value={exercise.name} key={exercise._id}>
                                            {exercise.name}
                                        </option>
                                        );}
                                        else{
                                            return;
                                        }
                                    })};
                                </optgroup>
                            )
                        })};
                    </select>
                    <Link to="/random-exercise" state={{ muscle: null, exercise: selectedExercise }}>
                        <button className='btn btn-primary mt-5'>Exercise Video</button>
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AllExercises;
