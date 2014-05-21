//File: routes/account.js
var passport = require('passport');
var Account = require ('../models/account');
module.exports = function(app) {

  app.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username,
   							   	   firstName : req.body.firstName,
   							   	   lastName : req.body.lastName,
   							   	   bio : req.body.bio,
   							   	   picture : req.body.picture,
   							   	   cover : req.body.cover,
   							   	   living : req.body.living
	}), req.body.password, function(err, account) {
        if (err) {
      		res.send(1);
			console.log("Error en registro");
        }
        passport.authenticate('local')(req, res, function () {
          	res.send(0);
			console.log("Registro nuevo usuario.Usuario:"+req.body.username+"Contraseña:"+req.body.password);
        });
    });
  });

  app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
	  if (err) { return next(err) }
	    if (!user) {
		  res.send(1);		 
		}
		req.logIn(user, function(err) {
		  if (err) { res.send(1);}
		  console.log(req.user);
		  res.send(req.user._id);
		});
	  })(req, res, next);
	});

  app.get('/logout', function(req, res) {
  	req.logout();
    res.send(1);
  });

	//TODO: This is duplicated, shouldn't be
	function ensureAuthenticated(req, res, next) {
		if (!req.query.uid){
			req.query.uid = req.body.uid;
		}
		console.log('UID:'+req.query.uid);
		Account.findById(req.query.uid, function(err, foundUser) {
			if(!err && foundUser !== null) {
				console.log('Authorized')
				return next();
			} else {
				console.log('Unauthorized');
				res.send('Unauthorized');
			}
		})
	}

  	app.get('/user', ensureAuthenticated, function(req,res){
  	//GET - Return user info by its id
		Account.findById(req.query.id, function(err, foundUser) {
			if(!err && foundUser !== null) {
				//TODO: Devolver todo?
				res.send(foundUser);
			} else {
				console.log('ERROR: ' + err);
			}
		});
	});

  //app.get('/ping', function(req, res){
      //res.send("pong!", 200);
  //});

}
