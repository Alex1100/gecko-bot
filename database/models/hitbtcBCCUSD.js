var mongoose = require('mongoose');

var hitbtcBccusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var HitbtcBccusd = mongoose.model('HitbtcBccusd', hitbtcBccusdSchema);

module.exports = HitbtcBccusd;
