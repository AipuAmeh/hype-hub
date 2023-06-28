module.exports = {
  getDashboard: (req, res) => {
    res.render('dashboard', {
      welcomeMessage: `Welcome back to HypeHub ${req.session.currentUser.firstName}!`,
      isAuthenticated: req.session.isAuthenticated,
    });
  },
};
