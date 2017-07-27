let cryptoSocket = require("crypto-socket");
require("dotenv").load();
const btoa = require("btoa");
const createHmac = require("create-hmac");
const n = require("nonce")();
const axios = require("axios");
let loopConditional = require('../index').loopConditional;

buyEthOnPoloniex = () => {
  console.log("BUY ETH ON POLONIEX");
  flag = true;
  loopConditional();
};

buyBtcOnPoloniex = () => {
  console.log("BUY BTC ON POLONIEX");
  flag = true;
  loopConditional();
};

withdrawEthOnPoloniex = () => {
  console.log("WITHDRAW ETH POLONIEX");
  flag = true;
  loopConditional();
};

withdrawBtcOnPoloniex = () => {
  console.log("WITHDRAW BTC POLONIEX");
  flag = true;
  loopConditional();
};

module.exports = {
  buyEthOnPoloniex,
  buyBtcOnPoloniex,
  withdrawEthOnPoloniex,
  withdrawBtcOnPoloniex
};
