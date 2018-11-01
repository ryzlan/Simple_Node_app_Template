const winston = require('winston');

module.exports = function(err, req, res,next){
    //winston.log("logging levels") or winston.error>>  short hand
    winston.error(err.message , err );
    // logging levels
    // error
    // warn
    // info
    // verbose
    // debug
    // silly

    res.status(500).send("Something failed");
}
