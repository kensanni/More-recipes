import dotenv from 'dotenv';

dotenv.config();
module.exports = {
  development: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: null,
    password: null,
    database: null,
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  // production: {
  //   username: null;
  //   password: null;
  //   database: null;
  //   host: 127.0.0.1,
  //   dialect: postgres
  // }
}
