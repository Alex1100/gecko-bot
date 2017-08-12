//GDAX API DOCS LINK
//https://docs.gdax.com/#signing-a-message
require("dotenv").load();
const btoa = require("btoa");
const crypto = require('crypto');
const createHmac = require("create-hmac");
const n = require("nonce")();
const axios = require("axios");
var apiURI = 'https://api.gdax.com';
var cryptoSocket = require("crypto-socket");
let loopConditional = require('../index');

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
async function buy(exchange, currency) {
  //Maker: 0%
  //Taker 0.3%
  let upCurr = currency.toUpperCase();
  let amount = await requestBalances();
  let ethAmount = amount.ETH;
  let btcAmount = amount.BTC;
  const pairs = {
    ETH: {
      buy: (exchange, currency) => {
        let axiosBod = {
          "size": ethAmount,
          "price": price,
          "side": 'buy',
          "product_id": "ETH-BTC",
          "time_in_force": "GTT",
          "cancel_after": 10
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
            console.log(`${ethAmount} BTC bought at ${price}\n\n`, res);
            //need to put this in different scope...
            loopConditional.loopConditional(exchange, upCurr + 'USD');
          })
          .catch(err => {
            console.log("SOMETHING WENT WRONG BECAUSE: ", err);
            loopConditional.loopConditional(exchange, upCurr + 'USD');
          });
        }
    },
    BTC: {
      buy: (exchange, currency) => {
      let axiosBod = {
        "size": btcAmount,
        "price": price,
        "side": 'sell',
        "product_id": "ETH-BTC",
        "time_in_force": "GTT",
        "cancel_after": 10
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
            console.log(`${btcAmount} ETH bought at ${price}\n\n`, res);
            loopConditional.loopConditional(exchange, upCurr + 'USD');
        })
        .catch(err => {
          console.log("SOMETHING WENT WRONG BECAUSE: ", err);
          loopConditional.loopConditional(exchange, upCurr + 'USD');
        });
      }
  }
};

pairs[currency].buy(exchange, currency);
};


//works
async function withdraw(exchange, currency) {
  let total = await requestBalances();
  let etcAmount = total.ETH;
  let btcAmount = total.BTC;
  let address = exchange.toUpperCase() + '_' + currency.toUpperCase() + '_DEPOSIT_ADDRESS';
  let upCurr = currency.toUpperCase();

  var axiosBod = {
    "amount": currency === 'ETH' ? etcAmount : btcAmount,
    "currency": currency,
    "crypto_address": process.env.address
  };

  var body = JSON.stringify(axiosBod);
  var timestamp = (Date.now()/1000).toString();
  let withdrawGdaxRequest = signGdaxRequest(timestamp, "POST", "/withdrawals/crypto", body);

  var instance = axios.create({
    headers: {
      "Content-Type": "application/json",
      "CB-ACCESS-KEY": process.env.GDAX_API_KEY,
      "CB-ACCESS-SIGN": withdrawGdaxRequest.signature,
      "CB-ACCESS-PASSPHRASE": process.env.GDAX_API_KEY_PASSPHRASE,
      "CB-ACCESS-TIMESTAMP": withdrawGdaxRequest.timestampeh,
    },
    baseURL: apiURI,
    data: axiosBod
  });

  console.log("Instance is: ", instance);

  instance.post("/withdrawals/crypto")
    .then(res => {
      console.log(`${axiosBod['amount']} ${currency} GOT INTO ${exchange} WALLET AT ${axiosBod['address']}\n\n`, res);
      loopConditional.loopConditional(exchange, upCurr + 'USD');
    })
    .catch(err => {
      console.log("SOMETHING WENT WRONG BECAUSE: ", err);
      loopConditional.loopConditional(exchange, upCurr + 'USD');
    });
};

//works
requestBalances = (exchange, currency) => {
  var timestamp = (Date.now()/1000).toString();
  let accountsGdaxRequest = signGdaxRequest(timestamp, "GET", "/accounts", "");
  let upCurr = currency.toUpperCase();

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
      loopConditional.loopConditional(exchange, upCurr + 'USD');
    })
}



module.exports = {
  buy,
  withdraw,
  requestBalances
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
