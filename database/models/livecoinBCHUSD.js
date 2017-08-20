var mongoose = require('mongoose');

var livecoinBchusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var LivecoinBchusd = mongoose.model('LivecoinBchusd', livecoinBchusdSchema);

module.exports = LivecoinBchusd;
