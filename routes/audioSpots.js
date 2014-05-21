//File: routes/messages.js
module.exports = function(app) {

	var AudioSpot = require('../models/audioSpots.js');
	var account= require('../models/account.js');

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
			description: req.body.description,
			audiodata: req.body.audiodata,
			uploader: req.query.uid
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
			/*name: req.body.name,
			longitude: req.body.longitude,
			latitude: req.body.latitude,
			description: req.body.description,
			audiodata: req.body.audiodata*/

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

	//TODO: This is duplicated, shouldn't be
	function ensureAuthenticated(req, res, next) {
		if (!req.query.uid){
			req.query.uid = req.body.uid;
		}
		console.log('UID:'+req.query.uid);
		account.findById(req.query.uid, function(err, foundUser) {
			if(!err && foundUser !== null) {
				console.log('Authorized')
				return next();
			} else {
				console.log('Unauthorized');
				res.send('Unauthorized');
			}
		})
	}

	//Link routes and functions
	app.get('/audioSpots', ensureAuthenticated, findAllAudioSpots);
	app.get('/audioSpot/:id', ensureAuthenticated, findById);
	app.post('/audioSpot', ensureAuthenticated, addAudioSpot);
	app.put('/audioSpot/:id', ensureAuthenticated, updateAudioSpot);
	app.delete('/audioSpot/:id', ensureAuthenticated, deleteAudioSpot);
}
