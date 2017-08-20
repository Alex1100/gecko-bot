var mongoose = require('mongoose');

var ccexEthusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var CcexEthusd = mongoose.model('CcexEthusd', ccexEthusdSchema);

module.exports = CcexEthusd;
