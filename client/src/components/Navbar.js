import Logo from '../components/Logo.js'
import Swal from 'sweetalert2';
import { useState } from 'react';
import userIcon from '../images/user.png';
import Button from './Button.js';

const Navbar = () => {
    const [loginButton, setLoginButton] = useState("Login");

    const handleLoginClick = () => {
        if (loginButton === "Logout") {
            // User is logged in, so perform a logout action
            Swal.fire({
                title: 'Logged Out',
                text: 'You have been logged out.',
                icon: 'success',
                background: '#181818',
                color: 'white'
            }).then(() => {
                localStorage.removeItem('user'); // Remove user information
                setLoginButton("Login");
            });
        } else {
            // User is not logged in, so open the login popup
            Swal.fire({
                title: 'Login',
                html: '<input id="username" class="swal2-input" placeholder="Username">' +
                    '<input id="password" type="password" class="swal2-input" placeholder="Password">',
                imageUrl: userIcon,
                imageWidth: 100,
                imageHeight: 100,
                background: '#181818',
                color: 'white',
                showCancelButton: true,
                confirmButtonText: 'Login',
                preConfirm: () => {
                    const email = Swal.getPopup().querySelector('#username').value;
                    const password = Swal.getPopup().querySelector('#password').value;
                    const url = 'https://random-exercise.onrender.com/api/user/login';
                    const data = {
                        email: email,
                        password: password
                    };

                    // Create the request options
                    const requestOptions = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json' // Set the content type to JSON
                        },
                        body: JSON.stringify(data) // Convert data to JSON format
                    };

                    // Make the POST request
                    fetch(url, requestOptions)
                        .then(response => response.json()) // Parse the response as JSON
                        .then(data => {
                            // Handle the response data here
                            localStorage["user"] = JSON.stringify(data);
                            setLoginButton("Logout");
                            Swal.fire({
                                title: data.message,
                                icon: data.message.indexOf("successfully") !== -1 ? 'success' : 'error',
                                showConfirmButton: false,
                                background: '#181818',
                                color: 'white'
                            });
                        })
                        .catch(error => {
                            // Handle any errors
                            console.error('Error:', error);
                        });
                }
            });
        }
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-black">
                <div className="container-fluid mx-1">
                    <a className="navbar-brand" href="/">
                        <Logo />
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
                                {/* <li className="nav-item">
                                    <a className="nav-link" aria-current="page" href="/favorites">My Favorites</a>
                                </li> */}
                            </ul>
                        </div>
                        <Button id="loginBtn" text={loginButton} handleFunction={handleLoginClick} />
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar
