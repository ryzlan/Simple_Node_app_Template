const mongoose= require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
// importing models and validation function
const {User , validateUser } = require('../models/user');




//user registrations
router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
// checking to see if we do have an user with the similar email registered
  let user  = await User.findOne({email: req.body.email});
  if(user) return res.status(400).send("user already registered");

  // user = new User({
  //   name: req.body.name,
  //   email:req.body.email,
  //   password:req.body.password
  // });
// can be converted into
user = new User({
  _.pick(req.body ,['name', 'email', 'password' ])
});

// hashing and salting the password using bcrypt
const salt = await bcrypt.genSalt(10);
const hashed_salted = await bcrypt.hash(user.password, salt );
user.password = hashed_salted;

await user.save();
// using lodash .pick meth9od to selectively send the user-object back to user
let sub_user = _.pick(user ,['name', 'email']);


  // // sending
  // res.send(sub_user);

  // instead of sending the user we send jwt and a header
  const token = user.generateAuthToken();

  res.header('x-auth-token', token).send(sub_user)
});
// handling when user want their own info
const auth = require('../middleware/auth');

router.get('/me',auth, async (req,res)=>{
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
} )





















module.exports = router ;
