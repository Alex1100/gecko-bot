require("dotenv").load();
const axios = require("axios");
const crypto = require('crypto');
const createHmac = require("create-hmac");
const n = require("nonce")();
let loopConditional = require('../index');
var cryptoSocket = require("crypto-socket");
var cex = require('ccxt')
var Cex = new cex.cex({
  apiKey: process.env.CEX_API_KEY,
  secret: process.env.CEX_API_KEY_SECRET,
  uid: process.env.CEX_USER_ID
});
let bittrex = require('./bittrex');
let gdax = require('./gdax');
let gemini = require('./gemini');
let cCex = require('./cCex');
let HitBTC = require('./hitbtc');
let livecoin = require('./livecoin');
let poloniex = require('./poloniex');
let strategy = {
  "bittrex": bittrex,
  "gdax": gdax,
  "gemini": gemini,
  "poloniex": poloniex,
  "HitBTC": HitBTC,
  "cCex": cCex,
  "livecoin": livecoin
};

requestBalances = () => {
  Cex.privatePostBalance()
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log("COUDN'T GET BALANCES: ", err));
};

withdraw = () => {
  console.log(Cex);
};

trade = () => {

};


module.exports = {
  requestBalances,
  withdraw
}
