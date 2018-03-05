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
router.get('/new', (req, res) => {
  res.render('campgrounds/new')
})

// create
router.post('/', (req, res) => {
  let newcamp = req.body.camp
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

module.exports = router