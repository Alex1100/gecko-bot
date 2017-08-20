var mongoose = require('mongoose');

var livecoinBchbtcSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var LivecoinBchbtc = mongoose.model('LivecoinBchbtc', livecoinBchbtcSchema);

module.exports = LivecoinBchbtc;
