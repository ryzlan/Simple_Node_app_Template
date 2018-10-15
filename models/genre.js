const mongoose= require('mongoose');
const Joi = require('joi');

//Creating the schema of the data
const genreSchema = new mongoose.Schema({
  name:{
    type    : String ,
    required: true ,
    minlength:5 ,
    maxlength:50
  }
});

// creatiing a model
const Genre = mongoose.model('Genre', genreSchema );


function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
  // result ={ error : null , value : has the data oibj }
}


exports.Genre= Genre;
exports.validateGenre = validateGenre;
