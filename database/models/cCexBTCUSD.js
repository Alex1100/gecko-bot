var mongoose = require('mongoose');

var ccexBtcusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var CcexBtcusd = mongoose.model('CcexBtcusd', ccexBtcusdSchema);

module.exports = CcexBtcusd;
