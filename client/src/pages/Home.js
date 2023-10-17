import { Navbar } from '../components';
import { Footer } from '../components';

const Home = () => {
    fetch('https://random-exercise.onrender.com/api/exercise/')
    return (
        <>
            <Navbar />
                <div className="container-fluid text-light p-5 background d-flex" id="main">
                    <div className="text-center m-auto">
                        <h1 className="h1 mb-4 mainHeader">Maximize Results With <br/> <span style={{ color: "#019AF7" }}>Random Exercise</span></h1>
                        <a class="btn btn-primary mt-5 p-2" href="/muscles" role="button">START NOW</a>
                    </div>
                </div>
            <Footer />
        </>
    )
};

export default Home;
