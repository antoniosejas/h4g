var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var audioSpotSchema = new Schema({
  name:    { type: String },
  longitude:     { type: Number },
  latitude:  { type: Number },
  description:   { type: String },
  audiodata:   { type: Buffer}
});

module.exports = mongoose.model('audioSpot', audioSpotSchema);
