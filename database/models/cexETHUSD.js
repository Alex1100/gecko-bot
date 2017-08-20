var mongoose = require('mongoose');

var cexEthusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var CexEthusd = mongoose.model('CexEthusd', cexEthusdSchema);

module.exports = CexEthusd;
