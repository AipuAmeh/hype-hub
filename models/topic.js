const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/config');

class Topic extends Model {}

Topic.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    topicName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'Topic',
    indexes: [
      {
        fields: ['topic_name'],
      },
    ],
  }
);

module.exports = Topic;
