var express = require('express');
var app = express();
var bodyPaser = require("body-parser");
// var mongoose = require('mongoose')


app.use(bodyPaser.urlencoded({extended: true}));
app.set('view engine','ejs')
app.get('/',function(req,res){
    res.render('landing')
});
var campgrounds = [
    {name:'wyt bill',image:'https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144394f2c17aa6edb2_340.jpg'},
    {name:'yifan li',image:'https://pixabay.com/get/eb3db8072cf2023ed1584d05fb1d4e97e07ee3d21cac104497f1c379a4ecb5bf_340.jpg'},
    {name:'bitong wang',image:'https://farm8.staticflickr.com/7682/17149736522_54ca6f8c76.jpg'},    
    {name:'wyt bill',image:'https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144394f2c17aa6edb2_340.jpg'},
    {name:'yifan li',image:'https://pixabay.com/get/eb3db8072cf2023ed1584d05fb1d4e97e07ee3d21cac104497f1c379a4ecb5bf_340.jpg'},
    {name:'bitong wang',image:'https://farm8.staticflickr.com/7682/17149736522_54ca6f8c76.jpg'},    
    {name:'wyt bill',image:'https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144394f2c17aa6edb2_340.jpg'},
    {name:'yifan li',image:'https://pixabay.com/get/eb3db8072cf2023ed1584d05fb1d4e97e07ee3d21cac104497f1c379a4ecb5bf_340.jpg'},
    {name:'bitong wang',image:'https://farm8.staticflickr.com/7682/17149736522_54ca6f8c76.jpg'},
    ]

app.get('/campgrounds',function(req,res){
    res.render('campgrounds',{campgrounds:campgrounds})
})

app.post('/campgrounds',function(req,res){
    var name= req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground)
    
})

app.get('/campgrounds/new',function(req, res) {
    res.render('new')
})
// app.listen(process.env.PORT,process.env.IP,function(){
//     console.log('yelpcamp has started!')
// })
app.listen(3000)    