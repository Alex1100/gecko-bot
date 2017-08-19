var mongoose = require('mongoose');
// var debug = require('debug')('app:models');

var poloniexLtcusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var PoloniexLtcusd = mongoose.model('PoloniexLtcusd', poloniexLtcusdSchema);

module.exports = PoloniexLtcusd;
