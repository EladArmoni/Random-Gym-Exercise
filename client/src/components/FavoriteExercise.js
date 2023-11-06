import React from 'react'
import { Link } from "react-router-dom";
import { VideoThumbnail } from '../components';

const FavoriteExercise = ({ exercise, removeFunc }) => {
    return (
        <div className="card favoriteCard" style={{ width: "18rem" }}>
            <div className="card-body p-0">
                <Link to="/random-exercise" state={{ muscle: null, exercise: exercise.name }}>
                    <VideoThumbnail exercise={exercise} />
                </Link>
                <p className="card-text mb-1">Muscle: {exercise.muscle}</p>
                <p className="card-text mb-1">Difficulty: {exercise.difficulty}</p>
                <button onClick={() => removeFunc(exercise)} className="favBtn" style={{ "color": "red" }}>
                    &#10084;
                </button>
            </div>
        </div>
    )
}

export default FavoriteExercise
