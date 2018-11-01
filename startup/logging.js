//handles logging of errors {default logger}


const winston =require('winston');
//helps to save in mongodb
require('winston-mongodb');
//handles errors automatically without any handling alternate approach
require('express-async-errors');


// //creating a transport of file for winston logger
// winston.add(winston.transports.File , {filename:"Loggfile.log"});
module.exports = function(){
  winston.handleExceptions(
    //handles uncaughtException in the node env
    new winston.transports.Console({ colorize: true , prettyPrint : true }),
    new winston.transports.File({filename:'uncaughtException.log'})
  );

//handling node rejections "just throwing it "
  process.on('unhandledRejection' ,(ex)=>{
    throw ex ;
  });


// logging all other info level details in a file and the database

  winston.add(winston.transports.File ,{filename: 'Logfile.log'});
  winston.add(winston.transports.MongoDB,{
    db:'mogodb://localhost/vidly',
    level:'info'
  });
}
