import { Loading,ExerciseDetails } from '../components';
import { useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Button from '../components/Button';
import api from "../JS/url.js";

const Exercise = () => {
    const location = useLocation();
    const muscle = location.state.muscle;
    const specificExercise = location.state.exercise;
    const [exercise, setExercise] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchExercise = useCallback(() => {
        if (!muscle) {
            if (localStorage[specificExercise] !== undefined) {
                setExercise(JSON.parse(localStorage[specificExercise]));
                setIsLoading(false);
                return;
            }
            else {
                fetch(api+`/api/exercise/${specificExercise}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to fetch exercise');
                        }
                        return response.json();
                    })
                    .then(data => {
                        setExercise(data);
                        localStorage[specificExercise] = JSON.stringify(data);
                        setIsLoading(false);
                        return;
                    })
                    .catch(error => {
                        setError(error.message);
                        setIsLoading(false);
                        return;
                    });
            }
        } else {
            fetch(api+`/api/exercise/muscle/${muscle}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch exercise');
                    }
                    return response.json();
                })
                .then(data => {
                    setExercise(data[0]);
                    setIsLoading(false);
                    return;
                })
                .catch(error => {
                    setError(error.message);
                    setIsLoading(false);
                    return;
                });
        }
    }, [muscle, specificExercise]);

    useEffect(() => {
        fetchExercise();
    }, [fetchExercise]);

    const showAnotherExerciseButton = muscle ? (
        <>
            <Button classCss="btn btn-primary p-2 m-2" text="Another Exercise" handleFunction={fetchExercise} />
            <Button classCss="btn btn-primary p-2 m-2" text="Return Back" handleFunction={() => window.location.href = '/muscles'} />
        </>
    ) : (
        <>
            <Button classCss="btn btn-primary p-2 m-2" text="Return Back" handleFunction={() => window.location.href = '/exercises'} />
        </>
    );

    if (isLoading) {
        return (
            <>
                <div id='loader_container' className="container-fluid text-center" style={{ height: '100vh', backgroundColor: "#061118", color: "white" }}>
                    <div style={{ width: '100px' }} id='loader'>
                        <Loading type='spin' color='white' />
                    </div>
                </div>
            </>
        )
    }

    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
                <Button classCss="btn btn-primary p-2 m-1" text="Try Again" handleFunction={fetchExercise} />
            </div>
        );
    }

    return (
        <ExerciseDetails exercise={exercise} showAnotherExerciseButton={showAnotherExerciseButton} />
    )
};
export default Exercise; 