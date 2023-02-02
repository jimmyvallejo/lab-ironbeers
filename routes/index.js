var express = require('express');
var router = express.Router();
const PunkAPIWrapper = require('punkapi-javascript-wrapper')
const punkAPI = new PunkAPIWrapper()
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.hbs', { title: 'Home' });
});


router.get('/beers', function(req, res, next) {
  punkAPI.getBeers()
  .then(beers => {
    console.log(beers)
    res.render('beers.hbs', { title: 'Beers', beers: beers});
   })
   .catch(error =>{
    console.log("error");
   })
});

router.get('/random-beer', function(req, res, next) {
  punkAPI
  .getRandom()
  .then(randomBeer=> {
    res.render('random-beer.hbs', { title: 'Random Beer', randomBeer: randomBeer});
  })
  .catch(error => console.log(error));
});

router.get('/beer/:id', ((req, res, next) => {
  punkAPI
    .getBeer(req.params.id)
  .then((result) => {
    res.render('beer-detail.hbs', {result})
  })
  .catch(error => console.log(error));
}))
module.exports = router;
