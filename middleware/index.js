let Campground = require('../models/campground'),
    Comment = require('../models/comment')

let middle = {}

// authenticate user
middle.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash('danger', 'You must be logged in to do that')
  res.redirect('/login')
}

// authenticate user for campground
middle.checkCampgroundOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    // does the user own the campground?
    Campground.findById(req.params.id, (err, campground) => {
      if (err) {
        req.flash('danger', 'Campground not found')        
        res.redirect('back')
      }
      else {
        // does the user own the campground?
        if (campground.author.id.equals(req.user._id)) {
          next()
        }
        else {
          req.flash('danger', 'You don\'t have permission to do that')          
          res.redirect('back')
        }
      }
    })
  }
  else {
    // otherwise, redirect
    req.flash('danger', 'You must be logged in to do that')
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
          req.flash('danger', 'You don\'t have permission to do that')                
          res.redirect('back')
        }
      }
    })
  }
  else {
    // otherwise, redirect
    req.flash('danger', 'You must be logged in to do that')          
    res.redirect('back')
  } 
}

module.exports = middle