const UserController = require('../controllers/user.controller');
const {authenticateJwt} = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api/users', authenticateJwt, UserController.getLoggedInUser);
    app.post('/api/register', authenticateJwt, UserController.register);
    app.post('/api/login', authenticateJwt, UserController.login);
    app.post('/api/logout', authenticateJwt, UserController.logout);
}