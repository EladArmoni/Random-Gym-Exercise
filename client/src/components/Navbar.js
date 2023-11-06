import Logo from '../components/Logo.js'
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import userIcon from '../images/user.png';
import Button from './Button.js';
import api from "../JS/url.js";
import removeExpiredData from "../JS/removeExpiredData.js";

const Navbar = () => {
    const [loginButton, setLoginButton] = useState("Login");
    const [signUpButton, setSignUpButton] = useState(true);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setLoginButton("Logout");
            setSignUpButton(false);
        }
    }, []);

    const handleSignUp = () => {
        Swal.fire({
            title: 'Sign Up',
            html: '<input id="username" class="swal2-input" placeholder="Email">' +
                '<input id="password" type="password" class="swal2-input" placeholder="Password">' +
                '<input id="firstName" class="swal2-input" placeholder="First Name">' +
                '<input id="lastName" class="swal2-input" placeholder="Last Name">',
            imageUrl: userIcon,
            imageWidth: 100,
            imageHeight: 100,
            background: '#181818',
            color: 'white',
            confirmButtonText: 'Sign Up',
            customClass: {
                confirmButton: 'btn btn-primary'
            },
            showCancelButton:true,
            allowOutsideClick: false, // Disable clicking outside to close
            allowEscapeKey: false, // Disable using the Escape key to close
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return new Promise((resolve) => {
                    const email = Swal.getPopup().querySelector('#username').value;
                    const password = Swal.getPopup().querySelector('#password').value;
                    const firstName = Swal.getPopup().querySelector('#firstName').value;
                    const lastName = Swal.getPopup().querySelector('#lastName').value;

                    if (!email || !password || !firstName || !lastName) {
                        Swal.showValidationMessage('All fields are required.');
                        resolve();
                    }
                    else {

                        const url = api + '/api/user/signup';
                        const data = {
                            email: email,
                            password: password,
                            firstName: firstName,
                            lastName: lastName
                        };

                        // Create the request options
                        const requestOptions = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        };

                        // Make the POST request
                        fetch(url, requestOptions)
                            .then(response => response.json())
                            .then(data => {
                                // Handle the response data here
                                if (data.message.includes("successfully")) {
                                    localStorage["user"] = JSON.stringify(data.user);
                                    if (data.token) {
                                        localStorage["token"] = JSON.stringify(data.token);
                                    }
                                    removeExpiredData();
                                    setLoginButton("Logout");
                                    setSignUpButton(false);
                                }
                                const Toast = Swal.mixin({
                                    toast: true,
                                    position: "top-end",
                                    background: '#181818',
                                    color: 'white',
                                    showConfirmButton: false,
                                    timer: 3000,
                                    timerProgressBar: true,
                                    didOpen: (toast) => {
                                        toast.onmouseenter = Swal.stopTimer;
                                        toast.onmouseleave = Swal.resumeTimer;
                                    }
                                });
                                Toast.fire({
                                    icon: data.message.indexOf("successfully") !== -1 ? 'success' : 'error',
                                    title: data.message
                                });

                                resolve(); // Resolve the outer Promise to prevent Swal from closing
                            })
                            .catch(error => {
                                // Handle any errors
                                console.error('Error:', error);

                                Swal.update({
                                    title: 'An error occurred',
                                    icon: 'error',
                                    showConfirmButton: true,
                                    showCancelButton: false,
                                    allowOutsideClick: false,
                                    allowEscapeKey: false,
                                });

                                resolve(); // Resolve the outer Promise to prevent Swal from closing
                            });
                    }
                });
            }
        });
    }

    const handleLoginClick = () => {
        if (loginButton === "Logout") {
            // User is logged in, so perform a logout action
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                background: '#181818',
                color: 'white',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: 'success',
                title: 'You have been logged out',
                background: '#181818',
                color: 'white'
            }).then(() => {
                setLoginButton("Login");
                setSignUpButton(true);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.location.href = '/';
            });

        } else {
            // User is not logged in, so open the login popup
            Swal.fire({
                title: 'Login',
                html: '<input id="username" class="swal2-input" placeholder="Email">' +
                    '<input id="password" type="password" class="swal2-input" placeholder="Password">',
                imageUrl: userIcon,
                imageWidth: 100,
                imageHeight: 100,
                background: '#181818',
                color: 'white',
                confirmButtonText: 'Login',
                customClass: {
                    confirmButton: 'btn btn-primary'
                },
                showCancelButton:true,
                allowOutsideClick: false, // Disable clicking outside to close
                allowEscapeKey: false, // Disable using the Escape key to close
                showLoaderOnConfirm: true,
                preConfirm: () => {
                    return new Promise((resolve) => {
                        const email = Swal.getPopup().querySelector('#username').value;
                        const password = Swal.getPopup().querySelector('#password').value;

                        if (!email || !password) {
                            Swal.showValidationMessage('All fields are required.');
                            resolve();
                        }
                        else {
                            const url = api + '/api/user/login';
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
                                .then(response => response.json())
                                .then(data => {
                                    // Handle the response data here
                                    if (data.message.includes("successfully")) {
                                        localStorage["user"] = JSON.stringify(data.user);
                                        if (data.token) {
                                            localStorage["token"] = JSON.stringify(data.token);
                                        }
                                        removeExpiredData();
                                        setLoginButton("Logout");
                                        setSignUpButton(false);
                                    }
                                    const Toast = Swal.mixin({
                                        toast: true,
                                        position: "top-end",
                                        background: '#181818',
                                        color: 'white',
                                        showConfirmButton: false,
                                        timer: 3000,
                                        timerProgressBar: true,
                                        didOpen: (toast) => {
                                            toast.onmouseenter = Swal.stopTimer;
                                            toast.onmouseleave = Swal.resumeTimer;
                                        }
                                    });
                                    Toast.fire({
                                        icon: data.message.indexOf("successfully") !== -1 ? 'success' : 'error',
                                        title: data.message
                                    });

                                    resolve(); // Resolve the outer Promise to prevent Swal from closing
                                })
                                .catch(error => {
                                    // Handle any errors
                                    console.error('Error:', error);

                                    Swal.update({
                                        title: 'An error occurred',
                                        icon: 'error',
                                        showConfirmButton: true,
                                        showCancelButton: false,
                                        allowOutsideClick: false,
                                        allowEscapeKey: false,
                                    });

                                    resolve(); // Resolve the outer Promise to prevent Swal from closing
                                });
                        }
                    });
                }
            });
        }
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-black">
                <div className="container-fluid mx-1">
                    <a className="navbar-brand d-lg-none" href="/">
                        <Logo />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <a className="navbar-brand d-none d-lg-block" href="/">
                            <Logo />
                        </a>
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
                        <div className='me-3 loginBtns'>
                            {
                                loginButton === "Logout" &&
                                <div className="dropdown-center me-4">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {JSON.parse(localStorage["user"]).firstName + " " + JSON.parse(localStorage["user"]).lastName}
                                        <img id="userIconLogin" src={userIcon} alt='user-icon' />
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="/favorites">Favorite Exercises</a></li>
                                        <li><button className="dropdown-item" onClick={handleLoginClick}>Log Out</button></li>
                                    </ul>
                                </div>
                            }
                            {
                                loginButton === "Login" &&
                                <Button id="loginBtn" classCss="btn btn-primary" text={loginButton} handleFunction={handleLoginClick} />
                            }
                            {
                                signUpButton &&
                                <Button id="signupBtn" classCss="btn btn-outline-light ms-3" text='SignUp' handleFunction={handleSignUp} />
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar
