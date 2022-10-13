import React, {useState} from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        const postData = {email, password};
        axios
            .post("http://localhost:8000/api/login", postData)
            .then((res) => {
                console.log(res, "res");
                console.log(res.data, "is res data!");
                navigate(`/dashboard/${res.data.userLoggedIn}`);
                return;
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
            })
    };
    return(
        <div>
            <nav className="navbar navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand">Expense Tracker</a>
                    <form className='d-flex'>
                        <Link className='btn btn-outline-light' to="/login">Sign In</Link>
                    </form>
                </div>
            </nav>
            <div className="signin-body">
                <h1 className="head">Login</h1>
                <form onSubmit={login}>
                    <p className="error-text">
                        { errorMessage ? errorMessage: ""}
                    </p>
                    <div className="mb-3">
                        <label className="form-label">Email Address:</label>
                        <input className="form-control" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input className="form-control" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <input className="btn1" type="submit" value="Login" />
                </form>
                <div>don't have an account?</div>
                <Link to={"/register"}>Register</Link>
            </div>
        </div>
    );
}

export default Login;