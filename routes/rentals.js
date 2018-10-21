const {Rental, validateRental} = require('../models/rental');
const {Movie} = require('../models/movies');
const {Customer} =- require('../models/customer');

// transaction handdler setuip[
const Fawn =  require('fawn');
Fawn.init(mongoose);



const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res)=>{
  const rentals = await Rental.find().sort('-dateOut')
  res.send(rentals);
})

router.post('/', async(req, res ) =>{
  const {error} = validateRental(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if(!customer) return res.status(400).send("Invalid Customer");

  const movie = await Movie.findById(req.body.movieId);
  if(!movie) return res.status(400).send("Invalid Customer");

  if(movie.numInStock === 0) return res.status(400).send('Movie not in Stock');

  const rental = new Rental({
    customer:{
      _id:customer._id,
      name: customer.name,
      phone:customer.phone
    },
    movie:{
      _id:movie._id,
      title:movie.title,
      dailyRentalRate:movie.dailyRentalRate
    }
  });
// this cannot be done like this need special function to run ==> transactions
// since there is two call to the server we have to use fawn to make it work

  //  await rental.save();
  // movie.numInStock--;
  // movie.save();
  // res.send(rental);
  //
  try{
    // from fawn class we called the method to do two seperate database calls simultaneously
    // works only with mongo codes
    
    new Fawn.Task()
      .save('rentals' , rental)
      .update('movies' , {_id: movie.id},{
        $inc:{numInStock: -1  }
      })
      .run();



  }catch(ex){
    console.log(ex);
    res.status(500).send("Internal Error , SOmething went wrong")
  }


})

router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
});

module.exports = router ;
