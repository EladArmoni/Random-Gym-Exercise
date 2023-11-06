import React from 'react'
import { Link } from "react-router-dom";
import { VideoThumbnail } from '../components';

const FavoriteExercise = ({ exercise, removeFunc }) => {
    return (
        <div className="card favoriteCard" style={{ width: "18rem" }}>
            <div className="card-body p-0">
                <Link to="/random-exercise" state={{ muscle: null, exercise: exercise.name }}>
                    <VideoThumbnail className="videoThumbnail" exercise={exercise} />
                </Link>
                <p className="card-text mb-1">{exercise.name}</p>
                <p className="card-text mb-1">Muscle: {exercise.muscle}</p>
                <p className="card-text mb-1">Difficulty: {exercise.difficulty}</p>
                <i className="fa-solid fa-heart-crack favBtn" onClick={() => removeFunc(exercise)} style={{color: '#f44e4e'}}></i>
            </div>
        </div>
    )
}

export default FavoriteExercise
