let express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    expressSession = require('express-session'),
    passport = require('passport'),
    passportLocal = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose')

// models
let Comment = require('./models/comment'),
    Campground = require('./models/campground'),
    User = require('./models/user'),
    seedDB = require('./seeds')

// routes
let commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes = require('./routes/index')

let app = express()

// database setup
mongoose.connect('mongodb://localhost/adventure')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/assets'))

// pug setup
app.set('view engine', 'pug')

// passport setup
app.use(expressSession({
  secret: 'This is a secret',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new passportLocal(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// necessary after passport setup to send user data to each page
app.use((req, res, next) => {
  res.locals.currentUser = req.user
  next()
})

// use routes
app.use(indexRoutes)
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/comments', commentRoutes)

// Start server
app.listen(8000, () => console.log('Serving YelpCamp on 8000...'))