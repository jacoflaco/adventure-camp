let express = require('express')
let router = express.Router({ mergeParams: true })
let Campground = require('../models/campground'),
    Comment = require('../models/comment')

// new
router.get('/new', isLoggedIn, (req, res) => {
  // Find campground by id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err)
    }
    else {
      res.render('comments/new', { campground: campground })
    }
  })
})

// create
router.post('/', isLoggedIn, (req, res) => {
  // Lookup campground using ID
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err)
      res.redirect('/campgrounds')
    }
    else {
      // Create new comment
      let newcomment = req.body.comment
      Comment.create(newcomment, (err, comment) => {
        if (err) {
          console.log(err)
        }
        else {
          // add username and id to comment
          comment.author.id = req.user._id
          comment.author.username = req.user.username
          // save comment
          comment.save()
          // Connect new comment to campground
          campground.comments.push(comment._id)
          campground.save()

          // Redirect to show page
          res.redirect('/campgrounds/' + campground._id)
        }
      })
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