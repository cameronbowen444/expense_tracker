import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from 'react-router-dom';


const EditExpense = (props) => {

    const [expense, setExpense] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [authError, setAuthError] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/expense/${id}`, {
            withCredentials: true
        })
        .then((res) => {
            console.log(res);
            console.log(res.data);
            setExpense(res.data.expense);
            setDescription(res.data.description);
            setAmount(res.data.amount);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [id])

    const submitEditExpense = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/expense/${id}`, {
            expense, 
            description,
            amount
        }, {withCredentials: true})
        .then((res) => {
            setErrors({});
            setAuthError("");
            console.log(res);
            console.log(res.data);
            navigate(-1);
        })
        .catch((err) => {
            console.log(err);
            if (err.response.status === 401) {
                setAuthError("You must be logged in to do that!");
            } else{
                setErrors(err.response.data.errors);
            }
        })
    }

    const logout = (e) => {
        axios.post("http://localhost:8000/api/logout", {}, {
            withCredentials: true
        })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate(-3);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return(
        <div>
            <nav className="navbar navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand">Expense Tracker</a>
                    <form className='d-flex'>
                        <button onClick={logout} className='btn btn-outline-light'>Sign Out</button>
                    </form>
                </div>
            </nav>
            <div className="signin-body">
                <h1 className="head">Edit Expense</h1>
                <form onSubmit={submitEditExpense}>
                    <div className="mb-3">
                        {errors.expense ? (
                            <span className="error-text">
                                {errors.expense.message}
                            </span>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Expense Name:</label>
                        <input className="form-control" type="text" value={expense} onChange={(e) => setExpense(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        {errors.description ? (
                            <span className="error-text">
                                {errors.description.message}
                            </span>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Expense Description:</label>
                        <input className="form-control" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        {errors.amount ? (
                            <span className="error-text">
                                {errors.amount.message}
                            </span>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Expense Amount:</label>
                        <input className="form-control" type="number" step="any" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    <button className="btn1" type="submit">Submit</button>
                </form>
            </div>
            <button className="btn btn-outline-primary btn3" onClick={() => { navigate(-1) }}>Home</button>
        </div>
    )
}

export default EditExpense;