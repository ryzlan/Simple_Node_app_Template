const config = require('config')
//check to see if config is loaded or not with the env variable
module.exports= function(){
  if(!config.get('jwtPrivateKey')){
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined')
    process.exit(1);
  }
}
