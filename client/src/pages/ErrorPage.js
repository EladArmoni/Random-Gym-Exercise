import errorImg from '../images/errorPage.jpg'
import { Navbar } from '../components';
import { Footer } from '../components';

const ErrorPage = () => {
    return (
        <>
            <Navbar/>
            <div className="container-fluid pt-5 background">
                <h1 className="p-3 text-center f-size">Error 404! Page not found.</h1>
                <img className="img-fluid rounded" src={errorImg} alt="error"></img>
            </div>
            <Footer/>
        </>
    )
};

export default ErrorPage
