require("dotenv").load();
const btoa = require("btoa");
const createHmac = require("create-hmac");
const n = require("nonce")();
const axios = require("axios");
let loopConditional = require('../index').loopConditional;


buyEthOnGdax = () => {
  console.log("BUY ETH ON GDAX");
  flag = true;
  loopConditional();
};

buyBtcOnGdax = () => {
  console.log("BUY BTC ON GDAX");
  flag = true;
  loopConditional();
};

withdrawEthOnGdax = () => {
  console.log("WITHDRAW ETH GDAX");
  flag = true;
  loopConditional();
};

withdrawBtcOnGdax = () => {
  console.log("WITHDRAW BTC GDAX");
  flag = true;
  loopConditional();
};


module.exports = {
  buyEthOnGdax,
  buyBtcOnGdax,
  withdrawEthOnGdax,
  withdrawBtcOnGdax
};
