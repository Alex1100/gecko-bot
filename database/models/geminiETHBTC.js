var mongoose = require('mongoose');
// var debug = require('debug')('app:models');

var geminiEthbtcSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var GeminiEthbtc = mongoose.model('GeminiEthbtc', geminiEthbtcSchema);

module.exports = GeminiEthbtc;
