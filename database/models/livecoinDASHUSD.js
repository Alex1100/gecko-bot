var mongoose = require('mongoose');

var livecoinDashusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var LivecoinDashusd = mongoose.model('LivecoinDashusd', livecoinDashusdSchema);

module.exports = LivecoinDashusd;
