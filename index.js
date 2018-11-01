

//const debug = require('debug')('app:startup');
//const morgan = require('morgan');
const helmet = require('helmet');


const winston = require('winston')
const express = require('express');
const app = express();


//adding error handling and logging of error {should be first to import}
require('./startup/logging');

//database with mongoose
require('./startup/db')();

//JWT key checker
require('./startup/config');

//adding routes
require('./startup/routes')(app);

//adding Joi validation
require('./startup/joiValidation');


//setting View Engine
app.set('view engine' , 'pug' );
app.set('views' ,'./views' );



//middlewaring
app.use(express.json());// enables to use req.body json data
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());




// // configuration
// console.log("APPlication name :"+ config.get('name') );
// //console.log("MAil server :"+ config.get('mail.host') );
// //console.log("MAil password :"+ config.get('mail.password') );
//
// if(app.get('env') === 'developement'  ){
//   app.use(morgan('tiny'));
//   debug('Morgan freeman Freed ...');
// }

// set PORT =5000
//;then nodemon index.js
const port = process.env.PORT || 3000;
app.listen(port, () => winston.log(`Listening on port ${port}...`));
