require("dotenv").load();
const axios = require("axios");
let bittrex = require('../node_modules/node.bittrex.api/node.bittrex.api.js');
bittrex.options({
  'apikey' : process.env.BITTREX_API_KEY,
  'apisecret' : process.env.BITTREX_API_KEY_SECRET,
  'verbose' : true,
  'cleartext' : false,
  'baseUrl' : 'https://bittrex.com/api/v1.1'
});
let cryptoSocket = require("crypto-socket");
let loopConditional = require('../index');


//need to place a cancel order for orders that stay in the books longer than a certain time
async function buy(exchange, currency, rate){
  let ethAmount = await requestBalance(exchange, 'ETH');
  let btcAmount = await requestBalance(exchange, 'BTC');
  let upCurr = currency.toUpperCase();
  console.log("btc = ", ethAmount);
  console.log("eth = ", btcAmount);
  const pairs = {
    ETH: {
      buy: (exchange, currency, rate) =>
        bittrex.buy_limit({market: 'BTC-ETH', quantity: ethAmount, rate: rate }, (err, data) => {
            if (err) {
              console.log(err);
              loopConditional.loopConditional(exchange, upCurr + 'USD');
            } else {
              console.log(data);
              loopConditional.loopConditional(exchange, upCurr + 'USD');
            }
          })
    },
    BTC: {
      buy: (exchange, currency, rate) =>
        bittrex.sell_limit({market: 'BTC-ETH', quantity: btcAmount, rate: rate }, (err, data) => {
            if (err) {
              console.log(err);
              loopConditional.loopConditional(exchange, upCurr + 'USD');
            } else {
              console.log(data);
              loopConditional.loopConditional(exchange, upCurr + 'USD');
            }
          })
    }
  };
  if (currency === 'ETH' && ethAmount === 0) {
    console.log("INSUFFICIENT FUNDS...");
    return;
  } else if (currency === 'ETH' && ethAmount !== 0) {
    pairs[currency].buy(exchange, currency, rate);
  }

  if (currency === 'BTC' && btcAmount === 0) {
    console.log("INSUFFICIENT FUNDS...");
    return;
  } else if (currency === 'BTC' && btcAmount !== 0) {
    pairs[currency].buy(exchange, currency, rate);
  }
};

//works
async function withdraw(exchange, currency){
//ALL TRANSACTIONS WITH BITTREX aka WITHDRAW, BUY, SELL
//HAVE A 0.25 % commission fee

//grabs full available amount and accounts for fees else it won't be available
  let amount = await requestBalance(currency);
  let upCurr = currency.toUpperCase();
  let address = exchange.toUpperCase() + '_' + currency.toUpperCase() + '_DEPOSIT_ADDRESS';

  return new Promise((resolve, reject) => {
    bittrex.withdraw({ currency: upCurr, quantity: amount, address: process.env.address}, (data, err) => {
      if(err){
        console.log("SOMETHING WENT WRONG: ", err);
        reject(err);
        loopConditional.loopConditional(exchange, upCurr + 'USD');
      } else {
        console.log("DATA IS: ", data);
        resolve(data);
        loopConditional.loopConditional(exchange, upCurr + 'USD');
      }
    });
  });
};


requestBalances = (exchange, currency) => {
  let curr = currency.toUpperCase();
  return new Promise((resolve, reject) => {
    bittrex.getbalance({currency: curr}, (data, err) => {
      if(err){
        console.log("SOMETHING WRONG: ", err);
        reject(err);
      } else {
        console.log("DATA IS: ", data);
        resolve(data.result.Available);
      }
    });
  });
}


//USE THESE TO GET THE ACTUAL ADDRESSES FOR
//THE WALLETS AFTER THAT IT's NEVER NEEDED
getEthDepositAddress = () => {
  bittrex.getdepositaddress({ currency : 'ETH' }, function( data ) {
    console.log( data );
    loopConditional.loopConditional(exchange, upCurr + 'USD');
  });
}

getBtcDepositAddress = () => {
  bittrex.getdepositaddress({ currency : 'BTC' }, function( data ) {
    console.log( data );
    loopConditional.loopConditional(exchange, upCurr + 'USD');
  });
}


module.exports = {
  buy,
  withdraw,
  requestBalances
};


