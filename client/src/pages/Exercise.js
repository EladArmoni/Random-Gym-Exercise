import { Navbar, Footer } from '../components';
import { useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

const Exercise = () => {
    const location = useLocation();
    const muscle = location.state.muscle;
    const specificExercise = location.state.exercise;
    const [exercise, setExercise] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchExercise = useCallback(() => {
        setIsLoading(true);
        setError(null);
        setExercise({});
        if (!muscle) {
            console.log(specificExercise);
            fetch(`https://random-exercise.onrender.com/api/exercise/${specificExercise}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch exercise');
                    }
                    return response.json();
                })
                .then(data => {
                    setExercise(data);
                    setIsLoading(false);
                })
                .catch(error => {
                    setError(error.message);
                    setIsLoading(false);
                });
        } else {
            fetch(`https://random-exercise.onrender.com/api/exercise/muscle/${muscle}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch exercise');
                    }
                    return response.json();
                })
                .then(data => {
                    setExercise(data);
                    setIsLoading(false);
                })
                .catch(error => {
                    setError(error.message);
                    setIsLoading(false);
                });
        }
    }, [muscle, specificExercise]);

    useEffect(() => {
        fetchExercise();
    }, [fetchExercise]);

    const showAnotherExerciseButton = muscle ? (
        <>
            <button onClick={fetchExercise}>Another Exercise</button>
            <a href="/muscles" className="nav-link active">
                <button>Return Back</button>
            </a>
        </>
    ) : (
        <>
            <a href="/exercises" className="nav-link active">
                <button>Return Back</button>
            </a>
        </>
    );

    if (isLoading) {
        return <p>Loading exercise data...</p>;
    }

    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
                <button className="btn btn-primary mb-5 mt-4" onClick={fetchExercise}>Try Again</button>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container-fluid" style={{ backgroundColor: "#061118", color: "white" }}>
                <div className="row justify-content-center text-center">
                    <h1 className="mb-2 mt-4" style={{ color: "#019AF7" }}>
                        {exercise.name}
                    </h1>
                </div>
                <div className="row justify-content-center background mt-4">
                    <div className="col-lg-6 text-center">
                        <h4 className="card-title">Main Muscle: {exercise.muscle}</h4>
                        <p className="card-text mb-5">Difficulty: {exercise.difficulty}</p>
                        <div className="ratio ratio-16x9 mb-3">
                            <iframe
                                key={exercise.name}
                                allowFullScreen
                                src={`${exercise.description}&autoplay=1&mute=1`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            ></iframe>
                        </div>
                        <div className='buttons'>
                            {showAnotherExerciseButton}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>)
};
export default Exercise; 