var mongoose = require('mongoose');
// var debug = require('debug')('app:models');

var geminiBtcusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var GeminiBtcusd = mongoose.model('GeminiBtcusd', geminiBtcusdSchema);

module.exports = GeminiBtcusd;
