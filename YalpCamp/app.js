var express = require('express');
var app = express();
var bodyPaser = require("body-parser");
var mongoose = require('mongoose')
var Campground = require('./models/campground')
var Comment = require('./models/comment')
var User = require('./models/user')
var seedDB = require('./seeds')
var passport = require('passport')
var LocalStrategy = require('passport-local')


seedDB()
mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyPaser.urlencoded({extended: true}));
// add css ============
app.use(express.static(__dirname + '/public'));
// ====================
app.set('view engine','ejs')
app.get('/',function(req,res){
    res.render('landing')
});
// var campgrounds = [
//     {name:'wyt bill',image:'https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144394f2c17aa6edb2_340.jpg'},
//     {name:'yifan li',image:'https://pixabay.com/get/eb3db8072cf2023ed1584d05fb1d4e97e07ee3d21cac104497f1c379a4ecb5bf_340.jpg'},
//     {name:'bitong wang',image:'https://farm8.staticflickr.com/7682/17149736522_54ca6f8c76.jpg'},    
//     {name:'wyt bill',image:'https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144394f2c17aa6edb2_340.jpg'},
//     {name:'yifan li',image:'https://pixabay.com/get/eb3db8072cf2023ed1584d05fb1d4e97e07ee3d21cac104497f1c379a4ecb5bf_340.jpg'},
//     {name:'bitong wang',image:'https://farm8.staticflickr.com/7682/17149736522_54ca6f8c76.jpg'},    
//     {name:'wyt bill',image:'https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144394f2c17aa6edb2_340.jpg'},
//     {name:'yifan li',image:'https://pixabay.com/get/eb3db8072cf2023ed1584d05fb1d4e97e07ee3d21cac104497f1c379a4ecb5bf_340.jpg'},
//     {name:'bitong wang',image:'https://farm8.staticflickr.com/7682/17149736522_54ca6f8c76.jpg'},
//     ]

app.get('/campgrounds',function(req,res){
    Campground.find({},function(err,campground){
        if(err){
            console.log(err)
        }else{
            res.render('campgrounds/index',{campgrounds:campground}) 
        }
    })
})

app.post('/campgrounds',function(req,res){
    var name= req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    Campground.create(newCampground,function(err,newCampground){
        if(err){
            console.log(err)
        }else{
            res.redirect('/campgrounds');
        }
    })
})

app.get('/campgrounds/new',function(req, res) {
    res.render('campgrounds/new')
})

// comment routes ========
app.get('/campgrounds/:id/comments/new',function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err)
        }else{
        res.render('comments/new',{campground:campground});
        }
    })
})

app.post('/campgrounds/:id/comment',function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err)
            redirect('/campgrounds')
        }else{
            console.log(req.body.comment);
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err)
                }else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            })
        }
    })
})

// =======================


// passport ==============

app.use(require('express-session'))

// =======================

app.get('/campgrounds/:id',function(req,res) {
    // 外挂一个 ‘comment’ 以用来获得正确的id
    Campground.findById(req.params.id).populate('comments').exec(function(err,foundcampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundcampground);
            res.render('campgrounds/show',{campground:foundcampground});
        }
    })
})
// app.get('/campgrounds/:id', function(req,res) {
//     Campground.findById(req.params.id,function(err,foundcampground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log(foundcampground);
//             res.render('show',{campground:foundcampground});
//         }
//     })
// })

app.listen(3000,function(){
    console.log('yalpcamp has started!')
})
// app.listen(process.env.PORT,process.env.IP,function(){
//     console.log('yelpcamp has started!')
// })