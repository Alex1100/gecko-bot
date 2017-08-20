var mongoose = require('mongoose');

var bittrexEthusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var BittrexEthusd = mongoose.model('BittrexEthusd', bittrexEthusdSchema);

module.exports = BittrexEthusd;
