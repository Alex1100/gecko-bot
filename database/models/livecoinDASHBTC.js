var mongoose = require('mongoose');

var livecoinDashbtcSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var LivecoinDashbtc = mongoose.model('LivecoinDashbtc', livecoinDashbtcSchema);

module.exports = LivecoinDashbtc;
