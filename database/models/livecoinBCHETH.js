var mongoose = require('mongoose');

var livecoinBchethSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var LivecoinBcheth = mongoose.model('LivecoinBcheth', livecoinBchethSchema);

module.exports = LivecoinBcheth;
