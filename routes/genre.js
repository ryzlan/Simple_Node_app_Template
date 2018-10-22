const mongoose= require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();

//importing middleware to check authentication before executing a route
const auth = require('../middleware/auth');
const admin = require('../middleware/admin')

// importing models and validation function
const {Genre , validateGenre } = require('../models/genre');




//GET the data from the database
router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name')
  res.send(genres);
});


// add middleware here to prevent other user from posting genre

router.post('/',auth , async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name
  });
  genre = await genre.save();
  res.send(genre);
});
// params = 'api/subject/:id'  here id is accessed by req.params.id
//query = '/api/subject/1?sortBy=name' here any thing after ? is query accessed by req.query.sortBy
router.put('/:id', async (req, res) => {
  //validate data
  // if invalid , return 400 - Bad request
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // look up course
  // update course
  //return the updated courses by mongoose method findByIdAndUpdate

  const genre = await Genre.findByIdAndUpdate(req.params.id,{
    name:req.body.name
  },{new:true});

  if(!genre){
    return res.status(404).send('The genre ID did not match so it cant be updated ');
  }

  res.send(genre);
});

router.delete('/:id',[auth , admin], async (req, res) => {
  //Looking up the genre with the id
// not existing , return 404
// if found delete and return the previous data backend
const genre = await Genre.findByIdAndRemove(req.params.id);
if (!genre) return res.status(404).send('The genre with the given ID was not found.');
// return thee same genre
  res.send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});




module.exports = router ;
