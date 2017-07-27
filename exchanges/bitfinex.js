let cryptoSocket = require("crypto-socket");
require("dotenv").load();
const btoa = require("btoa");
const createHmac = require("create-hmac");
const n = require("nonce")();
const axios = require("axios");
let loopConditional = require('../index').loopConditional;

buyEthOnBitfinex = () => {
  console.log("BUY ETH ON BITFINEX");
  flag = true;
  loopConditional();
};

buyBtcOnBitfinex = () => {
  console.log("BUY BTC ON BITFINEX");
  flag = true;
  loopConditional();
};

withdrawEthOnBitfinex = () => {
  console.log("WITHDRAW ETH BITFINEX");
  flag = true;
  loopConditional();
};

withdrawBtcOnBitfinex = () => {
  console.log("WITHDRAW BTC BITFINEX");
  flag = true;
  loopConditional();
};

module.exports = {
  buyEthOnBitfinex,
  buyBtcOnBitfinex,
  withdrawEthOnBitfinex,
  withdrawBtcOnBitfinex
};
