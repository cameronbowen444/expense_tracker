const Expense = require('../models/expense.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports = {

    getAllExpenses: (req, res) => {
        Expense.find()
            .populate("user_id")
            .then((allExpenses) => {
                console.log(allExpenses);
                res.json(allExpenses);
            })
            .catch((err) => {
                console.log("Couldn't get all Expenses!");
                res.json({ message: "Something went wrong in finding all expenses", error: err});
            })
    },

    createExpense: (req, res) => {
        const newExpenseObject = new Expense(req.body);

        const decodedJWT = jwt.decode(req.cookies.userToken, {
            complete: true
        })
        newExpenseObject.user_id = decodedJWT.payload.id;
        
        newExpenseObject.save()

            .then((newExpense) => {
                console.log(newExpense);
                res.json(newExpense);
            })
            .catch((err) => {
                console.log("Something went wrong!");
                res.status(400).json(err);
            })
    },

    deleteOneExpense: (req, res) => {
        Expense.deleteOne({_id: req.params.id})
            .then((deletedExpense) => {
                console.log(deletedExpense);
                res.json(deletedExpense);
            })
            .catch((err) => {
                console.log("delete one expense failed");
                res.json({message: "Something went wrong when deleting an expense", error: err})
            })
    },

    updateExpense: (req, res) => {
        Expense.findOneAndUpdate({_id: req.params.id},
            req.body,
            {new: true, runValidators: true}
            )
            .then((updatedExpense) => {
                console.log(updatedExpense);
                res.json(updatedExpense);
            })
            .catch((error)=> {
                console.log("Something went wrong when updating Updating Category");
                res.status(400).json(error);
            })
    },

    findOneExpense: (req, res) => {
        Expense.findOne({_id: req.params.id})
            .then((foundExpense) => {
                console.log(foundExpense);
                res.json(foundExpense);
            })
            .catch((err) => {
                conosle.log("Something went wrong when getting this Expense!");
                res.json({ message: "Something went wrong when getting this Expense!", error: err})
            })
    },

    findAllExpensesByUser: (req, res) => {

        if(req.jwtpayload.username !== req.params.username) {
            console.log("not the user!");

            User.findOne({username: req.params.username})
                .then((userNotLoggedIn) => {
                    Expense.find({user_id: userNotLoggedIn._id})
                    .populate("user_id", "username")
                    .then((allExpensesFromUser) => {
                        console.log(allExpensesFromUser);
                        res.json(allExpensesFromUser);
                    })
                })
                .catch((error)=> {
                    console.log(error);
                    res.status(400).json(error);
                })
        }
        else{
            console.log("current user")
            console.log("req.jwtpayload.id", req.jwtpayload.id);
            Expense.find({ user_id: req.jwtpayload.id })
                .populate("user_id", "username")
                .then((allExpensesFromUser) => {
                    console.log(allExpensesFromUser);
                    res.json(allExpensesFromUser);
                })
                .catch((error) => {
                    console.log(error);
                    res.status(400).json(error);
                })
        }
    }


}

// const createExpense = async (req, res) => {
//     const { body, params } = req;
//     console.log(body, params);
//     let newExpense = new Expense(body);

//     console.log("Expense doc after adding category id", newExpense);
    
//     try{
//         newExpense = await newExpense.save();
//         res.json(newExpense);
//         return;
//     } catch(error){
//         console.log("error!", error);
//         res.status(400).json(error);
//         return;
//     }
// }

// const getAllExpenses = async (req, res) => {
//     try{
//         const allExpenses = await Expense.find()
//         console.log(allExpenses);
//         res.json(allExpenses);
//     } catch(error) {
//         res.status(400).json(error);
//     }
// }

// module.exports = { createExpense, getAllExpenses }