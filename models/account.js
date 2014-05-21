var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose');

var accountSchema = new Schema({
  username:    { type: String },
  password:   { type: String },
  firstName:   { type: String },
  living:   { type: String },
  bio:   { type: String },
  picture:   { type: String },
  cover:   { type: String },
  lastName:   { type: String }
});

accountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', accountSchema);
