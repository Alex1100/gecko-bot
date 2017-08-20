var mongoose = require('mongoose');

var cexBchusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var CexBchusd = mongoose.model('CexBchusd', cexBchusdSchema);

module.exports = CexBchusd;
