const router = require("express").Router();
// ../ to go up one folder
const Movie = require("../models/Movie");
const Celebrity = require("../models/Celebrity");

router.get("/", (req, res, next) => {
  // get all the books
  Movie.find()
    .then((moviesFromDB) => {
      // render a view movies
      console.log(moviesFromDB);
      res.render("movies/index", { moviesList: moviesFromDB });
    })
    .catch((err) => {
      console.log(err);
      next();
    });
});

router.get('/new', (req, res) => {
  Celebrity.find().then(celebrities => {
    res.render('movies/new', { celebrities });
  })
    .catch(err => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  // console.log("STOP SCROOOOOOOOOLLING", req.body)
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then(() => {
      res.redirect('/movies');
    })
    .catch(err => {
      res.render('/movies/new')
      next(err);
    })
});

// Router :id
router.get('/:id/edit', (req, res, next) => {
  Movie.findById(req.params.id).populate('cast')
    .then(movie => {
      console.log(movie);
      Celebrity.find().then(celebrities => {
        // console.log(movie.cast);
        let options = '';
        let selected = '';
        celebrities.forEach(actor => {
          selected = movie.cast.map(el => el._id).includes(actor._id) ? ' selected' : '';
          options += `<option value="${actor._id}" ${selected}>${actor.name}</option>`;
        });
        console.log(options);
        // res.render('movies/edit', { movie, celebrities });
        res.render('movies/edit', { movie, options });
      })
    })
    .catch(err => {
      next(err);
    })
});

router.post('/:id/', (req, res) => {
  const { title, genre, plot, cast } = req.body;
  Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast })
    .then(() => {
      res.redirect('/movies');
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
