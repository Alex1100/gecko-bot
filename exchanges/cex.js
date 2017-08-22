require("dotenv").load();
const axios = require("axios");
const crypto = require('crypto');
const createHmac = require("create-hmac");
const n = require("nonce")();
let loopConditional = require('../index');
var cryptoSocket = require("crypto-socket");
var Cex = require('ccxt').cex({
  apiKey: process.env.CEX_API_KEY,
  secret: process.env.CEX_API_KEY_SECRET,
  uid: process.env.CEX_USER_ID
});

requestBalances = () => {
  Cex.privatePostBalance()
    .then(res => {
      console.log(res)

    })
    .catch(err => console.log("COUDN'T GET BALANCES: ", err));
};

withdraw = () => {

};

trade = () => {

};


module.exports = {
  requestBalances
}
