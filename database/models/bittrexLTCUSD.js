var mongoose = require('mongoose');

var bittrexLtcusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var BittrexLtcusd = mongoose.model('BittrexLtcusd', bittrexLtcusdSchema);

module.exports = BittrexLtcusd;
