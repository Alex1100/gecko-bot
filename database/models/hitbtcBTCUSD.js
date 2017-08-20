var mongoose = require('mongoose');

var hitbtcBtcusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var HitbtcBtcusd = mongoose.model('HitbtcBtcusd', hitbtcBtcusdSchema);

module.exports = HitbtcBtcusd;
