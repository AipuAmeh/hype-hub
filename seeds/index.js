/* eslint-disable no-unused-vars */
const sequelize = require('../db/config');
const { User, Topic, Achievement } = require('../models');

const userSeeds = require('./users.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userSeeds, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
