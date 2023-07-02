const router = require('express').Router();
const { UserController, PageController } = require('../../controllers');

const isAuthenticated = require('../../middleware/isAuthenticated');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', isAuthenticated, UserController.logout);
router.post('/topic', PageController.postAchievement);
router.post('/dashboard', PageController.postDashboard);

module.exports = router;
