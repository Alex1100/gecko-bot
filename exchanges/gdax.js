//GDAX API DOCS LINK
//https://docs.gdax.com/#signing-a-message
require("dotenv").load();
const btoa = require("btoa");
const crypto = require('crypto');
const createHmac = require("create-hmac");
const n = require("nonce")();
const axios = require("axios");
var Gdax = require('gdax');
var Client = require('coinbase').Client;
var client = new Client({'apiKey': process.env.COINBASE_API_KEY, 'apiSecret': process.env.COINBASE_API_KEY_SECRET});
let loopConditional = require('../index').loopConditional;
var apiURI = 'https://api.gdax.com';
var cryptoSocket = require("crypto-socket");

var authedClient = new Gdax.AuthenticatedClient(process.env.GDAX_API_KEY, Buffer(process.env.GDAX_API_KEY_SECRET, 'base64'), process.env.GDAX_API_KEY_PASSPHRASE, apiURI);

signGdaxRequest = (timestamp, method, reqPath, reqBody) => {
  var prehashString = (timestamp + method + reqPath + reqBody);
  console.log(prehashString);
  var key = Buffer(process.env.GDAX_API_KEY_SECRET, 'base64');
  var hmac = crypto.createHmac('sha256', key);
  return hmac.update(prehashString).digest('base64');
}

// signGdaxRequestTwo = (timestamp, method, reqPath, reqBody) => {
//   let base = (timestamp + method + reqPath + reqBody);
//   let hmac = createHmac("sha256", process.env.ALT_GDAX_KEY_SECRET);
//   hmac.update(base);
//   let signature = hmac.digest("hex");
//   return signature;
// };


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

  //for this coinbase account id just go to your coinbase wallet
  //and it's in the path in the URI/URL
  //just copy paste it into the .env file brodie
  var withdrawParamsETH = {
    'amount': '0.01',
    'coinbase_account_id': process.env.COINBASE_ACCOUNT_ID,
  }

  var callback = function(err, response, data) {
    if(err) { console.log(err)};
    if(response){
      console.log(response);
      console.log("\n\n\n\n\nTHIS IS THE DATA: ", data);
    }
  };

  authedClient.withdraw(withdrawParamsETH, callback);
  //now it's in coinbase and from coinbase we need to send it to GEMINI



  return;

  //fancier code but signature is wrong
  // var body = JSON.stringify({
  //   "amount": 0.01,
  //   "currency": "ETH",
  //   "coinbase_account_id": process.env.COINBASE_ETH_WALLET_ACCOUNT_ID,
  // });

  // var timestamp = (Date.now()/1000).toString();
  // let withdrawGdaxRequest = signGdaxRequest(timestamp, "POST", "/withdrawals/coinbase", body);

  // config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //     "CB-ACCESS-KEY": process.env.GDAX_API_KEY,
  //     "CB-ACCESS-SIGN": withdrawGdaxRequest,
  //     "CB-ACCESS-PASSPHRASE": process.env.GDAX_API_KEY_PASSPHRASE,
  //     "CB-ACCESS-TIMESTAMP": timestamp,
  //   }
  // };

  // console.log("Config is: ", config);

  // axios.post('https://api.gdax.com/withdrawals/coinbase', "", config)
  //   .then(res => {
  //     console.log("FUNDS GOT INTO COINBASE ETH WALLET: ", res);
  //     loopConditional('gdax', 'ETHUSD');
  //   })
  //   .catch(err => console.log("SOMETHING WENT WRONG: ", err));
};



withdrawBtcOnGdax = () => {
  console.log("\n\n\nWITHDRAWING BTC FROM GDAX TO COINBASE\n\n\n");
  var withdrawParamsBTC = {
    'amount': '0.01',
    'coinbase_account_id': process.env.COINBASE_ACCOUNT_ID_BTC,
  }

  var callback = function(err, response, data) {
    if(err) { console.log(err)};
    if(response){
      console.log(response);
      console.log("\n\n\n\n\nTHIS IS THE DATA: ", data);
    }
  };

  authedClient.withdraw(withdrawParamsBTC, callback);
  //now it's in coinbase and from coinbase we need to send it to GEMINI
  return;
  loopConditional('gemini', 'ETHBTC');
};


module.exports = {
  buyEthOnGdax,
  // buyBtcOnGdax,
  withdrawEthOnGdax,
  // withdrawBtcOnGdax
};
