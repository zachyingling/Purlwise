var dotenv = require("dotenv");
dotenv.config();

module.exports = {
  ravAccessKey: process.env.RAVELRY_ACCESS,
  ravPersonalKey: process.env.RAVELRY_PERSONAL,
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET
};
