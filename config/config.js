/* eslint-disable */
const dotenv = require('dotenv');
const path = require('path');
/* eslint-enable */

const env = process.env.NODE_ENV;
let envPath;

switch (env) {
  case 'production':
    envPath = path.resolve(__dirname, '../dotenv/prod.env');
    break;

  case 'development':
    envPath = path.resolve(__dirname, '../dotenv/dev.env');
    break;

  case 'test':
    envPath = path.resolve(__dirname, '../dotenv/test.env');
    break;

  case 'heroku':
    break;

  default:
    break;
}

if (envPath) dotenv.config({ path: envPath });

let config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_CONNECTOR,
  define: {
    underscored: false,
  },
  pool: { max: 5, min: 0, idle: 10000 },
};

if (env === 'production') {
  config = {
    ...config,
    dialectOptions: {
      ssl: {},
    }
  };
}

module.exports = config;
