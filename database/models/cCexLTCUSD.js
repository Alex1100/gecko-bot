var mongoose = require('mongoose');

var ccexLtcusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var CcexLtcusd = mongoose.model('CcexLtcusd', ccexLtcusdSchema);

module.exports = CcexLtcusd;
