require("dotenv").load();
const btoa = require("btoa");
const createHmac = require("create-hmac");
const n = require("nonce")();
const axios = require("axios");
let loopConditional = require('../index').loopConditional;
let bittrex = require('../node_modules/node.bittrex.api/node.bittrex.api.js');
bittrex.options({
  'apikey' : process.env.BITTREX_API_KEY,
  'apisecret' : process.env.BITTREX_API_KEY_SECRET,
  'verbose' : true,
  'cleartext' : false,
  'baseUrl' : 'https://bittrex.com/api/v1.1'
});
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


buy = () => {
  console.log("BUY ON BITTREX");
  flag = true;
  loopConditional();
};

withdraw = () => {
  console.log("WITHDRAW BITTREX");
  flag = true;
  loopConditional();
};

requestBalances = () => {
  bittrex.getbalances( function( data ) {
    console.log( data );
  });
  return;
}

getEthDepositAddress = () => {
  bittrex.getdepositaddress({ currency : 'ETH' }, function( data ) {
    console.log( data );
  });
}

getBtcDepositAddress = () => {
  bittrex.getdepositaddress({ currency : 'BTC' }, function( data ) {
    console.log( data );
  });
}

module.exports = {
  buy,
  withdraw,
  requestBalances,
  getEthDepositAddress,
  getBtcDepositAddress
};
