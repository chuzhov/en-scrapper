const { Sequelize } = require('sequelize');
const logger = require('../config/logger.config');

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

// Test connection
async function testDBConnection() {
  try {
    await sequelize.authenticate();
    logger.info('Connection has been established successfully.');
    return true;
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    return false;
  }
}

module.exports = {
  sequelize, // Export the Sequelize instance
  testDBConnection, // Export the testConnection function
};
