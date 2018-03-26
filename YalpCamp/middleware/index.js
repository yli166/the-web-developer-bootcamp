var middlewareObject = {};
var Comment = require('../models/comment');
var Campground = require('../models/campground');


middlewareObject.CheckCampgroundOwnerShip = function(req,res,next){
	    Campground.findById(req.params.id,function(err,foundcampground){
	        if(req.isAuthenticated()){
	            if(err){
	                res.redirect('/campgrounds');
	            }else{
	                if(foundcampground.author.id.equals(req.user._id)){
	                    next();
	                }
	            }
	        } else {
	            console.log('you need to be logged in to do that');
	            res.redirect('back');
	        }
	    });
};

middlewareObject.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    // 给flash error 赋值 
    req.flash('error', 'Please Login First');
    res.redirect('/login');
};

middlewareObject.CheckCommentOwnerShip = function(req,res,next){
    Comment.findById(req.params.comment_id,function(err,foundcomment){
        if(req.isAuthenticated()){
            if(err){
                res.redirect('back');
            }else{
                if(foundcomment.author.id.equals(req.user._id)){
                    next();
                }
            }
        } else {
            console.log('you need to be logged in to do that');
            res.redirect('back');
        }
    });
};



module.exports = middlewareObject;