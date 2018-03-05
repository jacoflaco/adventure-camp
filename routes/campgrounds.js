let express = require('express')
let router = express.Router()
let Campground = require('../models/campground')

// index
router.get('/', (req, res) => {
  // Get all campgrounds from DB
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err)
    }
    else {
      res.render('campgrounds/index', {campgrounds: allCampgrounds})  
    }
  })
})

// new
router.get('/new', isLoggedIn, (req, res) => {
  res.render('campgrounds/new')
})

// create
router.post('/', isLoggedIn, (req, res) => {
  let author = {
    id: req.user._id,
    username: req.user.username
  }
  let newcamp = req.body.camp
  newcamp.author = author
  Campground.create(newcamp, (err, campground) => {
    if (err) {
      console.log(err)
    } 
    else {
      res.redirect('/campgrounds')
    }
  })  
})

// show
router.get('/:id', (req, res) => {
  Campground.findById(req.params.id).populate('comments').exec((err, campground) => {
    if (err) {
      console.log(err)
    }
    else {
      console.log(campground)
      res.render('campgrounds/show', { campground: campground })
    }
  })
})

// check if logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

module.exports = router