const express = require('express');
const router = express.Router();


const genres = [
  { id: 1, name: 'Action' },
  { id: 2, name: 'Horror' },
  { id: 3, name: 'Romance' },
];


function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(genre, schema);
  // result ={ error : null , value : has the data oibj }
}


router.get('/', (req, res) => {
  res.send(genres);
});

router.post('/', (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(genre);
  res.send(genre);
});
// params = 'api/subject/:id'  here id is accessed by req.params.id
//query = '/api/subject/1?sortBy=name' here any thing after ? is query accessed by req.query.sortBy
router.put('/:id', (req, res) => {
  // look up course
  //if not existing , return 404
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  //validate
  // if invalid , return 400 - Bad request
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // update course
    //return the updated courses
  genre.name = req.body.name;
  res.send(genre);
});

router.delete('/:id', (req, res) => {
  // Looking up the course
// not existing , return 404
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
// delete
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
// return thee same course
  res.send(genre);
});

router.get('/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});




module.exports = router ;
