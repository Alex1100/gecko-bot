var mongoose = require('mongoose');

var ccexDashbtcSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var CcexDashbtc = mongoose.model('CcexDashbtc', ccexDashbtcSchema);

module.exports = CcexDashbtc;
