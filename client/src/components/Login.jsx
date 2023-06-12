import React, {useState} from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        const postData = {email, password};
        axios
            .post("http://localhost:8000/api/login", postData, {
                withCredentials: true
            })
            .then((res) => {
                console.log(res, "res");
                console.log(res.data, "is res data!");
                navigate(`/dashboard/${res.data.userLoggedIn}`);
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
            })
    };
    return(
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <div>
                <nav className="navbar navbar-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand">Expense Tracker</a>
                        <form className='d-flex'>
                            <Link className='btn btn-outline-light' to="/login">Sign In</Link>
                        </form>
                    </div>
                </nav>
            </div>
            <div className="signin-body">
                <h1 className="head">Login</h1>
                <form onSubmit={login}>
                    <p className="error-text">
                        { errorMessage ? errorMessage: ""}
                    </p>
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label for="floatingPassword" className="label">Password</label>
                    </div>
                    <div class="d-grid gap-2">
                        <input className="btn btn-outline-primary btn1" type="submit" value="Login" />
                    </div>
                    {/* <div className="mb-3">
                        <label className="form-label">Email Address:</label>
                        <input className="form-control" type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input className="form-control" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div class="d-grid gap-2">
                        <input className="btn btn-outline-primary btn1" type="submit" value="Login" />
                    </div> */}
                </form>
                <div>don't have an account?</div>
                <Link to={"/register"}>Register</Link>
            </div>
            <Link to="/">Home</Link>
        </motion.div>
    );
}

export default Login;