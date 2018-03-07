let express = require('express')
let router = express.Router()
let Campground = require('../models/campground')
let middle = require('../middleware')

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
router.get('/new', middle.isLoggedIn, (req, res) => {
  res.render('campgrounds/new')
})

// create
router.post('/', middle.isLoggedIn, (req, res) => {
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

// edit
router.get('/:id/edit', middle.checkCampgroundOwnership, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    res.render('campgrounds/edit', { campground: campground })        
  })
})

// update
router.put('/:id', middle.checkCampgroundOwnership, (req, res) => {
  // find and update the correct campground
  Campground.findByIdAndUpdate(req.params.id, req.body.camp, (err, campground) => {
    if (err) {
      res.redirect('/campgrounds')
    }
    else 
      res.redirect('/campgrounds/' + req.params.id)
  })
})

// destroy
router.delete('/:id', middle.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      res.redirect('/campgrounds')
    }
    else {
      res.redirect('/campgrounds')
    }
  })
})

module.exports = router