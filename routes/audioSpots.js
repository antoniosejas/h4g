//File: routes/audioSpots.js
module.exports = function(app) {

	var AudioSpot = require('../models/audioSpots.js');

	//GET - Return all the audioSpots in the DB
	findAllAudioSpots = function(req, res) {
		AudioSpot.find(function(err, audioSpots) {
			if(!err) {
				res.send(audioSpots);
			} else {
				console.log('ERROR: ' + err);
			}
		});
	};

	//GET - Return an audioSpot by its id
	findById = function(req, res) {
		AudioSpot.findById(req.param.id, function(err, audioSpot) {
			if(!err) {
				res.send(audioSpot);
			} else {
				console.log('ERROR: ' + err);
			}
		});
	};

	//POST - Insert a new Spot in the DB
	addAudioSpot = function(req, res) {
		console.log('POST');
		console.log(req.body);

		var audioSpot = new AudioSpot({
			name: req.body.name,
			longitude: req.body.longitude,
			latitude: req.body.latitude,
			description: req.body.description
		});

		audioSpot.save(function(err) {
			if(!err) {
				console.log('Created');
			} else {
				console.log('ERROR: ' + err);
			}
		});
		res.send(audioSpot);
	}; 

	//PUT - Update a register already exists
	updateAudioSpot = function(req, res) {
		AudioSpot.findById(req.params.id, function(err, audioSpot) {
			audioSpot.name = req.body.name;
			audioSpot.longitude = req.body.longitude;
			audioSpot.latitude = req.body.latitude;
			audioSpot.description  = req.body.description;
			audioSpot.image = req.body.image;
			audioSpot.clasification   = req.body.clasification;

			audioSpot.save(function(err) {
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
	deleteAudioSpot = function(req, res) {
		AudioSpot.findById(req.params.id, function(err, audioSpot) {
			audioSpot.remove(function(err) {
				if(!err) {
					console.log('Removed');
				} else {
					console.log('ERROR: ' + err);
				}
			})
		});
	}

	//Link routes and functions
	app.get('/audioSpots', findAllAudioSpots);
	app.get('/audioSpot/:id', findById);
	app.post('/audioSpot', addAudioSpot);
	app.put('/audioSpot/:id', updateAudioSpot);
	app.delete('/audioSpot/:id', deleteAudioSpot);
}
