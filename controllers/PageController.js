const Topic = require('../models/topic');

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
};
