let Campground = require('../models/campground'),
    Comment = require('../models/comment')

let middle = {}

// authenticate user
middle.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

// authenticate user for campground
middle.checkCampgroundOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    // does the user own the campground?
    Campground.findById(req.params.id, (err, campground) => {
      if (err) {
        res.redirect('back')
      }
      else {
        // does the user own the campground?
        if (campground.author.id.equals(req.user._id)) {
          next()
        }
        else {
          res.redirect('back')
        }
      }
    })
  }
  else {
    // otherwise, redirect
    res.redirect('back')
  } 
}

// authenticate user for comment
middle.checkCommentOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    // does the user own the comment?
    Comment.findById(req.params.comment_id, (err, comment) => {
      if (err) {
        res.redirect('back')
      }
      else {
        // does the user own the comment?
        if (comment.author.id.equals(req.user._id)) {
          next()
        }
        else {
          res.redirect('back')
        }
      }
    })
  }
  else {
    // otherwise, redirect
    res.redirect('back')
  } 
}

module.exports = middle