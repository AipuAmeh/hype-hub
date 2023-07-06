const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/config');

class Achievement extends Model {}

Achievement.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    topic_id: {
      type: DataTypes.UUID,
      references: {
        model: 'topics',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: 'Achievement',
  }
);

module.exports = Achievement;
