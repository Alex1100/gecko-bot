var mongoose = require('mongoose');

var geminiEthusdSchema = new mongoose.Schema({
  _id: String,
  price: Number,
  time: String,
  created: {type: Date, default: Date.now()}
});

var GeminiEthusd = mongoose.model('GeminiEthusd', geminiEthusdSchema);

module.exports = GeminiEthusd;
