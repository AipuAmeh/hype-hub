const Topic = require('../models/Topic');
const Achievement = require('../models/Achievement');
const fetchAchievementsByTopic = require('../middleware/achievementsByTopic');

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
      res.status(201).render('dashboard', {
        topicName: topic.topicName,
      });
    } catch (error) {
      res.status(500).JSON(error);
    }
  },

  getTopic: async (req, res) => {
    const topicName = req.params.topicName;
    const achievements = await fetchAchievementsByTopic(topicName);
    console.log(achievements);
    res.render('topic', {
      topicName,
      isAuthenticated: req.session.isAuthenticated,
      achievements,
    });
  },

  postAchievement: async (req, res) => {
    console.log('my post route', req.body);
    try {
      const newAchievement = await Achievement.create({
        date: req.body.date,
        subject: req.body.subject,
        description: req.body.description,
        topic_name: req.body.topicName,
      });
      const achievement = newAchievement.get({ plain: true });
      console.log(achievement);
      res.status(201).render('topic', {
        date: achievement.date,
        subject: achievement.subject,
        description: achievement.description,
        topic_name: achievement.topicName,
      });
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  },
};
