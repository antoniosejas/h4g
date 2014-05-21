var express = require("express"),
    app = express(),
    mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	bodyParser     = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	methodOverride = require('method-override')
	router = express.Router()
	;

//Middleware: Allows cross-domain requests (CORS)
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(methodOverride());
app.use(allowCrossDomain);
app.use(cookieParser());
app.use(session({secret: 'Poner secreto' , name: 'sid', cookie: {secure: true}}));
app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());

var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

accountRoutes = require('./routes/account')(app);
audioSpotsroutes = require('./routes/audioSpots')(app);

mongoose.connect('mongodb://localhost/fiblindDB', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});

app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
