var mongoose = require('mongoose');

var livecoinEthbtcSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var LivecoinEthbtc = mongoose.model('LivecoinEthbtc', livecoinEthbtcSchema);

module.exports = LivecoinEthbtc;
