const Topic = require('../models/Topic');
const Achievement = require('../models/Achievement');
const fetchAchievementsByTopic = require('../helpers/achievementsByTopic');

module.exports = {
  // *Dashboard controllers
  getDashboard: async (req, res) => {
    const rawTopics = await Topic.findAll({
      where: {
        user_id: `${req.session.currentUser.id}`,
      },
    });
    const topics = rawTopics.map(topic => topic.get({ plain: true }));
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

  deleteTopic: async (req, res) => {
    try {
      const topic = await Topic.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).JSON(topic);
    } catch (error) {
      res.status(500).JSON(error);
    }
  },

  // * Topic controllers
  getTopic: async (req, res) => {
    const topic = await Topic.findByPk(req.params.id);
    const topicName = topic.topicName;
    const topicId = req.params.id;
    const achievements = await fetchAchievementsByTopic(topicId);
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
        user_id: `${req.session.currentUser.id}`,
        topic_name: `${req.params.id}`,
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

  deleteAchievement: async (req, res) => {
    try {
      const achievement = await Achievement.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).JSON(achievement);
    } catch (error) {
      res.status(500).JSON(error);
    }
  },
};
