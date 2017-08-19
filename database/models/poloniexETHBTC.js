var mongoose = require('mongoose');
// var debug = require('debug')('app:models');

var poloniexEthbtcSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var PoloniexEthbtc = mongoose.model('PoloniexEthbtc', poloniexEthbtcSchema);

module.exports = PoloniexEthbtc;
