var mongoose = require('mongoose');

var gdaxEthbtcSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var GdaxEthbtc = mongoose.model('GdaxEthbtc', gdaxEthbtcSchema);

module.exports = GdaxEthbtc;
