require("dotenv").load();
const axios = require("axios");
const crypto = require('crypto');
const createHmac = require("create-hmac");
const n = require("nonce")();
let loopConditional = require('../index');
var cryptoSocket = require("crypto-socket");
var cCex = require('ccxt').ccex({
  apiKey: process.env.CCEX_API_KEY,
  secret: process.env.CCEX_API_KEY_SECRET
});

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
