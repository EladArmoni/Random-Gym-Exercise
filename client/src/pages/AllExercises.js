import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header,GroupMuscle,Button } from '../components';

const muscles = ["Legs", "Back", "Chest", "Shoulders", "Biceps", "Triceps"];

const AllExercises = () => {
    const [exercises, setExercises] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState(null);

    // let local='http://localhost:5000';
    let server='https://random-exercise.onrender.com';
    let api=server;

    useEffect(() => {
        async function fetchExercises() {
            try {
                if (localStorage["exercises"] !== undefined) {
                    setExercises(JSON.parse(localStorage["exercises"]));
                }
                else {
                    const response = await fetch(api+'/api/exercise/');
                    const data = await response.json();
                    setExercises(data);
                    localStorage["exercises"] = JSON.stringify(data);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchExercises();
    }, [api]);

    return (
        <>
            <div className="container-fluid text-light p-5 background d-flex" id="allExe">
                <div className="text-center m-auto">
                <Header text="All Exercises"/>
                    <select className="form-select" aria-label="Default select example" name="exercise" onChange={(e) => setSelectedExercise(e.target.value)}>
                        <option value="">Choose Exercise</option>
                        {muscles.map((muscle) => {
                            const filteredExercises = exercises.filter((exercise) => exercise.muscle === muscle);
                            if (filteredExercises.length > 0) {
                                return (<GroupMuscle muscle={muscle} filteredExercises={filteredExercises}/>);
                            } else {
                                return null;
                            }
                        })}
                    </select>
                    <Link to="/random-exercise" state={{ muscle: null, exercise: selectedExercise }}>
                        <Button classCss="btn btn-primary p-2 m-4" text="Exercise Video" disabled={!selectedExercise} />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default AllExercises;
