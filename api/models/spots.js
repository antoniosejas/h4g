var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var spotSchema = new Schema({
  name:    { type: String },
  longitude:     { type: Number },
  latitude:  { type: String },
  description:   { type: String },
  image:  { type: String},
  clasification:    { type: String, enum:
  ['Stairset', 'Handrail', 'Skatepark', 'Ledge', 'Other']
        }
});

module.exports = mongoose.model('Spot', spotSchema);
