require("dotenv").load();
const axios = require("axios");
const crypto = require('crypto');
const createHmac = require("create-hmac");
const n = require("nonce")();
let loopConditional = require('../index');
var cryptoSocket = require("crypto-socket");
var HitBTC = require('ccxt').hitbtc({
  apiKey: process.env.HITBTC_API_KEY,
  secret: process.env.HITBTC_API_KEY_SECRET,
});

requestBalances = (currency) => {
  HitBTC.tradingGetBalance()
    .then(res => {
      console.log("DATA IS: ", res.balance.filter(el => el.currency_code === currency.toUpperCase())[0]);
      return res.balance.filter(el => el.currency_code === currency.toUpperCase())[0];
    })
    .catch(err => {
      console.log("COUDN'T GET BALANCES: ", err);
    });
};

withdraw = () => {
  console.log(HitBTC);
};

trade = () => {

};

module.exports = {
  requestBalances,
  withdraw
}
