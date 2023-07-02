const Topic = require('../models/topic');

const Achievement = require('../models/Achievement');

module.exports = {
  getDashboard: async (req, res) => {
    console.log('my get route');
    const rawTopics = await Topic.findAll({});
    const topics = rawTopics.map(topic => topic.get({ plain: true }));
    console.log(topics);
    // loop through each topic and get plain true
    res.render('dashboard', {
      welcomeMessage: `Welcome back to HypeHub ${req.session.currentUser.firstName}!`,
      isAuthenticated: req.session.isAuthenticated,
      topics,
    });
  },

  postDashboard: async (req, res) => {
    console.log('my post route');
    const newTopic = await Topic.create({
      ...req.body,
    });
    try {
      const topic = newTopic.get({ plain: true });
      console.log(topic);
      res.status(200).render('dashboard', {
        topicName: topic.topicName,
      });
    } catch (error) {
      res.status(500).JSON(error);
    }
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
