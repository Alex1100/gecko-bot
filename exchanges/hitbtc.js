require("dotenv").load();
const axios = require("axios");
const crypto = require('crypto');
const createHmac = require("create-hmac");
const n = require("nonce")();
let loopConditional = require('../index');
var cryptoSocket = require("crypto-socket");
var hitBTC = require('ccxt')
HitBTC = new hitBTC.hitbtc({
  apiKey: process.env.HITBTC_API_KEY,
  secret: process.env.HITBTC_API_KEY_SECRET,
});
let cCex = require('./cCex');
let bittrex = require('./bittrex');
let gdax = require('./gdax');
let cex = require('./cex');
let gemini = require('./gemini');
let livecoin = require('./livecoin');
let poloniex = require('./poloniex');
let strategy = {
  "cCex": cCex,
  "bittrex": bittrex,
  "gdax": gdax,
  "poloniex": poloniex,
  "gemini": gemini,
  "cex": cex,
  "livecoin": livecoin
};


requestTradingBalances = (exchange, currency) => {
  HitBTC.tradingGetBalance()
    .then(res => {
      console.log("REMAINING ETH IS: ", res.balance.filter(el => el.currency_code === 'ETH'));
      console.log("DATA SHOULD BE: ", res.balance.filter(el => el.cash > 0 || el.reserved > 0));
      // console.log("DATA IS: ", res.balance.filter(el => el.currency_code === currency.toUpperCase())[0]);
      return res.balance.filter(el => el.currency_code === currency.toUpperCase());
    })
    .catch(err => {
      console.log("COUDN'T GET BALANCES: ", err);
    });
};

fetchOrders = (exchange, currency) => {
  HitBTC.fetchOpenOrders()
    .then(res => {
      console.log("RES IS: ", res);
    })
    .catch(err => console.log("ERR IS: ", err));
}

withdraw = () => {
  console.log(HitBTC);
};

getOrders = () => {
  HitBTC.fetchClosedOrders()
    .then(res => {
      console.log("ALL ORDERS ARE: ", res);
    })
    .catch(err => console.log("ERR BECAUSE: ", err));
}

//Just added the library we needed for trades
//still working on the trades stuff
//I'm having trouble getting the funds that are marked as reserved
//to move over to the available side, so they
//could be traded or withdrawed with
//method signature and everything else is
//fine...
trade = () => {
  HitBTC.createOrder('EOS/USD', 'limit', 'buy', 1, 3.81)
    .then(res => {
      console.log("THE RES FROM THE TRADE OF EOS FOR USD IS: ", res);
      HitBTC.tradingGetBalance('hitbtc', 'USD')
        .then(res => {
          console.log("REMAINING EOS IS: ", res.balance.filter(el => el.currency_code === 'EOS'));
          console.log("DATA SHOULD BE: ", res.balance.filter(el => el.cash > 0 || el.reserved > 0));
          // console.log("DATA IS: ", res.balance.filter(el => el.currency_code === currency.toUpperCase())[0]);
          return res.balance.filter(el => el.currency_code === currency.toUpperCase());
        })
    })
    .catch(err => console.log("ERRORED OUT AT: ", err));
};

cancelLiveOrder = () => {
  HitBTC.cancelOrder('1512888101175')
    .then(res => {
      console.log("ORDER CANCELLED: ", res);
    })
    .catch(err => console.log("ERR: ", err));
}

requestBalances = () => {
  HitBTC.fetchBalance()
    .then(res => {
      console.log("RES IS: ", res);
    })
    .catch(err => console.log("ERR: ", err));
}

module.exports = {
  requestTradingBalances,
  requestBalances,
  withdraw,
  trade,
  fetchOrders,
  getOrders,
  cancelLiveOrder,
}
