import Legs from '../images/Legs.jpg';
import Back from '../images/Back.jpg';
import Chest from '../images/Chest.jpg';
import Shoulders from '../images/Shoulders.jpg';
import Biceps from '../images/Biceps.jpg';
import Triceps from '../images/Triceps.jpg';
import MuscleBtn from "../components/MuscleBtn.js";

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
            <div className="container-fluid text-center muscles-div" style={{ backgroundColor: "#061118" }}>
                <h1 className="h1 text-light pt-4 pb-4 f-size" style={{ fontSize: "40px" }}>Choose The Muscle You Want To Work On</h1>
                <div className=" row justify-content-center align-items-center  mx-w-75 m-auto">
                    {muscles.map((muscle) =><MuscleBtn key={muscle} muscle={muscle}/>)}
                </div>
            </div>
        </>
    )
};


export default Muscles;