//GDAX API DOCS LINK
//https://docs.gdax.com/#signing-a-message
require("dotenv").load();
const btoa = require("btoa");
const crypto = require('crypto');
const createHmac = require("create-hmac");
const n = require("nonce")();
const axios = require("axios");
var Client = require('coinbase').Client;
var client = new Client({'apiKey': process.env.COINBASE_API_KEY, 'apiSecret': process.env.COINBASE_API_KEY_SECRET});
let loopConditional = require('../index').loopConditional;
var cryptoSocket = require("crypto-socket");

signGdaxRequest = (timestamp, method, reqPath, reqBody) => {
  var what = timestamp + method + reqPath + JSON.stringify(reqBody);
  var key = Buffer(process.env.GDAX_API_KEY_SECRET, 'base64');
  var hmac = crypto.createHmac('sha256', key);
  return hmac.update(what).digest('base64');
}


buyEthOnGdax = () => {
  console.log("BUY ETH ON GDAX");
  flag = true;
  loopConditional('gdax', 'ETHUSD');
};


// buyBtcOnGdax = () => {
//   console.log("BUY BTC ON GDAX");
//   flag = true;
//   loopConditional();
// };


withdrawEthOnGdax = () => {
  //Dave use this to find account id's for each wallet on coinbase then comment it out or remove it lol
  // client.getAccounts({}, function(err, accounts) {
  //   console.log(accounts);
  // });

  let bod =
  {
    "amount": 0.01,
    "currency": "ETH",
    "coinbase_account_id": process.env.COINBASE_ETH_WALLET_ACCOUNT_ID
  };

  let timestamp = (Date.now()/1000);

  let withdrawGdaxRequest = signGdaxRequest(timestamp, 'POST', '/withdrawals/coinbase', bod);

  console.log(withdrawGdaxRequest);

  config = {
    headers: {
      'Content-Type': 'application/json',
      'CB-ACCESS-KEY': process.env.GDAX_API_KEY,
      'CB-ACCESS-SIGN': withdrawGdaxRequest,
      'CB-ACCESS-TIMESTAMP': timestamp,
      'CB-ACCESS-PASSPHRASE': process.env.GDAX_API_KEY_PASSPHRASE
    }
  };

  console.log("Config is: ", config);

  axios.post('https://api.gdax.com/withdrawals/coinbase', "", config)
    .then(res => {
      console.log("FUNDS GOT INTO COINBASE ETH WALLET: ", res);
      return;
      loopConditional('gdax', 'ETHUSD');
    })
    .catch(err => console.log("SOMETHING WENT WRONG: ", err));
};

// withdrawBtcOnGdax = () => {
//   console.log("WITHDRAW BTC GDAX");
//   flag = true;
//   loopConditional();
// };


module.exports = {
  buyEthOnGdax,
  // buyBtcOnGdax,
  withdrawEthOnGdax,
  // withdrawBtcOnGdax
};
