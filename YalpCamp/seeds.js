var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');


// var data = [
// 	{	
// 	name:'cloud',
// 	image: 'https://thumb.grindnetworks.com/tjGKrhIarzxOrJ3YmoscB17Fs6A=/1000x0/filters:format(jpg):quality(80):max_bytes(500000):sharpen(0.2%2C1%2Ctrue):strip_exif():strip_icc()/https://www.adventuresportsnetwork.com/wp-content/uploads/2015/02/shutterstock_242371765.jpg',
// 	description : 'blah blah blah'
// 	},
// 	{	
// 	name:'yifan li',
// 	image: 'https://www.theurbanlist.com/images/made/content/article/best-camping-spots-Brisbane_740_486_s_c1.png',
// 	description : 'blah blah blah'
// 	},	
// 	{	
// 	name:'Wei Cui',
// 	image: 'https://assets.bedful.com/images/f60eaf793db2a91a1e6bff79948fb2997e3addd0/large/image/pop-up-campsites.jpg',
// 	description : 'blah blah blah'
// 	}

// 	];
function seedDB(){
// 	Comment.remove({},function(err){
// 		if(err){
// 			console.log(err);
// 		}else{
// 			console.log('reomving the comment');
// 		}
// 	});
	// Campground.remove({},function(err){
	// if(err){
	// 	console.log(err);
	// 	}
	// console.log('removed all campgrounds!')

// // 种子试用 ===========
// 		data.forEach(function(seed){
// 			Campground.create(seed,function(err,data){
// 				if(err){
// 					console.log(err);
// 				}
// 				// else{
// 					// console.log('create a new data');
// 					// Comment.create({
// 					// 	text : 'This place is great!',
// 					// 	author:'Homer'
// 					// },function(err,comment){
// 					// 	if(err){
// 					// 		console.log(err);
// 					// 	}else{
// 					// 		data.comments.push(comment);
// 					// 		data.save();
// 					// 		console.log('creat a new comment');
// 					// 	}
// 					// });
// 				// }
// 			});
// 		});
// // ===================

// 	});
}

module.exports = seedDB;
