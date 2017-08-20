var mongoose = require('mongoose');

var hitbtcEosbtcSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var HitbtcEosbtc = mongoose.model('HitbtcEosbtc', hitbtcEosbtcSchema);

module.exports = HitbtcEosbtc;
