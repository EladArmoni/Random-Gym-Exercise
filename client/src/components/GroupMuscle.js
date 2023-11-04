import React from 'react'

const GroupMuscle = ({ muscle, filteredExercises }) => {
    return (
        <optgroup label={muscle} key={muscle}>
            {filteredExercises.map((exercise) => (
                <option className='option' value={exercise.name} key={exercise._id}>
                    {exercise.name}
                </option>
            ))}
        </optgroup>
    )
}

export default GroupMuscle;
