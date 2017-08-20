var mongoose = require('mongoose');

var gdaxLtcusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var GdaxLtcusd = mongoose.model('GdaxLtcusd', gdaxLtcusdSchema);

module.exports = GdaxLtcusd;
