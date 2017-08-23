require("dotenv").load();
const axios = require("axios");
const crypto = require('crypto');
const createHmac = require("create-hmac");
const n = require("nonce")();
let loopConditional = require('../index');
var cryptoSocket = require("crypto-socket");
let baseUrl = 'https://api.livecoin.net';
var Livecoin = require('ccxt').livecoin({
  apiKey: process.env.LIVECOIN_API_KEY,
  secret: process.env.LIVECOIN_API_KEY_SECRET
});
let btoa = require('btoa');
let cCex = require('./cCex');
let bittrex = require('./bittrex');
let gdax = require('./gdax');
let cex = require('./cex');
let HitBTC = require('./hitbtc');
let gemini = require('./gemini');
let poloniex = require('./poloniex');
let strategy = {
  "cCex": cCex,
  "bittrex": bittrex,
  "gdax": gdax,
  "poloniex": poloniex,
  "HitBTC": HitBTC,
  "cex": cex,
  "gemini": gemini
};


signLivecoinRequest = request => {
  let base = btoa(JSON.stringify(request));
  let hmac = createHmac("sha256", process.env.LIVECOIN_API_KEY_SECRET);
  hmac.update(base);
  let signature = hmac.digest("hex");
  return signature;

}


requestBalances = () => {
  Livecoin.privateGetPaymentBalances()
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log("COUDN'T GET BALANCES: ", err));
};

withdraw = () => {

};

trade = () => {

};


module.exports = {
  requestBalances
}
