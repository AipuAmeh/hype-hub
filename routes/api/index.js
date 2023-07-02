const router = require('express').Router();
const { UserController } = require('../../controllers');

//Import new router
const getListRoutes = require('./getListRoutes');

const isAuthenticated = require('../../middleware/isAuthenticated');

// Existing routes
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', isAuthenticated, UserController.logout);

// New route
router.use('/list', getListRoutes);

module.exports = router;
