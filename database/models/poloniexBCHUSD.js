var mongoose = require('mongoose');

var poloniexBchusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var PoloniexBchusd = mongoose.model('PoloniexBchusd', poloniexBchusdSchema);

module.exports = PoloniexBchusd;
