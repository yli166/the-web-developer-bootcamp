var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Campground = require('../models/campground');
var middleware = require('../middleware');


// ============

router.get('/campgrounds/:id/comments/new',middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
        res.render('comments/new',{campground:campground});
        }
    });
});

router.post('/campgrounds/:id/comment',middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        }else{
            console.log(req.body);
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    // add user name and id to comments and save()
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

//Edit Comment Route
router.get('/campgrounds/:id/:comment_id/edit',function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            console.log(err);
        }else{
        res.render('comments/edit',{campground_id : req.params.id, comment : foundComment});
        }
    });
});

//  COMMENT UPDATE
router.put('/campgrounds/:id/comments/:comment_id',function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updateComment){
        if(err){
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

//  COMMENT DESTORY
router.delete('/campgrounds/:id/comments/:comment_id',middleware.CheckCommentOwnerShip, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});



module.exports = router;    