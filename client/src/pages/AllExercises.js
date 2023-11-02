import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const muscles = ["Legs", "Back", "Chest", "Shoulders", "Biceps", "Triceps"];

const AllExercises = () => {
    const [exercises, setExercises] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState(null);

    useEffect(() => {
        async function fetchExercises() {
            try {
                if (localStorage["exercises"] !== undefined) {
                    setExercises(JSON.parse(localStorage["exercises"]));
                }
                else {
                    const response = await fetch('https://random-exercise.onrender.com/api/exercise/');
                    const data = await response.json();
                    setExercises(data);
                    localStorage["exercises"] = JSON.stringify(data);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchExercises();
    }, []);

    return (
        <>
            <div className="container-fluid text-light p-5 background d-flex" id="allExe">
                <div className="text-center m-auto">
                    <h1 className="f-size pb-5">All Exercises</h1>
                    <select className="form-select" aria-label="Default select example" name="exercise" onChange={(e) => setSelectedExercise(e.target.value)}>
                        <option value="">Choose Exercise</option>
                        {muscles.map((muscle) => {
                            const filteredExercises = exercises.filter((exercise) => exercise.muscle === muscle);
                            if (filteredExercises.length > 0) {
                                return (
                                    <optgroup label={muscle} key={muscle}>
                                        {filteredExercises.map((exercise) => (
                                            <option className='option' value={exercise.name} key={exercise._id}>
                                                {exercise.name}
                                            </option>
                                        ))}
                                    </optgroup>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </select>
                    <Link to="/random-exercise" state={{ muscle: null, exercise: selectedExercise }}>
                        <button className='btn btn-primary mt-5' disabled={!selectedExercise}>Exercise Video</button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default AllExercises;
