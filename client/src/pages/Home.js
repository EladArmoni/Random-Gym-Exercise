import { Navbar } from '../components';
import { Footer } from '../components';

const Home = () => {
    
    return (
        <>
            <Navbar />
                <div className="container-fluid text-light p-5 background d-flex" id="main">
                    <div className="text-center m-auto">
                        <h1 className="h1 mb-4 mainHeader">Maximize Results With <span style={{ color: "#019AF7" }}> <br></br>Random Exercise</span></h1>
                        <a class="btn btn-primary mt-5 p-2" href="/muscles" role="button">START NOW</a>
                    </div>
                </div>
            <Footer />
        </>
    )
};

export default Home;
