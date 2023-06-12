import React, {useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const Register = () => {

    const [confirmReg, setConfirmReg] = useState("");
    const [errors, setErrors] = useState({});

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    
    const register = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/register",
            user,
            {
                withCredentials: true
            })
            .then((res) => {
                console.log(res.data);
                setUser({
                    firstName: "",
                    lastName: "",
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
                setConfirmReg(
                    "Thank you for Registering, you can log in!"
                );
                setErrors({});
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors);
            })

    }

    return(
        <motion.div 
            initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
        >
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
                <h1 className="head">Register</h1>
                {confirmReg ? <h3 style={{color: "green"}}>{confirmReg}</h3>: null}
                <form onSubmit={register}>
                    {/* <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label for="floatingPassword">Password</label>
                    </div> */}
                    <div className="form-floating mb-3">
                        <input 
                            className="form-control"
                            type="text"
                            id="floatingInput" placeholder="name@example.com"
                            name="firstName"
                            value={user.firstName}
                            onChange={(e) => handleChange(e)} 
                        />
                        <label for="floatingInput" className="form-label">First Name</label>
                        {errors.firstName ? (
                            <span className="error-text">
                                {errors.firstName.message}
                            </span>
                        ) : null}
                    </div>
                    <div className="form-floating mb-3">
                        <input 
                            className="form-control"
                            type="text"
                            id="floatingInput" placeholder="name@example.com"
                            name="lastName"
                            value={user.lastName}
                            onChange={(e) => handleChange(e)} 
                        />
                        <label for="floatingInput"  className="form-label">Last Name</label>
                        {errors.lastName ? (
                            <span className="error-text">
                                {errors.lastName.message}
                            </span>
                        ): null}
                    </div>
                    <div className="form-floating mb-3">
                        <input 
                            className="form-control"
                            type="text"
                            id="floatingInput" placeholder="name@example.com"
                            name="email"
                            value={user.email}
                            //short hand
                            onChange={handleChange} 
                        />
                        <label for="floatingInput" className="form-label">Email Address</label>
                        {errors.email ? (
                            <span className="error-text">
                                {errors.email.message}
                            </span>
                        ): null}
                    </div>
                    <div className="form-floating mb-3">
                        <input 
                            className="form-control"
                            type="text"
                            id="floatingInput" placeholder="name@example.com"
                            name="username"
                            value={user.username}
                            onChange={handleChange} 
                        />
                        <label for="floatingInput" className="form-label">Username</label>
                        {errors.username ? (
                            <span className="error-text">
                                {errors.username.message}
                            </span>
                        ): null}
                    </div>
                    <div className="form-floating mb-3">
                        <input 
                            className="form-control"
                            type="password"
                            id="floatingInput" placeholder="name@example.com"
                            name="password"
                            value={user.password}
                            onChange={handleChange} 
                        />
                        <label for="floatingPassword" className="form-label">Password</label>
                        {errors.password ? (
                            <span className="error-text">
                                {errors.password.message}
                            </span>
                        ): null}
                    </div>
                    <div className="form-floating mb-3">
                        <input 
                            className="form-control"
                            type="password"
                            id="floatingInput" placeholder="name@example.com"
                            name="confirmPassword"
                            value={user.confirmPassword}
                            onChange={handleChange} 
                        />
                        <label for="floatingPassword" className="form-label">Confirm Password</label>
                        {errors.confirmPassword ? (
                            <span className="error-text">
                                {errors.confirmPassword.message}
                            </span>
                        ): null}
                    </div>
                    <div class="d-grid gap-2">
                        <input className="btn btn-outline-primary btn1" type="submit" value="Register" />
                    </div>
                </form>
                <div>Already have an account?</div>
                <Link to="/login">Login</Link>
            </div>
            <Link to="/">Home</Link>
        </motion.div>
    );
}

export default Register;