import { Loading } from '../components';
import { useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Button from '../components/Button';
// import Swal from 'sweetalert2';

const Exercise = () => {
    const location = useLocation();
    const muscle = location.state.muscle;
    const specificExercise = location.state.exercise;
    const [exercise, setExercise] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // const addToFav = () => {
    //     const userEmail = JSON.parse(localStorage["user"]).email;
    //     const exerciseName = exercise.name;

    //     User.findOneAndUpdate(
    //         { email: userEmail },
    //         { $addToSet: { favoriteExercises: exerciseName } },
    //         { new: true },
    //         (err, updatedUser) => {
    //             if (err) {
    //                 console.error(err);
    //             } else {
    //                 Swal.fire({
    //                     title: 'Exercise Added To Your Favorites',
    //                     icon: 'success',
    //                     background: '#181818',
    //                     color: 'white'
    //                 }).then(() => {
    //                     localStorage["user"]=JSON.stringify(updatedUser);
    //                 });
    //             }
    //         }
    //     );
    // }
    const fetchExercise = useCallback(() => {
            if (!muscle) {
                if (localStorage[specificExercise] !== undefined) {
                    setExercise(JSON.parse(localStorage[specificExercise]));
                    setIsLoading(false);
                    return;
                }
                else {
                    fetch(`https://random-exercise.onrender.com/api/exercise/${specificExercise}`)
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
                        });
                }
            } else {
                fetch(`https://random-exercise.onrender.com/api/exercise/muscle/${muscle}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to fetch exercise');
                        }
                        return response.json();
                    })
                    .then(data => {
                        setExercise(data[0]);
                        setIsLoading(false);
                    })
                    .catch(error => {
                        setError(error.message);
                        setIsLoading(false);
                    });
            }
        },[muscle, specificExercise]);

    useEffect(() => {
        fetchExercise();
    }, [fetchExercise]);

    const showAnotherExerciseButton = muscle ? (
        <>
            <Button text="Another Exercise" handleFunction={fetchExercise} />
            <Button text="Return Back" handleFunction={() => window.location.href = '/muscles'} />
        </>
    ) : (
        <>
            <Button text="Return Back" handleFunction={() => window.location.href = '/muscles'} />
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
                <Button text="Try Again" handleFunction={fetchExercise} />
            </div>
        );
    }

    return (
        <>
            <div className="container-fluid" style={{ backgroundColor: "#061118", color: "white" }}>
                <div className="row justify-content-center text-center">
                    <h1 className="mb-2 mt-4" style={{ color: "#019AF7" }}>
                        {exercise.name}
                    </h1>
                </div>
                <div className="row justify-content-center background mt-4">
                    <div className="col-lg-6 text-center">
                        <h4 className="card-title">Main Muscle: {exercise.muscle} </h4>
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
        </>)
};
export default Exercise; 