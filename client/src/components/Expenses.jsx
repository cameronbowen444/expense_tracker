import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import moment from 'moment';


const Expenses = (props) => {
    const [allExpenses, setAllExpenses] = useState([]);

    const [authError, setAuthError] = useState("");
    const [errors, setErrors] = useState({});

    const {username} = useParams();

    const navigate = useNavigate();

    const logout = () => {
        axios
            .post("http://localhost:8000/api/logout",{}, {
                withCredentials: true
            })
            .then((res) => {
                console.log(res.data);
                navigate(-1);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/expenses/${username}`,{
            withCredentials: true
        })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setAllExpenses(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    
    const deleteExpense = (expenseId) => {
        axios.delete(`http://localhost:8000/api/expenses/${expenseId}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setAllExpenses(allExpenses.filter(expenses => expenses._id !== expenseId))
            })
            .catch((err) => {
                console.log(err);
            })
    }

    let sum = allExpenses.reduce(function(prev, allExpenses) {
        return prev + +allExpenses.amount
    }, 0);
    console.log(sum);

    let sumCol = 0;
    let count = 0;
    const sumCollection = (a, b) => a + b;

    allExpenses.forEach((allExpenses) => {
        sumCol = sumCollection(sumCol, allExpenses);
        count++;
    }, {});
    console.log(sumCol);
    console.log(count);


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
            <div className="row justify-content-between row1">
                <div className="col-4">
                    <h1>All Expenses:</h1>
                </div>
                <div className="col-4">
                    <Link className="btn btn-outline-primary" to={'/new-expense'}>Add Expense</Link>
                </div>
            </div>
            <div className="dash-body">
                <table className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Expense</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Created</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="table-secondary">
                        {
                            allExpenses.map((expenses, index) => {
                                return(
                                    <tr key={expenses._id}>
                                        <td>{expenses.expense}</td>
                                        <td>{expenses.amount}</td>
                                        <td>{moment(expenses.createdAt).format('MMMM Do YYYY')}</td>
                                        <td>
                                            <Link to={`/expense/${expenses._id}`} className="btn btn-outline-primary btn2">Show</Link>
                                            <Link to={`/edit-expense/${expenses._id}`} className="btn btn-outline-success btn2">Edit</Link>
                                            <button onClick={() => deleteExpense(expenses._id)} className="btn btn-outline-danger">Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <h3 className="total">All Expenses: <span className="variable">{count}</span></h3>
                <h3 className="total">Total Sum Of Expenses: <span className="variable">{sum.toFixed(2)}</span></h3>
            </div>
        </div>
    );
};

export default Expenses;