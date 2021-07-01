const router = require("express").Router();
// ../ to go up one folder
const Celebrity = require("../models/Celebrity");

router.get("/", (req, res, next) => {
  // get all the books
  Celebrity.find()
    .then((celebritiesFromDB) => {
      // render a view celebrities
      console.log(celebritiesFromDB);
      res.render("celebrities/index", { celebritiesList: celebritiesFromDB });
    })
    .catch((err) => {
      console.log(err);
      next();
    });
});

router.get('/new', (req, res, next) => {
  res.render('celebrities/new.hbs');
});

router.get("/:id", (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((celebrity) => {
      res.render("celebrities/show.hbs", { celebrity });
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(err => {
      res.render('/celebrities/new')
      next(err);
    })
});

router.post('/:id', (req, res, next) => {
  console.log(req.body);
  const { celebrityname, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(req.params.id, { name: celebrityname, occupation: occupation, catchPhrase })
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(err => {
      next(err);
    });
})

router.post('/:id/delete', (req, res, next) => {
  // findOneAndDelete 
  Celebrity.findByIdAndRemove({ _id: req.params.id })
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(err => {
      next(err);
    })
});

router.get('/:id/edit', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then(celebrity => {
      res.render('celebrities/edit', { celebrity });
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
