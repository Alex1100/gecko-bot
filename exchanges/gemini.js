require("dotenv").load();
const gemPub = process.env.gemPub;
const gemPriv = process.env.gemPriv;
const btoa = require("btoa");
const createHmac = require("create-hmac");
const n = require("nonce")();
const axios = require("axios");
var cryptoSocket = require("crypto-socket");
var loopConditional = require('../index');

signRequest = request => {
  let base = btoa(JSON.stringify(request));
  let hmac = createHmac("sha384", gemPriv);
  hmac.update(base);
  let signature = hmac.digest("hex");
  return { base, signature };
};

//works
requestBalances = (exchange, currency) => {
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

  axios.post("https://api.gemini.com/v1/balances", "", config)
    .then(data => {
      console.log("DATA IS: ", data)
      return data;
    })
};

async function buy(exchange, currency) {
  // Fees are
  // Maker: 0.25%
  // Taker: 0.25%
  let total = await requestBalances(exchange, currency);
  let ethAmount = total.ETH;
  let btcAmount = total.BTC;
  let currAmount;
  let side;
  let price;
  let amount;
  console.log({eth: ethAmount, btc: btcAmount});

  if (currency === 'ETH') {
    currAmount = ethAmount.toString();
    side = "buy";
    price = 0.00231.toString();
    amount = ethAmount;
  } else if (currency === 'BTC') {
    currAmount = btcAmount.toString();
    side = "sell";
    price = (cryptoSocket.Exchanges.gemini.ETHBTC - (0.10 / cryptoSocket.Exchanges.gemini.BTCUSD)).toFixed(4).toString();
    amount = btcAmount;
  }

  let lcCurr = currency.toLowerCase();
  let upCurr = currency.toUpperCase();

  let order = signRequest({
        request: "/v1/order/new",
        nonce: n(),
        client_order_id: process.env.GEMINI_CLIENT_ORDER_ID,
        symbol: "ethbtc",
        amount: amount,
        price: price,
        side: side,
        type: "exchange limit"
      });



  axios.post("https://api.gemini.com/v1/order/new", "", order)
    .then(res => {
      console.log(res);
      let orderStatus = signRequest({
        request: "/v1/order/status",
        nonce: n(),
        order_id: res.order_id
      });

      let cancelOrder = signRequest({
        request: "/v1/order/cancel",
        nonce: n(),
        order_id: res.order_id
      });

      let orderCounter = 0;


      setInterval(() => {
        axios.post("https://api.gemini.com/v1/order/status", "", orderStatus)
          .then((stat) => {
            console.log("THE STATUS OF THE PREVIOUSLY EXECUTED ORDER IS: ", stat.is_live);
            console.log("THE REMAINING AMOUNT LEFT TO BE EXECUTED IS: ", stat.remaining_amount);
            if(stat.remaining_amount === 0){
              loopConditional.loopConditional(exchange, upCurr + 'USD');
            } else if(orderCounter === 9) {
              axios.post("https://api.gemini.com/v1/order/cancel", "", cancelOrder)
                .then((cancelled) => {
                  console.log(`ORDER ${res.order_id} HAS BEEN CANCELLED`);
                  loopConditional.loopConditional(exchange, upCurr + 'USD');
                })
                .catch((err) => {
                  console.log(`COULD NOT CANCEL ORDER ${res.order_id} BECAUSE ${err}`);
                  loopConditional.loopConditional(exchange, upCurr + 'USD');
                });
            } else {
              orderCounter++;
            }
          })
          .catch(err => {
            console.log("COULDN'T GET THE ORDER'S STATUS: ", err);
            loopConditional.loopConditional(exchange, upCurr + 'USD');
        });
      }, 60000);
    })
    .catch(err => {
      console.log(err);
      loopConditional.loopConditional(exchange, upCurr + 'USD');
    })
}

//works
// buyEthOnGemini = () => {


//   console.log("\n\n\n\n\n\n\n\nBUY ETH GEMINI: ", (cryptoSocket.Exchanges.gemini.ETHBTC - (0.10 / cryptoSocket.Exchanges.gemini.BTCUSD)).toFixed(5).toString());
//   requestBalances()
//     .then(balanceArray => {
//       let order = signRequest({
//         request: "/v1/order/new",
//         nonce: n(),
//         client_order_id: process.env.GEMINI_CLIENT_ORDER_ID,
//         symbol: "ethbtc",
//         amount: 0.0294.toString(),
//         price: 0.00231.toString(),
//         side: "buy",
//         type: "exchange limit"
//       });

//       let config = {
//         headers: {
//           "Content-Type": "text/plain",
//           "Content-Length": 0,
//           "X-GEMINI-APIKEY": gemPub,
//           "X-GEMINI-PAYLOAD": order.base,
//           "X-GEMINI-SIGNATURE": order.signature
//         }
//       };

//       axios
//         .post("https://api.gemini.com/v1/order/new", "", config)
//         .then(res => {
//           console.log(res);
//           flag = true;
//           loopConditional();
//         })
//         .catch(err => console.log(err))
//     });
// }

//works
// buyBtcOnGemini = (price) => {
//   requestBalances()
//     .then(balanceArray => {
//       let order = signRequest({
//         request: "/v1/order/new",
//         nonce: n(),
//         client_order_id: process.env.GEMINI_CLIENT_ORDER_ID,
//         symbol: "ethbtc",
//         amount: balanceArray.data[2].available,
//         price: (cryptoSocket.Exchanges.gemini.ETHBTC - (0.10 / cryptoSocket.Exchanges.gemini.BTCUSD)).toFixed(4).toString(),
//         side: "sell",
//         type: "exchange limit"
//       });

//       let config = {
//         headers: {
//           "Content-Type": "text/plain",
//           "Content-Length": 0,
//           "X-GEMINI-APIKEY": gemPub,
//           "X-GEMINI-PAYLOAD": order.base,
//           "X-GEMINI-SIGNATURE": order.signature
//         }
//       };

//       axios
//         .post("https://api.gemini.com/v1/order/new", "", config)
//         .then(res => {
//           console.log(res);
//           flag = true;
//           loopConditional();
//         })
//         .catch(err => console.log(err))
//     })
//     .catch(err => console.log(err));
// };

async function withdraw(exchange, currency) {
  //ALL WITHDRAWL AND DEPOSITS ARE FREE

  //ETH TAKES 10 MINUTES MAX TO LAND
  //BTC TAKES 2 HOURS MAX TO LAND

  //JUST TESTED AND IT TOOK 11 MINUTES FOR BITCOIN TO LAND IN GEMINI FROM GDAX
  //JUST TESTED AND IT TOOK 1 HOUR AND 10 MINUTES FOR BITCOIN TO LAND FROM GEMINI TO GDAX

  let amount = await requestBalances(exchange, currency);
  let ethAmount = amount.ETH;
  let btcAmount = amount.BTC;
  let currAmount;
  let address = exchange.toUpperCase() + '_' + currency.toUpperCase() + '_DEPOSIT_ADDRESS';

  console.log({eth: ethAmount, btc: btcAmount})
  if (currency === 'ETH') {
    currAmount = ethAmount.toString();
  } else if (currency === 'BTC') {
    currAmount = btcAmount.toString();
  }

  let lcCurr = currency.toLowerCase();
  let upCurr = currency.toUpperCase();

  let withdrawRequest = signRequest({
    request: `/v1/withdraw/${lcCurr}`,
    nonce: n(),
    address: process.env.address,
    amount: currAmount
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
    .post(`https://api.gemini.com/v1/withdraw/${lcCurr}`, "", config)
    .then(res => {
      console.log(res);
      loopConditional.loopConditional(exchange, upCurr + 'USD');
    })
    .catch(err => {
      console.log(err);
      loopConditional.loopConditional(exchange, upCurr + 'USD');
    })
};


module.exports = {
  requestBalances,
  buy,
  withdraw
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
