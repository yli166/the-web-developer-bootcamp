// 设置一个router 输出router
var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');


// ========================

router.get('/',function(req,res){
    Campground.find({},function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render('campgrounds/index',{campgrounds:campground, page:'campgrounds'});
        }
    });
});

router.post('/',middleware.isLoggedIn,function(req,res){
    var name= req.body.name;
    var image = req.body.image;
    var cost = req.body.cost;
    var author = {
        id : req.user._id,
        username : req.user.username
    };
    var newCampground = {name: name, image: image,author : author,cost:cost};

    Campground.create(newCampground,function(err,newCampground){
        if(err){
            console.log(err);
        }else{
            console.log(newCampground);
            res.redirect('/campgrounds');
        }
    });
});

router.get('/new',middleware.isLoggedIn,function(req, res) {
    res.render('campgrounds/new');
});

router.get('/:id',function(req,res){
    // 外挂一个 ‘comment’ 以用来获得正确的id
    Campground.findById(req.params.id).populate('comments').exec(function(err,foundcampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundcampground);
            res.render('campgrounds/show',{campground:foundcampground});
        }
    });
});




// Edit Campground Route

router.get('/:id/edit',middleware.CheckCampgroundOwnerShip,function(req,res){
    Campground.findById(req.params.id,function(err,foundcampground){
        res.render('campgrounds/edit',{campground : foundcampground}); 
});
});
// update route

router.put('/:id',function(req,res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatecampground){
        if(err){
            res.redirect('/campgrounds');
        }else{
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete('/:id',middleware.CheckCampgroundOwnerShip,function(req,res){
    // find and update the correct campground
    Campground.findByIdAndRemove(req.params.id,req.body.campground,function(err,updatecampground){
        if(err){
            res.redirect('/campgrounds/');
        }else{
            res.redirect('/campgrounds/');
        }
    });
});





module.exports = router;