var mongoose = require('mongoose');

var bittrexEthbtcSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var BittrexEthbtc = mongoose.model('BittrexEthbtc', bittrexEthbtcSchema);

module.exports = BittrexEthbtc;
