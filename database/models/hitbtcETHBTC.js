var mongoose = require('mongoose');

var hitbtcEthbtcSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var HitbtcEthbtc = mongoose.model('HitbtcEthbtc', hitbtcEthbtcSchema);

module.exports = HitbtcEthbtc;
