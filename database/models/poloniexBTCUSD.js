var mongoose = require('mongoose');

var poloniexBtcusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var PoloniexBtcusd = mongoose.model('PoloniexBtcusd', poloniexBtcusdSchema);

module.exports = PoloniexBtcusd;
