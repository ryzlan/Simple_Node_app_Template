const winston = require('winston')
const mongoose = require ('mongoose')

module.exports = function(){
  mongoose.connect('mongodb://localhost:27017/vidly' , { useNewUrlParser: true })  // creates a collection named vidly
          .then(() => {winston.info("Connected to mongodb")})
          .catch((err) => {winston.error('Could not connect to mongodb')})
}

// instead of using console,to log files we use winston to log the errors and info
