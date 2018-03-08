let express = require('express')
let router = express.Router()
let passport = require('passport')
let User = require('../models/user')

// root
router.get('/', (req, res) => {
  res.render('landing')
})

// register
router.get('/register', (req, res) => {
  res.render('user/register')
})
router.post('/register', (req, res) => {
  let newUser = new User({ username: req.body.username })
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      req.flash('danger', err.message)            
      return res.redirect('/register')
    }
    passport.authenticate('local')(req, res, () => {
      req.flash('success', 'Welcome to Adventure Camp ' + user.username)            
      res.redirect('/campgrounds')
    })
  })
})

// login
router.get('/login', (req, res) => {
  res.render('user/login')
})
router.post(
  '/login', 
  passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
  }), 
  (req, res) => {
})

// logout
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success', 'Logged you out')
  res.redirect('back')
})

module.exports = router