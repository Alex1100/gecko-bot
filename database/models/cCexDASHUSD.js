var mongoose = require('mongoose');

var ccexDashusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var CcexDashusd = mongoose.model('CcexDashusd', ccexDashusdSchema);

module.exports = CcexDashusd;
