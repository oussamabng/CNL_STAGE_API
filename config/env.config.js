const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  PORT: process.env.PORT,
  JWT_ACCESS_KEY:process.env.JWT_ACCESS_KEY
};