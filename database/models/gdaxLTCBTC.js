var mongoose = require('mongoose');
// var debug = require('debug')('app:models');

var gdaxLtcbtcSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var GdaxLtcbtc = mongoose.model('GdaxLtcbtc', gdaxLtcbtcSchema);

module.exports = GdaxLtcbtc;
