var mongoose = require('mongoose');
// var debug = require('debug')('app:models');

var gdaxEthusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var GdaxEthusd = mongoose.model('GdaxEthusd', gdaxEthusdSchema);

module.exports = GdaxEthusd;
