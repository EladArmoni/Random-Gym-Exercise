import React from 'react'
import { Link } from "react-router-dom";

const FavoriteExercise = ({ exercise, removeFunc }) => {
    return (
        <div className="card favoriteCard" style={{ width: "18rem" }}>
            {/* <img src="..." className="card-img-top" alt="..." /> */}
            <div className="card-body">
                <h5 className="card-title">{exercise.name}</h5>
                <p className="card-text">Muscle: {exercise.muscle}</p>
                <p className="card-text">Difficulty: {exercise.difficulty}</p>
                <button onClick={() => removeFunc(exercise)} className="favBtn" style={{ "color": "red" }}>
                    &#10084;
                </button>
                <Link className='btn btn-primary' to="/random-exercise" state={{ muscle: null, exercise: exercise.name }}>
                    Show Exercise
                </Link>
            </div>
        </div>
    )
}

export default FavoriteExercise
