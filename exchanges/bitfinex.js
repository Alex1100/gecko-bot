require("dotenv").load();
const btoa = require("btoa");
const createHmac = require("create-hmac");
var crypto = require('crypto');
const n = require("nonce")();
const axios = require("axios");
let loopConditional = require('../index').loopConditional;
let cryptoSocket = require("crypto-socket");
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

//works between bitfinex and another exchange
withdraw = (currency, amount, address) => {
  return new Promise((resolve, reject) => {
    if (currency === 'ETH'){
      type = "ethereum";
    }

    if (currency === 'BTC') {
      type = 'bitcoin';
    }


    bitfinex.withdraw(type, 'exchange', amount.toString(), address, (err, data) => {
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

buy = (currency) => {
  //changed node_module bitfinex to include
  //param use_all_available to 1, which
  //will use all funds for the new order

  //also the minmum amount of BTC per transaction is 0.1 and for All Other currencies is 0.01
  currency = currency.toUpperCase();
  requestBalances().then(balancesObj => {
    const pairs = {
      ETH: {
        buy: () =>
          bitfinex.new_order('ethbtc', 0.1, cryptoSocket.bitfinex.ETHBTC, 'buy', (err, data) => {
              if (err) {
                console.log(err);
              } else {
                console.log(data);
              }
            })
      },
      BTC: {
        buy: () => bitfinex.new_order('ethbtc', 0.1, cryptoSocket.bitfinex.ETHBTC, 'sell', (err, data) => {
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

//works
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




// CODE GRAVEYARD
// couldn't get the signature to work... Followed the docs, check it out and see if you'd like to get it going else
// we need to use the bitfinex npm mod

//v2 once out of beta will deprecate v1
//let apiURI = `https://api.bitfinex.com/v1`;

// signBitfinexRequest = (uri, nonce, body) => {
//   let payload = new Buffer(JSON.stringify({
//     request: uri,
//     nonce: nonce
//   })).toString('base64');
//   let signature = crypto.createHmac('sha384', process.env.BITFINEX_API_KEY_SECRET).update(payload).digest('hex');
//   return { payload, nonce, signature };
// }

