require("dotenv").load();
const btoa = require("btoa");
const createHmac = require("create-hmac");
const n = require("nonce")();
const axios = require("axios");
let loopConditional = require('../index').loopConditional;
let cryptoSocket = require("crypto-socket");

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


buyEthOnBitfinex = () => {
  console.log("BUY ETH ON BITFINEX");
  flag = true;
  loopConditional();
};

buyBtcOnBitfinex = () => {
  console.log("BUY BTC ON BITFINEX");
  flag = true;
  loopConditional();
};

withdrawEthOnBitfinex = () => {
  console.log("WITHDRAW ETH BITFINEX");
  flag = true;
  loopConditional();
};

withdrawBtcOnBitfinex = () => {
  console.log("WITHDRAW BTC BITFINEX");
  flag = true;
  loopConditional();
};

module.exports = {
  buyEthOnBitfinex,
  buyBtcOnBitfinex,
  withdrawEthOnBitfinex,
  withdrawBtcOnBitfinex
};
