var express = require("express"),
    app     = express(),
    mongoose = require('mongoose');

//Middleware: Allows cross-domain requests (CORS)
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(allowCrossDomain);
  app.use(app.router);
});

routes = require('./routes/audioSpots')(app);
mongoose.connect('mongodb://localhost/audioSpots', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});

app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
