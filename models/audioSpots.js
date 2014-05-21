var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var audioSpotSchema = new Schema({
  name:    { type: String },
  longitude:     { type: Number },
  latitude:  { type: Number },
  description:   { type: String },
  audiodata:   { type: String},
  uploader: Schema.Types.ObjectId
});

module.exports = mongoose.model('audioSpot', audioSpotSchema);
