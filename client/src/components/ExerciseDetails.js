import React from 'react'
import Swal from 'sweetalert2'
const ExerciseDetails = ({ exercise, showAnotherExerciseButton }) => {
    return (
        <>
            <div className="container-fluid" style={{ backgroundColor: "#061118", color: "white" }}>
                <div className="row justify-content-center text-center">
                    <h1 className="mb-2 mt-4" style={{ color: "#019AF7" }}>
                        {exercise.name}
                    </h1>
                    <button onClick={() => {
                        const data = {
                            exerciseName: exercise.name,
                            user_id: JSON.parse(localStorage["user"])._id
                        };
                        fetch(`https://randomexercise.netlify.app/api/user/addToFavorites`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                const updatedUserJSON = JSON.stringify(data.user);
                                localStorage.setItem('user', updatedUserJSON);
                                Swal.fire({
                                    title: updatedUserJSON.message,
                                    background: '#181818',
                                    color: 'white'
                                })
                            })
                    }} className="favBtn"
                        style={{ color: JSON.parse(localStorage["user"]).favoriteExercises.includes(exercise.name) ? 'red' : 'white' }}
                    >
                        &#10084;
                    </button>
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
        </>
    )
}

export default ExerciseDetails
