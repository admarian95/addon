import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
const Login = () => {

    const [isLoggedIn, setLogin] = useState(false);

    const checkCred = () => {
        let email = document.getElementById('email');
        let password = document.getElementById('password');
        let ip = document.querySelectorAll('input');
        let baseUrl = 'http://localhost:3000';
        email = email.value;
        password = password.value;
        console.log(password)
        fetch(baseUrl + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then(res => res.json()).then(data => {
            console.log(data);
            if (data.message) {
                alert(data.message)
            }
            else if (data.message === undefined) {
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('loggedIn',true);
                setLogin(true);
            }
            Array.from(ip).forEach(el => {
                el.value = '';
            });
        }).catch(err => alert(err));
    }
    const submit = (e) => {
        e.preventDefault();
        let btn = document.getElementById('login');
        let forgotPassword = document.getElementById('forgotPassword');
        forgotPassword.addEventListener('click', () => window.location.href = 'https://peaceful-austin-ecaea1.netlify.app');
        checkCred();
    }

    useEffect(()=>{
        sessionStorage.getItem('loggedIn') === 'true' && setLogin(true);
    },[])
    return (
        <>
            {!isLoggedIn ? (
                <form onSubmit={submit}>
                    <div class="container">
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input type="email" class="form-control" id="email" placeholder="Enter email" />
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" placeholder="Enter Password" />
                        </div>
                        <button type="submit" id="login" class="btn btn-primary">Login</button>
                        <Link type="button" id="forgotPassword" to ='/forgotPassword' class="btn btn-danger">Forgot Password </Link>
                    </div>
                </form>
            ):(
                <div>
                <h1>Logged In!</h1>
                <button className="btn btn-success " onClick={()=>{
                    sessionStorage.setItem('loggedIn','false');
                    setLogin(false);
                    }}> Logout!</button>
                </div>
            )}
        </>
    )
}

export default Login