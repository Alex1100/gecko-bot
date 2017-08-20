var mongoose = require('mongoose');

var cexBtcusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var CexBtcusd = mongoose.model('CexBtcusd', cexBtcusdSchema);

module.exports = CexBtcusd;
