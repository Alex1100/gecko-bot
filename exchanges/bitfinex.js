require("dotenv").load();
const btoa = require("btoa");
const createHmac = require("create-hmac");
var crypto = require('crypto');
const n = require("nonce")();
const axios = require("axios");
let loopConditional = require('../index');
let cryptoSocket = require("crypto-socket");
var Bitfinex = require('bitfinex');
var bitfinex = new Bitfinex(process.env.BITFINEX_API_KEY, process.env.BITFINEX_API_KEY_SECRET);

//works between bitfinex and another exchange
async function withdraw(exchange, currency){
//Bitfinex Withdrawal Fees
// Ether 0.01 ETH
// Bitcoin 0.0004 BTC
// Litecoin  0.001 LTC
// Eos 0.1 EOS
// Dash  0.01 DSH
// Iota  FREE
// Ether Classic 0.01 ETC
// Zcash 0.001 ZEC
// Ripple  0.01 XRP
// Monero  0.01 XMR
// Omisego 0.1 OMG
// Santiment 0.1 SAN
// TetherUSD 2.0 USD
// Bank wire 0.100% of the withdrawal amount, with a minimum fee of $20.00
// Express bank wire (within 24 hours on business days)  1.000% of the withdrawal amount, with a minimum fee of $20.00
  let amount = await requestBalances();
  amount = amount[`${currency}`]
  let address = exchange.toUpperCase() + '_' + currency.toUpperCase() + '_DEPOSIT_ADDRESS';

  return new Promise((resolve, reject) => {
    if (currency === 'ETH'){
      type = "ethereum";
    }

    if (currency === 'BTC') {
      type = 'bitcoin';
    }

    bitfinex.withdraw(type, 'exchange', amount, process.env.address, (err, data) => {
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



// Order Execution Fees
// EXECUTED IN THE LAST 30 DAYS (USD EQUIVALENT) MAKER FEES  TAKER FEES
// $0.00 or more traded  Maker: 0.100%  Taker: 0.200%
// $500,000.00 or more traded  Maker: 0.080%  Taker: 0.200%
// $1,000,000.00 or more traded  Maker: 0.060%  Taker: 0.200%
// $2,500,000.00 or more traded  Maker: 0.040%  Taker: 0.200%
// $5,000,000.00 or more traded  Maker: 0.020%  Taker: 0.200%
// $7,500,000.00 or more traded  Maker: 0.000%  Taker: 0.200%
// $10,000,000.00 or more traded Maker: 0.000%  Taker: 0.180%
// $15,000,000.00 or more traded Maker: 0.000%  Taker: 0.160%
// $20,000,000.00 or more traded Maker: 0.000%  Taker: 0.140%
// $25,000,000.00 or more traded Maker: 0.000%  Taker: 0.120%
// $30,000,000.00 or more traded Maker: 0.000%  Taker: 0.100%


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
requestBalances = (currency) => {
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

