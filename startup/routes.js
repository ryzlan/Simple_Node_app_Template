const express = require('express')

//getting  routes
const genre= require('./routes/genre');
const home =require('./routes/home');
const movie= require('./routes/movie');
const rentals = require('./routes/rentals');
const customers = require('./routes/customers');
const users = require('./routes/users');
const auth= require('./routes/auth');

//getting error middleware
const error = require('../middleware/error')
//adding routing middleware
module.exports = function(app){
  app.use('/api/genres', genre);
  app.use('/' , home);
  app.use('/api/movies', movie  );
  app.use('/api/rentals' , rentals);
  app.use('/api/customers', customers );
  app.use('/api/users', users );
  app.use('/api/auth', auth );

// error handling after all routers 
  app.use(error);
}
