var mongoose = require('mongoose');

var cexEthbtcSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var CexEthbtc = mongoose.model('CexEthbtc', cexEthbtcSchema);

module.exports = CexEthbtc;
