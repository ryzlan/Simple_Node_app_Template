// this backend is for a video streaming services where people can choose and add genre


const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());// enables to use req.body json data

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


app.get('/api/genres', (req, res) => {
  res.send(genres);
});

app.post('/api/genres', (req, res) => {
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
app.put('/api/genres/:id', (req, res) => {
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

app.delete('/api/genres/:id', (req, res) => {
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

app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

// set PORT =5000 ;then nodemon index.js
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
