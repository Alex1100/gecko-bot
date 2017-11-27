require("dotenv").load();
const axios = require("axios");
const crypto = require('crypto');
const createHmac = require("create-hmac");
const n = require("nonce")();
let loopConditional = require('../index');
var cryptoSocket = require("crypto-socket");
var ccex = require('ccxt')
var cCex = new ccex.ccex({
  apiKey: process.env.CCEX_API_KEY,
  secret: process.env.CCEX_API_KEY_SECRET
});
let bittrex = require('./bittrex');
let gdax = require('./gdax');
let gemini = require('./gemini');
let cex = require('./cex');
let HitBTC = require('./hitbtc');
let livecoin = require('./livecoin');
let poloniex = require('./poloniex');
let strategy = {
  "bittrex": bittrex,
  "gdax": gdax,
  "gemini": gemini,
  "poloniex": poloniex,
  "HitBTC": HitBTC,
  "cex": cex,
  "livecoin": livecoin
};

//when dealing with an arb opportunity
//with this exchange, the other exchange
//needs to deposit money from there side
//and use e.g. process.env.CCEX_BTC_DEPOSIT_ADDRESS
//in order for funds to be moved from c-cex
//exchange because their api does not
//include such a method 0_o

requestBalance = (currency) => {
  cCex.privateGetBalances()
    .then(res => {
      console.log(`${currency} BALANCE IS: `, res.result.filter(el => el.Currency === currency.toUpperCase())[0])
      return res.result.filter(el => el.Currency === currency.toUpperCase())[0];
    })
    .catch(err => console.log("COUNDN'T GET BALANCES: ", err));
};

withdraw = () => {
  console.log(cCex);
};

trade = (exchange, currency) => {
  //buylimit
  //selllimit
};


module.exports = {
  requestBalance,
  withdraw
};
