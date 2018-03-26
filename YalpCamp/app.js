var express = require('express');
var app = express();
var bodyPaser = require("body-parser");
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var User = require('./models/user');
var seedDB = require('./seeds');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    authRoutes = require('./routes/index'),
    methodOverride = require('method-override'),
    flash = require('connect-flash');


seedDB();
mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyPaser.urlencoded({extended: true}));
app.set('view engine','ejs');
// passport ==============

app.use(require('express-session')({
    secret : 'some secret',
    resave : false,
    saveUninitialized : false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use(flash());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =======================
// 给所有currentUser赋上user值
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    res.locals.moment = require('moment');
    next();
});

// =======================

// add css ============
app.use(express.static(__dirname + '/public'));
// ====================

app.use('/campgrounds',campgroundRoutes);
app.use(authRoutes);
app.use(commentRoutes);
app.use(flash());

app.listen(3000,function(){
    console.log('yalpcamp has started!');
});
// app.listen(process.env.PORT,process.env.IP,function(){
//     console.log('yelpcamp has started!')
// })