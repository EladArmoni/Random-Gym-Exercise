import { useState } from "react";
import { FavoriteExercise } from "../components";
import api from "../JS/url.js";

const Favorites = () => {
    const favoriteExercises=JSON.parse(localStorage["user"]).favoriteExercises;
    const [favorites, setFavorites] = useState(favoriteExercises);

    const removeFromFav = (exercise) => {
        const token = JSON.parse(localStorage.getItem('token'));
        let url;
        const data = {
            exerciseName: exercise.name,
            user_id: JSON.parse(localStorage["user"])._id
        };
        url = api+`/api/user/removeExerciseFromFavorite`;
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
                setFavorites(data.user.favoriteExercises)
            });
    };
    return (
        <>
            <div className="container-fluid text-center muscles-div" style={{ backgroundColor: "#061118" }}>
                <h1 className="h1 text-light pt-4 pb-4 f-size" style={{ fontSize: "40px" }}>Your Favorite Exercises</h1>
                <div className="row justify-content-center align-items-center mx-w-75 m-auto">
                    {favorites.map(exercise => (

                        <FavoriteExercise exercise={exercise} removeFunc={removeFromFav} />
                    ))}
                </div>
            </div >
        </>
    )
};

export default Favorites;
