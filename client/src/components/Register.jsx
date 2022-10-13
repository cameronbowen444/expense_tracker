import React, {useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
                <h1 className="head">Register</h1>
                {confirmReg ? <h3 style={{color: "green"}}>{confirmReg}</h3>: null}
                <form onSubmit={register}>
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input 
                            className="form-control"
                            type="text"
                            name="firstName"
                            value={user.firstName}
                            onChange={(e) => handleChange(e)} 
                        />
                        {errors.firstName ? (
                            <span className="error-text">
                                {errors.firstName.message}
                            </span>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name:</label>
                        <input 
                            className="form-control"
                            type="text"
                            name="lastName"
                            value={user.lastName}
                            onChange={(e) => handleChange(e)} 
                        />
                        {errors.lastName ? (
                            <span className="error-text">
                                {errors.lastName.message}
                            </span>
                        ): null}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email Address:</label>
                        <input 
                            className="form-control"
                            type="text"
                            name="email"
                            value={user.email}
                            //short hand
                            onChange={handleChange} 
                        />
                        {errors.email ? (
                            <span className="error-text">
                                {errors.email.message}
                            </span>
                        ): null}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Username:</label>
                        <input 
                            className="form-control"
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleChange} 
                        />
                        {errors.username ? (
                            <span className="error-text">
                                {errors.username.message}
                            </span>
                        ): null}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input 
                            className="form-control"
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange} 
                        />
                        {errors.password ? (
                            <span className="error-text">
                                {errors.password.message}
                            </span>
                        ): null}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password:</label>
                        <input 
                            className="form-control"
                            type="password"
                            name="confirmPassword"
                            value={user.confirmPassword}
                            onChange={handleChange} 
                        />
                        {errors.confirmPassword ? (
                            <span className="error-text">
                                {errors.confirmPassword.message}
                            </span>
                        ): null}
                    </div>
                    <input className="btn1" type="submit" value="Register" />
                </form>
                <div>Already have an account?</div>
                <Link to={"/login"}>Login</Link>
            </div>
        </div>
    );
}

export default Register;