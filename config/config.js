require("dotenv").config();
module.exports = {
  development: {
    // eslint-disable-next-line prettier/prettier
    "username": process.env.DB_USER,
    // eslint-disable-next-line prettier/prettier
    "password": process.env.DB_PASS,
    // eslint-disable-next-line prettier/prettier
    "database": process.env.DB_DATABASE,
    // eslint-disable-next-line prettier/prettier
    "host": process.env.DB_HOST,
    // eslint-disable-next-line prettier/prettier
    "port": 3306,
    // eslint-disable-next-line prettier/prettier
    "dialect": "mysql"
  },
  // eslint-disable-next-line prettier/prettier
  "production": {
    // eslint-disable-next-line prettier/prettier
    "use_env_variable": "JAWSDB_URL",
    // eslint-disable-next-line prettier/prettier
    "dialect": "mysql"
  }
};
