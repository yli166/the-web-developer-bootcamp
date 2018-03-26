var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

// root route
router.get('/',function(req,res){
    res.render('landing');
});

// auth route
router.get('/register',function(req,res){
    res.render('register',{page:'register'});
});
// post register
router.post('/register',function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate('local')(req,res,function(){
            res.redirect('/campgrounds');
        });
    });
});
// SHOW LOGIN form========
router.get('/login',function(req,res){
    res.render('login',{page:'login'});
});
// ,{message : req.flash('error')}

router.post('/login',passport.authenticate('local',
    {
        successRedirect:'/campgrounds',
        failureRedirect:'/login'
    }),function(req,res){

});
// =======================
// login out

router.get('/logout',function(req,res){
    req.logout();
    req.flash('success','Logged you out!');
    res.redirect('/campgrounds');
});

module.exports = router;