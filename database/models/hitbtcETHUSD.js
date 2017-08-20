var mongoose = require('mongoose');

var hitbtcEthusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var HitbtcEthusd = mongoose.model('HitbtcEthusd', hitbtcEthusdSchema);

module.exports = HitbtcEthusd;
