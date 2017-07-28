require("dotenv").load();
const btoa = require("btoa");
const createHmac = require("create-hmac");
var crypto = require('crypto');
const n = require("nonce")();
const axios = require("axios");
let loopConditional = require('../index').loopConditional;
let cryptoSocket = require("crypto-socket");
//v2 once out of beta will deprecate v1
let apiURI = `https://api.bitfinex.com/v1`;

var Bitfinex = require('bitfinex');

var bitfinex = new Bitfinex(process.env.BITFINEX_API_KEY, process.env.BITFINEX_API_KEY_SECRET);


const API_KEYS = {
  poloniex: {
    api_key: process.env.POLONIEX_API_KEY,
    secret: process.env.POLONIEX_SECRET,
    ETH: process.env.POLONIEX_ETH_ADDRESS,
    BTC: process.POLONIEX_BTC_ADDRESS
  },
  gemini: {
    api_key: process.env.gemPub,
    secret: process.env.gemPriv,
    client_order_id: process.env.GEMINI_CLIENT_ORDER_ID,
    ETH: process.env.GEMINI_ETH_DEPOSIT_ADDRESS,
    BTC: process.env.GEMINI_BTC_DEPOSIT_ADDRESS
  },
  gdax: {
    api_key: process.env.GDAX_API_KEY,
    secret: process.env.GDAX_API_KEY_SECRET,
    passphrase: process.env.GDAX_API_KEY_PASSPHRASE,
    ETH: process.env.GDAX_ETH_DEPOSIT_ADDRESS,
    BTC: process.env.GDAX_BTC_DEPOSIT_ADDRESS
  },
  bittrex: {
    api_key: process.env.BITTREX_API_KEY,
    secret: process.env.BITTREX_API_KEY_SECRET,
    ETH: process.env.BITTREX_ETH_WALLET_ADDRESS,
    BTC: process.env.BITTREX_BTC_WALLET_ADDRESS
  },
  bitfinex: {
    api_key: process.env.BITFINEX_API_KEY,
    secret: process.env.BITFINEX_API_KEY_SECRET,
    ETH: process.env.BITFINEX_ETH_EXCHANGE_WALLET_ADDRESS,
    BTC: process.env.BITFINEX_BTC_EXCHANGE_WALLET_ADDRESS
  }
};

signBitfinexRequest = (uri, nonce, body) => {
  let payload = new Buffer(JSON.stringify({
    request: uri,
    nonce: nonce
  })).toString('base64');
  let signature = crypto.createHmac('sha384', process.env.BITFINEX_API_KEY_SECRET).update(payload).digest('hex');
  return { payload, nonce, signature };
}


withdraw = () => {
  return new Promise((resolve, reject) => {
    bitfinex.withdraw(withdraw_type, wallet, amount, address, (err, data) => {
      if (err) {
        console.log("SOMETHING WENT WRONG BECAUSE: ", err);
        reject(err);
      } else {
        console.log("DATA IS: ", data);
        resolve(data);
      }
    })
  })
}

buy = () => {
  currency = currency.toUpperCase();
  requestBalances().then(balancesObj => {
    const pairs = {
      ETH: {
        buy: () =>
          bitfinex.new_order('ethbtc', price, 'sell', 'false', 'true', 1, (err, data) => {
              if (err) {
                console.log(err);
              } else {
                console.log(data);
              }
            })
      },
      BTC: {
        buy: () => poloniex.sell('ethbtc', price, 'buy', 'false', 'true', 1, (err, data) => {
              if (err) {
                console.log(err);
              } else {
                console.log(data);
              }
            })
      }
    };
    pairs[currency].buy();
  });
}

requestBalances = () => {
  return new Promise((resolve, reject) => {
    bitfinex.wallet_balances((err, data) => {
      if (err) {
        console.log("SOMETHING WENT WRONG BECAUSE: ", err);
        reject(err);
      } else {
        console.log("DATA IS: ", data);
        resolve(data);
      }
    })
  });
}

module.exports = {
  buy,
  withdraw,
  requestBalances
};
