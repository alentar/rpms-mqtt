require('dotenv').config() // load .env file

module.exports = {
  port: process.env.PORT,
  host: process.env.HOST,
  env: process.env.NODE_ENV,
  mongo: {
    uri: process.env.MONGOURI
  }
}
