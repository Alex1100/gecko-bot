var mongoose = require('mongoose');
// var debug = require('debug')('app:models');

var poloniexEthusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var PoloniexEthusd = mongoose.model('PoloniexEthusd', poloniexEthusdSchema);

module.exports = PoloniexEthusd;
