let cryptoSocket = require("crypto-socket");
require("dotenv").load();
const btoa = require("btoa");
const createHmac = require("create-hmac");
const n = require("nonce")();
const axios = require("axios");
let loopConditional = require('../index').loopConditional;
const Poloniex = require('poloniex-api-node');
let poloniex = new Poloniex(process.env.POLONIEX_API_KEY, process.env.POLONIEX_SECRET, { socketTimeout: 15000 });


signRequest = request => {
  let base = btoa(JSON.stringify(request));
  let hmac = createHmac("sha512", process.env.POLONIEX_SECRET);
  hmac.update(base);
  let signature = hmac.digest("hex");
  return { base, signature };
};


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

returnBalancesPoloniex = () => {
  var poloBalances = {
    "ETH": 0,
    "BTC": 0,
  };

  poloniex.returnBalances().then((balances) => {
    poloBalances.ETH = balances['ETH'];
    poloBalances.BTC = balances['BTC'];
    console.log(poloBalances);
  }).catch((err) => {
    console.log(err.message);
  });


  return;
  //need to figure out hmac 512 and signature format for node
  let returnBalanceReqPolo = signRequest({
    "command": "returnBalance",
    "account": "all"
  });

  let payload = {
    "command": "returnBalance",
    "account": "all"
  };

  let config = {
    headers: {
      "Content-Type": "application/json",
      nonce: n(),
      "KEY": process.env.POLONIEX_API_KEY,
      "SIGN": returnBalanceReqPolo.signature
    }
  };

  // let payload = {
  //   "command": "returnBalance",
  //   "accont": "all"
  // }

   axios.post("https://poloniex.com/tradingApi?command=returnBalances", payload, config)
    .then(res => {
      console.log(res);
    })
    .catch(err => console.log("SOMETHING WEN WRONG WITH POLO BECAUSE: ", err));
}

returnPoloAddresses = () => {
  poloniex.returnDepositAddresses().then(addresses => {
    console.log(addresses);
  })
  .catch(err => {
    console.log(err);
  })
}

createNewCurrencyAddress = (currency) => {
  //ETH or BTC for currency example
  poloniex.generateNewAddress(currency.toUpperCase()).then(address => {
    console.log(address);
  })
  .catch(err => console.log(err));
}

module.exports = {
  buyEthOnPoloniex,
  buyBtcOnPoloniex,
  withdrawEthOnPoloniex,
  withdrawBtcOnPoloniex,
  returnBalancesPoloniex,
  returnPoloAddresses,
  createNewCurrencyAddress
};
