// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
