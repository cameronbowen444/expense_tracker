import React from "react";
import { Routes, Route } from 'react-router-dom';
import MainPage from "./MainPage";
import Expenses from './Expenses';
import ExpenseForm from './ExpenseForm';
import EditExpense from './EditExpense';
import Login from './Login';
import Register from './Register';
import GetExpense from './GetExpense';
import {AnimatePresence} from 'framer-motion';
function AnimatedRoutes() {
    var isLoggedIn = localStorage.getItem("userToken");
    return (
        <AnimatePresence>
            
            <Routes>
                <Route path="/" element={<MainPage/>} />
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/dashboard/:username' element={<Expenses/>} />
                <Route path='/new-expense' element={<ExpenseForm/>} />
                <Route path='/edit-expense/:id' element={<EditExpense/>} />
                <Route path='/expense/:id' element={<GetExpense/>} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes;