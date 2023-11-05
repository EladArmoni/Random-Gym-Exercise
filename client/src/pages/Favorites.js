import { useState } from "react";
import { FavoriteExercise } from "../components";

const Favorites = () => {
    const [favorites, setFavorites] = useState(JSON.parse(localStorage["user"]).favoriteExercises);
    
    // let local = 'http://localhost:5000';
    let server='https://random-exercise.onrender.com';
    let api = server;

    const removeFromFav = (exercise) => {
        const token = JSON.parse(localStorage.getItem('token'));
        let url;
        const data = {
            exerciseName: exercise,
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
