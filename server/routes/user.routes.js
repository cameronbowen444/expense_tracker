const UserController = require('../controllers/user.controller');
const {authenticateJwt} = require('../config/jwt.config');

module.exports = (app) => {
    app.get('/api/users', authenticateJwt, UserController.getLoggedInUser);
    app.post('/api/register', UserController.register);
    app.post('/api/login', UserController.login);
    app.post('/api/logout', UserController.logout);
}