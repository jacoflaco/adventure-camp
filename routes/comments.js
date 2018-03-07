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

// edit
router.get('/:comment_id/edit', checkCommentOwnership, (req, res) => {
  Comment.findById(req.params.comment_id, (err, comment) => {
    if (err) {
      res.redirect('back')
    }
    else {
      Campground.findById(req.params.id, (err, campground) => {
        if (err) {
          res.redirect('back')
        }
        else {
          res.render('comments/edit', { campground: campground, comment: comment })          
        }
      })
    }
  })
})

// update
router.put('/:comment_id', checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comment) => {
    if (err) {
      res.redirect('back')
    }
    else {
      res.redirect('/campgrounds/' + req.params.id)
    }
  })
})

// destroy
router.delete('/:comment_id', checkCommentOwnership, (req, res) => {
  // findByIdAndRemove
  Comment.findByIdAndRemove(req.params.comment_id, (err, comment) => {
    if (err) {
      res.redirect('back')
    }
    else {
      res.redirect('/campgrounds/' + req.params.id)
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

function checkCommentOwnership(req, res, next) {
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

module.exports = router