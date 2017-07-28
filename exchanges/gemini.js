require("dotenv").load();
const gemPub = process.env.gemPub;
const gemPriv = process.env.gemPriv;
const btoa = require("btoa");
const createHmac = require("create-hmac");
const n = require("nonce")();
const axios = require("axios");
let loopConditional = require('./../index').loopConditional;
const gdaxAdd = process.env.GDAX_ETH_DEPOSIT_ADDRESS;
var cryptoSocket = require("crypto-socket");

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


signRequest = request => {
  let base = btoa(JSON.stringify(request));
  let hmac = createHmac("sha384", gemPriv);
  hmac.update(base);
  let signature = hmac.digest("hex");
  return { base, signature };
};

requestBalances = () => {
  let balanceRequest = signRequest({
    request: "/v1/balances",
    nonce: n()
  });

  let config = {
    headers: {
      "Content-Type": "text/plain",
      "Content-Length": 0,
      "X-GEMINI-APIKEY": gemPub,
      "X-GEMINI-PAYLOAD": balanceRequest.base,
      "X-GEMINI-SIGNATURE": balanceRequest.signature
    }
  };

  return axios.post("https://api.gemini.com/v1/balances", "", config)
};

buyEthOnGemini = () => {
  console.log("\n\n\n\n\n\n\n\nBUY ETH GEMINI: ", (cryptoSocket.Exchanges.gemini.ETHBTC - (0.10 / cryptoSocket.Exchanges.gemini.BTCUSD)).toFixed(5).toString());
  requestBalances()
    .then(balanceArray => {
      let order = signRequest({
        request: "/v1/order/new",
        nonce: n(),
        client_order_id: process.env.GEMINI_CLIENT_ORDER_ID,
        symbol: "ethbtc",
        amount: 0.0294.toString(),
        price: 0.00231.toString(),
        side: "buy",
        type: "exchange limit"
      });

      let config = {
        headers: {
          "Content-Type": "text/plain",
          "Content-Length": 0,
          "X-GEMINI-APIKEY": gemPub,
          "X-GEMINI-PAYLOAD": order.base,
          "X-GEMINI-SIGNATURE": order.signature
        }
      };

      axios
        .post("https://api.gemini.com/v1/order/new", "", config)
        .then(res => {
          console.log(res);
          flag = true;
          loopConditional();
        })
        .catch(err => console.log(err))
    });
}

buyBtcOnGemini = (price) => {
  requestBalances()
    .then(balanceArray => {
      let order = signRequest({
        request: "/v1/order/new",
        nonce: n(),
        client_order_id: process.env.GEMINI_CLIENT_ORDER_ID,
        symbol: "ethbtc",
        amount: balanceArray.data[2].available,
        price: (cryptoSocket.Exchanges.gemini.ETHBTC - (0.10 / cryptoSocket.Exchanges.gemini.BTCUSD)).toFixed(4).toString(),
        side: "sell",
        type: "exchange limit"
      });

      let config = {
        headers: {
          "Content-Type": "text/plain",
          "Content-Length": 0,
          "X-GEMINI-APIKEY": gemPub,
          "X-GEMINI-PAYLOAD": order.base,
          "X-GEMINI-SIGNATURE": order.signature
        }
      };

      axios
        .post("https://api.gemini.com/v1/order/new", "", config)
        .then(res => {
          console.log(res);
          flag = true;
          loopConditional();
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err));
};

withdrawEthOnGemini = () => {
  console.log("\n\n\n\n\n\n\n\nWITHDRAW ETH GEMINI");
  let withdrawRequest = signRequest({
    request: "/v1/withdraw/eth",
    nonce: n(),
    address: gdaxAdd,
    amount: "0.01"
  });

  let config = {
    headers: {
      "Content-Type": "text/plain",
      "Content-Length": 0,
      "X-GEMINI-APIKEY": gemPub,
      "X-GEMINI-PAYLOAD": withdrawRequest.base,
      "X-GEMINI-SIGNATURE": withdrawRequest.signature
    }
  };

  console.log("Config is: ", config);

  axios
    .post("https://api.gemini.com/v1/withdraw/eth", "", config)
    .then(res => {
      console.log(res);
      loopConditional('gdax', 'ETHUSD');
    })
    .catch(err => console.log(err))
};


module.exports = {
  signRequest,
  requestBalances,
  buyEthOnGemini,
  buyBtcOnGemini,
  withdrawEthOnGemini,
};






// BITCOIN ON GEMINI BUY FUNCTION (comment out until gem keys come through)
// buyBtcOnGemini = () => {
//     console.log("PRICE SHOULD BE", cryptoSocket.Exchanges.gemini.ETHBTC - (0.10 / cryptoSocket.Exchanges.gemini.BTCUSD));
//     var order = {
//         request: "/v1/order/new",
//         nonce: n(),
//         client_order_id: `${process.env.GEMINI_CLIENT_ORDER_ID}`,
//         symbol: "ethbtc",
//         amount: "0.0045",
//         price: (cryptoSocket.Exchanges.gemini.ETHBTC - (0.10 / cryptoSocket.Exchanges.gemini.BTCUSD)).toFixed(4).toString(),
//         side: "sell",
//         type: "exchange limit",
//     }

//     let base = btoa(JSON.stringify(order));
//     var hmac = createHmac('sha384', process.env.gemPriv);
//     hmac.update(base);
//     let signature = hmac.digest('hex');

//     let config = {
//       headers: {
//         "Content-Type": "text/plain",
//         "Content-Length": 0,
//         "X-GEMINI-APIKEY": process.env.gemPub,
//         "X-GEMINI-PAYLOAD": base,
//         "X-GEMINI-SIGNATURE": signature
//       }
//     }

//     axios.post("https://api.gemini.com/v1/order/new", "", config)
//       .then(res => {
//         console.log(res);
//       })
//       .catch(err => {
//         console.log(err);
//       })
// }
