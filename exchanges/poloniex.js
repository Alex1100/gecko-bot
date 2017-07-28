//DAVES CODE
require("dotenv").load();
//const Poloniex = require("poloniex.js");
const axios = require("axios");
//const poloniex = new Poloniex(process.env.POLO_PUB, process.env.POLO_PRIV);
const Poloniex = require('poloniex-api-node');
let poloniex = new Poloniex(process.env.POLONIEX_API_KEY, process.env.POLONIEX_SECRET, { socketTimeout: 15000 });
let btcAddress = process.env.POLONIEX_BTC_ADDRESS;
let ethAddress = process.env.POLONIEX_ETH_ADDRESS;

requestBalances = () => {
  return new Promise((resolve, reject) => {
    poloniex.returnBalances((err, data) => {
      if (err) {
        console.log("err: ", err)
        reject(err);
      } else {
        console.log("DATA IS: ", data);
        resolve(data);
      }
    });
  });
};

buy = (currency, price) => {
  currency = currency.toUpperCase();
  module.exports.requestBalances().then(balancesObj => {
    const pairs = {
      ETH: {
        buy: () =>
          poloniex.buy("BTC", currency, price, balancesObj.BTC / price, (err, data) => {
              if (err) {
                console.log(err);
              } else {
                console.log(data);
              }
            })
      },
      BTC: {
        buy: () =>
          poloniex.sell(currency, "ETH", price, balancesObj.ETH, (err, data) => {
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
};

withdraw = (currency, exchange) => {
  currency = currency.toUpperCase();
  module.exports.requestBalances().then(balancesObj => {
    poloniex.withdraw(
      currency,
      balancesObj[currency],
      exchange[currency.toLowerCase() + "Address"],
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
      }
    );
  });
};

module.exports = {
  btcAddress,
  ethAddress,
  requestBalances,
  buy,
  withdraw
}




//CODE FROM ALEX
// require("dotenv").load();
// const btoa = require("btoa");
// const createHmac = require("create-hmac");
// const n = require("nonce")();
// const axios = require("axios");
// let loopConditional = require('../index').loopConditional;
// const Poloniex = require('poloniex-api-node');
// let poloniex = new Poloniex(process.env.POLONIEX_API_KEY, process.env.POLONIEX_SECRET, { socketTimeout: 15000 });
// let cryptoSocket = require("crypto-socket");

// const API_KEYS = {
//   poloniex: {
//     api_key: process.env.POLONIEX_API_KEY,
//     secret: process.env.POLONIEX_SECRET,
//     ETH: process.env.POLONIEX_ETH_ADDRESS,
//     BTC: process.POLONIEX_BTC_ADDRESS
//   },
//   gemini: {
//     api_key: process.env.gemPub,
//     secret: process.env.gemPriv,
//     client_order_id: process.env.GEMINI_CLIENT_ORDER_ID,
//     ETH: process.env.GEMINI_ETH_DEPOSIT_ADDRESS,
//     BTC: process.env.GEMINI_BTC_DEPOSIT_ADDRESS
//   },
//   gdax: {
//     api_key: process.env.GDAX_API_KEY,
//     secret: process.env.GDAX_API_KEY_SECRET,
//     passphrase: process.env.GDAX_API_KEY_PASSPHRASE,
//     ETH: process.env.GDAX_ETH_DEPOSIT_ADDRESS,
//     BTC: process.env.GDAX_BTC_DEPOSIT_ADDRESS
//   },
//   bittrex: {
//     api_key: process.env.BITTREX_API_KEY,
//     secret: process.env.BITTREX_API_KEY_SECRET,
//     ETH: process.env.BITTREX_ETH_WALLET_ADDRESS,
//     BTC: process.env.BITTREX_BTC_WALLET_ADDRESS
//   },
//   bitfinex: {
//     api_key: process.env.BITFINEX_API_KEY,
//     secret: process.env.BITFINEX_API_KEY_SECRET,
//     ETH: process.env.BITFINEX_ETH_EXCHANGE_WALLET_ADDRESS,
//     BTC: process.env.BITFINEX_BTC_EXCHANGE_WALLET_ADDRESS
//   }
// };

// signRequest = request => {
//   let base = btoa(JSON.stringify(request));
//   let hmac = createHmac("sha512", process.env.POLONIEX_SECRET);
//   hmac.update(base);
//   let signature = hmac.digest("hex");
//   return { base, signature };
// };

// poloniexFeeInfo = () => {
//   poloniex.returnFeeInfo();
// }

// buyOnPoloniex = () => {
//   console.log("BUY ETH ON POLONIEX");
//   poloniexFeeInfo().then(fee => {
//     console.log(fee);
//     loopConditional();
//   })
// };

// buyBtcOnPoloniex = () => {
//   console.log("BUY BTC ON POLONIEX");
//   poloniexFeeInfo().then(fee => {
//     console.log(fee);
//     loopConditional();
//   })
// };

// withdrawFromPoloniex = (amount, address) => {
//   console.log("WITHDRAW ETH POLONIEX");
//   poloniex.withdraw('ETH', amount, address).then(res => {
//     console.log(`SUCCESSFULLY WITHDREW ${amount} ETH from POLONIEX to ${address}`);
//   })
//   .catch(err => {
//     console.log("FAILED TO WITHDRAW BECAUSE: ", err);
//   })
// };

// withdrawBtcOnPoloniex = () => {
//   console.log("WITHDRAW BTC POLONIEX");
//   poloniex.withdraw('BTC', amount, address).then(res => {
//     console.log(`SUCCESSFULLY WITHDREW ${amount} BTC from POLONIEX to ${address}`);
//   })
//   .catch(err => {
//     console.log("FAILED TO WITHDRAW BECAUSE: ", err);
//   })
// };

// returnBalancesPoloniex = () => {
//   var poloBalances = {
//     "ETH": 0,
//     "BTC": 0,
//   };

//   poloniex.returnBalances().then((balances) => {
//     poloBalances.ETH = balances['ETH'];
//     poloBalances.BTC = balances['BTC'];
//     console.log(poloBalances);
//   }).catch((err) => {
//     console.log(err.message);
//   });


//   return;
//   //need to figure out hmac 512 and signature format for node
//   let returnBalanceReqPolo = signRequest({
//     "command": "returnBalance",
//     "account": "all"
//   });

//   let payload = {
//     "command": "returnBalance",
//     "account": "all"
//   };

//   let config = {
//     headers: {
//       "Content-Type": "application/json",
//       nonce: n(),
//       "KEY": process.env.POLONIEX_API_KEY,
//       "SIGN": returnBalanceReqPolo.signature
//     }
//   };

//   // let payload = {
//   //   "command": "returnBalance",
//   //   "accont": "all"
//   // }

//    axios.post("https://poloniex.com/tradingApi?command=returnBalances", payload, config)
//     .then(res => {
//       console.log(res);
//     })
//     .catch(err => console.log("SOMETHING WEN WRONG WITH POLO BECAUSE: ", err));
// }

// returnPoloAddresses = () => {
//   poloniex.returnDepositAddresses().then(addresses => {
//     console.log(addresses);
//   })
//   .catch(err => {
//     console.log(err);
//   })
// }

// createNewPoloniexCurrencyAddress = (currency) => {
//   //ETH or BTC for currency example
//   poloniex.generateNewAddress(currency.toUpperCase()).then(address => {
//     console.log(address);
//   })
//   .catch(err => console.log(err));
// }

// module.exports = {
//   buyOnPoloniex,
//   withdrawFromPoloniex,
//   returnBalancesPoloniex,
//   returnPoloAddresses,
//   createNewPoloniexCurrencyAddress
// };
