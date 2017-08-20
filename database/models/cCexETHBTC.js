var mongoose = require('mongoose');

var ccexEthbtcSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var CcexEthbtc = mongoose.model('CcexEthbtc', ccexEthbtcSchema);

module.exports = CcexEthbtc;
