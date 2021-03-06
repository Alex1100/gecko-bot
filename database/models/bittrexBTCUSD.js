var mongoose = require('mongoose');

var bittrexBtcusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var BittrexBtcusd = mongoose.model('BittrexBtcusd', bittrexBtcusdSchema);

module.exports = BittrexBtcusd;
