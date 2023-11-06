import { useState } from "react";
import { FavoriteExercise } from "../components";
import api from "../JS/url.js";
import removeExpiredData from "../JS/removeExpiredData.js";
const Favorites = () => {
    const favoriteExercises = JSON.parse(localStorage["user"]).favoriteExercises;
    const [favorites, setFavorites] = useState(favoriteExercises);

    const removeFromFav = (exercise) => {
        const token = JSON.parse(localStorage.getItem('token'));
        let url;
        const data = {
            exerciseName: exercise.name,
            user_id: JSON.parse(localStorage["user"])._id
        };
        url = api + `/api/user/removeExerciseFromFavorite`;
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
                const updatedUserJSON = JSON.stringify(data.user);
                localStorage.setItem('user', updatedUserJSON);
                removeExpiredData();
                setFavorites(data.user.favoriteExercises)
            });
    };
    const groupExercisesByMuscle = (exercises) => {
        const groups = {};
        exercises.forEach((exercise) => {
            const muscle = exercise.muscle;
            if (!groups[muscle]) {
                groups[muscle] = [];
            }
            groups[muscle].push(exercise);
        });
        return groups;
    };

    const groupedExercises = groupExercisesByMuscle(favorites);

    return (
        <>
            <div className="container-fluid text-center muscles-div" style={{ backgroundColor: "#061118" }}>
                <h1 className="h1 text-light pt-4 pb-4 f-size" style={{ fontSize: "40px" }}>Your Favorite Exercises</h1>
                <div className="row mx-w-75 m-auto">
                    {Object.entries(groupedExercises).map(([muscle, exercises]) => (
                        <div key={muscle} className="col-12">
                            <h2 className="muscleTitle">{muscle}</h2>
                            <div className="row justify-content-center align-items-center">
                                {exercises.map((exercise) => (
                                    <FavoriteExercise key={exercise._id} exercise={exercise} removeFunc={removeFromFav} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Favorites;
