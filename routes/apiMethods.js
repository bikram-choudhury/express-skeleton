
var express = require('express'),
	router = express.Router(),
	customerSchema = require('../database/schemas/customerSchema.js');

router.get('/',function (req,res,next) {
	res.render('api-home',{title: 'API Home @Express + Angular'});
});

router.route('/customers')
	.get(function (req,res,next) {
		// console.log('GET Request Recieved.',req);
		customerSchema.find({ isActive: true },function (err,users) {
			if(err){
				console.log(err);
			}
			res.json(users);
		});
	})
	.post(function (req,res,next) {
		console.log("POST Request Recieved.",req.body);
		if(req.body){
			var customer = new customerSchema(req.body);
			customer.save(function (err,doc) {
				if (err) {
					console.log(err);
				}
				res.json(doc);
			})
		}
	})



module.exports = router;