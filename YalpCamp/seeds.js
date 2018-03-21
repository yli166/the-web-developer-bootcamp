var mongoose = require('mongoose')
var Campground = require('./models/campground')
var Comment = require('./models/comment')


var data = [
	{	
	name:'cloud',
	image: 'https://pixabay.com/get/e136b80728f31c22d2524518b7444795ea76e5d004b0144394f4c77caee8bd_340.jpg',
	description : 'empty'
	},
	{	
	name:'yifan li',
	image: 'https://pixabay.com/get/ea35b8062cf1063ed1584d05fb1d4e97e07ee3d21cac104497f1c57fa2e4b0b0_340.jpg',
	description : 'empty'
	},	
	{	
	name:'Wei Cui',
	image: 'https://pixabay.com/get/ea37b3072af7063ed1584d05fb1d4e97e07ee3d21cac104497f1c57fa2e4b0b0_340.jpg',
	description : 'empty'
	}

	]
function seedDB(){
	Comment.remove({},function(err){
		if(err){
			console.log(err)
		}else{
			console.log('reomving the comment')
		}
	})
	Campground.remove({},function(err){
	if(err){
		console.log(err)
		}
		console.log('removed all campgrounds!')
		data.forEach(function(seed){
			Campground.create(seed,function(err ,data){
				if(err){
					console.log(err)
				}else{
					console.log('create a new data')
					Comment.create({
						text : 'This place is great!',
						author:'Homer'
					},function(err,comment){
						if(err){
							console.log(err)
						}else{
							data.comments.push(comment);
							data.save()
							console.log('creat a new comment')
						}
					})
				}
			})
		})
	});
}

module.exports = seedDB;
