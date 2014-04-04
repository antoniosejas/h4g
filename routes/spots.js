//File: routes/spots.js
module.exports = function(app) {

	var Spot = require('../models/spots.js');

	//GET - Return all the spots in the DB
	findAllSpots = function(req, res) {
		Spot.find(function(err, spots) {
			if(!err) {
				res.send(spots);
			} else {
				console.log('ERROR: ' + err);
			}
		});
	};

	//GET - Return a spot by its id
	findById = function(req, res) {
		Spot.findById(req.param.id, function(err, spot) {
			if(!err) {
				res.send(spot);
			} else {
				console.log('ERROR: ' + err);
			}
		});
	};

	//POST - Insert a new Spot in the DB
	addSpot = function(req, res) {
		console.log('POST');
		console.log(req.body);

		var spot = new Spot({
			name: req.body.name,
			longitude: req.body.longitude,
			latitude: req.body.latitude,
			description: req.body.description,
			image: req.body.image,
			clasification: req.body.clasification
		});

		spot.save(function(err) {
			if(!err) {
				console.log('Created');
			} else {
				console.log('ERROR: ' + err);
			}
		});
		res.send(spot);
	}; 

	//PUT - Update a register already exists
	updateSpot = function(req, res) {
		Spot.findById(req.params.id, function(err, spot) {
			spot.name = req.body.name;
			spot.longitude = req.body.longitude;
			spot.latitude = req.body.latitude;
			spot.description  = req.body.description;
			spot.image = req.body.image;
			spot.clasification   = req.body.clasification;

			spot.save(function(err) {
				if(!err) {
					console.log('Updated');
				} else {
					console.log('ERROR: ' + err);
				}
				res.send(tvshow);
			});
		});
	}

	//DELETE - Delete a Spot with specified ID
	deleteSpot = function(req, res) {
		Spot.findById(req.params.id, function(err, spot) {
			spot.remove(function(err) {
				if(!err) {
					console.log('Removed');
				} else {
					console.log('ERROR: ' + err);
				}
			})
		});
	}

	//Link routes and functions
	app.get('/spots', findAllSpots);
	app.get('/spot/:id', findById);
	app.post('/spot', addSpot);
	app.put('/spot/:id', updateSpot);
	app.delete('/spot/:id', deleteSpot);
}
