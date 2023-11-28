// sequelize-config.js

require('dotenv').config();

module.exports = {
  development: {
    dialect: 'postgres', // Default to MySQL if not specified
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
  },
  test: {
    // Test environment configuration
  },
  production: {
    // Production environment configuration
  },
};
