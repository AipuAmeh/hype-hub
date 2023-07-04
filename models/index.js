const User = require('./User');
const Topic = require('./Topic');
const Achievement = require('./Achievement');

User.hasMany(Topic, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Topic.belongsTo(User, {
  foreignKey: 'user_id',
});

Topic.hasMany(Achievement, {
  foreignKey: 'topic_id',
});

Achievement.belongsTo(Topic, {
  foreignKey: 'topic_id',
});

module.exports = {
  User,
};
