// this backend is for a video streaming services where people can choose and add genre
const debug = require('debug')('app:startup');
const config= require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const logger = require('./middleware/logger');

const Joi = require('joi');
const express = require('express');
const app = express();

//setting View Engine
app.set('view engine' , 'pug' );
app.set('views' ,'./views' );



//middlewaring
app.use(express.json());// enables to use req.body json data
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use(logger);

// routing
const genre= require('./routes/genre');
const home =require('./routes/home')

app.use('/api/genres', genre);
app.use('/' , home)

// configuration
console
console.log("APPlication name :"+ config.get('name') );
//console.log("MAil server :"+ config.get('mail.host') );
//console.log("MAil password :"+ config.get('mail.password') );

if(app.get('env') === 'developement'  ){
  app.use(morgan('tiny'));
  debug('Morgan freeman Freed ...');
}

// set PORT =5000 ;then nodemon index.js
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
