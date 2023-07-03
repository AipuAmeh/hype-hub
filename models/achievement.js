const Achievement = require('../models/achievement');

module.exports = {
  //...rest of your methods...

  getAchievements: async (req, res) => {
    const topicName = req.params.topicName;
    const rawAchievements = await Achievement.findAll({
      where: { topicName: topicName },
    });
    const achievements = rawAchievements.map(achievement =>
      achievement.get({ plain: true })
    );
    res.json(achievements);
  },

  postAchievement: async (req, res) => {
    const newAchievement = await Achievement.create({
      ...req.body,
    });
    try {
      const achievement = newAchievement.get({ plain: true });
      res.status(200).json(achievement);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
