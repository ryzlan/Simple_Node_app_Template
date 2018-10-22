const mongoose= require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config')
//Creating the schema of the data
const UserSchema = new mongoose.Schema({
  name:{
    type    : String ,
    required: true ,
    minlength:5 ,
    maxlength:50
  },
  email:{
    type    : String ,
    required: true ,
    minlength:5 ,
    maxlength:255,
    unique:true
  },
  email:{
    type    : String ,
    required: true ,
    minlength:5 ,
    maxlength:1024
  },
  isAdmin: Boolean
});

//giving the user model a method to call for authentication token to be generated here

UserSchema.methods.generateAuthToken= function(){
  const token = jwt.sign({_id: this._id, isAdmin : this.isAdmin }, config.get('jwtPrivateKey'));
  return token;
}


// creatiing a model
const User = mongoose.model('User', UserSchema );


function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email:Joi.string().min(3).max(255).required().email(),
    password:Joi.string().min(3).max(255).required()

  };

  return Joi.validate(user, schema);
  // result ={ error : null , value : has the data oibj }
}

//exports.genreSchema = genreSchema;
exports.User= User;
exports.validateUser = validateUser;
