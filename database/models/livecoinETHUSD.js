var mongoose = require('mongoose');

var livecoinEthusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var LivecoinEthusd = mongoose.model('LivecoinEthusd', livecoinEthusdSchema);

module.exports = LivecoinEthusd;
