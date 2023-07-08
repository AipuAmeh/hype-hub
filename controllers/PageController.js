/* eslint-disable no-unused-vars */
const Topic = require('../models/Topic');
const Achievement = require('../models/Achievement');
const { DataTypes } = require('sequelize');

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

  postTopic: async (req, res) => {
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
      res.status(200).json(topic);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },

  // * Topic controllers
  getTopic: async (req, res) => {
    try {
      const rawTopic = await Topic.findOne({
        where: {
          topicName: req.params.topicName,
          user_id: req.session.currentUser.id,
        },
        include: [{ model: Achievement }],
      });
      const topic = rawTopic.get({ plain: true });
      const topicName = topic.topicName;
      const topicId = topic.id;
      const achievements = topic.Achievements;
      res.render('topic', {
        topicName,
        topicId,
        achievements,
        isAuthenticated: req.session.isAuthenticated,
      });
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  },

  postAchievement: async (req, res) => {
    const topic = await Topic.findOne({
      where: {
        topic_name: req.params.topicName,
        user_id: req.session.currentUser.id,
      },
    });
    const topicId = topic.dataValues.id;
    try {
      const newAchievement = await Achievement.create({
        id: DataTypes.UUIDV4,
        date: req.body.date,
        subject: req.body.subject,
        description: req.body.description,
        img_url: req.body.imgUrl === '' ? null : req.body.imgUrl,
        topic_id: topicId,
      });
      const achievement = newAchievement.get({ plain: true });
      res.status(201).render('topic', {
        date: achievement.date,
        subject: achievement.subject,
        description: achievement.description,
        img_url: achievement.imgUrl,
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
      res.status(200).json(achievement);
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },
};
