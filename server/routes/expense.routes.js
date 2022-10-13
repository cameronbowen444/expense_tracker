const ExpenseController = require('../controllers/expense.controller');
const {authenticateJwt} = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api/all-expenses', authenticateJwt, ExpenseController.getAllExpenses);
    app.get('/api/expense/:id', authenticateJwt, ExpenseController.findOneExpense);
    app.get('/api/expenses/:username', authenticateJwt, ExpenseController.findAllExpensesByUser);
    app.post('/api/new-expense', authenticateJwt, ExpenseController.createExpense);
    app.delete("/api/expenses/:id", ExpenseController.deleteOneExpense);
    app.put("/api/expense/:id", authenticateJwt, ExpenseController.updateExpense)
}