import Logo from '../components/Logo.js'
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-black">
            <div className="container-fluid mx-1">
                <a className="navbar-brand" href="/">
                    <Logo/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link icon-link icon-link-hover" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/muscles">Muscles</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/exercises">All Exercises</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar
