require("dotenv").load();
const btoa = require("btoa");
const createHmac = require("create-hmac");
const n = require("nonce")();
const axios = require("axios");
let loopConditional = require('../index').loopConditional;

buyEthOnBittrex = () => {
  console.log("BUY ETH ON BITTREX");
  flag = true;
  loopConditional();
};

buyBtcOnBittrex = () => {
  console.log("BUY BTC ON BITTREX");
  flag = true;
  loopConditional();
};

withdrawEthOnBittrex = () => {
  console.log("WITHDRAW ETH BITTREX");
  flag = true;
  loopConditional();
};

withdrawBtcOnBittrex = () => {
  console.log("WITHDRAW BTC BITTREX");
  flag = true;
  loopConditional();
};

module.exports = {
  buyEthOnBittrex,
  buyBtcOnBittrex,
  withdrawEthOnBittrex,
  withdrawBtcOnBittrex
};
