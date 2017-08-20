var mongoose = require('mongoose');

var gdaxBtcusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var GdaxBtcusd = mongoose.model('GdaxBtcusd', gdaxBtcusdSchema);

module.exports = GdaxBtcusd;
