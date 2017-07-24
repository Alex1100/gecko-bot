require("dotenv").load();
const gemPub = process.env.GEMINI_PUB;
const gemPriv = process.env.GEMINI_PRIV;
const btoa = require("btoa");
const createHmac = require("create-hmac");
const n = require("nonce")();
const axios = require("axios");
let loopConditional = require('../index').loopConditional;

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
  console.log("BUY ETH GEMINI");
  flag = true;
  loopConditional();
};

buyBtcOnGemini = (price) => {
  requestBalances()
    .then(balanceArray => {
      let order = signRequest({
        request: "/v1/order/new",
        nonce: n(),
        client_order_id: process.env.GEMINI_CLIENT_ORDER_ID,
        symbol: "ethbtc",
        amount: balanceArray.data[2].available,
        price,
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
  console.log("WITHDRAW ETH GEMINI");
  flag = true;
  loopConditional();
};

withdrawBtcOnGemini = () => {
  console.log("WITHDRAW BTC GEMINI");
  flag = true;
  loopConditional();
};

module.exports = {
  signRequest,
  requestBalances,
  buyEthOnGemini,
  buyBtcOnGemini,
  withdrawEthOnGemini,
  withdrawBtcOnGemini
};






//BITCOIN ON GEMINI BUY FUNCTION (comment out until gem keys come through)
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
