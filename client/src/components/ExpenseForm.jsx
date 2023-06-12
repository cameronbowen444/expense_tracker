import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";


const ExpenseForm = (props) => {
    const [expense, setExpense] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [authError, setAuthError] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    const handleSubmitExpense = (e) => {
        e.preventDefault();
        const newExpense = {
            expense,
            description,
            amount,
        };
        axios
            .post("http://localhost:8000/api/new-expense", newExpense, {
                withCredentials: true,
            })
            .then((newExpense) => {
                setErrors({});
                setAuthError("");
                console.log(newExpense);
                navigate(-1);

            })
            .catch((err) => {
                console.log(err.response);
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
                navigate(-2);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return(
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <nav className="navbar navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand">Expense Tracker</a>
                    <form className='d-flex'>
                        <button onClick={logout} className='btn btn-outline-light'>Sign Out</button>
                    </form>
                </div>
            </nav>
            <div className="signin-body">
                <h1 className="head">Add New Expense</h1>
                <form onSubmit={handleSubmitExpense}>
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
                        <input className="form-control" step="any" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    <div class="d-grid gap-2">
                        <input className="btn btn-outline-primary btn1" type="submit" value="Add Expense" />
                    </div>
                </form>
            </div>
            <button className="btn btn-outline-primary btn3" onClick={() => { navigate(-1) }}>Home</button>
        </motion.div>
    )
}

export default ExpenseForm;