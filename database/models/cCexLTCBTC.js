var mongoose = require('mongoose');

var ccexLtcbtcSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var CcexLtcbtc = mongoose.model('CcexLtcbtc', ccexLtcbtcSchema);

module.exports = CcexLtcbtc;
