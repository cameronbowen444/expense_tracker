import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from 'react-router-dom';
import moment from 'moment';
import { motion } from "framer-motion";
const GetExpense = (props) => {

    const [expense, setExpense] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    const [allExpenses, setAllExpenses] = useState([]);

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
            setCreatedAt(res.data.createdAt);
            setUpdatedAt(res.data.updatedAt);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [id])

    const logout = (e) => {
        axios
            .post("http://localhost:8000/api/logout", {}, {
                withCredentials: true
            }
            )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate(-2);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const deleteExpense = (expenseId) => {
        axios.delete(`http://localhost:8000/api/expenses/${expenseId}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setAllExpenses(allExpenses.filter(expenses => expenses._id !== expenseId))
                navigate(-1);
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
            <h1 className="head head1">Expense: {expense}</h1>
            <dl className=" signin-body text-bod row row2">
                <h3 className="col-sm-3">Description</h3>
                <dd className="col-sm-9">{description}</dd>

                <h3 className="col-sm-3">Amount</h3>
                <dd className="col-sm-9">{amount}</dd>

                <h3 className="col-sm-3">Created</h3>
                <dd className="col-sm-9">{moment(createdAt).format('MMMM Do YYYY')}</dd>

                <h3 className="col-sm-3">Updated</h3>
                <dd className="col-sm-9">{moment(updatedAt).format('MMMM Do YYYY')}</dd>
                <div className="btns">
                    <Link to={`/edit-expense/${id}`} className="btn btn-outline-success btn2">Edit</Link>
                    <button onClick={() => deleteExpense(id)} className="btn btn-outline-danger">Delete</button>
                </div>
            </dl>
            <button className="btn btn-outline-primary btn3" onClick={() => { navigate(-1) }}>Home</button>
        </motion.div>
    );
};

export default GetExpense;