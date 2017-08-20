var mongoose = require('mongoose');

var poloniexBchbtcSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var PoloniexBchbtc = mongoose.model('PoloniexBchbtc', poloniexBchbtcSchema);

module.exports = PoloniexBchbtc;
