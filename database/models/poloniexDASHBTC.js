var mongoose = require('mongoose');

var poloniexDashbtcSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var PoloniexDashbtc = mongoose.model('PoloniexDashbtc', poloniexDashbtcSchema);

module.exports = PoloniexDashbtc;
