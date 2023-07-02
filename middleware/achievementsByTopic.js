const Achievement = require('../models/Achievement');

const fetchAchievementsByTopic = async topic_name => {
  try {
    // * Query the database to fetch achievements for the specified topic
    const rawAchievements = await Achievement.findAll({
      where: {
        topic_name: topic_name,
      },
    });
    const achievements = rawAchievements.map(achievement =>
      achievement.get({ plain: true })
    );

    return achievements;
  } catch (error) {
    console.error('Error fetching achievements:', error);
    throw error;
  }
};

module.exports = fetchAchievementsByTopic;
