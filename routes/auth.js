const mongoose= require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');

// importing models
const {User} = require('../models/user');




//user Login
router.post('/', async (req, res) => {
  const { error } = validateauth(req.body);
  if (error) return res.status(400).send(error.details[0].message);


 // checking to see if email exist or not before
  let user  = await User.findOne({email: req.body.email});
  if(!user) return res.status(400).send("Invalid email or password ");

// dehash password and check if it matches the password in db
  const validPassword =await bcrypt.compare(req.body.password, user.password )
  if(!validPassword) return res.status(400).send("Invalid email or password ");

//on successful login we send the client a jsonwebtoken
// we wil get the private key from enviorment variable that we will set in the config package

const token = user.generateAuthToken();

  res.send(token);

});

function validateauth(req) {
  const schema = {
    email:Joi.string().min(3).max(255).required().email(),
    password:Joi.string().min(3).max(255).required()

  };

  return Joi.validate(req, schema);
  // result ={ error : null , value : has the data oibj }
}






module.exports = router ;
