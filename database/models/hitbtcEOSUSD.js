var mongoose = require('mongoose');

var hitbtcEosusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var HitbtcEosusd = mongoose.model('HitbtcEosusd', hitbtcEosusdSchema);

module.exports = HitbtcEosusd;
