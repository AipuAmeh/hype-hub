const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/config');

class Topic extends Model {}

Topic.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    topicName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
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
        fields: ['id'],
      },
    ],
  }
);

module.exports = Topic;
