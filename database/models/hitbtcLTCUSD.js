var mongoose = require('mongoose');

var hitbtcLtcusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var HitbtcLtcusd = mongoose.model('HitbtcLtcusd', hitbtcLtcusdSchema);

module.exports = HitbtcLtcusd;
