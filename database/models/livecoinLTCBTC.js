var mongoose = require('mongoose');

var livecoinLtcbtcSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var LivecoinLtcbtc = mongoose.model('LivecoinLtcbtc', livecoinLtcbtcSchema);

module.exports = LivecoinLtcbtc;
