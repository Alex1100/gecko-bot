var mongoose = require('mongoose');

var hitbtcLtcbtcSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var HitbtcLtcbtc = mongoose.model('HitbtcLtcbtc', hitbtcLtcbtcSchema);

module.exports = HitbtcLtcbtc;
