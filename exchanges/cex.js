let cryptoSocket = require("crypto-socket");
require("dotenv").load();
const btoa = require("btoa");
const createHmac = require("create-hmac");
const n = require("nonce")();
const axios = require("axios");
let loopConditional = require('../index').loopConditional;

buyEthOnCex = () => {
  console.log("BUY ETH ON CEX");
  flag = true;
  loopConditional();
};

buyBtcOnCex = () => {
  console.log("BUY BTC ON CEX");
  flag = true;
  loopConditional();
};

withdrawEthOnCex = () => {
  console.log("WITHDRAW ETH CEX");
  flag = true;
  loopConditional();
};

withdrawBtcOnCex = () => {
  console.log("WITHDRAW BTC CEX");
  flag = true;
  loopConditional();
};

module.exports = {
  buyEthOnCex,
  buyBtcOnCex,
  withdrawEthOnCex,
  withdrawBtcOnCex
};
