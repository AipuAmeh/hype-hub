const Topic = require('../models/Topic');
const Achievement = require('../models/Achievement');
const fetchAchievementsByTopic = require('../helpers/achievementsByTopic');

module.exports = {
  getDashboard: async (req, res) => {
    const rawTopics = await Topic.findAll({
      where: {
        user_id: `${req.session.currentUser.id}`,
      },
    });
    const topics = rawTopics.map(topic => topic.get({ plain: true }));
    // * loop through each topic and get plain true
    res.render('dashboard', {
      welcomeMessage: `Welcome back to HypeHub ${req.session.currentUser.firstName}!`,
      isAuthenticated: req.session.isAuthenticated,
      topics,
    });
  },

  postDashboard: async (req, res) => {
    const userId = `${req.session.currentUser.id}`;
    const newTopic = await Topic.create({
      user_id: userId,
      topicName: req.body.topicName,
    });
    try {
      const topic = newTopic.get({ plain: true });
      res.status(201).render('dashboard', {
        topicName: topic.topicName,
      });
    } catch (error) {
      res.status(500).JSON(error);
    }
  },

  getTopic: async (req, res) => {
    const topic = await Topic.findByPk(req.params.id);
    const topicName = topic.topicName;
    const topicId = req.params.id;
    console.log('>>>> these >>>', topic, topicName);
    const achievements = await fetchAchievementsByTopic(topicId);
    // console.log(topic, topicName, topicId, achievements);
    res.render('topic', {
      topicName,
      topicId,
      isAuthenticated: req.session.isAuthenticated,
      achievements,
    });
  },

  postAchievement: async (req, res) => {
    const topic = await Topic.findAll({
      where: {
        topicName: `${req.params.id}`,
      },
    });
    const topicId = topic[0].dataValues.id;
    try {
      const newAchievement = await Achievement.create({
        date: req.body.date,
        subject: req.body.subject,
        description: req.body.description,
        topic_id: topicId,
      });
      const achievement = newAchievement.get({ plain: true });
      res.status(201).render('topic', {
        date: achievement.date,
        subject: achievement.subject,
        description: achievement.description,
        topic_id: achievement.topic_id,
      });
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  },
};
