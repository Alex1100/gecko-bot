var mongoose = require('mongoose');

var livecoinBtcusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var LivecoinBtcusd = mongoose.model('LivecoinBtcusd', livecoinBtcusdSchema);

module.exports = LivecoinBtcusd;
