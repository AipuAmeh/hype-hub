const Achievement = require('../models/Achievement');

module.exports = {
  getDashboard: (req, res) => {
    res.render('dashboard', {
      welcomeMessage: `Welcome to the dashboard ${req.session.currentUser.firstName}!`,
      isAuthenticated: req.session.isAuthenticated,
    });
  },

  getTopic: async (req, res) => {
    const rawAchievements = await Achievement.findAll({});
    const achievements = rawAchievements.map(achievement =>
      achievement.get({ plain: true })
    );
    // console.log(achievements);
    res.render('topic', {
      topicName: 'Work',
      // isAuthenticated: req.session.isAuthenticated,
      achievements,
    });
  },

  postAchievement: async (req, res) => {
    console.log('my post route');
    try {
      const newAchievement = await Achievement.create({
        ...req.body,
      });
      const achievement = newAchievement.get({ plain: true });
      console.log(achievement);
      res.status(200).render('topic', {
        date: achievement.date,
        subject: achievement.subject,
        description: achievement.description,
      });
    } catch (error) {
      res.status(500).JSON(error);
    }
  },
};
