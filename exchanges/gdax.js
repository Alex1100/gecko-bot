//GDAX API DOCS LINK
//https://docs.gdax.com/#signing-a-message
require("dotenv").load();
const btoa = require("btoa");
const crypto = require('crypto');
const createHmac = require("create-hmac");
const n = require("nonce")();
const axios = require("axios");
let loopConditional = require('../index').loopConditional;
var apiURI = 'https://api.gdax.com';
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

//works
signGdaxRequest = (timestamp, method, reqPath, reqBody) => {
  var timestampeh = timestamp;
  var prehashString = (timestamp + method + reqPath + reqBody);
  console.log(prehashString);
  var key = Buffer(process.env.GDAX_API_KEY_SECRET, 'base64');
  var hmac = crypto.createHmac('sha256', key);
  var signature = hmac.update(prehashString).digest('base64');
  return { signature, timestampeh };
}

//works but test it out the inner functions work, I just used your setup to
//keep the function signature consistent
buy = (currency) => {
  currency = currency.toUpperCase();
  requestBalances().then(balancesObj => {
    const pairs = {
      ETH: {
        buy: () => {
          let axiosBod = {
            "size": size,
            "price": price,
            "side": 'buy',
            "product_id": "ETH-BTC"
          };

          let body = JSON.stringify(axiosBod);
          var timestamp = (Date.now()/1000).toString();
          let buyGdaxRequest = signGdaxRequest(timestamp, "POST", "/orders", body);

          var instance = axios.create({
            headers: {
              "Content-Type": "application/json",
              "CB-ACCESS-KEY": process.env.GDAX_API_KEY,
              "CB-ACCESS-SIGN": buyGdaxRequest.signature,
              "CB-ACCESS-PASSPHRASE": process.env.GDAX_API_KEY_PASSPHRASE,
              "CB-ACCESS-TIMESTAMP": buyGdaxRequest.timestampeh,
            },
            baseURL: apiURI,
            data: axiosBod
          });

          console.log("Instance is: ", instance);

          instance.post("/orders")
            .then(res => {
                console.log(`${size} BTC bought at ${price}\n\n`, res);
                return;
                loopConditional('gdax', 'BTCUSD');
            })
            .catch(err => {console.log("SOMETHING WENT WRONG BECAUSE: ", err)});
          }
      },
      BTC: {
        buy: () => {
        let axiosBod = {
          "size": size,
          "price": price,
          "side": 'sell',
          "product_id": "ETH-BTC"
        };

        let body = JSON.stringify(axiosBod);
        var timestamp = (Date.now()/1000).toString();
        let buyGdaxRequest = signGdaxRequest(timestamp, "POST", "/orders", body);

        var instance = axios.create({
          headers: {
            "Content-Type": "application/json",
            "CB-ACCESS-KEY": process.env.GDAX_API_KEY,
            "CB-ACCESS-SIGN": buyGdaxRequest.signature,
            "CB-ACCESS-PASSPHRASE": process.env.GDAX_API_KEY_PASSPHRASE,
            "CB-ACCESS-TIMESTAMP": buyGdaxRequest.timestampeh,
          },
          baseURL: apiURI,
          data: axiosBod
        });

        console.log("Instance is: ", instance);

        instance.post("/orders")
          .then(res => {
              console.log(`${size} ETH bought at ${price}\n\n`, res);
              return;
              loopConditional('gdax', 'ETHUSD');
          })
          .catch(err => {console.log("SOMETHING WENT WRONG BECAUSE: ", err)});
        }
    }
  };

  pairs[currency].buy();
  });
};


//works
withdraw = (exchange, amount, currency, address) => {
  var axiosBod = {
    "amount": amount,
    "currency": currency,
    "crypto_address": address,
  };

  var body = JSON.stringify(axiosBod);
  var timestamp = (Date.now()/1000).toString();
  let withdrawGdaxRequest = signGdaxRequest(timestamp, "POST", "/withdrawals/crypto", body);

  var instance = axios.create({
    headers: {
      "Content-Type": "application/json",
      "CB-ACCESS-KEY": process.env.GDAX_API_KEY,
      "CB-ACCESS-SIGN": buyGdaxRequest.signature,
      "CB-ACCESS-PASSPHRASE": process.env.GDAX_API_KEY_PASSPHRASE,
      "CB-ACCESS-TIMESTAMP": buyGdaxRequest.timestampeh,
    },
    baseURL: apiURI,
    data: axiosBod
  });

  console.log("Instance is: ", instance);

  instance.post("/withdrawals/crypto")
    .then(res => {
      console.log(`${amount} ${currency} GOT INTO ${exchange} WALLET AT ${address}\n\n`, res);
      return;
      loopConditional(exchange, currency.toUpperCase() + 'USD');
    })
    .catch(err => {console.log("SOMETHING WENT WRONG BECAUSE: ", err)});
};

//works
getGdaxAccountInfo = (currency) => {
  var timestamp = (Date.now()/1000).toString();
  let accountsGdaxRequest = signGdaxRequest(timestamp, "GET", "/accounts", "");

  var instance = axios.create({
    headers: {
      "Content-Type": "application/json",
      "CB-ACCESS-KEY": process.env.GDAX_API_KEY,
      "CB-ACCESS-SIGN": accountsGdaxRequest.signature,
      "CB-ACCESS-PASSPHRASE": process.env.GDAX_API_KEY_PASSPHRASE,
      "CB-ACCESS-TIMESTAMP": accountsGdaxRequest.timestampeh
    },
    baseURL: apiURI
  });

  console.log("Instance is: ", instance);

  instance.get('/accounts')
    .then(res => {
      var a = res.data.filter(account => account.currency === currency)[0];
      var id = a.id;
      var balance = a.balance;
      var available = a.available;
      var holding = a.hold
      console.log(`abc is: `, { id, balance, available, holding });
      return { id, balance, available, holding };
    })
    .catch(err => {
      console.log(err => console.log("SOMETHING WENT WRONG: ", err));
    })
}



module.exports = {
  buy,
  withdraw,
  getGdaxAccountInfo,
};





//works
// buy = (size, price, side) => {
//   //currency pair is ETH-BTC
//   let axiosBod = {
//     "size": size,
//     "price": price,
//     "side": side,
//     "product_id": "ETH-BTC"
//   };

//   let body = JSON.stringify(axiosBod);
//   var timestamp = (Date.now()/1000).toString();
//   let buyGdaxRequest = signGdaxRequest(timestamp, "POST", "/orders", body);

//   var instance = axios.create({
//     headers: {
//       "Content-Type": "application/json",
//       "CB-ACCESS-KEY": process.env.GDAX_API_KEY,
//       "CB-ACCESS-SIGN": buyGdaxRequest.signature,
//       "CB-ACCESS-PASSPHRASE": process.env.GDAX_API_KEY_PASSPHRASE,
//       "CB-ACCESS-TIMESTAMP": buyGdaxRequest.timestampeh,
//     },
//     baseURL: apiURI,
//     data: axiosBod
//   });

//   console.log("Instance is: ", instance);

//   instance.post("/orders")
//     .then(res => {
//       if(side === 'buy'){
//         console.log(`${size} BTC bought at ${price}\n\n`, res);
//         return;
//         loopConditional('gdax', 'BTCUSD');
//       } else {
//         console.log(`${size} ETH bought at ${price}\n\n`, res);
//         return;
//         loopConditional('gdax', 'ETHUSD');
//       }
//     })
//     .catch(err => {console.log("SOMETHING WENT WRONG BECAUSE: ", err)});

  //OLD WAY WORKS JUST FINE

  // config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //     "CB-ACCESS-KEY": process.env.GDAX_API_KEY,
  //     "CB-ACCESS-SIGN": buyGdaxRequest.signature,
  //     "CB-ACCESS-PASSPHRASE": process.env.GDAX_API_KEY_PASSPHRASE,
  //     "CB-ACCESS-TIMESTAMP": buyGdaxRequest.timestampeh,
  //   }
  // };

  //console.log("Config is: ", config);

  // axios.post('https://api.gdax.com/orders', axiosBod, config)
  //   .then(res => {
  //     if(side === 'buy'){
  //       console.log(`${size} BTC bought at ${price}\n\n`, res);
  //       return;
  //       loopConditional('gdax', 'BTCUSD');
  //     } else {
  //       console.log(`${size} ETH bought at ${price}\n\n`, res);
  //       return;
  //       loopConditional('gdax', 'ETHUSD');
  //     }
  //   })
  //   .catch(err => console.log("SOMETHING WENT WRONG: ", err));
//}





//CODE GRAVEYARD ALL WORKS BUT NOT NEEDED... YET..

// var Gdax = require('gdax');
// var Client = require('coinbase').Client;
// var client = new Client({'apiKey': process.env.COINBASE_API_KEY, 'apiSecret': process.env.COINBASE_API_KEY_SECRET});
// var authedClient = new Gdax.AuthenticatedClient(process.env.GDAX_API_KEY, Buffer(process.env.GDAX_API_KEY_SECRET, 'base64'), process.env.GDAX_API_KEY_PASSPHRASE, apiURI);

// withdrawEthToCoinbase = () => {
//   //Dave use this to find account id's for each wallet on coinbase then comment it out or remove it lol
//   client.getAccounts({}, function(err, accounts) {
//     console.log(accounts);
//   });

//   //for this coinbase account id just go to your coinbase wallet
//   //and it's in the path in the URI/URL
//   //just copy paste it into the .env file brodie
//   var withdrawParamsETH = {
//     'amount': '0.01',
//     'coinbase_account_id': process.env.COINBASE_ETH_WALLET_ACCOUNT_ID,
//   }

//   var withdrawParamsEthTwo = {
//     "amount": '0.01',
//     "currency": 'ETH',
//     "crypto_address": process.env.GEMINI_ETH_DEPOSIT_ADDRESS
//   }

//   var callback = function(err, response, data) {
//     if(err) { console.log(err)};
//     if(response){
//       console.log(response);
//       console.log("\n\n\n\n\nTHIS IS THE DATA: ", data);
//     }
//   };

//   authedClient.withdraw(withdrawParamsEthTwo, callback);
// }

// withdrawBtcToCoinbase = () => {
//   //Dave use this to find account id's for each wallet on coinbase then comment it out or remove it lol
//   client.getAccounts({}, function(err, accounts) {
//     console.log(accounts);
//   });

//   //for this coinbase account id just go to your coinbase wallet
//   //and it's in the path in the URI/URL
//   //just copy paste it into the .env file brodie
//   var withdrawParamsETH = {
//     'amount': '0.01',
//     'coinbase_account_id': process.env.COINBASE_ETH_WALLET_ACCOUNT_ID,
//   }

//   var withdrawParamsEthTwo = {
//     "amount": '0.01',
//     "currency": 'BTC',
//     "crypto_address": process.env.GEMINI_ETH_DEPOSIT_ADDRESS
//   }

//   var callback = function(err, response, data) {
//     if(err) { console.log(err)};
//     if(response){
//       console.log(response);
//       console.log("\n\n\n\n\nTHIS IS THE DATA: ", data);
//     }
//   };

//   authedClient.withdraw(withdrawParamsEthTwo, callback);
// }


//works
// getFundingInfo = () => {
//   var callback = function(err, response, data) {
//     if(err) { console.log(err)};
//     if(response){
//       console.log(response);
//       console.log("\n\n\n\n\nTHIS IS THE DATA: ", data);
//     }
//   };

//   authedClient.getFundings(callback);
//   return;
// }



//works
// getAccountInfo = (currency) => {
//   var callback = function(err, response, data) {
//     if(err) { console.log(err)};
//     if(response){
//       var a = data.filter(account => account.currency === currency)[0];
//       var id = a.id;
//       var balance = a.balance;
//       var available = a.available;
//       var holding = a.hold
//       console.log(`abc is: `, { id, balance, available, holding });
//       return { id, balance, available, holding };
//     }
//   };
//   authedClient.getAccounts(callback);
// }
