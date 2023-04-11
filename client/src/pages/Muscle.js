import { Navbar } from '../components';
import { Footer } from '../components';
import { Link } from 'react-router-dom';
import Legs from '../images/Legs.jpg';
import Back from '../images/Back.jpg';
import Chest from '../images/Chest.jpg';
import Shoulders from '../images/Shoulders.jpg';
import Biceps from '../images/Biceps.jpg';
import Triceps from '../images/Triceps.jpg';

const muscles = [
    { name: "Legs", image: Legs },
    { name: "Back", image: Back },
    { name: "Chest", image: Chest },
    { name: "Shoulders", image: Shoulders },
    { name: "Biceps", image: Biceps },
    { name: "Triceps", image: Triceps },
];

const Muscles = () => {
    return (
        <>
            <Navbar />
            <div className="container-fluid text-center muscles-div" style={{ backgroundColor: "#061118" }}>
                <h1 className="h1 text-light pt-4 pb-4 f-size" style={{ fontSize: "40px" }}>Choose The Muscle You Want To Work On</h1>
                <div className=" row justify-content-center align-items-center  mx-w-75 m-auto">
                    {muscles.map((muscle) =>
                        <div className="col-6 col-md-4 mb-1">
                            <Link to="/random-exercise" state={{ muscle: muscle.name, exercise:null }}>
                                <img className="img-fluid rounded muscle-image" src={muscle.image} alt={muscle.name} />
                            </Link>
                        </div>)}
                </div>
            </div>
            <Footer />
        </>
    )
};


export default Muscles;