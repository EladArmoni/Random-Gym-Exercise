import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import api from "../JS/url.js";
import removeExpiredData from "../JS/removeExpiredData.js";

const ExerciseDetails = ({ exercise, showAnotherExerciseButton }) => {
    const [inFavorites, setInFavorites] = useState(false);

    useEffect(() => {
        if(localStorage["user"]!==undefined){
            const user = JSON.parse(localStorage["user"]);
            if (user && user.favoriteExercises) {
                const isFavorite = user.favoriteExercises.some(favExercise => favExercise._id === exercise._id);
                setInFavorites(isFavorite);
            }
        }
    }, [exercise]);

    const toggleFavorite = () => {
        const token = JSON.parse(localStorage.getItem('token'));

        if (!token) {
            Swal.fire({
                title: 'You must be logged in to favorite exercises!',
                icon: 'warning',
                background: '#181818',
                color: 'white'
            })
            return;
        }

        let url;
        const data = {
            exerciseName: exercise.name,
            user_id: JSON.parse(localStorage["user"])._id
        };
        if (inFavorites) {
            url = api + `/api/user/removeExerciseFromFavorite`;
        } else {
            url = api + `/api/user/addExerciseToFavorite`;
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                try {
                    const updatedUserJSON = JSON.stringify(data.user);
                    localStorage.setItem('user', updatedUserJSON);
                    removeExpiredData();
                    setInFavorites(!inFavorites);
                }
                catch (err) {
                    Swal.fire({
                        icon: "error",
                        title: err,
                    });
                }
            });
    };

    return (
        <>
            <div className="container-fluid" style={{ backgroundColor: "#061118", color: "white" }}>
                <div className="row justify-content-center text-center">
                    <h1 className="mb-2 mt-4" style={{ color: "#019AF7" }}>
                        {exercise.name}
                    </h1>
                    <button onClick={toggleFavorite} className="favBtn"
                        style={{ color: inFavorites ? 'red' : 'white' }}
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
