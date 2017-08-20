var mongoose = require('mongoose');

var poloniexDashusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var PoloniexDashusd = mongoose.model('PoloniexDashusd', poloniexDashusdSchema);

module.exports = PoloniexDashusd;
