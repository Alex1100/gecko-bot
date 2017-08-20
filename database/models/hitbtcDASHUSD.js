var mongoose = require('mongoose');

var hitbtcDashusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var HitbtcDashusd = mongoose.model('HitbtcDashusd', hitbtcDashusdSchema);

module.exports = HitbtcDashusd;
