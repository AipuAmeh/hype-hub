const Achievement = require('../models/Achievement');

// * Used in 'getTopic' controller
const fetchAchievementsByTopic = async topic_id => {
  try {
    // * Query the database to fetch achievements for the specified topic
    const rawAchievements = await Achievement.findAll({
      where: {
        topic_id: topic_id,
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
