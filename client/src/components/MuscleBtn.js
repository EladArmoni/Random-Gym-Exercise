import { Link } from 'react-router-dom';
const MuscleBtn = (props) => {
    return (
        <div className="col-6 col-md-4 mb-1">
            <Link to="/random-exercise" state={{ muscle: props.muscle.name, exercise: null }}>
                <img className="img-fluid rounded muscle-image" src={props.muscle.image} alt={props.muscle.name} />
            </Link>
        </div>
    );
}

export default MuscleBtn;