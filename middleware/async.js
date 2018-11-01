//handle error function
module.exports = function (handler){
    return async (req, res,next) =>{
      try{
        await handler(req, res);
      }
      catch(ex){
       // to centrally handle error we pass it to the middleware in index
       next(ex);
      }
    }
  }


  // this is one way of handling eror
//  using a custom middleware to handle error

  // //importing middleware to handle async middleware to handle error  add this to all router to handle error
  // const asyncMiddleware = require('../middleware/async');
  //
  //
  //
  // //GET the data from the database
  // router.get('/',asyncMiddleware(async (req, res , next) => {
  //     const genres = await Genre.find().sort('name')
  //     res.send(genres);
  // }));
