const mongoose = require("mongoose");
const ExpenseSchema = new mongoose.Schema({
    expense: {
        type: String,
        required: [true, "Expense name is required!"],
        minlength: [3, "Expense Name must be at least 3 characters!"]
    },
    description: {
        type: String,
        required: [true, "description is required!"],
        minlength: [3, 'Description must be at least 3 characters!']
    },
    amount: {
        type: String,
        required: [true, "Amount is required!"],
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, {timestamps: true})


module.exports = mongoose.model("Expense", ExpenseSchema);
