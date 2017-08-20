var mongoose = require('mongoose');

var bittrexLtcethSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var BittrexLtceth = mongoose.model('BittrexLtceth', bittrexLtcethSchema);

module.exports = BittrexLtceth;
