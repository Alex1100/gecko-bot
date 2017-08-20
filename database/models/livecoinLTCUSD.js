var mongoose = require('mongoose');

var livecoinLtcusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var LivecoinLtcusd = mongoose.model('LivecoinLtcusd', livecoinLtcusdSchema);

module.exports = LivecoinLtcusd;
