var mongoose = require('mongoose');

var poloniexLtcbtcSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var PoloniexLtcbtc = mongoose.model('PoloniexLtcbtc', poloniexLtcbtcSchema);

module.exports = PoloniexLtcbtc;
