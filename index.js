require("dotenv").load();
require('./database/database');
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const axios = require("axios");
let cryptoSocket = require("crypto-socket");
cryptoSocket.start("gemini");
cryptoSocket.start("gdax");
cryptoSocket.start("poloniex");
cryptoSocket.start("bittrex");
cryptoSocket.start("hitbtc");
cryptoSocket.start("cex");
cryptoSocket.Exchanges.livecoin = {};
cryptoSocket.Exchanges.cCex = {};
cryptoSocket.Exchanges.livecoin.BTCUSD = '';
cryptoSocket.Exchanges.livecoin.ETHUSD = '';
cryptoSocket.Exchanges.livecoin.LTCUSD = '';
cryptoSocket.Exchanges.livecoin.LTCBTC = '';
cryptoSocket.Exchanges.livecoin.ETHBTC = '';
cryptoSocket.Exchanges.livecoin.BCHUSD = '';
cryptoSocket.Exchanges.livecoin.DASHUSD = '';
cryptoSocket.Exchanges.livecoin.BCHETH = '';
cryptoSocket.Exchanges.livecoin.BCHBTC = '';
cryptoSocket.Exchanges.livecoin.DASHBTC = '';
cryptoSocket.Exchanges.cCex.BTCUSD = '';
cryptoSocket.Exchanges.cCex.ETHUSD = '';
cryptoSocket.Exchanges.cCex.LTCUSD = '';
cryptoSocket.Exchanges.cCex.LTCBTC = '';
cryptoSocket.Exchanges.cCex.ETHBTC = '';
cryptoSocket.Exchanges.cCex.DASHUSD = '';
cryptoSocket.Exchanges.cCex.DASHBTC = '';

setImmediate(() => {
  setInterval(() => {
    axios.get('https://api.livecoin.net/exchange/ticker')
      .then(data => {
        if(data.data){
          cryptoSocket.Exchanges.livecoin.BTCUSD = parseFloat(data.data.filter(coin => coin.symbol === 'BTC/USD')[0].last);
          cryptoSocket.Exchanges.livecoin.ETHUSD = parseFloat(data.data.filter(coin => coin.symbol === 'ETH/USD')[0].last);
          cryptoSocket.Exchanges.livecoin.LTCUSD = parseFloat(data.data.filter(coin => coin.symbol === 'LTC/USD')[0].last);
          cryptoSocket.Exchanges.livecoin.LTCBTC = parseFloat(data.data.filter(coin => coin.symbol === 'LTC/BTC')[0].last);
          cryptoSocket.Exchanges.livecoin.ETHBTC = parseFloat(data.data.filter(coin => coin.symbol === 'ETH/BTC')[0].last);
          cryptoSocket.Exchanges.livecoin.BCHUSD = parseFloat(data.data.filter(coin => coin.symbol === 'BCH/USD')[0].last);
          cryptoSocket.Exchanges.livecoin.DASHUSD = parseFloat(data.data.filter(coin => coin.symbol === 'DASH/USD')[0].last);
          cryptoSocket.Exchanges.livecoin.BCHETH = parseFloat(data.data.filter(coin => coin.symbol === 'BCH/ETH')[0].last);
          cryptoSocket.Exchanges.livecoin.BCHBTC = parseFloat(data.data.filter(coin => coin.symbol === 'BCH/BTC')[0].last);
          cryptoSocket.Exchanges.livecoin.DASHBTC = parseFloat(data.data.filter(coin => coin.symbol === 'DASH/BTC')[0].last);
        }
      })
      .catch(err => console.log("COULD NOT GET LIVECOIN QUOTES BECAUSE: ", err));
  }, 1500)
});

setImmediate(() => {
  setInterval(() => {
    axios.get("https://c-cex.com/t/prices.json")
        .then(data => {
          cryptoSocket.Exchanges.cCex.BTCUSD = parseFloat(data.data['btc-usd'].lastprice);
          cryptoSocket.Exchanges.cCex.ETHUSD = parseFloat(data.data['eth-usd'].lastprice);
          cryptoSocket.Exchanges.cCex.LTCUSD = parseFloat(data.data['ltc-usd'].lastprice);
          cryptoSocket.Exchanges.cCex.ETHBTC = parseFloat(data.data['eth-btc'].lastprice);
          cryptoSocket.Exchanges.cCex.LTCBTC = parseFloat(data.data['ltc-btc'].lastprice);
          cryptoSocket.Exchanges.cCex.DASHUSD = parseFloat(data.data['dash-usd'].lastprice);
          cryptoSocket.Exchanges.cCex.DASHBTC = parseFloat(data.data['dash-btc'].lastprice);
        })
        .catch(err => console.log("COULD NOT GET C-CEX QUOTES BECAUSE: ", err));
      }, 2100);
});

let flag = true;
let bittrex = require('./exchanges/bittrex');
let gdax = require('./exchanges/gdax');
let gemini = require('./exchanges/gemini');
let poloniex = require('./exchanges/poloniex');
let livecoin = require('./exchanges/livecoin');
let cCex = require('./exchanges/cCex');
let cex = require('./exchanges/cex');
let hitbtc = require('./exchanges/hitbtc');
let SMA = require('technicalindicators').SMA;
let EMA = require('technicalindicators').EMA;
let WMA = require('technicalindicators').WMA;
let MACD = require('technicalindicators').MACD;
let BB = require('technicalindicators').BollingerBands;
let RSI = require('technicalindicators').RSI;
let ATR = require('technicalindicators').ATR;
let WEMA = require('technicalindicators').WEMA;
let ROC = require('technicalindicators').ROC;
let KST = require('technicalindicators').KST;
let Stochastic = require('technicalindicators').Stochastic;
let WilliamsR = require('technicalindicators').WilliamsR;
let ADL = require('technicalindicators').ADL;
let OBV = require('technicalindicators').OBV;
let TRIX = require('technicalindicators').TRIX;
let ADX = require('technicalindicators').ADX;
let CCI = require('technicalindicators').CCI;
let VWAP = require('technicalindicators').VWAP;
let ForceIndex = require('technicalindicators').ForceIndex;

//let ATRSAMPLE = [300, 300.4, 299.8, 300.6, 301.2, 301.4, 301.43, 301.55, 301.2, 302, 304, 302, 301.6, 301.5, 301.8, 302.5, 303.6, 300, 300.4, 299.8, 300.6, 301.2, 301.4, 301.43, 301.55, 301.2, 302, 304, 302, 301.6, 301.5, 301.8, 302.5, 303.6, 300, 300.4, 299.8, 300.6, 301.2, 301.4, 301.43, 301.55, 301.2, 302, 304, 302, 301.6, 301.5, 301.8, 302.5, 303.6, 300, 300.4, 299.8, 300.6, 301.2, 301.4, 301.43, 301.55, 301.2, 302, 304, 302, 301.6, 301.5, 301.8, 302.5, 303.6, 300, 300.4, 299.8, 300.6, 301.2, 301.4, 301.43, 301.55, 301.2, 302, 304, 302, 301.6, 301.5, 301.8, 302.5, 303.6, 300, 300.4, 299.8, 300.6, 301.2, 301.4, 301.43, 301.55, 301.2, 302, 304, 302, 301.6, 301.5, 301.8, 302.5, 303.6];
//console.log("THE ANSWER IS: ", Math.max((Math.max(...ATRSAMPLE) - Math.min(...ATRSAMPLE)), Math.abs(...Math.max(...ATRSAMPLE) - ATRSAMPLE[ATRSAMPLE.length - 2]), Math.abs(...Math.min(...ATRSAMPLE) - ATRSAMPLE[ATRSAMPLE.length - 2])));
// console.log("THE ANSWER IS: ", Math.max(304 - 299.8, Math.abs(304 - ATRSAMPLE[ATRSAMPLE.length - 2]), Math.abs(299.8 - ATRSAMPLE[ATRSAMPLE.length - 2])));
// console.log("\n\n\n", ATR.calculate({period: 14, values: [300, 300.4, 299.8, 300.6, 301.2, 301.4, 301.43, 301.55, 301.2, 302, 304, 302, 301.6, 301.5, 301.8, 302.5, 303.6]}));
//TEST OUT ATR
// console.log("YOOO: ", EMA.calculate({period: 5, values: [11,12,13,14,15,16,18, 19, 22, 23, 23]}).reverse()[0]);
// console.log("YOOOO: ", WEMA.calculate({period: 5, values: [11,12,13,14,15,16,18, 19, 22, 23, 23]}));
// let a = ROC.calculate({period: 1, values: ATRSAMPLE});
// console.log("A IS: ", a);
// console.log("\n\n\n");
// console.log("KST IS: ", KST.calculate({
//   values: ATRSAMPLE,
//   ROCPer1: 10,
//   ROCPer2: 15,
//   ROCPer3: 20,
//   ROCPer4: 30,
//   SMAROCPer1: 10,
//   SMAROCPer2: 10,
//   SMAROCPer3: 10,
//   SMAROCPer4: 15,
//   signalPeriod: 3
// }));

// console.log("\n\n\n")
// console.log("EMA OF ATRSAMPE IS: ", EMA.calculate({period: 9, values: ATRSAMPLE}));
//TEST AROON OUT LATER ON
//let AROON = require('technicalindicators/lib/oscillators/AROON');
//let sampleArray = [4127.88, 4127.89, 4127.7, 4127.89, 4127.88, 4127.71, 4127.7, 4127.15, 4127.71, 4127.19, 4127.18, 4127.15, 4127.13, 4125.83, 4125.34, 4127.7, 4126.37, 4127.69, 4126.37, 4127.69];
//console.log(AROON(sampleArray));
//WEIGHTED MOVING AVERAGE NEEDS TO BE CONFIRMED TEST IT OUT!!
//console.log(WMA.calculate({period: sampleArray.length, values: sampleArray}));
//Bollinger Bands



//hitbtc.withdraw();
//TEST DATA RANGE LIMITS
// let bittrexBTCUSDNumberToCountFromDB = 0;
// let bittrexBTCUSDNumberToInsertLogsToDB = 30;
// let bittrexETHBTCNumberToCountFromDB = 0;
// let bittrexETHBTCNumberToInsertLogsToDB = 30;
// let bittrexETHUSDNumberToCountFromDB = 0;
// let bittrexETHUSDNumberToInsertLogsToDB = 30;
// let bittrexLTCETHNumberToCountFromDB = 0;
// let bittrexLTCETHNumberToInsertLogsToDB = 30;
// let bittrexLTCUSDNumberToCountFromDB = 0;
// let bittrexLTCUSDNumberToInsertLogsToDB = 30;
// let cCexBTCUSDNumberToCountFromDB = 0;
// let cCexBTCUSDNumberToInsertLogsToDB = 30;
// let cCexDASHBTCNumberToCountFromDB = 0;
// let cCexDASHBTCNumberToInsertLogsToDB = 30;
// let cCexDASHUSDNumberToCountFromDB = 0;
// let cCexDASHUSDNumberToInsertLogsToDB = 30;
// let cCexETHBTCNumberToCountFromDB = 0;
// let cCexETHBTCNumberToInsertLogsToDB = 30;
// let cCexETHUSDNumberToCountFromDB = 0;
// let cCexETHUSDNumberToInsertLogsToDB = 30;
// let cCexLTCBTCNumberToCountFromDB = 0;
// let cCexLTCBTCNumberToInsertLogsToDB = 30;
// let cCexLTCUSDNumberToCountFromDB = 0;
// let cCexLTCUSDNumberToInsertLogsToDB = 30;
// let cexBCHUSDNumberToCountFromDB = 0;
// let cexBCHUSDNumberToInsertLogsToDB = 30;
// let cexBTCUSDNumberToCountFromDb = 0;
// let cexBTCUSDNumberToInsertLogsToDB = 30;
// let cexETHBTCNumberToCountFromDB = 0;
// let cexETHBTCNumberToInsertLogsToDB = 30;
// let cexETHUSDNumberToCountFromDB = 0;
// let cexETHUSDNumberToInsertLogsToDB = 30;
// let gdaxBTCUSDNumberToCountFromDB = 0;
// let gdaxBTCUSDNumberToInsertLogsToDB = 30;
// let gdaxETHBTCNumberToCountFromDB = 0;
// let gdaxETHBTCNumberToInsertLogsToDB = 30;
// let gdaxLTCBTCNumberToCountFromDB = 0;
// let gdaxLTCBTCNumberToInsertLogsToDB = 30;
// let gdaxETHUSDNumberToCountFromDB = 0;
// let gdaxETHUSDNumberToInsertLogsToDB = 30;
// let gdaxLTCUSDNumberToCountFromDB = 0;
// let gdaxLTCUSDNumberToInsertLogsToDB = 30;
// let geminiETHBTCNumberToCountFromDB = 0;
// let geminiETHBTCNumberToInsertLogsToDB = 30;
// let geminiETHUSDNumberToCountFromDB = 0;
// let geminiETHUSDNumberToInsertLogsToDB = 30;
// let geminiBTCUSDNumberToCountFromDB = 0;
// let geminiBTCUSDNumberToInsertLogsToDB = 30;
// let hitbtcBCCUSDNumberToCountFromDB = 0;
// let hitbtcBCCUSDNumberToInsertLogsToDB = 30;
// let hitbtcBTCUSDNumberToCountFromDB = 0;
// let hitbtcBTCUSDNumberToInsertLogsToDB = 30;
// let hitbtcDASHUSDNumberToCountFromDB = 0;
// let hitbtcDASHUSDNumberToInsertLogsToDB = 30;
// let hitbtcEOSBTCNumberToCountFromDB = 0;
// let hitbtcEOSBTCNumberToInsertLogsToDB = 30;
// let hitbtcEOSUSDNumberToCountFromDB = 0;
// let hitbtcEOSUSDNumberToInsertLogsToDB = 30;
// let hitbtcETHBTCNumberToCountFromDB = 0;
// let hitbtcETHBTCNumberToInsertLogsToDB = 30;
// let hitbtcETHUSDNumberToCountFromDB = 0;
// let hitbtcETHUSDNumberToInsertLogsToDB = 30;
// let hitbtcLTCBTCNumberToCountFromDB = 0;
// let hitbtcLTCBTCNumberToInsertLogsToDB = 30;
// let hitbtcLTCUSDNumberToCountFromDB = 0;
// let hitbtcLTCUSDNumberToInsertLogsToDB = 30;
// let livecoinBCHBTCNumberToCountFromDB = 0;
// let livecoinBCHBTCNumberToInsertLogsToDB = 30;
// let livecoinBCHETHNumberToCountFromDB = 0;
// let livecoinBCHETHNumberToInsertLogsToDB = 30;
// let livecoinBCHUSDNumberToCountFromDB = 0;
// let livecoinBCHUSDNumberToInsertLogsToDB = 30;
// let livecoinBTCUSDNumberToCountFromDB = 0;
// let livecoinBTCUSDNumberToInsertLogsToDB = 30;
// let livecoinDASHBTCNumberToCountFromDB = 0;
// let livecoinDASHBTCNumberToInsertLogsToDB = 30;
// let livecoinDASHUSDNumberToCountFromDB = 0;
// let livecoinDASHUSDNumberToInsertLogsToDB = 30;
// let livecoinETHBTCNumberToCountFromDB = 0;
// let livecoinETHBTCNumberToInsertLogsToDB = 30;
// let livecoinETHUSDNumberToCountFromDB = 0;
// let livecoinETHUSDNumberToInsertLogsToDB = 30;
// let livecoinLTCBTCNumberToCountFromDB = 0;
// let livecoinLTCBTCNumberToInsertLogsToDB = 30;
// let livecoinLTCUSDNumberToCountFromDB = 0;
// let livecoinLTCUSDNumberToInsertLogsToDB = 30;
// let poloniexBCHBTCNumberToCountFromDB = 0;
// let poloniexBCHBTCNumberToInsertLogsToDB = 30;
// let poloniexBCHUSDNumberToCountFromDB = 0;
// let poloniexBCHUSDNumberToInsertLogsToDB = 30;
// let poloniexBTCUSDNumberToCountFromDB = 0;
// let poloniexBTCUSDNumberToInsertLogsToDB = 30;
// let poloniexDASHBTCNumberToCountFromDB = 0;
// let poloniexDASHBTCNumberToInsertLogsToDB = 30;
// let poloniexDASHUSDNumberToCountFromDB = 0;
// let poloniexDASHUSDNumberToInsertLogsToDB = 30;
// let poloniexETHBTCNumberToCountFromDB = 0;
// let poloniexETHBTCNumberToInsertLogsToDB = 30;
// let poloniexETHUSDNumberToCountFromDB = 0;
// let poloniexETHUSDNumberToInsertLogsToDB = 30;
// let poloniexLTCBTCNumberToCountFromDB = 0;
// let poloniexLTCBTCNumberToInsertLogsToDB = 30;
// let poloniexLTCUSDNumberToCountFromDB = 0;
// let poloniexLTCUSDNumberToInsertLogsToDB = 30;

let bittrexBTCUSDNumberToCountFromDB = 0;
let bittrexBTCUSDNumberToInsertLogsToDB = 1000;
let bittrexETHBTCNumberToCountFromDB = 0;
let bittrexETHBTCNumberToInsertLogsToDB = 1000;
let bittrexETHUSDNumberToCountFromDB = 0;
let bittrexETHUSDNumberToInsertLogsToDB = 1000;
let bittrexLTCETHNumberToCountFromDB = 0;
let bittrexLTCETHNumberToInsertLogsToDB = 1000;
let bittrexLTCUSDNumberToCountFromDB = 0;
let bittrexLTCUSDNumberToInsertLogsToDB = 1000;
let cCexBTCUSDNumberToCountFromDB = 0;
let cCexBTCUSDNumberToInsertLogsToDB = 1000;
let cCexDASHBTCNumberToCountFromDB = 0;
let cCexDASHBTCNumberToInsertLogsToDB = 1000;
let cCexDASHUSDNumberToCountFromDB = 0;
let cCexDASHUSDNumberToInsertLogsToDB = 1000;
let cCexETHBTCNumberToCountFromDB = 0;
let cCexETHBTCNumberToInsertLogsToDB = 1000;
let cCexETHUSDNumberToCountFromDB = 0;
let cCexETHUSDNumberToInsertLogsToDB = 1000;
let cCexLTCBTCNumberToCountFromDB = 0;
let cCexLTCBTCNumberToInsertLogsToDB = 1000;
let cCexLTCUSDNumberToCountFromDB = 0;
let cCexLTCUSDNumberToInsertLogsToDB = 1000;
let cexBCHUSDNumberToCountFromDB = 0;
let cexBCHUSDNumberToInsertLogsToDB = 1000;
let cexBTCUSDNumberToCountFromDb = 0;
let cexBTCUSDNumberToInsertLogsToDB = 1000;
let cexETHBTCNumberToCountFromDB = 0;
let cexETHBTCNumberToInsertLogsToDB = 1000;
let cexETHUSDNumberToCountFromDB = 0;
let cexETHUSDNumberToInsertLogsToDB = 1000;
let gdaxBTCUSDNumberToCountFromDB = 0;
let gdaxBTCUSDNumberToInsertLogsToDB = 1000;
let gdaxETHBTCNumberToCountFromDB = 0;
let gdaxETHBTCNumberToInsertLogsToDB = 1000;
let gdaxLTCBTCNumberToCountFromDB = 0;
let gdaxLTCBTCNumberToInsertLogsToDB = 1000;
let gdaxETHUSDNumberToCountFromDB = 0;
let gdaxETHUSDNumberToInsertLogsToDB = 1000;
let gdaxLTCUSDNumberToCountFromDB = 0;
let gdaxLTCUSDNumberToInsertLogsToDB = 1000;
let geminiETHBTCNumberToCountFromDB = 0;
let geminiETHBTCNumberToInsertLogsToDB = 1000;
let geminiETHUSDNumberToCountFromDB = 0;
let geminiETHUSDNumberToInsertLogsToDB = 1000;
let geminiBTCUSDNumberToCountFromDB = 0;
let geminiBTCUSDNumberToInsertLogsToDB = 1000;
let hitbtcBCCUSDNumberToCountFromDB = 0;
let hitbtcBCCUSDNumberToInsertLogsToDB = 1000;
let hitbtcBTCUSDNumberToCountFromDB = 0;
let hitbtcBTCUSDNumberToInsertLogsToDB = 1000;
let hitbtcDASHUSDNumberToCountFromDB = 0;
let hitbtcDASHUSDNumberToInsertLogsToDB = 1000;
let hitbtcEOSBTCNumberToCountFromDB = 0;
let hitbtcEOSBTCNumberToInsertLogsToDB = 1000;
let hitbtcEOSUSDNumberToCountFromDB = 0;
let hitbtcEOSUSDNumberToInsertLogsToDB = 1000;
let hitbtcETHBTCNumberToCountFromDB = 0;
let hitbtcETHBTCNumberToInsertLogsToDB = 1000;
let hitbtcETHUSDNumberToCountFromDB = 0;
let hitbtcETHUSDNumberToInsertLogsToDB = 1000;
let hitbtcLTCBTCNumberToCountFromDB = 0;
let hitbtcLTCBTCNumberToInsertLogsToDB = 1000;
let hitbtcLTCUSDNumberToCountFromDB = 0;
let hitbtcLTCUSDNumberToInsertLogsToDB = 1000;
let livecoinBCHBTCNumberToCountFromDB = 0;
let livecoinBCHBTCNumberToInsertLogsToDB = 1000;
let livecoinBCHETHNumberToCountFromDB = 0;
let livecoinBCHETHNumberToInsertLogsToDB = 1000;
let livecoinBCHUSDNumberToCountFromDB = 0;
let livecoinBCHUSDNumberToInsertLogsToDB = 1000;
let livecoinBTCUSDNumberToCountFromDB = 0;
let livecoinBTCUSDNumberToInsertLogsToDB = 1000;
let livecoinDASHBTCNumberToCountFromDB = 0;
let livecoinDASHBTCNumberToInsertLogsToDB = 1000;
let livecoinDASHUSDNumberToCountFromDB = 0;
let livecoinDASHUSDNumberToInsertLogsToDB = 1000;
let livecoinETHBTCNumberToCountFromDB = 0;
let livecoinETHBTCNumberToInsertLogsToDB = 1000;
let livecoinETHUSDNumberToCountFromDB = 0;
let livecoinETHUSDNumberToInsertLogsToDB = 1000;
let livecoinLTCBTCNumberToCountFromDB = 0;
let livecoinLTCBTCNumberToInsertLogsToDB = 1000;
let livecoinLTCUSDNumberToCountFromDB = 0;
let livecoinLTCUSDNumberToInsertLogsToDB = 1000;
let poloniexBCHBTCNumberToCountFromDB = 0;
let poloniexBCHBTCNumberToInsertLogsToDB = 1000;
let poloniexBCHUSDNumberToCountFromDB = 0;
let poloniexBCHUSDNumberToInsertLogsToDB = 1000;
let poloniexBTCUSDNumberToCountFromDB = 0;
let poloniexBTCUSDNumberToInsertLogsToDB = 1000;
let poloniexDASHBTCNumberToCountFromDB = 0;
let poloniexDASHBTCNumberToInsertLogsToDB = 1000;
let poloniexDASHUSDNumberToCountFromDB = 0;
let poloniexDASHUSDNumberToInsertLogsToDB = 1000;
let poloniexETHBTCNumberToCountFromDB = 0;
let poloniexETHBTCNumberToInsertLogsToDB = 1000;
let poloniexETHUSDNumberToCountFromDB = 0;
let poloniexETHUSDNumberToInsertLogsToDB = 1000;
let poloniexLTCBTCNumberToCountFromDB = 0;
let poloniexLTCBTCNumberToInsertLogsToDB = 1000;
let poloniexLTCUSDNumberToCountFromDB = 0;
let poloniexLTCUSDNumberToInsertLogsToDB = 1000;

let bittrexBTCUSDModel = require('./database/models/bittrexBTCUSD');
let bittrexETHBTCModel = require('./database/models/bittrexETHBTC');
let bittrexLTCETHModel = require('./database/models/bittrexLTCETH');
let bittrexETHUSDModel = require('./database/models/bittrexETHUSD');
let bittrexLTCUSDModel = require('./database/models/bittrexLTCUSD');
let cCexBTCUSDModel = require('./database/models/cCexBTCUSD');
let cCexDASHBTCModel = require('./database/models/cCexDASHBTC');
let cCexDASHUSDModel = require('./database/models/cCexDASHUSD');
let cCexETHBTCModel = require('./database/models/cCexETHBTC');
let cCexETHUSDModel = require('./database/models/cCexETHUSD');
let cCexLTCBTCModel = require('./database/models/cCexLTCBTC');
let cCexLTCUSDModel = require('./database/models/cCexLTCUSD');
let cexBCHUSDModel = require('./database/models/cexBCHUSD');
let cexBTCUSDModel = require('./database/models/cexBTCUSD');
let cexETHBTCModel = require('./database/models/cexETHBTC');
let cexETHUSDModel = require('./database/models/cexETHUSD');
let gdaxBTCUSDModel = require('./database/models/gdaxBTCUSD');
let gdaxETHBTCModel = require('./database/models/gdaxETHBTC');
let gdaxLTCBTCModel = require('./database/models/gdaxLTCBTC');
let gdaxETHUSDModel = require('./database/models/gdaxETHUSD');
let gdaxLTCUSDModel = require('./database/models/gdaxLTCUSD');
let geminiETHBTCModel = require('./database/models/geminiETHBTC');
let geminiETHUSDModel = require('./database/models/geminiETHUSD');
let geminiBTCUSDModel = require('./database/models/geminiBTCUSD');
let hitbtcBCCUSDModel = require('./database/models/hitbtcBCCUSD');
let hitbtcBTCUSDModel = require('./database/models/hitbtcBTCUSD');
let hitbtcDASHUSDModel = require('./database/models/hitbtcDASHUSD');
let hitbtcEOSBTCModel = require('./database/models/hitbtcEOSBTC');
let hitbtcEOSUSDModel = require('./database/models/hitbtcEOSUSD');
let hitbtcETHBTCModel = require('./database/models/hitbtcETHBTC');
let hitbtcETHUSDModel = require('./database/models/hitbtcETHUSD');
let hitbtcLTCBTCModel = require('./database/models/hitbtcLTCBTC');
let hitbtcLTCUSDModel = require('./database/models/hitbtcLTCUSD');
let livecoinBCHBTCModel = require('./database/models/livecoinBCHBTC');
let livecoinBCHETHModel = require('./database/models/livecoinBCHETH');
let livecoinBCHUSDModel = require('./database/models/livecoinBCHUSD');
let livecoinBTCUSDModel = require('./database/models/livecoinBTCUSD');
let livecoinDASHBTCModel = require('./database/models/livecoinDASHBTC');
let livecoinDASHUSDModel = require('./database/models/livecoinDASHUSD');
let livecoinETHBTCModel = require('./database/models/livecoinETHBTC');
let livecoinETHUSDModel = require('./database/models/livecoinETHUSD');
let livecoinLTCBTCModel = require('./database/models/livecoinLTCBTC');
let livecoinLTCUSDModel = require('./database/models/livecoinLTCUSD');
let poloniexBCHBTCModel = require('./database/models/poloniexBCHBTC');
let poloniexBCHUSDModel = require('./database/models/poloniexBCHUSD');
let poloniexBTCUSDModel = require('./database/models/poloniexBTCUSD');
let poloniexDASHBTCModel = require('./database/models/poloniexDASHBTC');
let poloniexDASHUSDModel = require('./database/models/poloniexDASHUSD');
let poloniexETHBTCModel = require('./database/models/poloniexETHBTC');
let poloniexETHUSDModel = require('./database/models/poloniexETHUSD');
let poloniexLTCBTCModel = require('./database/models/poloniexLTCBTC');
let poloniexLTCUSDModel = require('./database/models/poloniexLTCUSD');

//console.log("MACD OF 14 IS: ", MACD.calculate({ values: [1, 2, 3, 8, 5, 6, 2, 8, 8, 10, 8, 4, 13, 14, 16, 20, 30, 23, 17, 11, 14, 13, 15, 17, 21, 24, 26, 28, 22, 23, 28, 32, 35, 36, 35, 32, 37, 36, 40], fastPeriod: 12, slowPeriod: 26, signalPeriod: 9, SimpleMAOscillator: false, SimpleMASignal: false }));
// console.log("MACD V@ IS: ", MACD.calculate({values: [127.75,129.02,132.75,145.40,148.98,137.52,147.38,139.05,137.23,149.30,162.45,178.95,200.35,221.90,243.23,243.52,286.42,280.27],

//SMA.calculate({period: historicDataLogs['bittrex']['BTCUSD'].length, values: })

let historicDataLogs = {
    'bittrex': {
      'ETHBTC': [],
      'LTCETH': [],
      'BTCUSD': [],
      'ETHUSD': [],
      'LTCUSD': []
    },
    'gemini': {
      'ETHBTC': [],
      'ETHUSD': [],
      'BTCUSD': []
    },
    'gdax': {
      'ETHBTC': [],
      'LTCBTC': [],
      'BTCUSD': [],
      'ETHUSD': [],
      'LTCUSD': []
    },
    'poloniex': {
      'ETHBTC': [],
      'LTCBTC': [],
      'BTCUSD': [],
      'ETHUSD': [],
      'LTCUSD': [],
      'BCHUSD': [],
      'BCHBTC': [],
      'DASHBTC': [],
      'DASHUSD': []
    },
    'cex': {
      'BCHUSD': [],
      'ETHUSD': [],
      'ETHBTC': [],
      'BTCUSD': []
    },
    'hitbtc': {
      'ETHUSD': [],
      'BCCUSD': [],
      'ETHBTC': [],
      'LTCUSD': [],
      'EOSBTC': [],
      'BTCUSD': [],
      'EOSUSD': [],
      'LTCBTC': [],
      'DASHUSD': []
    },
    'livecoin': {
      'BTCUSD': [],
      'ETHUSD': [],
      'LTCUSD': [],
      'LTCBTC': [],
      'ETHBTC': [],
      'BCHUSD': [],
      'DASHUSD': [],
      'BCHETH': [],
      'BCHBTC': [],
      'DASHBTC': []
    },
    'cCex': {
      'BTCUSD': [],
      'ETHUSD': [],
      'LTCUSD': [],
      'LTCBTC': [],
      'ETHBTC': [],
      'DASHUSD': [],
      'DASHBTC': []
    }
};

let hourlyAvgPrices = {
    'bittrex': {
      'ETHBTC': [],
      'LTCETH': [],
      'BTCUSD': [],
      'ETHUSD': [],
      'LTCUSD': []
    },
    'gemini': {
      'ETHBTC': [],
      'ETHUSD': [],
      'BTCUSD': []
    },
    'gdax': {
      'ETHBTC': [],
      'LTCBTC': [],
      'BTCUSD': [],
      'ETHUSD': [],
      'LTCUSD': []
    },
    'poloniex': {
      'ETHBTC': [],
      'LTCBTC': [],
      'BTCUSD': [],
      'ETHUSD': [],
      'LTCUSD': [],
      'BCHUSD': [],
      'BCHBTC': [],
      'DASHBTC': [],
      'DASHUSD': []
    },
    'cex': {
      'BCHUSD': [],
      'ETHUSD': [],
      'ETHBTC': [],
      'BTCUSD': []
    },
    'hitbtc': {
      'ETHUSD': [],
      'BCCUSD': [],
      'ETHBTC': [],
      'LTCUSD': [],
      'EOSBTC': [],
      'BTCUSD': [],
      'EOSUSD': [],
      'LTCBTC': [],
      'DASHUSD': []
    },
    'livecoin': {
      'BTCUSD': [],
      'ETHUSD': [],
      'LTCUSD': [],
      'LTCBTC': [],
      'ETHBTC': [],
      'BCHUSD': [],
      'DASHUSD': [],
      'BCHETH': [],
      'BCHBTC': [],
      'DASHBTC': []
    },
    'cCex': {
      'BTCUSD': [],
      'ETHUSD': [],
      'LTCUSD': [],
      'LTCBTC': [],
      'ETHBTC': [],
      'DASHUSD': [],
      'DASHBTC': []
    }
};


setTimeout(() => {setInterval(() => {console.log(historicDataLogs.bittrex.ETHBTC)}, 500)}, 121000);
setTimeout(() => {
  setInterval(() => {
    console.log("THERE ARE " + historicDataLogs['bittrex']['BTCUSD'].length + " NUMBER OF ENTRIES IN THE BITTREX BTCUSD ARRAY!");
    console.log("\n\n");
    console.log("THERE ARE " + historicDataLogs['bittrex']['ETHBTC'].length + " NUMBER OF ENTRIES IN THE BITTREX ETHBTC ARRAY!");
    console.log("\n\n");
    console.log("THERE ARE " + historicDataLogs['bittrex']['LTCETH'].length + " NUMBER OF ENTRIES IN THE BITTREX LTCETH ARRAY!");
    console.log("\n\n");
    console.log("THERE ARE " + historicDataLogs['gdax']['BTCUSD'].length + " NUMBER OF ENTRIES IN THE GDAX BTCUSD ARRAY!");
    console.log("\n\n");
    console.log("THERE ARE " + historicDataLogs['gdax']['ETHUSD'].length + " NUMBER OF ENTRIES IN THE GDAX ETHUSD ARRAY!");
    console.log("\n\n");
    console.log("THERE ARE " + historicDataLogs['gdax']['ETHBTC'].length + " NUMBER OF ENTRIES IN THE GDAX ETHBTC ARRAY!");
    console.log("\n\n");
    console.log("THERE ARE " + historicDataLogs['gdax']['LTCBTC'].length + " NUMBER OF ENTRIES IN THE GDAX LTCBTC ARRAY!");
    console.log("\n\n");
    console.log("THERE ARE " + historicDataLogs['gdax']['LTCUSD'].length + " NUMBER OF ENTRIES IN THE GDAX LTCUSD ARRAY!");
    console.log("\n\n");
    console.log("THERE ARE " + historicDataLogs['poloniex']['BTCUSD'].length + " NUMBER OF ENTRIES IN THE POLONIEX BTCUSD ARRAY!");
    console.log("\n\n");
    console.log("THERE ARE " + historicDataLogs['poloniex']['ETHBTC'].length + " NUMBER OF ENTRIES IN THE POLONIEX ETHBTC ARRAY!");
    console.log("\n\n");
    console.log("THERE ARE " + historicDataLogs['poloniex']['LTCBTC'].length + " NUMBER OF ENTRIES IN THE POLONIEX LTCBTC ARRAY!");
    console.log("\n\n");
    console.log("THERE ARE " + historicDataLogs['poloniex']['ETHUSD'].length + " NUMBER OF ENTRIES IN THE POLONIEX ETHUSD ARRAY!");
    console.log("\n\n");
    console.log("THERE ARE " + historicDataLogs['poloniex']['LTCUSD'].length + " NUMBER OF ENTRIES IN THE POLONIEX LTCUSD ARRAY!");
    console.log("\n\n");
    console.log("THERE ARE " + historicDataLogs['gemini']['BTCUSD'].length + " NUMBER OF ENTRIES IN THE GEMINI BTCUSD ARRAY!");
    console.log("\n\n");
    console.log("THERE ARE " + historicDataLogs['gemini']['ETHBTC'].length + " NUMBER OF ENTRIES IN THE GEMINI ETHBTC ARRAY!");
    console.log("\n\n");
    console.log("THERE ARE " + historicDataLogs['gemini']['ETHUSD'].length + " NUMBER OF ENTRIES IN THE GEMINI ETHUSD ARRAY!");
    console.log("\n\n");
  }, 10000);
}, 140000);



// let values = [286.02, 286.01, 286.02, 286.01, 286, 286.01, 286, 286.01, 286, 285.52, 285.21, 285.01]
// let period = Math.floor(values.length/3);
// let a = RSI.calculate({period: period, values: values});
// console.log("RSI IS: ", a);
// console.log(a.reduce((acc, el) => acc + el, 0)/a.length);
// let b = EMA.calculate({period : period, values : values});
// console.log("EMA IS: ", b);
// console.log(b.reduce((acc, el) => acc + el, 0)/b.length);
// let c = SMA.calculate({period : period, values : values})
// console.log("SMA IS: ", c);
// console.log(c.reduce((acc, el) => acc + el, 0)/c.length);


checkArbitrage = (exchange, currency, needToWithdraw) => {
  if(needToWithdraw === false && historicDataLogs['cCex'].BTCUSD.length > cCexBTCUSDNumberToInsertLogsToDB){
    let cCexBTCUSDArray = historicDataLogs['cCex'].BTCUSD.slice(cCexBTCUSDNumberToCountFromDB, cCexBTCUSDNumberToInsertLogsToDB);
    let cCexBTCUSDData = [];
    cCexBTCUSDArray.forEach((spotPrice, i) => {
      cCexBTCUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    cCexBTCUSDModel.insertMany(cCexBTCUSDData);

    cCexBTCUSDNumberToCountFromDB = cCexBTCUSDNumberToCountFromDB + 1001;
    cCexBTCUSDNumberToInsertLogsToDB = cCexBTCUSDNumberToInsertLogsToDB + 1001;
    console.log("CCEX BTCUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['cCex'].ETHUSD.length > cCexETHUSDNumberToInsertLogsToDB){
    let cCexETHUSDArray = historicDataLogs['cCex'].ETHUSD.slice(cCexETHUSDNumberToCountFromDB, cCexETHUSDNumberToInsertLogsToDB);
    let cCexETHUSDData = [];
    cCexETHUSDArray.forEach((spotPrice, i) => {
      cCexETHUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    cCexETHUSDModel.insertMany(cCexETHUSDData);

    cCexETHUSDNumberToCountFromDB = cCexETHUSDNumberToCountFromDB + 1001;
    cCexETHUSDNumberToInsertLogsToDB = cCexETHUSDNumberToInsertLogsToDB + 1001;
    console.log("CCEX ETHUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['cCex'].LTCUSD.length > cCexLTCUSDNumberToInsertLogsToDB){
    let cCexLTCUSDArray = historicDataLogs['cCex'].LTCUSD.slice(cCexLTCUSDNumberToCountFromDB, cCexLTCUSDNumberToInsertLogsToDB);
    let cCexLTCUSDData = [];
    cCexLTCUSDArray.forEach((spotPrice, i) => {
      cCexLTCUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    cCexLTCUSDModel.insertMany(cCexLTCUSDData);

    cCexLTCUSDNumberToCountFromDB = cCexLTCUSDNumberToCountFromDB + 1001;
    cCexLTCUSDNumberToInsertLogsToDB = cCexLTCUSDNumberToInsertLogsToDB + 1001;
    console.log("CCEX LTCUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['cCex'].DASHUSD.length > cCexDASHUSDNumberToInsertLogsToDB){
    let cCexDASHUSDArray = historicDataLogs['cCex'].DASHUSD.slice(cCexDASHUSDNumberToCountFromDB, cCexDASHUSDNumberToInsertLogsToDB);
    let cCexDASHUSDData = [];
    cCexDASHUSDArray.forEach((spotPrice, i) => {
      cCexDASHUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    cCexDASHUSDModel.insertMany(cCexDASHUSDData);

    cCexDASHUSDNumberToCountFromDB = cCexDASHUSDNumberToCountFromDB + 1001;
    cCexDASHUSDNumberToInsertLogsToDB = cCexDASHUSDNumberToInsertLogsToDB + 1001;
    console.log("CCEX DASHUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['cCex'].DASHBTC.length > cCexDASHBTCNumberToInsertLogsToDB){
    let cCexDASHBTCArray = historicDataLogs['cCex'].DASHBTC.slice(cCexDASHBTCNumberToCountFromDB, cCexDASHBTCNumberToInsertLogsToDB);
    let cCexDASHBTCData = [];
    cCexDASHBTCArray.forEach((spotPrice, i) => {
      cCexDASHBTCData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    cCexDASHBTCModel.insertMany(cCexDASHBTCData);

    cCexDASHBTCNumberToCountFromDB = cCexDASHBTCNumberToCountFromDB + 1001;
    cCexDASHBTCNumberToInsertLogsToDB = cCexDASHBTCNumberToInsertLogsToDB + 1001;
    console.log("CCEX DASHBTC INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['cCex'].LTCBTC.length > cCexLTCBTCNumberToInsertLogsToDB){
    let cCexLTCBTCArray = historicDataLogs['cCex'].LTCBTC.slice(cCexLTCBTCNumberToCountFromDB, cCexLTCBTCNumberToInsertLogsToDB);
    let cCexLTCBTCData = [];
    cCexLTCBTCArray.forEach((spotPrice, i) => {
      cCexLTCBTCData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    cCexLTCBTCModel.insertMany(cCexLTCBTCData);

    cCexLTCBTCNumberToCountFromDB = cCexLTCBTCNumberToCountFromDB + 1001;
    cCexLTCBTCNumberToInsertLogsToDB = cCexLTCBTCNumberToInsertLogsToDB + 1001;
    console.log("CCEX LTCBTC INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['cCex'].ETHBTC.length > cCexETHBTCNumberToInsertLogsToDB){
    let cCexETHBTCArray = historicDataLogs['cCex'].ETHBTC.slice(cCexETHBTCNumberToCountFromDB, cCexETHBTCNumberToInsertLogsToDB);
    let cCexETHBTCData = [];
    cCexETHBTCArray.forEach((spotPrice, i) => {
      cCexETHBTCData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    cCexETHBTCModel.insertMany(cCexETHBTCData);

    cCexETHBTCNumberToCountFromDB = cCexETHBTCNumberToCountFromDB + 1001;
    cCexETHBTCNumberToInsertLogsToDB = cCexETHBTCNumberToInsertLogsToDB + 1001;
    console.log("CCEX ETHBTC INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['cex'].BTCUSD.length > cexBTCUSDNumberToInsertLogsToDB){
    let cexBTCUSDArray = historicDataLogs['cex'].BTCUSD.slice(cexBTCUSDNumberToCountFromDB, cexBTCUSDNumberToInsertLogsToDB);
    let cexBTCUSDData = [];
    cexBTCUSDArray.forEach((spotPrice, i) => {
      cexBTCUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    cexBTCUSDModel.insertMany(cexBTCUSDData);

    cexBTCUSDNumberToCountFromDB = cexBTCUSDNumberToCountFromDB + 1001;
    cexBTCUSDNumberToInsertLogsToDB = cexBTCUSDNumberToInsertLogsToDB + 1001;
    console.log("CEX BTCUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['cex'].BCHUSD.length > cexBCHUSDNumberToInsertLogsToDB){
    let cexBCHUSDArray = historicDataLogs['cex'].BCHUSD.slice(cexBCHUSDNumberToCountFromDB, cexBCHUSDNumberToInsertLogsToDB);
    let cexBCHUSDData = [];
    cexBCHUSDArray.forEach((spotPrice, i) => {
      cexBCHUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    cexBCHUSDModel.insertMany(cexBCHUSDData);

    cexBCHUSDNumberToCountFromDB = cexBCHUSDNumberToCountFromDB + 1001;
    cexBCHUSDNumberToInsertLogsToDB = cexBCHUSDNumberToInsertLogsToDB + 1001;
    console.log("CEX BCHUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['cex'].ETHUSD.length > cexETHUSDNumberToInsertLogsToDB){
    let cexETHUSDArray = historicDataLogs['cex'].ETHUSD.slice(cexETHUSDNumberToCountFromDB, cexETHUSDNumberToInsertLogsToDB);
    let cexETHUSDData = [];
    cexETHUSDArray.forEach((spotPrice, i) => {
      cexETHUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    cexETHUSDModel.insertMany(cexETHUSDData);

    cexETHUSDNumberToCountFromDB = cexETHUSDNumberToCountFromDB + 1001;
    cexETHUSDNumberToInsertLogsToDB = cexETHUSDNumberToInsertLogsToDB + 1001;
    console.log("CEX ETHUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['cex'].ETHBTC.length > cexETHBTCNumberToInsertLogsToDB){
    let cexETHBTCArray = historicDataLogs['cex'].ETHBTC.slice(cexETHBTCNumberToCountFromDB, cexETHBTCNumberToInsertLogsToDB);
    let cexETHBTCData = [];
    cexETHBTCArray.forEach((spotPrice, i) => {
      cexETHBTCData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    cexETHBTCModel.insertMany(cexETHBTCData);

    cexETHBTCNumberToCountFromDB = cexETHBTCNumberToCountFromDB + 1001;
    cexETHBTCNumberToInsertLogsToDB = cexETHBTCNumberToInsertLogsToDB + 1001;
    console.log("CEX ETHBTC INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['hitbtc'].ETHUSD.length > hitbtcETHUSDNumberToInsertLogsToDB){
    let hitbtcETHUSDArray = historicDataLogs['hitbtc'].ETHUSD.slice(hitbtcETHUSDNumberToCountFromDB, hitbtcETHUSDNumberToInsertLogsToDB);
    let hitbtcETHUSDData = [];
    hitbtcETHUSDArray.forEach((spotPrice, i) => {
      hitbtcETHUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    hitbtcETHUSDModel.insertMany(hitbtcETHUSDData);

    hitbtcETHUSDNumberToCountFromDB = hitbtcETHUSDNumberToCountFromDB + 1001;
    hitbtcETHUSDNumberToInsertLogsToDB = hitbtcETHUSDNumberToInsertLogsToDB + 1001;
    console.log("HITBTC ETHUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['hitbtc'].EOSBTC.length > hitbtcEOSBTCNumberToInsertLogsToDB){
    let hitbtcEOSBTCArray = historicDataLogs['hitbtc'].EOSBTC.slice(hitbtcEOSBTCNumberToCountFromDB, hitbtcEOSBTCNumberToInsertLogsToDB);
    let hitbtcEOSBTCData = [];
    hitbtcEOSBTCArray.forEach((spotPrice, i) => {
      hitbtcEOSBTCData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    hitbtcEOSBTCModel.insertMany(hitbtcEOSBTCData);

    hitbtcEOSBTCNumberToCountFromDB = hitbtcEOSBTCNumberToCountFromDB + 1001;
    hitbtcEOSBTCNumberToInsertLogsToDB = hitbtcEOSBTCNumberToInsertLogsToDB + 1001;
    console.log("HITBTC EOSBTC INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['hitbtc'].LTCBTC.length > hitbtcLTCBTCNumberToInsertLogsToDB){
    let hitbtcLTCBTCArray = historicDataLogs['hitbtc'].LTCBTC.slice(hitbtcLTCBTCNumberToCountFromDB, hitbtcLTCBTCNumberToInsertLogsToDB);
    let hitbtcLTCBTCData = [];
    hitbtcLTCBTCArray.forEach((spotPrice, i) => {
      hitbtcLTCBTCData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    hitbtcLTCBTCModel.insertMany(hitbtcLTCBTCData);

    hitbtcLTCBTCNumberToCountFromDB = hitbtcLTCBTCNumberToCountFromDB + 1001;
    hitbtcLTCBTCNumberToInsertLogsToDB = hitbtcLTCBTCNumberToInsertLogsToDB + 1001;
    console.log("HITBTC LTCBTC INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['hitbtc'].ETHBTC.length > hitbtcETHBTCNumberToInsertLogsToDB){
    let hitbtcETHBTCArray = historicDataLogs['hitbtc'].ETHBTC.slice(hitbtcETHBTCNumberToCountFromDB, hitbtcETHBTCNumberToInsertLogsToDB);
    let hitbtcETHBTCData = [];
    hitbtcETHBTCArray.forEach((spotPrice, i) => {
      hitbtcETHBTCData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    hitbtcETHBTCModel.insertMany(hitbtcETHBTCData);

    hitbtcETHBTCNumberToCountFromDB = hitbtcETHBTCNumberToCountFromDB + 1001;
    hitbtcETHBTCNumberToInsertLogsToDB = hitbtcETHBTCNumberToInsertLogsToDB + 1001;
    console.log("HITBTC ETHBTC INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['hitbtc'].BTCUSD.length > hitbtcBTCUSDNumberToInsertLogsToDB){
    let hitbtcBTCUSDArray = historicDataLogs['hitbtc'].BTCUSD.slice(hitbtcBTCUSDNumberToCountFromDB, hitbtcBTCUSDNumberToInsertLogsToDB);
    let hitbtcBTCUSDData = [];
    hitbtcBTCUSDArray.forEach((spotPrice, i) => {
      hitbtcBTCUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    hitbtcBTCUSDModel.insertMany(hitbtcBTCUSDData);

    hitbtcBTCUSDNumberToCountFromDB = hitbtcBTCUSDNumberToCountFromDB + 1001;
    hitbtcBTCUSDNumberToInsertLogsToDB = hitbtcBTCUSDNumberToInsertLogsToDB + 1001;
    console.log("HITBTC BTCUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['hitbtc'].BCCUSD.length > hitbtcBCCUSDNumberToInsertLogsToDB){
    let hitbtcBCCUSDArray = historicDataLogs['hitbtc'].BCCUSD.slice(hitbtcBCCUSDNumberToCountFromDB, hitbtcBCCUSDNumberToInsertLogsToDB);
    let hitbtcBCCUSDData = [];
    hitbtcBCCUSDArray.forEach((spotPrice, i) => {
      hitbtcBCCUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    hitbtcBCCUSDModel.insertMany(hitbtcBCCUSDData);

    hitbtcBCCUSDNumberToCountFromDB = hitbtcBCCUSDNumberToCountFromDB + 1001;
    hitbtcBCCUSDNumberToInsertLogsToDB = hitbtcBCCUSDNumberToInsertLogsToDB + 1001;
    console.log("HITBTC BCCUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['hitbtc'].EOSUSD.length > hitbtcEOSUSDNumberToInsertLogsToDB){
    let hitbtcEOSUSDArray = historicDataLogs['hitbtc'].EOSUSD.slice(hitbtcEOSUSDNumberToCountFromDB, hitbtcEOSUSDNumberToInsertLogsToDB);
    let hitbtcEOSUSDData = [];
    hitbtcEOSUSDArray.forEach((spotPrice, i) => {
      hitbtcEOSUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    hitbtcEOSUSDModel.insertMany(hitbtcEOSUSDData);

    hitbtcEOSUSDNumberToCountFromDB = hitbtcEOSUSDNumberToCountFromDB + 1001;
    hitbtcEOSUSDNumberToInsertLogsToDB = hitbtcEOSUSDNumberToInsertLogsToDB + 1001;
    console.log("HITBTC EOSUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['hitbtc'].DASHUSD.length > hitbtcDASHUSDNumberToInsertLogsToDB){
    let hitbtcDASHUSDArray = historicDataLogs['hitbtc'].DASHUSD.slice(hitbtcDASHUSDNumberToCountFromDB, hitbtcDASHUSDNumberToInsertLogsToDB);
    let hitbtcDASHUSDData = [];
    hitbtcDASHUSDArray.forEach((spotPrice, i) => {
      hitbtcDASHUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    hitbtcDASHUSDModel.insertMany(hitbtcDASHUSDData);

    hitbtcDASHUSDNumberToCountFromDB = hitbtcDASHUSDNumberToCountFromDB + 1001;
    hitbtcDASHUSDNumberToInsertLogsToDB = hitbtcDASHUSDNumberToInsertLogsToDB + 1001;
    console.log("HITBTC DASHUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['hitbtc'].LTCUSD.length > hitbtcLTCUSDNumberToInsertLogsToDB){
    let hitbtcLTCUSDArray = historicDataLogs['hitbtc'].LTCUSD.slice(hitbtcLTCUSDNumberToCountFromDB, hitbtcLTCUSDNumberToInsertLogsToDB);
    let hitbtcLTCUSDData = [];
    hitbtcLTCUSDArray.forEach((spotPrice, i) => {
      hitbtcLTCUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    hitbtcLTCUSDModel.insertMany(hitbtcLTCUSDData);

    hitbtcLTCUSDNumberToCountFromDB = hitbtcLTCUSDNumberToCountFromDB + 1001;
    hitbtcLTCUSDNumberToInsertLogsToDB = hitbtcLTCUSDNumberToInsertLogsToDB + 1001;
    console.log("HITBTC LTCUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['livecoin'].BTCUSD.length > livecoinBTCUSDNumberToInsertLogsToDB){
    let livecoinBTCUSDArray = historicDataLogs['livecoin'].BTCUSD.slice(livecoinBTCUSDNumberToCountFromDB, livecoinBTCUSDNumberToInsertLogsToDB);
    let livecoinBTCUSDData = [];
    livecoinBTCUSDArray.forEach((spotPrice, i) => {
      livecoinBTCUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    livecoinBTCUSDModel.insertMany(livecoinBTCUSDData);

    livecoinBTCUSDNumberToCountFromDB = livecoinBTCUSDNumberToCountFromDB + 1001;
    livecoinBTCUSDNumberToInsertLogsToDB = livecoinBTCUSDNumberToInsertLogsToDB + 1001;
    console.log("LIVECOIN BTCUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['livecoin'].ETHUSD.length > livecoinETHUSDNumberToInsertLogsToDB){
    let livecoinETHUSDArray = historicDataLogs['livecoin'].ETHUSD.slice(livecoinETHUSDNumberToCountFromDB, livecoinETHUSDNumberToInsertLogsToDB);
    let livecoinETHUSDData = [];
    livecoinETHUSDArray.forEach((spotPrice, i) => {
      livecoinETHUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    livecoinETHUSDModel.insertMany(livecoinETHUSDData);

    livecoinETHUSDNumberToCountFromDB = livecoinETHUSDNumberToCountFromDB + 1001;
    livecoinETHUSDNumberToInsertLogsToDB = livecoinETHUSDNumberToInsertLogsToDB + 1001;
    console.log("LIVECOIN ETHUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['livecoin'].LTCUSD.length > livecoinLTCUSDNumberToInsertLogsToDB){
    let livecoinLTCUSDArray = historicDataLogs['livecoin'].LTCUSD.slice(livecoinLTCUSDNumberToCountFromDB, livecoinLTCUSDNumberToInsertLogsToDB);
    let livecoinLTCUSDData = [];
    livecoinLTCUSDArray.forEach((spotPrice, i) => {
      livecoinLTCUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    livecoinLTCUSDModel.insertMany(livecoinLTCUSDData);

    livecoinLTCUSDNumberToCountFromDB = livecoinLTCUSDNumberToCountFromDB + 1001;
    livecoinLTCUSDNumberToInsertLogsToDB = livecoinLTCUSDNumberToInsertLogsToDB + 1001;
    console.log("LIVECOIN LTCUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['livecoin'].LTCBTC.length > livecoinLTCBTCNumberToInsertLogsToDB){
    let livecoinLTCBTCArray = historicDataLogs['livecoin'].LTCBTC.slice(livecoinLTCBTCNumberToCountFromDB, livecoinLTCBTCNumberToInsertLogsToDB);
    let livecoinLTCBTCData = [];
    livecoinLTCBTCArray.forEach((spotPrice, i) => {
      livecoinLTCBTCData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    livecoinLTCBTCModel.insertMany(livecoinLTCBTCData);

    livecoinLTCBTCNumberToCountFromDB = livecoinLTCBTCNumberToCountFromDB + 1001;
    livecoinLTCBTCNumberToInsertLogsToDB = livecoinLTCBTCNumberToInsertLogsToDB + 1001;
    console.log("LIVECOIN LTCBTC INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['livecoin'].BCHUSD.length > livecoinBCHUSDNumberToInsertLogsToDB){
    let livecoinBCHUSDArray = historicDataLogs['livecoin'].BCHUSD.slice(livecoinBCHUSDNumberToCountFromDB, livecoinBCHUSDNumberToInsertLogsToDB);
    let livecoinBCHUSDData = [];
    livecoinBCHUSDArray.forEach((spotPrice, i) => {
      livecoinBCHUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    livecoinBCHUSDModel.insertMany(livecoinBCHUSDData);

    livecoinBCHUSDNumberToCountFromDB = livecoinBCHUSDNumberToCountFromDB + 1001;
    livecoinBCHUSDNumberToInsertLogsToDB = livecoinBCHUSDNumberToInsertLogsToDB + 1001;
    console.log("LIVECOIN BCHUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['livecoin'].DASHUSD.length > livecoinDASHUSDNumberToInsertLogsToDB){
    let livecoinDASHUSDArray = historicDataLogs['livecoin'].DASHUSD.slice(livecoinDASHUSDNumberToCountFromDB, livecoinDASHUSDNumberToInsertLogsToDB);
    let livecoinDASHUSDData = [];
    livecoinDASHUSDArray.forEach((spotPrice, i) => {
      livecoinDASHUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    livecoinDASHUSDModel.insertMany(livecoinDASHUSDData);

    livecoinDASHUSDNumberToCountFromDB = livecoinDASHUSDNumberToCountFromDB + 1001;
    livecoinDASHUSDNumberToInsertLogsToDB = livecoinDASHUSDNumberToInsertLogsToDB + 1001;
    console.log("LIVECOIN DASHUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['livecoin'].DASHBTC.length > livecoinDASHBTCNumberToInsertLogsToDB){
    let livecoinDASHBTCArray = historicDataLogs['livecoin'].DASHBTC.slice(livecoinDASHBTCNumberToCountFromDB, livecoinDASHBTCNumberToInsertLogsToDB);
    let livecoinDASHBTCData = [];
    livecoinDASHBTCArray.forEach((spotPrice, i) => {
      livecoinDASHBTCData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    livecoinDASHBTCModel.insertMany(livecoinDASHBTCData);

    livecoinDASHBTCNumberToCountFromDB = livecoinDASHBTCNumberToCountFromDB + 1001;
    livecoinDASHBTCNumberToInsertLogsToDB = livecoinDASHBTCNumberToInsertLogsToDB + 1001;
    console.log("LIVECOIN DASHBTC INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['livecoin'].BCHBTC.length > livecoinBCHBTCNumberToInsertLogsToDB){
    let livecoinBCHBTCArray = historicDataLogs['livecoin'].BCHBTC.slice(livecoinBCHBTCNumberToCountFromDB, livecoinBCHBTCNumberToInsertLogsToDB);
    let livecoinBCHBTCData = [];
    livecoinBCHBTCArray.forEach((spotPrice, i) => {
      livecoinBCHBTCData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    livecoinBCHBTCModel.insertMany(livecoinBCHBTCData);

    livecoinBCHBTCNumberToCountFromDB = livecoinBCHBTCNumberToCountFromDB + 1001;
    livecoinBCHBTCNumberToInsertLogsToDB = livecoinBCHBTCNumberToInsertLogsToDB + 1001;
    console.log("LIVECOIN BCHBTC INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['livecoin'].ETHBTC.length > livecoinETHBTCNumberToInsertLogsToDB){
    let livecoinETHBTCArray = historicDataLogs['livecoin'].ETHBTC.slice(livecoinETHBTCNumberToCountFromDB, livecoinETHBTCNumberToInsertLogsToDB);
    let livecoinETHBTCData = [];
    livecoinETHBTCArray.forEach((spotPrice, i) => {
      livecoinETHBTCData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    livecoinETHBTCModel.insertMany(livecoinETHBTCData);

    livecoinETHBTCNumberToCountFromDB = livecoinETHBTCNumberToCountFromDB + 1001;
    livecoinETHBTCNumberToInsertLogsToDB = livecoinETHBTCNumberToInsertLogsToDB + 1001;
    console.log("LIVECOIN ETHBTC INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['livecoin'].BCHETH.length > livecoinBCHETHNumberToInsertLogsToDB){
    let livecoinBCHETHArray = historicDataLogs['livecoin'].BCHETH.slice(livecoinBCHETHNumberToCountFromDB, livecoinBCHETHNumberToInsertLogsToDB);
    let livecoinBCHETHData = [];
    livecoinBCHETHArray.forEach((spotPrice, i) => {
      livecoinBCHETHData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    livecoinBCHETHModel.insertMany(livecoinBCHETHData);

    livecoinBCHETHNumberToCountFromDB = livecoinBCHETHNumberToCountFromDB + 1001;
    livecoinBCHETHNumberToInsertLogsToDB = livecoinBCHETHNumberToInsertLogsToDB + 1001;
    console.log("LIVECOIN BCHETH INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['bittrex'].BTCUSD.length > bittrexBTCUSDNumberToInsertLogsToDB){
    let bittrexBTCUSDArray = historicDataLogs['bittrex'].BTCUSD.slice(bittrexBTCUSDNumberToCountFromDB, bittrexBTCUSDNumberToInsertLogsToDB);
    let bittrexBTCUSDData = [];
    bittrexBTCUSDArray.forEach((spotPrice, i) => {
      bittrexBTCUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    bittrexBTCUSDModel.insertMany(bittrexBTCUSDData);

    bittrexBTCUSDNumberToCountFromDB = bittrexBTCUSDNumberToCountFromDB + 1001;
    bittrexBTCUSDNumberToInsertLogsToDB = bittrexBTCUSDNumberToInsertLogsToDB + 1001;
    console.log("BITTREX BTCUSD INSERTED: ", bittrexBTCUSDNumberToInsertLogsToDB);
  }

  if(needToWithdraw === false && historicDataLogs['bittrex'].ETHBTC.length > bittrexETHBTCNumberToInsertLogsToDB){
    let bittrexETHBTCArray = historicDataLogs['bittrex'].ETHBTC.slice(bittrexETHBTCNumberToCountFromDB, bittrexETHBTCNumberToInsertLogsToDB);
    let bittrexETHBTCData = [];

    bittrexETHBTCArray.forEach((spotPrice, i) => {
      bittrexETHBTCData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    bittrexETHBTCModel.insertMany(bittrexETHBTCData);

    bittrexETHBTCNumberToCountFromDB = bittrexETHBTCNumberToCountFromDB + 1001;
    bittrexETHBTCNumberToInsertLogsToDB = bittrexETHBTCNumberToInsertLogsToDB + 1001;
    console.log("BITTREX ETHBTC INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['bittrex'].ETHUSD.length > bittrexETHUSDNumberToInsertLogsToDB){
    let bittrexETHUSDArray = historicDataLogs['bittrex'].ETHUSD.slice(bittrexETHUSDNumberToCountFromDB, bittrexETHUSDNumberToInsertLogsToDB);
    let bittrexETHUSDData = [];

    bittrexETHUSDArray.forEach((spotPrice, i) => {
      bittrexETHUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    bittrexETHUSDModel.insertMany(bittrexETHUSDData);

    bittrexETHUSDNumberToCountFromDB = bittrexETHUSDNumberToCountFromDB + 1001;
    bittrexETHUSDNumberToInsertLogsToDB = bittrexETHUSDNumberToInsertLogsToDB + 1001;
    console.log("BITTREX ETHUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['bittrex'].LTCETH.length > bittrexLTCETHNumberToInsertLogsToDB){
    let bittrexLTCETHArray = historicDataLogs['bittrex'].LTCETH.slice(bittrexLTCETHNumberToCountFromDB, bittrexLTCETHNumberToInsertLogsToDB);
    let bittrexLTCETHData = [];
    bittrexLTCETHArray.forEach((spotPrice, i) => {
      bittrexLTCETHData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    bittrexLTCETHModel.insertMany(bittrexLTCETHData);

    bittrexLTCETHNumberToCountFromDB = bittrexLTCETHNumberToCountFromDB + 1001;
    bittrexLTCETHNumberToInsertLogsToDB = bittrexLTCETHNumberToInsertLogsToDB + 1001;
    console.log("BITTREX LTCETH INSERTED")
  }

  if(needToWithdraw === false && historicDataLogs['bittrex'].LTCUSD.length > bittrexLTCUSDNumberToInsertLogsToDB){
    let bittrexLTCUSDArray = historicDataLogs['bittrex'].LTCUSD.slice(bittrexLTCUSDNumberToCountFromDB, bittrexLTCUSDNumberToInsertLogsToDB);
    let bittrexLTCUSDData = [];
    bittrexLTCUSDArray.forEach((spotPrice, i) => {
      bittrexLTCUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    bittrexLTCUSDModel.insertMany(bittrexLTCUSDData);

    bittrexLTCUSDNumberToCountFromDB = bittrexLTCUSDNumberToCountFromDB + 1001;
    bittrexLTCUSDNumberToInsertLogsToDB = bittrexLTCUSDNumberToInsertLogsToDB + 1001;
    console.log("BITTREX LTCUSD INSERTED")
  }

  if(needToWithdraw === false && historicDataLogs['gdax'].BTCUSD.length > gdaxBTCUSDNumberToInsertLogsToDB){
    let gdaxBTCUSDArray = historicDataLogs['gdax'].BTCUSD.slice(gdaxBTCUSDNumberToCountFromDB, gdaxBTCUSDNumberToInsertLogsToDB);
    let gdaxBTCUSDData = [];
    gdaxBTCUSDArray.forEach((spotPrice, i) => {
      gdaxBTCUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    gdaxBTCUSDModel.insertMany(gdaxBTCUSDData);

    gdaxBTCUSDNumberToCountFromDB = gdaxBTCUSDNumberToCountFromDB + 1001;
    gdaxBTCUSDNumberToInsertLogsToDB = gdaxBTCUSDNumberToInsertLogsToDB + 1001;
    console.log("GDAX BTCUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['gdax'].ETHBTC.length > gdaxETHBTCNumberToInsertLogsToDB){
    let gdaxETHBTCArray = historicDataLogs['gdax'].ETHBTC.slice(gdaxETHBTCNumberToCountFromDB, gdaxETHBTCNumberToInsertLogsToDB);
    let gdaxETHBTCData = [];

    gdaxETHBTCArray.forEach((spotPrice, i) => {
      gdaxETHBTCData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    gdaxETHBTCModel.insertMany(gdaxETHBTCData);

    gdaxETHBTCNumberToCountFromDB = gdaxETHBTCNumberToCountFromDB + 1001;
    gdaxETHBTCNumberToInsertLogsToDB = gdaxETHBTCNumberToInsertLogsToDB + 1001;
    console.log("GDAX ETHBTC INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['gdax'].LTCBTC.length > gdaxLTCBTCNumberToInsertLogsToDB){
    let gdaxLTCBTCArray = historicDataLogs['gdax'].LTCBTC.slice(gdaxLTCBTCNumberToCountFromDB, gdaxLTCBTCNumberToInsertLogsToDB);
    let gdaxLTCBTCData = [];

    gdaxLTCBTCArray.forEach((spotPrice, i) => {
      gdaxLTCBTCData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    gdaxLTCBTCModel.insertMany(gdaxLTCBTCData);

    gdaxLTCBTCNumberToCountFromDB = gdaxLTCBTCNumberToCountFromDB + 1001;
    gdaxLTCBTCNumberToInsertLogsToDB = gdaxLTCBTCNumberToInsertLogsToDB + 1001;
    console.log("GDAX LTCBTC INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['gdax'].ETHUSD.length > gdaxETHUSDNumberToInsertLogsToDB){
    let gdaxETHUSDArray = historicDataLogs['gdax'].ETHUSD.slice(gdaxETHUSDNumberToCountFromDB, gdaxETHUSDNumberToInsertLogsToDB);
    let gdaxETHUSDData = [];

    gdaxETHUSDArray.forEach((spotPrice, i) => {
      gdaxETHUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    gdaxETHUSDModel.insertMany(gdaxETHUSDData);

    gdaxETHUSDNumberToCountFromDB = gdaxETHUSDNumberToCountFromDB + 1001;
    gdaxETHUSDNumberToInsertLogsToDB = gdaxETHUSDNumberToInsertLogsToDB + 1001;
    console.log("GDAX ETHUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['gdax'].LTCUSD.length > gdaxLTCUSDNumberToInsertLogsToDB){
    let gdaxLTCUSDArray = historicDataLogs['gdax'].LTCUSD.slice(gdaxLTCUSDNumberToCountFromDB, gdaxLTCUSDNumberToInsertLogsToDB);
    let gdaxLTCUSDData = [];

    gdaxLTCUSDArray.forEach((spotPrice, i) => {
      gdaxLTCUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    gdaxLTCUSDModel.insertMany(gdaxLTCUSDData);

    gdaxLTCUSDNumberToCountFromDB = gdaxLTCUSDNumberToCountFromDB + 1001;
    gdaxLTCUSDNumberToInsertLogsToDB = gdaxLTCUSDNumberToInsertLogsToDB + 1001;
    console.log("GDAX LTCUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['gemini'].ETHBTC.length > geminiETHBTCNumberToInsertLogsToDB){
    let geminiETHBTCArray = historicDataLogs['gemini'].ETHBTC.slice(geminiETHBTCNumberToCountFromDB, geminiETHBTCNumberToInsertLogsToDB);
    let geminiETHBTCData = [];

    geminiETHBTCArray.forEach((spotPrice, i) => {
      geminiETHBTCData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    geminiETHBTCModel.insertMany(geminiETHBTCData);

    geminiETHBTCNumberToCountFromDB = geminiETHBTCNumberToCountFromDB + 1001;
    geminiETHBTCNumberToInsertLogsToDB = geminiETHBTCNumberToInsertLogsToDB + 1001;
    console.log("GEMINI ETHBTC INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['gemini'].ETHUSD.length > geminiETHUSDNumberToInsertLogsToDB){
    let geminiETHUSDArray = historicDataLogs['gemini'].ETHUSD.slice(geminiETHUSDNumberToCountFromDB, geminiETHUSDNumberToInsertLogsToDB);
    let geminiETHUSDData = [];

    geminiETHUSDArray.forEach((spotPrice, i) => {
      geminiETHUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    geminiETHUSDModel.insertMany(geminiETHUSDData);

    geminiETHUSDNumberToCountFromDB = geminiETHUSDNumberToCountFromDB + 1001;
    geminiETHUSDNumberToInsertLogsToDB = geminiETHUSDNumberToInsertLogsToDB + 1001;
    console.log("GEMINI ETHUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['gemini'].BTCUSD.length > geminiBTCUSDNumberToInsertLogsToDB){
    let geminiBTCUSDArray = historicDataLogs['gemini'].BTCUSD.slice(geminiBTCUSDNumberToCountFromDB, geminiBTCUSDNumberToInsertLogsToDB);
    let geminiBTCUSDData = [];

    geminiBTCUSDArray.forEach((spotPrice, i) => {
      geminiBTCUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    geminiBTCUSDModel.insertMany(geminiBTCUSDData);

    geminiBTCUSDNumberToCountFromDB = geminiBTCUSDNumberToCountFromDB + 1001;
    geminiBTCUSDNumberToInsertLogsToDB = geminiBTCUSDNumberToInsertLogsToDB + 1001;
    console.log("GEMINI BTCUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['poloniex'].ETHBTC.length > poloniexETHBTCNumberToInsertLogsToDB){
    let poloniexETHBTCArray = historicDataLogs['poloniex'].ETHBTC.slice(poloniexETHBTCNumberToCountFromDB, poloniexETHBTCNumberToInsertLogsToDB);
    let poloniexETHBTCData = [];

    poloniexETHBTCArray.forEach((spotPrice, i) => {
      poloniexETHBTCData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    poloniexETHBTCModel.insertMany(poloniexETHBTCData);

    poloniexETHBTCNumberToCountFromDB = poloniexETHBTCNumberToCountFromDB + 1001;
    poloniexETHBTCNumberToInsertLogsToDB = poloniexETHBTCNumberToInsertLogsToDB + 1001;
    console.log("POLONIEX ETHBTC INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['poloniex'].BTCUSD.length > poloniexBTCUSDNumberToInsertLogsToDB){
    let poloniexBTCUSDArray = historicDataLogs['poloniex'].BTCUSD.slice(poloniexBTCUSDNumberToCountFromDB, poloniexBTCUSDNumberToInsertLogsToDB);
    let poloniexBTCUSDData = [];

    poloniexBTCUSDArray.forEach((spotPrice, i) => {
      poloniexBTCUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    poloniexBTCUSDModel.insertMany(poloniexBTCUSDData);

    poloniexBTCUSDNumberToCountFromDB = poloniexBTCUSDNumberToCountFromDB + 1001;
    poloniexBTCUSDNumberToInsertLogsToDB = poloniexBTCUSDNumberToInsertLogsToDB + 1001;
    console.log("POLONIEX BTCUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['poloniex'].ETHUSD.length > poloniexETHUSDNumberToInsertLogsToDB){
    let poloniexETHUSDArray = historicDataLogs['poloniex'].ETHUSD.slice(poloniexETHUSDNumberToCountFromDB, poloniexETHUSDNumberToInsertLogsToDB);
    let poloniexETHUSDData = [];

    poloniexETHUSDArray.forEach((spotPrice, i) => {
      poloniexETHUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    poloniexETHUSDModel.insertMany(poloniexETHUSDData);

    poloniexETHUSDNumberToCountFromDB = poloniexETHUSDNumberToCountFromDB + 1001;
    poloniexETHUSDNumberToInsertLogsToDB = poloniexETHUSDNumberToInsertLogsToDB + 1001;
    console.log("POLONIEX ETHUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['poloniex'].BCHBTC.length > poloniexBCHBTCNumberToInsertLogsToDB){
    let poloniexBCHBTCArray = historicDataLogs['poloniex'].BCHBTC.slice(poloniexBCHBTCNumberToCountFromDB, poloniexBCHBTCNumberToInsertLogsToDB);
    let poloniexBCHBTCData = [];

    poloniexBCHBTCArray.forEach((spotPrice, i) => {
      poloniexBCHBTCData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    poloniexBCHBTCModel.insertMany(poloniexBCHBTCData);

    poloniexBCHBTCNumberToCountFromDB = poloniexBCHBTCNumberToCountFromDB + 1001;
    poloniexBCHBTCNumberToInsertLogsToDB = poloniexBCHBTCNumberToInsertLogsToDB + 1001;
    console.log("POLONIEX BCHBTC INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['poloniex'].BCHUSD.length > poloniexBCHUSDNumberToInsertLogsToDB){
    let poloniexBCHUSDArray = historicDataLogs['poloniex'].BCHUSD.slice(poloniexBCHUSDNumberToCountFromDB, poloniexBCHUSDNumberToInsertLogsToDB);
    let poloniexBCHUSDData = [];

    poloniexBCHUSDArray.forEach((spotPrice, i) => {
      poloniexBCHUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    poloniexBCHUSDModel.insertMany(poloniexBCHUSDData);

    poloniexBCHUSDNumberToCountFromDB = poloniexBCHUSDNumberToCountFromDB + 1001;
    poloniexBCHUSDNumberToInsertLogsToDB = poloniexBCHUSDNumberToInsertLogsToDB + 1001;
    console.log("POLONIEX BCHUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['poloniex'].DASHUSD.length > poloniexDASHUSDNumberToInsertLogsToDB){
    let poloniexDASHUSDArray = historicDataLogs['poloniex'].DASHUSD.slice(poloniexDASHUSDNumberToCountFromDB, poloniexDASHUSDNumberToInsertLogsToDB);
    let poloniexDASHUSDData = [];

    poloniexDASHUSDArray.forEach((spotPrice, i) => {
      poloniexDASHUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    poloniexDASHUSDModel.insertMany(poloniexDASHUSDData);

    poloniexDASHUSDNumberToCountFromDB = poloniexDASHUSDNumberToCountFromDB + 1001;
    poloniexDASHUSDNumberToInsertLogsToDB = poloniexDASHUSDNumberToInsertLogsToDB + 1001;
    console.log("POLONIEX DASHUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['poloniex'].DASHBTC.length > poloniexDASHBTCNumberToInsertLogsToDB){
    let poloniexDASHBTCArray = historicDataLogs['poloniex'].DASHBTC.slice(poloniexDASHBTCNumberToCountFromDB, poloniexDASHBTCNumberToInsertLogsToDB);
    let poloniexDASHBTCData = [];

    poloniexDASHBTCArray.forEach((spotPrice, i) => {
      poloniexDASHBTCData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    poloniexDASHBTCModel.insertMany(poloniexDASHBTCData);

    poloniexDASHBTCNumberToCountFromDB = poloniexDASHBTCNumberToCountFromDB + 1001;
    poloniexDASHBTCNumberToInsertLogsToDB = poloniexDASHBTCNumberToInsertLogsToDB + 1001;
    console.log("POLONIEX DASHBTC INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['poloniex'].LTCBTC.length > poloniexLTCBTCNumberToInsertLogsToDB){
    let poloniexLTCBTCArray = historicDataLogs['poloniex'].LTCBTC.slice(poloniexLTCBTCNumberToCountFromDB, poloniexLTCBTCNumberToInsertLogsToDB);
    let poloniexLTCBTCData = [];

    poloniexLTCBTCArray.forEach((spotPrice, i) => {
      poloniexLTCBTCData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    poloniexLTCBTCModel.insertMany(poloniexLTCBTCData);

    poloniexLTCBTCNumberToCountFromDB = poloniexLTCBTCNumberToCountFromDB + 1001;
    poloniexLTCBTCNumberToInsertLogsToDB = poloniexLTCBTCNumberToInsertLogsToDB + 1001;
    console.log("POLONIEX LTCBTC INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['poloniex'].LTCUSD.length > poloniexLTCUSDNumberToInsertLogsToDB){
    let poloniexLTCUSDArray = historicDataLogs['poloniex'].LTCUSD.slice(poloniexLTCUSDNumberToCountFromDB, poloniexLTCUSDNumberToInsertLogsToDB);
    let poloniexLTCUSDData = [];

    poloniexLTCUSDArray.forEach((spotPrice, i) => {
      poloniexLTCUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    poloniexLTCUSDModel.insertMany(poloniexLTCUSDData);

    poloniexLTCUSDNumberToCountFromDB = poloniexLTCUSDNumberToCountFromDB + 1001;
    poloniexLTCUSDNumberToInsertLogsToDB = poloniexLTCUSDNumberToInsertLogsToDB + 1001;
    console.log("POLONIEX LTCUSD INSERTED");
  }

  if(historicDataLogs['hitbtc'].EOSBTC.length > 0 && historicDataLogs['hitbtc'].EOSUSD.length > 0 && historicDataLogs['hitbtc'].DASHUSD.length > 0 && historicDataLogs['hitbtc'].BCCUSD.length > 0 && historicDataLogs['hitbtc'].ETHBTC.length > 0 && historicDataLogs['hitbtc'].BTCUSD.length > 0 && historicDataLogs['hitbtc'].LTCBTC.length > 0 && historicDataLogs['hitbtc'].ETHUSD.length > 0 && historicDataLogs['hitbtc'].LTCUSD.length > 0){
    if(cryptoSocket.Exchanges.hitbtc.ETHBTC > historicDataLogs['hitbtc'].ETHBTC[historicDataLogs['hitbtc'].ETHBTC.length - 1][1] || cryptoSocket.Exchanges.hitbtc.ETHBTC < historicDataLogs['hitbtc'].ETHBTC[historicDataLogs['hitbtc'].ETHBTC.length - 1][1]){
      historicDataLogs['hitbtc'].ETHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.hitbtc.ETHBTC]);
    }

    if(cryptoSocket.Exchanges.hitbtc.EOSBTC > historicDataLogs['hitbtc'].EOSBTC[historicDataLogs['hitbtc'].EOSBTC.length - 1][1] || cryptoSocket.Exchanges.hitbtc.EOSBTC < historicDataLogs['hitbtc'].EOSBTC[historicDataLogs['hitbtc'].EOSBTC.length - 1][1]){
      historicDataLogs['hitbtc'].EOSBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.hitbtc.EOSBTC]);
    }

    if(cryptoSocket.Exchanges.hitbtc.DASHUSD > historicDataLogs['hitbtc'].DASHUSD[historicDataLogs['hitbtc'].DASHUSD.length - 1][1] || cryptoSocket.Exchanges.hitbtc.DASHUSD < historicDataLogs['hitbtc'].DASHUSD[historicDataLogs['hitbtc'].DASHUSD.length - 1][1]){
      historicDataLogs['hitbtc'].DASHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.hitbtc.DASHUSD]);
    }

    if(cryptoSocket.Exchanges.hitbtc.EOSUSD > historicDataLogs['hitbtc'].EOSUSD[historicDataLogs['hitbtc'].EOSUSD.length - 1][1] || cryptoSocket.Exchanges.hitbtc.EOSUSD < historicDataLogs['hitbtc'].EOSUSD[historicDataLogs['hitbtc'].EOSUSD.length - 1][1]){
      historicDataLogs['hitbtc'].EOSUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.hitbtc.EOSUSD]);
    }

    if(cryptoSocket.Exchanges.hitbtc.BCCUSD > historicDataLogs['hitbtc'].BCCUSD[historicDataLogs['hitbtc'].BCCUSD.length - 1][1] || cryptoSocket.Exchanges.hitbtc.BCCUSD < historicDataLogs['hitbtc'].BCCUSD[historicDataLogs['hitbtc'].BCCUSD.length - 1][1]){
      historicDataLogs['hitbtc'].BCCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.hitbtc.BCCUSD]);
    }

    if(cryptoSocket.Exchanges.hitbtc.BTCUSD > historicDataLogs['hitbtc'].BTCUSD[historicDataLogs['hitbtc'].BTCUSD.length - 1][1] || cryptoSocket.Exchanges.hitbtc.BTCUSD < historicDataLogs['hitbtc'].BTCUSD[historicDataLogs['hitbtc'].BTCUSD.length - 1][1]){
      historicDataLogs['hitbtc'].BTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.hitbtc.BTCUSD]);
    }

    if(cryptoSocket.Exchanges.hitbtc.LTCBTC > historicDataLogs['hitbtc'].LTCBTC[historicDataLogs['hitbtc'].LTCBTC.length - 1][1] || cryptoSocket.Exchanges.hitbtc.LTCBTC < historicDataLogs['hitbtc'].LTCBTC[historicDataLogs['hitbtc'].LTCBTC.length - 1][1]){
      historicDataLogs['hitbtc'].LTCBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.hitbtc.LTCBTC]);
    }

    if(cryptoSocket.Exchanges.hitbtc.ETHUSD > historicDataLogs['hitbtc'].ETHUSD[historicDataLogs['hitbtc'].ETHUSD.length - 1][1] || cryptoSocket.Exchanges.hitbtc.ETHUSD < historicDataLogs['hitbtc'].ETHUSD[historicDataLogs['hitbtc'].ETHUSD.length - 1][1]){
      historicDataLogs['hitbtc'].ETHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.hitbtc.ETHUSD]);
    }

    if(cryptoSocket.Exchanges.hitbtc.LTCUSD > historicDataLogs['hitbtc'].LTCUSD[historicDataLogs['hitbtc'].LTCUSD.length - 1][1] || cryptoSocket.Exchanges.hitbtc.LTCUSD < historicDataLogs['hitbtc'].LTCUSD[historicDataLogs['hitbtc'].LTCUSD.length - 1][1]){
      historicDataLogs['hitbtc'].LTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.hitbtc.LTCUSD]);
    }
  } else {
    historicDataLogs['hitbtc'].ETHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.hitbtc.ETHBTC]);
    historicDataLogs['hitbtc'].EOSBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.hitbtc.EOSBTC]);
    historicDataLogs['hitbtc'].BTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.hitbtc.BTCUSD]);
    historicDataLogs['hitbtc'].EOSUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.hitbtc.EOSUSD]);
    historicDataLogs['hitbtc'].DASHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.hitbtc.DASHUSD]);
    historicDataLogs['hitbtc'].BCCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.hitbtc.BCCUSD]);
    historicDataLogs['hitbtc'].LTCBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.hitbtc.LTCBTC]);
    historicDataLogs['hitbtc'].LTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.hitbtc.LTCUSD]);
    historicDataLogs['hitbtc'].ETHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.hitbtc.ETHUSD]);
  }

  if(historicDataLogs['cex'].ETHBTC.length > 0 && historicDataLogs['cex'].BTCUSD.length > 0 && historicDataLogs['cex'].ETHUSD.length > 0 && historicDataLogs['cex'].BCHUSD.length > 0){
    if(cryptoSocket.Exchanges.cex.ETHBTC > historicDataLogs['cex'].ETHBTC[historicDataLogs['cex'].ETHBTC.length - 1][1] || cryptoSocket.Exchanges.cex.ETHBTC < historicDataLogs['cex'].ETHBTC[historicDataLogs['cex'].ETHBTC.length - 1][1]){
      historicDataLogs['cex'].ETHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.cex.ETHBTC]);
    }

    if(cryptoSocket.Exchanges.cex.BTCUSD > historicDataLogs['cex'].BTCUSD[historicDataLogs['cex'].BTCUSD.length - 1][1] || cryptoSocket.Exchanges.cex.BTCUSD < historicDataLogs['cex'].BTCUSD[historicDataLogs['cex'].BTCUSD.length - 1][1]){
      historicDataLogs['cex'].BTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.cex.BTCUSD]);
    }

    if(cryptoSocket.Exchanges.cex.ETHUSD > historicDataLogs['cex'].ETHUSD[historicDataLogs['cex'].ETHUSD.length - 1][1] || cryptoSocket.Exchanges.cex.ETHUSD < historicDataLogs['cex'].ETHUSD[historicDataLogs['cex'].ETHUSD.length - 1][1]){
      historicDataLogs['cex'].ETHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.cex.ETHUSD]);
    }

    if(cryptoSocket.Exchanges.cex.BCHUSD > historicDataLogs['cex'].BCHUSD[historicDataLogs['cex'].BCHUSD.length - 1][1] || cryptoSocket.Exchanges.cex.BCHUSD < historicDataLogs['cex'].BCHUSD[historicDataLogs['cex'].BCHUSD.length - 1][1]){
      historicDataLogs['cex'].BCHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.cex.BCHUSD]);
    }
  } else {
    historicDataLogs['cex'].ETHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.cex.ETHBTC]);
    historicDataLogs['cex'].BTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.cex.BTCUSD]);
    historicDataLogs['cex'].BCHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.cex.BCHUSD]);
    historicDataLogs['cex'].ETHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.cex.ETHUSD]);
  }

  if(historicDataLogs['livecoin'].DASHUSD.length > 0 && historicDataLogs['livecoin'].BCHUSD.length > 0 && historicDataLogs['livecoin'].BCHBTC.length > 0 && historicDataLogs['livecoin'].BCHETH.length > 0 && historicDataLogs['livecoin'].ETHBTC.length > 0 && historicDataLogs['livecoin'].DASHBTC.length > 0 && historicDataLogs['livecoin'].BTCUSD.length > 0 && historicDataLogs['livecoin'].LTCBTC.length > 0 && historicDataLogs['livecoin'].ETHUSD.length > 0 && historicDataLogs['livecoin'].LTCUSD.length > 0){
    if(cryptoSocket.Exchanges.livecoin.ETHBTC > historicDataLogs['livecoin'].ETHBTC[historicDataLogs['livecoin'].ETHBTC.length - 1][1] || cryptoSocket.Exchanges.livecoin.ETHBTC < historicDataLogs['livecoin'].ETHBTC[historicDataLogs['livecoin'].ETHBTC.length - 1][1]){
      historicDataLogs['livecoin'].ETHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.livecoin.ETHBTC]);
    }

    if(cryptoSocket.Exchanges.livecoin.DASHBTC > historicDataLogs['livecoin'].DASHBTC[historicDataLogs['livecoin'].DASHBTC.length - 1][1] || cryptoSocket.Exchanges.livecoin.DASHBTC < historicDataLogs['livecoin'].DASHBTC[historicDataLogs['livecoin'].DASHBTC.length - 1][1]){
      historicDataLogs['livecoin'].DASHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.livecoin.DASHBTC]);
    }

    if(cryptoSocket.Exchanges.livecoin.DASHUSD > historicDataLogs['livecoin'].DASHUSD[historicDataLogs['livecoin'].DASHUSD.length - 1][1] || cryptoSocket.Exchanges.livecoin.DASHUSD < historicDataLogs['livecoin'].DASHUSD[historicDataLogs['livecoin'].DASHUSD.length - 1][1]){
      historicDataLogs['livecoin'].DASHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.livecoin.DASHUSD]);
    }

    if(cryptoSocket.Exchanges.livecoin.BCHBTC > historicDataLogs['livecoin'].BCHBTC[historicDataLogs['livecoin'].BCHBTC.length - 1][1] || cryptoSocket.Exchanges.livecoin.BCHBTC < historicDataLogs['livecoin'].BCHBTC[historicDataLogs['livecoin'].BCHBTC.length - 1][1]){
      historicDataLogs['livecoin'].BCHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.livecoin.BCHBTC]);
    }

    if(cryptoSocket.Exchanges.livecoin.BCHETH > historicDataLogs['livecoin'].BCHETH[historicDataLogs['livecoin'].BCHETH.length - 1][1] || cryptoSocket.Exchanges.livecoin.BCHETH < historicDataLogs['livecoin'].BCHETH[historicDataLogs['livecoin'].BCHETH.length - 1][1]){
      historicDataLogs['livecoin'].BCHETH.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.livecoin.BCHETH]);
    }

    if(cryptoSocket.Exchanges.livecoin.BCHUSD > historicDataLogs['livecoin'].BCHUSD[historicDataLogs['livecoin'].BCHUSD.length - 1][1] || cryptoSocket.Exchanges.livecoin.BCHUSD < historicDataLogs['livecoin'].BCHUSD[historicDataLogs['livecoin'].BCHUSD.length - 1][1]){
      historicDataLogs['livecoin'].BCHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.livecoin.BCHUSD]);
    }

    if(cryptoSocket.Exchanges.livecoin.BTCUSD > historicDataLogs['livecoin'].BTCUSD[historicDataLogs['livecoin'].BTCUSD.length - 1][1] || cryptoSocket.Exchanges.livecoin.BTCUSD < historicDataLogs['livecoin'].BTCUSD[historicDataLogs['livecoin'].BTCUSD.length - 1][1]){
      historicDataLogs['livecoin'].BTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.livecoin.BTCUSD]);
    }

    if(cryptoSocket.Exchanges.livecoin.LTCBTC > historicDataLogs['livecoin'].LTCBTC[historicDataLogs['livecoin'].LTCBTC.length - 1][1] || cryptoSocket.Exchanges.livecoin.LTCBTC < historicDataLogs['livecoin'].LTCBTC[historicDataLogs['livecoin'].LTCBTC.length - 1][1]){
      historicDataLogs['livecoin'].LTCBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.livecoin.LTCBTC]);
    }

    if(cryptoSocket.Exchanges.livecoin.ETHUSD > historicDataLogs['livecoin'].ETHUSD[historicDataLogs['livecoin'].ETHUSD.length - 1][1] || cryptoSocket.Exchanges.livecoin.ETHUSD < historicDataLogs['livecoin'].ETHUSD[historicDataLogs['livecoin'].ETHUSD.length - 1][1]){
      historicDataLogs['livecoin'].ETHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.livecoin.ETHUSD]);
    }

    if(cryptoSocket.Exchanges.livecoin.LTCUSD > historicDataLogs['livecoin'].LTCUSD[historicDataLogs['livecoin'].LTCUSD.length - 1][1] || cryptoSocket.Exchanges.livecoin.LTCUSD < historicDataLogs['livecoin'].LTCUSD[historicDataLogs['livecoin'].LTCUSD.length - 1][1]){
      historicDataLogs['livecoin'].LTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.livecoin.LTCUSD]);
    }
  } else {
    historicDataLogs['livecoin'].ETHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.livecoin.ETHBTC]);
    historicDataLogs['livecoin'].BCHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.livecoin.BCHBTC]);
    historicDataLogs['livecoin'].BCHETH.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.livecoin.BCHETH]);
    historicDataLogs['livecoin'].DASHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.livecoin.DASHBTC]);
    historicDataLogs['livecoin'].BTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.livecoin.BTCUSD]);
    historicDataLogs['livecoin'].DASHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.livecoin.DASHUSD]);
    historicDataLogs['livecoin'].BCHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.livecoin.BCHUSD]);
    historicDataLogs['livecoin'].LTCBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.livecoin.LTCBTC]);
    historicDataLogs['livecoin'].LTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.livecoin.LTCUSD]);
    historicDataLogs['livecoin'].ETHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.livecoin.ETHUSD]);
  }

  if(historicDataLogs['bittrex'].ETHUSD.length > 0 && historicDataLogs['bittrex'].ETHBTC.length > 0 && historicDataLogs['bittrex'].BTCUSD.length > 0 && historicDataLogs['bittrex'].LTCUSD.length > 0 && historicDataLogs['bittrex'].LTCETH.length > 0){
    if(cryptoSocket.Exchanges.bittrex.ETHBTC > historicDataLogs['bittrex'].ETHBTC[historicDataLogs['bittrex'].ETHBTC.length - 1][1] || cryptoSocket.Exchanges.bittrex.ETHBTC < historicDataLogs['bittrex'].ETHBTC[historicDataLogs['bittrex'].ETHBTC.length - 1][1]){
      historicDataLogs['bittrex'].ETHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.bittrex.ETHBTC]);
    }

    if(cryptoSocket.Exchanges.bittrex.LTCUSD > historicDataLogs['bittrex'].LTCUSD[historicDataLogs['bittrex'].LTCUSD.length - 1][1] || cryptoSocket.Exchanges.bittrex.LTCUSD < historicDataLogs['bittrex'].LTCUSD[historicDataLogs['bittrex'].LTCUSD.length - 1][1]){
      historicDataLogs['bittrex'].LTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.bittrex.LTCUSD]);
    }

    if(cryptoSocket.Exchanges.bittrex.BTCUSD > historicDataLogs['bittrex'].BTCUSD[historicDataLogs['bittrex'].BTCUSD.length - 1][1] || cryptoSocket.Exchanges.bittrex.BTCUSD < historicDataLogs['bittrex'].BTCUSD[historicDataLogs['bittrex'].BTCUSD.length - 1][1]){
      historicDataLogs['bittrex'].BTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.bittrex.BTCUSD]);
    }

    if(cryptoSocket.Exchanges.bittrex.ETHUSD > historicDataLogs['bittrex'].ETHUSD[historicDataLogs['bittrex'].ETHUSD.length - 1][1] || cryptoSocket.Exchanges.bittrex.ETHUSD < historicDataLogs['bittrex'].ETHUSD[historicDataLogs['bittrex'].ETHUSD.length - 1][1]){
      historicDataLogs['bittrex'].ETHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.bittrex.ETHUSD]);
    }

    if(cryptoSocket.Exchanges.bittrex.LTCETH > historicDataLogs['bittrex'].LTCETH[historicDataLogs['bittrex'].LTCETH.length - 1][1] || cryptoSocket.Exchanges.bittrex.LTCETH < historicDataLogs['bittrex'].LTCETH[historicDataLogs['bittrex'].LTCETH.length - 1][1]){
      historicDataLogs['bittrex'].LTCETH.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.bittrex.LTCETH]);
    }
  } else {
    historicDataLogs['bittrex'].ETHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.bittrex.ETHBTC]);
    historicDataLogs['bittrex'].BTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.bittrex.BTCUSD]);
    historicDataLogs['bittrex'].ETHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.bittrex.ETHUSD]);
    historicDataLogs['bittrex'].LTCETH.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.bittrex.LTCETH]);
    historicDataLogs['bittrex'].LTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.bittrex.LTCUSD]);
  }

  if(historicDataLogs['gdax'].ETHBTC.length > 0 && historicDataLogs['gdax'].BTCUSD.length > 0 && historicDataLogs['gdax'].LTCBTC.length > 0 && historicDataLogs['gdax'].ETHUSD.length > 0 && historicDataLogs['gdax'].LTCUSD.length > 0){
    if(cryptoSocket.Exchanges.gdax.ETHBTC > historicDataLogs['gdax'].ETHBTC[historicDataLogs['gdax'].ETHBTC.length - 1][1] || cryptoSocket.Exchanges.gdax.ETHBTC < historicDataLogs['gdax'].ETHBTC[historicDataLogs['gdax'].ETHBTC.length - 1][1]){
      historicDataLogs['gdax'].ETHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.gdax.ETHBTC]);
    }

    if(cryptoSocket.Exchanges.gdax.BTCUSD > historicDataLogs['gdax'].BTCUSD[historicDataLogs['gdax'].BTCUSD.length - 1][1] || cryptoSocket.Exchanges.gdax.BTCUSD < historicDataLogs['gdax'].BTCUSD[historicDataLogs['gdax'].BTCUSD.length - 1][1]){
      historicDataLogs['gdax'].BTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.gdax.BTCUSD]);
    }

    if(cryptoSocket.Exchanges.gdax.LTCBTC > historicDataLogs['gdax'].LTCBTC[historicDataLogs['gdax'].LTCBTC.length - 1][1] || cryptoSocket.Exchanges.gdax.LTCBTC < historicDataLogs['gdax'].LTCBTC[historicDataLogs['gdax'].LTCBTC.length - 1][1]){
      historicDataLogs['gdax'].LTCBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.gdax.LTCBTC]);
    }

    if(cryptoSocket.Exchanges.gdax.ETHUSD > historicDataLogs['gdax'].ETHUSD[historicDataLogs['gdax'].ETHUSD.length - 1][1] || cryptoSocket.Exchanges.gdax.ETHUSD < historicDataLogs['gdax'].ETHUSD[historicDataLogs['gdax'].ETHUSD.length - 1][1]){
      historicDataLogs['gdax'].ETHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.gdax.ETHUSD]);
    }

    if(cryptoSocket.Exchanges.gdax.LTCUSD > historicDataLogs['gdax'].LTCUSD[historicDataLogs['gdax'].LTCUSD.length - 1][1] || cryptoSocket.Exchanges.gdax.LTCUSD < historicDataLogs['gdax'].LTCUSD[historicDataLogs['gdax'].LTCUSD.length - 1][1]){
      historicDataLogs['gdax'].LTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.gdax.LTCUSD]);
    }
  } else {
    historicDataLogs['gdax'].ETHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.gdax.ETHBTC]);
    historicDataLogs['gdax'].BTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.gdax.BTCUSD]);
    historicDataLogs['gdax'].LTCBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.gdax.LTCBTC]);
    historicDataLogs['gdax'].LTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.gdax.LTCUSD]);
    historicDataLogs['gdax'].ETHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.gdax.ETHUSD]);
  }

  if(historicDataLogs['gemini'].ETHBTC.length > 0 && historicDataLogs['gemini'].BTCUSD.length > 0 && historicDataLogs['gemini'].ETHUSD.length > 0){
    if(cryptoSocket.Exchanges.gemini.ETHBTC > historicDataLogs['gemini'].ETHBTC[historicDataLogs['gemini'].ETHBTC.length - 1][1] || cryptoSocket.Exchanges.gemini.ETHBTC < historicDataLogs['gemini'].ETHBTC[historicDataLogs['gemini'].ETHBTC.length - 1][1]){
      historicDataLogs['gemini'].ETHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.gemini.ETHBTC]);
    }

    if(cryptoSocket.Exchanges.gemini.BTCUSD > historicDataLogs['gemini'].BTCUSD[historicDataLogs['gemini'].BTCUSD.length - 1][1] || cryptoSocket.Exchanges.gemini.BTCUSD < historicDataLogs['gemini'].BTCUSD[historicDataLogs['gemini'].BTCUSD.length - 1][1]){
      historicDataLogs['gemini'].BTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.gemini.BTCUSD]);
    }

    if(cryptoSocket.Exchanges.gemini.ETHUSD > historicDataLogs['gemini'].ETHUSD[historicDataLogs['gemini'].ETHUSD.length - 1][1] || cryptoSocket.Exchanges.gemini.ETHUSD < historicDataLogs['gemini'].ETHUSD[historicDataLogs['gemini'].ETHUSD.length - 1][1]){
      historicDataLogs['gemini'].ETHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.gemini.ETHUSD]);
    }
  } else {
    historicDataLogs['gemini'].ETHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.gemini.ETHBTC]);
    historicDataLogs['gemini'].BTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.gemini.BTCUSD]);
    historicDataLogs['gemini'].ETHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.gemini.ETHUSD]);
  }

  if(historicDataLogs['poloniex'].DASHUSD.length > 0 && historicDataLogs['poloniex'].BCHUSD.length > 0 && historicDataLogs['poloniex'].BCHBTC.length > 0 && historicDataLogs['poloniex'].ETHBTC.length > 0 && historicDataLogs['poloniex'].DASHBTC.length > 0 && historicDataLogs['poloniex'].BTCUSD.length > 0 && historicDataLogs['poloniex'].LTCBTC.length > 0 && historicDataLogs['poloniex'].ETHUSD.length > 0 && historicDataLogs['poloniex'].LTCUSD.length > 0){
    if(cryptoSocket.Exchanges.poloniex.ETHBTC > historicDataLogs['poloniex'].ETHBTC[historicDataLogs['poloniex'].ETHBTC.length - 1][1] || cryptoSocket.Exchanges.poloniex.ETHBTC < historicDataLogs['poloniex'].ETHBTC[historicDataLogs['poloniex'].ETHBTC.length - 1][1]){
      historicDataLogs['poloniex'].ETHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.poloniex.ETHBTC]);
    }

    if(cryptoSocket.Exchanges.poloniex.DASHBTC > historicDataLogs['poloniex'].DASHBTC[historicDataLogs['poloniex'].DASHBTC.length - 1][1] || cryptoSocket.Exchanges.poloniex.DASHBTC < historicDataLogs['poloniex'].DASHBTC[historicDataLogs['poloniex'].DASHBTC.length - 1][1]){
      historicDataLogs['poloniex'].DASHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.poloniex.DASHBTC]);
    }

    if(cryptoSocket.Exchanges.poloniex.DASHUSD > historicDataLogs['poloniex'].DASHUSD[historicDataLogs['poloniex'].DASHUSD.length - 1][1] || cryptoSocket.Exchanges.poloniex.DASHUSD < historicDataLogs['poloniex'].DASHUSD[historicDataLogs['poloniex'].DASHUSD.length - 1][1]){
      historicDataLogs['poloniex'].DASHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.poloniex.DASHUSD]);
    }

    if(cryptoSocket.Exchanges.poloniex.BCHBTC > historicDataLogs['poloniex'].BCHBTC[historicDataLogs['poloniex'].BCHBTC.length - 1][1] || cryptoSocket.Exchanges.poloniex.BCHBTC < historicDataLogs['poloniex'].BCHBTC[historicDataLogs['poloniex'].BCHBTC.length - 1][1]){
      historicDataLogs['poloniex'].BCHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.poloniex.BCHBTC]);
    }

    if(cryptoSocket.Exchanges.poloniex.BCHUSD > historicDataLogs['poloniex'].BCHUSD[historicDataLogs['poloniex'].BCHUSD.length - 1][1] || cryptoSocket.Exchanges.poloniex.BCHUSD < historicDataLogs['poloniex'].BCHUSD[historicDataLogs['poloniex'].BCHUSD.length - 1][1]){
      historicDataLogs['poloniex'].BCHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.poloniex.BCHUSD]);
    }

    if(cryptoSocket.Exchanges.poloniex.BTCUSD > historicDataLogs['poloniex'].BTCUSD[historicDataLogs['poloniex'].BTCUSD.length - 1][1] || cryptoSocket.Exchanges.poloniex.BTCUSD < historicDataLogs['poloniex'].BTCUSD[historicDataLogs['poloniex'].BTCUSD.length - 1][1]){
      historicDataLogs['poloniex'].BTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.poloniex.BTCUSD]);
    }

    if(cryptoSocket.Exchanges.poloniex.LTCBTC > historicDataLogs['poloniex'].LTCBTC[historicDataLogs['poloniex'].LTCBTC.length - 1][1] || cryptoSocket.Exchanges.poloniex.LTCBTC < historicDataLogs['poloniex'].LTCBTC[historicDataLogs['poloniex'].LTCBTC.length - 1][1]){
      historicDataLogs['poloniex'].LTCBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.poloniex.LTCBTC]);
    }

    if(cryptoSocket.Exchanges.poloniex.ETHUSD > historicDataLogs['poloniex'].ETHUSD[historicDataLogs['poloniex'].ETHUSD.length - 1][1] || cryptoSocket.Exchanges.poloniex.ETHUSD < historicDataLogs['poloniex'].ETHUSD[historicDataLogs['poloniex'].ETHUSD.length - 1][1]){
      historicDataLogs['poloniex'].ETHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.poloniex.ETHUSD]);
    }

    if(cryptoSocket.Exchanges.poloniex.LTCUSD > historicDataLogs['poloniex'].LTCUSD[historicDataLogs['poloniex'].LTCUSD.length - 1][1] || cryptoSocket.Exchanges.poloniex.LTCUSD < historicDataLogs['poloniex'].LTCUSD[historicDataLogs['poloniex'].LTCUSD.length - 1][1]){
      historicDataLogs['poloniex'].LTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.poloniex.LTCUSD]);
    }
  } else {
    historicDataLogs['poloniex'].ETHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.poloniex.ETHBTC]);
    historicDataLogs['poloniex'].BCHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.poloniex.BCHBTC]);
    historicDataLogs['poloniex'].DASHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.poloniex.DASHBTC]);
    historicDataLogs['poloniex'].BTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.poloniex.BTCUSD]);
    historicDataLogs['poloniex'].DASHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.poloniex.DASHUSD]);
    historicDataLogs['poloniex'].BCHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.poloniex.BCHUSD]);
    historicDataLogs['poloniex'].LTCBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.poloniex.LTCBTC]);
    historicDataLogs['poloniex'].LTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.poloniex.LTCUSD]);
    historicDataLogs['poloniex'].ETHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.poloniex.ETHUSD]);
  }

  if(historicDataLogs['cCex'].DASHUSD.length > 0 && historicDataLogs['cCex'].ETHBTC.length > 0 && historicDataLogs['cCex'].DASHBTC.length > 0 && historicDataLogs['cCex'].BTCUSD.length > 0 && historicDataLogs['cCex'].LTCBTC.length > 0 && historicDataLogs['cCex'].ETHUSD.length > 0 && historicDataLogs['cCex'].LTCUSD.length > 0){
    if(cryptoSocket.Exchanges.cCex.ETHBTC > historicDataLogs['cCex'].ETHBTC[historicDataLogs['cCex'].ETHBTC.length - 1][1] || cryptoSocket.Exchanges.cCex.ETHBTC < historicDataLogs['cCex'].ETHBTC[historicDataLogs['cCex'].ETHBTC.length - 1][1]){
      historicDataLogs['cCex'].ETHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.cCex.ETHBTC]);
    }

    if(cryptoSocket.Exchanges.cCex.DASHBTC > historicDataLogs['cCex'].DASHBTC[historicDataLogs['cCex'].DASHBTC.length - 1][1] || cryptoSocket.Exchanges.cCex.DASHBTC < historicDataLogs['cCex'].DASHBTC[historicDataLogs['cCex'].DASHBTC.length - 1][1]){
      historicDataLogs['cCex'].DASHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.cCex.DASHBTC]);
    }

    if(cryptoSocket.Exchanges.cCex.DASHUSD > historicDataLogs['cCex'].DASHUSD[historicDataLogs['cCex'].DASHUSD.length - 1][1] || cryptoSocket.Exchanges.cCex.DASHUSD < historicDataLogs['cCex'].DASHUSD[historicDataLogs['cCex'].DASHUSD.length - 1][1]){
      historicDataLogs['cCex'].DASHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.cCex.DASHUSD]);
    }

    if(cryptoSocket.Exchanges.cCex.BTCUSD > historicDataLogs['cCex'].BTCUSD[historicDataLogs['cCex'].BTCUSD.length - 1][1] || cryptoSocket.Exchanges.cCex.BTCUSD < historicDataLogs['cCex'].BTCUSD[historicDataLogs['cCex'].BTCUSD.length - 1][1]){
      historicDataLogs['cCex'].BTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.cCex.BTCUSD]);
    }

    if(cryptoSocket.Exchanges.cCex.LTCBTC > historicDataLogs['cCex'].LTCBTC[historicDataLogs['cCex'].LTCBTC.length - 1][1] || cryptoSocket.Exchanges.cCex.LTCBTC < historicDataLogs['cCex'].LTCBTC[historicDataLogs['cCex'].LTCBTC.length - 1][1]){
      historicDataLogs['cCex'].LTCBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.cCex.LTCBTC]);
    }

    if(cryptoSocket.Exchanges.cCex.ETHUSD > historicDataLogs['cCex'].ETHUSD[historicDataLogs['cCex'].ETHUSD.length - 1][1] || cryptoSocket.Exchanges.cCex.ETHUSD < historicDataLogs['cCex'].ETHUSD[historicDataLogs['cCex'].ETHUSD.length - 1][1]){
      historicDataLogs['cCex'].ETHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.cCex.ETHUSD]);
    }

    if(cryptoSocket.Exchanges.cCex.LTCUSD > historicDataLogs['cCex'].LTCUSD[historicDataLogs['cCex'].LTCUSD.length - 1][1] || cryptoSocket.Exchanges.cCex.LTCUSD < historicDataLogs['cCex'].LTCUSD[historicDataLogs['cCex'].LTCUSD.length - 1][1]){
      historicDataLogs['cCex'].LTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.cCex.LTCUSD]);
    }
  } else {
    historicDataLogs['cCex'].ETHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.cCex.ETHBTC]);
    historicDataLogs['cCex'].DASHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.cCex.DASHBTC]);
    historicDataLogs['cCex'].BTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.cCex.BTCUSD]);
    historicDataLogs['cCex'].DASHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.cCex.DASHUSD]);
    historicDataLogs['cCex'].LTCBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.cCex.LTCBTC]);
    historicDataLogs['cCex'].LTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.cCex.LTCUSD]);
    historicDataLogs['cCex'].ETHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.cCex.ETHUSD]);
  }

  // if(historicDataLogs['gdax'].BTCUSD.length > 24 && historicDataLogs['bittrex'].BTCUSD.length > 24 && historicDataLogs['gemini'].BTCUSD.length > 24 && historicDataLogs['poloniex'].BTCUSD.length > 24){
  //   console.log("\n\nEMA FOR GDAX BTCUSD IS: ", EMA.calculate({period: historicDataLogs['gdax'].BTCUSD.length / 3, values: historicDataLogs['gdax'].BTCUSD.map(a => a[1])})[EMA.calculate({period: historicDataLogs['gdax'].BTCUSD.length / 3, values: historicDataLogs['gdax'].BTCUSD.map(a => a[1])}).length - 1]);
  //   console.log("\n\nEMA FOR BITTREX BTCUSD IS: ", EMA.calculate({period: historicDataLogs['bittrex'].BTCUSD.length / 3, values: historicDataLogs['bittrex'].BTCUSD.map(a => a[1])})[EMA.calculate({period: historicDataLogs['bittrex'].BTCUSD.length / 3, values: historicDataLogs['bittrex'].BTCUSD.map(a => a[1])}).length - 1]);
  //   console.log("\n\nEMA FOR GEMINI BTCUSD IS: ", EMA.calculate({period: historicDataLogs['gemini'].BTCUSD.length / 3, values: historicDataLogs['gemini'].BTCUSD.map(a => a[1])})[EMA.calculate({period: historicDataLogs['gemini'].BTCUSD.length / 3, values: historicDataLogs['gemini'].BTCUSD.map(a => a[1])}).length - 1]);
  //   console.log("\n\nEMA FOR POLONIEX BTCUSD IS: ", EMA.calculate({period: historicDataLogs['poloniex'].BTCUSD.length / 3, values: historicDataLogs['poloniex'].BTCUSD.map(a => a[1])})[EMA.calculate({period: historicDataLogs['poloniex'].BTCUSD.length / 3, values: historicDataLogs['poloniex'].BTCUSD.map(a => a[1])}).length - 1]);
  //   console.log("\n\nMACD FOR GDAX BTCUSD IS: ", MACD.calculate({ values: historicDataLogs['gdax'].BTCUSD.map(a => a[1]), fastPeriod: 12, slowPeriod: 26, signalPeriod: 9, SimpleMAOscillator: false, SimpleMASignal: false })[MACD.calculate({ values: historicDataLogs['gdax'].BTCUSD.map(a => a[1]), fastPeriod: 12, slowPeriod: 26, signalPeriod: 9, SimpleMAOscillator: false, SimpleMASignal: false }).length - 1]);
  //   console.log("\n\nMACD FOR BITTREX BTCUSD IS: ", MACD.calculate({ values: historicDataLogs['bittrex'].BTCUSD.map(a => a[1]), fastPeriod: 12, slowPeriod: 26, signalPeriod: 9, SimpleMAOscillator: false, SimpleMASignal: false })[MACD.calculate({ values: historicDataLogs['bittrex'].BTCUSD.map(a => a[1]), fastPeriod: 12, slowPeriod: 26, signalPeriod: 9, SimpleMAOscillator: false, SimpleMASignal: false }).length - 1]);
  //   console.log("\n\nMACD FOR GEMINI BTCUSD IS: ", MACD.calculate({ values: historicDataLogs['gemini'].BTCUSD.map(a => a[1]), fastPeriod: 12, slowPeriod: 26, signalPeriod: 9, SimpleMAOscillator: false, SimpleMASignal: false })[MACD.calculate({ values: historicDataLogs['gemini'].BTCUSD.map(a => a[1]), fastPeriod: 12, slowPeriod: 26, signalPeriod: 9, SimpleMAOscillator: false, SimpleMASignal: false }).length - 1]);
  //   console.log("\n\nMACD FOR POLONIEX BTCUSD IS: ", MACD.calculate({ values: historicDataLogs['poloniex'].BTCUSD.map(a => a[1]), fastPeriod: 12, slowPeriod: 26, signalPeriod: 9, SimpleMAOscillator: false, SimpleMASignal: false })[MACD.calculate({ values: historicDataLogs['poloniex'].BTCUSD.map(a => a[1]), fastPeriod: 12, slowPeriod: 26, signalPeriod: 9, SimpleMAOscillator: false, SimpleMASignal: false }).length - 1]);
  // }

  // if(Object.keys(historicDataLog).map(time => time).length > 86400){
  //   historicDataLogs = {};
  // }

  let largestSpread = 5;
  let spreadCurrency;
  let sufficientFunds = needToWithdraw;
  let trades = {
    gdax,
    gemini,
    poloniex,
    bittrex,
    hitbtc,
    livecoin,
    cCex,
    cex
  };

  let tradeAt;
  let tradingAt;
  let withdrawFrom;

  if (exchange === "gdax") {
    //BTC
    //bitcoin price at gdax   -> (bitcoin price at gdax / ethereum price at gdax) - (bitcoin price at gdax / ethereum price at gemini)
    //let gdaxVsGeminiBtc = ((cryptoSocket.Exchanges.gdax.BTCUSD / cryptoSocket.Exchanges.gdax.ETHUSD) ) - cryptoSocket.Exchanges.gdax.BTCUSD / cryptoSocket.Exchanges.gemini.ETHUSD) - (cryptoSocket.Exchanges.gdax.ETHBTC * .003)) - (cryptoSocket.Exchanges.gemini.ETHUSD * .0025))) /* needs to account for ethusd withdrawal fee from gemini */
    //let gdaxVsGeminiBtc = parseFloat((parseFloat((cryptoSocket.Exchanges.gdax.ETHBTC - parseFloat((cryptoSocket.Exchanges.gdax.ETHBTC * .003).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.gemini[currency] - (parseFloat((cryptoSocket.Exchanges.gemini[currency] * .01).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    // console.log("THE ARB IS: ", gdaxVsGeminiBtc);
    // return;

    //FOR BTC
    //needs to withdraw eth from another exchange e.g. gemini,
    //then buy BTC with that ETH at gdax (price of BTC * quantity of ETH) - ((price of BTC * quantity of ETH) * .003)
    //then withdraw that BTC to gemini to gdax .0005
    //then

    let gdaxVsGeminiBtc = parseFloat((parseFloat((cryptoSocket.Exchanges.gdax.BTCUSD - parseFloat((cryptoSocket.Exchanges.gdax.BTCUSD * .003).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.gemini.BTCUSD - (parseFloat((cryptoSocket.Exchanges.gemini.BTCUSD * .01).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let gdaxVsPoloniexBtc = parseFloat((parseFloat((cryptoSocket.Exchanges.gdax.BTCUSD - parseFloat((cryptoSocket.Exchanges.gdax.BTCUSD * .003).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.poloniex.BTCUSD - (parseFloat((cryptoSocket.Exchanges.poloniex.BTCUSD * .001).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let gdaxVsBittrexBtc = parseFloat((parseFloat((cryptoSocket.Exchanges.gdax.BTCUSD - parseFloat((cryptoSocket.Exchanges.gdax.BTCUSD * .003).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.bittrex.BTCUSD - (parseFloat((cryptoSocket.Exchanges.bittrex.BTCUSD * .001).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let geminiVsGdaxBtc = parseFloat((parseFloat((cryptoSocket.Exchanges.gemini.BTCUSD - parseFloat((cryptoSocket.Exchanges.gemini.BTCUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.gdax.BTCUSD - (parseFloat((cryptoSocket.Exchanges.gdax.BTCUSD * .0005).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));

    //let geminiVsGdaxBtc = parseFloat((parseFloat((cryptoSocket.Exchanges.gemini.BTCUSD - parseFloat((cryptoSocket.Exchanges.gemini.BTCUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat((cryptoSocket.Exchanges.gdax.BTCUSD).toFixed(5)).toFixed(5)).toFixed(2));
    let poloniexVsGdaxBtc = parseFloat((parseFloat((cryptoSocket.Exchanges.poloniex.BTCUSD - parseFloat((cryptoSocket.Exchanges.poloniex.BTCUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat((cryptoSocket.Exchanges.gdax.BTCUSD).toFixed(5)).toFixed(5)).toFixed(2));
    let bittrexVsGdaxBtc = parseFloat((parseFloat((cryptoSocket.Exchanges.bittrex.BTCUSD - parseFloat((cryptoSocket.Exchanges.bittrex.BTCUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat((cryptoSocket.Exchanges.gdax.BTCUSD).toFixed(5)).toFixed(5)).toFixed(2));

    //ETH
    let gdaxVsGeminiEth = parseFloat((parseFloat((cryptoSocket.Exchanges.gdax.ETHUSD - parseFloat((cryptoSocket.Exchanges.gdax.ETHUSD * .003).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.gemini.ETHUSD - (parseFloat((cryptoSocket.Exchanges.gemini.ETHUSD * .01).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let gdaxVsPoloniexEth = parseFloat((parseFloat((cryptoSocket.Exchanges.gdax.ETHUSD - parseFloat((cryptoSocket.Exchanges.gdax.ETHUSD * .003).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.poloniex.ETHUSD - (parseFloat((cryptoSocket.Exchanges.poloniex.ETHUSD * .001).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let gdaxVsBittrexEth = parseFloat((parseFloat((cryptoSocket.Exchanges.gdax.ETHUSD - parseFloat((cryptoSocket.Exchanges.gdax.ETHUSD * .003).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.bittrex.ETHUSD - (parseFloat((cryptoSocket.Exchanges.bittrex.ETHUSD * .005).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let geminiVsGdaxEth = parseFloat((parseFloat((cryptoSocket.Exchanges.gemini.ETHUSD - parseFloat((cryptoSocket.Exchanges.gemini.ETHUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat((cryptoSocket.Exchanges.gdax.ETHUSD).toFixed(5)).toFixed(5)).toFixed(2));
    let poloniexVsGdaxEth = parseFloat((parseFloat((cryptoSocket.Exchanges.poloniex.ETHUSD - parseFloat((cryptoSocket.Exchanges.poloniex.ETHUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat((cryptoSocket.Exchanges.gdax.ETHUSD).toFixed(5)).toFixed(5)).toFixed(2));
    let bittrexVsGdaxEth = parseFloat((parseFloat((cryptoSocket.Exchanges.bittrex.ETHUSD - parseFloat((cryptoSocket.Exchanges.bittrex.ETHUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat((cryptoSocket.Exchanges.gdax.ETHUSD).toFixed(5)).toFixed(5)).toFixed(2));

    //LTC
    let gdaxVsPoloniexLtc = parseFloat((parseFloat((cryptoSocket.Exchanges.gdax.LTCUSD - parseFloat((cryptoSocket.Exchanges.gdax.LTCUSD * .003).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.poloniex.LTCUSD - (parseFloat((cryptoSocket.Exchanges.poloniex.LTCUSD * .0025).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let gdaxVsBittrexLtc = parseFloat((parseFloat((cryptoSocket.Exchanges.gdax.LTCUSD - parseFloat((cryptoSocket.Exchanges.gdax.LTCUSD * .003).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.bittrex.LTCUSD - (parseFloat((cryptoSocket.Exchanges.bittrex.LTCUSD * .002).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let poloniexVsGdaxLtc = parseFloat((parseFloat((cryptoSocket.Exchanges.poloniex.LTCUSD - parseFloat((cryptoSocket.Exchanges.poloniex.LTCUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat((cryptoSocket.Exchanges.gdax.LTCUSD).toFixed(5)).toFixed(5)).toFixed(2));
    let bittrexVsGdaxLtc = parseFloat((parseFloat((cryptoSocket.Exchanges.bittrex.LTCUSD - parseFloat((cryptoSocket.Exchanges.bittrex.LTCUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat((cryptoSocket.Exchanges.gdax.LTCUSD).toFixed(5)).toFixed(5)).toFixed(2));


    if (poloniexVsGdaxLtc > largestSpread) {
      largestSpread = poloniexVsGdaxLtc;
      spreadCurrency = "LTC";
      tradeAt = trades.poloniex;
      tradingAt = 'poloniex';
      withdrawFrom = 'gdax';
    }

    if (bittrexVsGdaxLtc > largestSpread) {
      largestSpread = bittrexVsGdaxLtc;
      spreadCurrency = "LTC";
      tradeAt = trades.bittrex;
      tradingAt = 'bittrex';
      withdrawFrom = 'gdax';
    }

    if (gdaxVsPoloniexLtc > largestSpread) {
      largestSpread = gdaxVsPoloniexLtc;
      spreadCurrency = "LTC";
      tradeAt = trades.gdax;
      tradingAt = 'gdax';
      withdrawFrom = 'poloniex';
    }

    if (gdaxVsBittrexLtc > largestSpread) {
      largestSpread = gdaxVsBittrexLtc;
      spreadCurrency = "LTC";
      tradeAt = trades.gdax;
      tradingAt = 'gdax';
      withdrawFrom = 'bittrex';
    }

    if (gdaxVsGeminiBtc > largestSpread) {
      largestSpread = gdaxVsGeminiBtc;
      spreadCurrency = "BTC";
      tradeAt = trades.gdax;
      tradingAt = 'gdax';
      withdrawFrom = 'gemini';
    }

    if (gdaxVsPoloniexBtc > largestSpread) {
      largestSpread = gdaxVsPoloniexBtc;
      spreadCurrency = "BTC";
      tradeAt = trades.gdax;
      tradingAt = 'gdax';
      withdrawFrom = 'poloniex';
    }

    if (gdaxVsBittrexBtc > largestSpread) {
      largestSpread = gdaxVsBittrexBtc;
      spreadCurrency = "BTC";
      tradeAt = trades.gdax;
      tradingAt = 'gdax';
      withdrawFrom = 'bittrex';
    }

    if (geminiVsGdaxBtc > largestSpread) {
      largestSpread = geminiVsGdaxBtc;
      spreadCurrency = "BTC";
      tradeAt = trades.gemini;
      tradingAt = 'gemini';
      withdrawFrom = 'gdax';
    }

    if (poloniexVsGdaxBtc > largestSpread) {
      largestSpread = poloniexVsGdaxBtc;
      spreadCurrency = "BTC";
      tradeAt = trades.poloniex;
      tradingAt = 'poloniex';
      withdrawFrom = 'gdax';
    }

    if (bittrexVsGdaxBtc > largestSpread) {
      largestSpread = bittrexVsGdaxBtc;
      spreadCurrency = "BTC";
      tradeAt = trades.bittrex;
      tradingAt = 'bittrex';
      withdrawFrom = 'gdax';
    }

    if (gdaxVsGeminiEth > largestSpread) {
      largestSpread = gdaxVsGeminiEth;
      spreadCurrency = "ETH";
      tradeAt = trades.gdax;
      tradingAt = 'gdax';
      withdrawFrom = 'gemini';
    }

    if (gdaxVsPoloniexEth > largestSpread) {
      largestSpread = gdaxVsPoloniexEth;
      spreadCurrency = "ETH";
      tradeAt = trades.gdax;
      tradingAt = 'gdax';
      withdrawFrom = 'poloniex';
    }

    if (gdaxVsBittrexEth > largestSpread) {
      largestSpread = gdaxVsBittrexEth;
      spreadCurrency = "ETH";
      tradeAt = trades.gdax;
      tradingAt = 'gdax';
      withdrawFrom = 'bittrex';
    }

    if (geminiVsGdaxEth > largestSpread) {
      largestSpread = geminiVsGdaxEth;
      spreadCurrency = "ETH";
      tradeAt = trades.gemini;
      tradingAt = 'gemini';
      withdrawFrom = 'gdax';
    }

    if (poloniexVsGdaxEth > largestSpread) {
      largestSpread = poloniexVsGdaxEth;
      spreadCurrency = "ETH";
      tradeAt = trades.poloniex;
      tradingAt = 'poloniex';
      withdrawFrom = 'gdax';
    }

    if (bittrexVsGdaxEth > largestSpread) {
      largestSpread = bittrexVsGdaxEth;
      spreadCurrency = "ETH";
      tradeAt = trades.bittrex;
      tradingAt = 'bittrex';
      withdrawFrom = 'gdax';
    }
  }

  if (exchange === "gemini") {
    //BTC
    let geminiVsGdaxBtc = parseFloat((parseFloat((cryptoSocket.Exchanges.gemini.BTCUSD - parseFloat((cryptoSocket.Exchanges.gemini.BTCUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat((cryptoSocket.Exchanges.gdax.BTCUSD).toFixed(5)).toFixed(5)).toFixed(2));
    let geminiVsPoloniexBtc = parseFloat((parseFloat((cryptoSocket.Exchanges.gemini.BTCUSD - parseFloat((cryptoSocket.Exchanges.gemini.BTCUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.poloniex.BTCUSD - (parseFloat((cryptoSocket.Exchanges.poloniex.BTCUSD * .001).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let geminiVsBittrexBtc = parseFloat((parseFloat((cryptoSocket.Exchanges.gemini.BTCUSD - parseFloat((cryptoSocket.Exchanges.gemini.BTCUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.bittrex.BTCUSD - (parseFloat((cryptoSocket.Exchanges.bittrex.BTCUSD * .001).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let gdaxVsGeminiBtc = parseFloat((parseFloat((cryptoSocket.Exchanges.gdax.BTCUSD - parseFloat((cryptoSocket.Exchanges.gdax.BTCUSD * .003).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.gemini.BTCUSD - (parseFloat((cryptoSocket.Exchanges.gemini.BTCUSD * .01).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let poloniexVsGeminiBtc = parseFloat((parseFloat((cryptoSocket.Exchanges.poloniex.BTCUSD - parseFloat((cryptoSocket.Exchanges.poloniex.BTCUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.gemini.BTCUSD - (parseFloat((cryptoSocket.Exchanges.gemini.BTCUSD * .01).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let bittrexVsGeminiBtc = parseFloat((parseFloat((cryptoSocket.Exchanges.bittrex.BTCUSD - parseFloat((cryptoSocket.Exchanges.bittrex.BTCUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.gemini.BTCUSD - (parseFloat((cryptoSocket.Exchanges.gemini.BTCUSD * .01).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));

    //ETH
    let geminiVsGdaxEth = parseFloat((parseFloat((cryptoSocket.Exchanges.gemini.ETHUSD - parseFloat((cryptoSocket.Exchanges.gemini.ETHUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat((cryptoSocket.Exchanges.gdax.ETHUSD).toFixed(5)).toFixed(5)).toFixed(2));
    let geminiVsPoloniexEth = parseFloat((parseFloat((cryptoSocket.Exchanges.gemini.ETHUSD - parseFloat((cryptoSocket.Exchanges.gemini.ETHUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.poloniex.ETHUSD - (parseFloat((cryptoSocket.Exchanges.poloniex.ETHUSD * .001).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let geminiVsBittrexEth = parseFloat((parseFloat((cryptoSocket.Exchanges.gemini.ETHUSD - parseFloat((cryptoSocket.Exchanges.gemini.ETHUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.bittrex.ETHUSD - (parseFloat((cryptoSocket.Exchanges.bittrex.ETHUSD * .005).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let gdaxVsGeminiEth = parseFloat((parseFloat((cryptoSocket.Exchanges.gdax.ETHUSD - parseFloat((cryptoSocket.Exchanges.gdax.ETHUSD * .003).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.gemini.ETHUSD - (parseFloat((cryptoSocket.Exchanges.gemini.ETHUSD * .01).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let poloniexVsGeminiEth = parseFloat((parseFloat((cryptoSocket.Exchanges.poloniex.ETHUSD - parseFloat((cryptoSocket.Exchanges.poloniex.ETHUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.gemini.ETHUSD - (parseFloat((cryptoSocket.Exchanges.gemini.ETHUSD * .01).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let bittrexVsGeminiEth = parseFloat((parseFloat((cryptoSocket.Exchanges.bittrex.ETHUSD - parseFloat((cryptoSocket.Exchanges.bittrex.ETHUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.gemini.ETHUSD - (parseFloat((cryptoSocket.Exchanges.gemini.ETHUSD * .01).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));

    if (geminiVsGdaxBtc > largestSpread) {
      largestSpread = geminiVsGdaxBtc;
      spreadCurrency = "BTC";
      tradeAt = trades.gemini;
      tradingAt = 'gemini';
      withdrawFrom = 'gdax';
    }

    if (geminiVsPoloniexBtc > largestSpread) {
      largestSpread = geminiVsPoloniexBtc;
      spreadCurrency = "BTC";
      tradeAt = trades.gemini;
      tradingAt = 'gemini';
      withdrawFrom = 'poloniex';
    }

    if (geminiVsBittrexBtc > largestSpread) {
      largestSpread = geminiVsBittrexBtc;
      spreadCurrency = "BTC";
      tradeAt = trades.gemini;
      tradingAt = 'gemini';
      withdrawFrom = 'bittrex';
    }

    if (gdaxVsGeminiBtc > largestSpread) {
      largestSpread = gdaxVsGeminiBtc;
      spreadCurrency = "BTC";
      tradeAt = trades.gdax;
      tradingAt = 'gdax';
      withdrawFrom = 'gemini';
    }

    if (poloniexVsGeminiBtc > largestSpread) {
      largestSpread = poloniexVsGeminiBtc;
      spreadCurrency = "BTC";
      tradeAt = trades.poloniex;
      tradingAt = 'poloniex';
      withdrawFrom = 'gemini';
    }

    if (bittrexVsGeminiBtc > largestSpread) {
      largestSpread = bittrexVsGeminiBtc;
      spreadCurrency = "BTC";
      tradeAt = trades.bittrex;
      tradingAt = 'bittrex';
      withdrawFrom = 'gemini';
    }

    if (geminiVsGdaxEth > largestSpread) {
      largestSpread = geminiVsGdaxEth;
      spreadCurrency = "ETH";
      tradeAt = trades.gemini;
      tradingAt = 'gemini';
      withdrawFrom = 'gdax';
    }

    if (geminiVsPoloniexEth > largestSpread) {
      largestSpread = geminiVsPoloniexEth;
      spreadCurrency = "ETH";
      tradeAt = trades.gemini;
      tradingAt = 'gemini';
      withdrawFrom = 'poloniex';
    }

    if (geminiVsBittrexEth > largestSpread) {
      largestSpread = geminiVsBittrexEth;
      spreadCurrency = "ETH";
      tradeAt = trades.gemini;
      tradingAt = 'gemini';
      withdrawFrom = 'bittrex';
    }

    if (gdaxVsGeminiEth > largestSpread) {
      largestSpread = gdaxVsGeminiEth;
      spreadCurrency = "ETH";
      tradeAt = trades.gdax;
      tradingAt = 'gdax';
      withdrawFrom = 'gemini';
    }

    if (poloniexVsGeminiEth > largestSpread) {
      largestSpread = poloniexVsGeminiEth;
      spreadCurrency = "ETH";
      tradeAt = trades.poloniex;
      tradingAt = 'poloniex';
      withdrawFrom = 'gemini';
    }

    if (bittrexVsGeminiEth > largestSpread) {
      largestSpread = bittrexVsGeminiEth;
      spreadCurrency = "ETH";
      tradeAt = trades.bittrex;
      tradingAt = 'bittrex';
      withdrawFrom = 'gemini';
    }
  }

  if (exchange === 'poloniex') {
    //BTC
    let poloniexVsGdaxBtc = parseFloat((parseFloat((cryptoSocket.Exchanges.poloniex.BTCUSD - parseFloat((cryptoSocket.Exchanges.poloniex.BTCUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat((cryptoSocket.Exchanges.gdax.BTCUSD).toFixed(5)).toFixed(5)).toFixed(2));
    let poloniexVsGeminiBtc = parseFloat((parseFloat((cryptoSocket.Exchanges.poloniex.BTCUSD - parseFloat((cryptoSocket.Exchanges.poloniex.BTCUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.gemini.BTCUSD - (parseFloat((cryptoSocket.Exchanges.gemini.BTCUSD * .01).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let poloniexVsBittrexBtc = parseFloat((parseFloat((cryptoSocket.Exchanges.poloniex.BTCUSD - parseFloat((cryptoSocket.Exchanges.poloniex.BTCUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.bittrex.BTCUSD - (parseFloat((cryptoSocket.Exchanges.bittrex.BTCUSD * .001).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let gdaxVsPoloniexBtc = parseFloat((parseFloat((cryptoSocket.Exchanges.gdax.BTCUSD - parseFloat((cryptoSocket.Exchanges.gdax.BTCUSD * .003).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.poloniex.BTCUSD - (parseFloat((cryptoSocket.Exchanges.poloniex.BTCUSD * .001).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let geminiVsPoloniexBtc = parseFloat((parseFloat((cryptoSocket.Exchanges.gemini.BTCUSD - parseFloat((cryptoSocket.Exchanges.gemini.BTCUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.poloniex.BTCUSD - (parseFloat((cryptoSocket.Exchanges.poloniex.BTCUSD * .001).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let bittrexVsPoloniexBtc = parseFloat((parseFloat((cryptoSocket.Exchanges.bittrex.BTCUSD - parseFloat((cryptoSocket.Exchanges.bittrex.BTCUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.poloniex.BTCUSD - (parseFloat((cryptoSocket.Exchanges.poloniex.BTCUSD * .001).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));

    //ETH
    let poloniexVsGdaxEth = parseFloat((parseFloat((cryptoSocket.Exchanges.poloniex.ETHUSD - parseFloat((cryptoSocket.Exchanges.poloniex.ETHUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat((cryptoSocket.Exchanges.gdax.ETHUSD).toFixed(5)).toFixed(5)).toFixed(2));
    let poloniexVsGeminiEth = parseFloat((parseFloat((cryptoSocket.Exchanges.poloniex.ETHUSD - parseFloat((cryptoSocket.Exchanges.poloniex.ETHUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.gemini.ETHUSD - (parseFloat((cryptoSocket.Exchanges.gemini.ETHUSD * .01).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let poloniexVsBittrexEth = parseFloat((parseFloat((cryptoSocket.Exchanges.poloniex.ETHUSD - parseFloat((cryptoSocket.Exchanges.poloniex.ETHUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.bittrex.ETHUSD - (parseFloat((cryptoSocket.Exchanges.bittrex.ETHUSD * .005).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let gdaxVsPoloniexEth = parseFloat((parseFloat((cryptoSocket.Exchanges.gdax.ETHUSD - parseFloat((cryptoSocket.Exchanges.gdax.ETHUSD * .003).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.poloniex.ETHUSD - (parseFloat((cryptoSocket.Exchanges.poloniex.ETHUSD * .001).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let geminiVsPoloniexEth = parseFloat((parseFloat((cryptoSocket.Exchanges.gemini.ETHUSD - parseFloat((cryptoSocket.Exchanges.gemini.ETHUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.poloniex.ETHUSD - (parseFloat((cryptoSocket.Exchanges.poloniex.ETHUSD * .001).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let bittrexVsPoloniexEth = parseFloat((parseFloat((cryptoSocket.Exchanges.bittrex.ETHUSD - parseFloat((cryptoSocket.Exchanges.bittrex.ETHUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.poloniex.ETHUSD - (parseFloat((cryptoSocket.Exchanges.poloniex.ETHUSD * .001).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));

    //LTC
    let poloniexVsGdaxLtc = parseFloat((parseFloat((cryptoSocket.Exchanges.poloniex.LTCUSD - parseFloat((cryptoSocket.Exchanges.poloniex.LTCUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat((cryptoSocket.Exchanges.gdax.LTCUSD).toFixed(5)).toFixed(5)).toFixed(2));
    let poloniexVsBittrexLtc = parseFloat((parseFloat((cryptoSocket.Exchanges.poloniex.LTCUSD - parseFloat((cryptoSocket.Exchanges.poloniex.LTCUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.bittrex.LTCUSD - (parseFloat((cryptoSocket.Exchanges.bittrex.LTCUSD * .002).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let gdaxVsPoloniexLtc = parseFloat((parseFloat((cryptoSocket.Exchanges.gdax.LTCUSD - parseFloat((cryptoSocket.Exchanges.gdax.LTCUSD * .003).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.poloniex.LTCUSD - (parseFloat((cryptoSocket.Exchanges.poloniex.LTCUSD * .0025).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let bittrexVsPoloniexLtc = parseFloat((parseFloat((cryptoSocket.Exchanges.bittrex.LTCUSD - parseFloat((cryptoSocket.Exchanges.bittrex.LTCUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.poloniex.LTCUSD - (parseFloat((cryptoSocket.Exchanges.poloniex.LTCUSD * .0025).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));


    if (poloniexVsGdaxLtc > largestSpread) {
      largestSpread = poloniexVsGdaxLtc;
      spreadCurrency = "LTC";
      tradeAt = trades.poloniex;
      tradingAt = 'poloniex';
      withdrawFrom = 'gdax';
    }

    if (poloniexVsBittrexLtc > largestSpread) {
      largestSpread = poloniexVsBittrexLtc;
      spreadCurrency = "LTC";
      tradeAt = trades.poloniex;
      tradingAt = 'poloniex';
      withdrawFrom = 'bittrex';
    }

    if (gdaxVsPoloniexLtc > largestSpread) {
      largestSpread = gdaxVsPoloniexLtc;
      spreadCurrency = "LTC";
      tradeAt = trades.gdax;
      tradingAt = 'gdax';
      withdrawFrom = 'poloniex';
    }

    if (bittrexVsPoloniexLtc > largestSpread) {
      largestSpread = bittrexVsPoloniexLtc;
      spreadCurrency = "LTC";
      tradeAt = trades.bittrex;
      tradingAt = 'bittrex';
      withdrawFrom = 'poloniex';
    }

    if (poloniexVsGdaxBtc > largestSpread) {
      largestSpread = poloniexVsGdaxBtc;
      spreadCurrency = "BTC";
      tradeAt = trades.poloniex;
      tradingAt = 'poloniex';
      withdrawFrom = 'gdax';
    }

    if (poloniexVsGeminiBtc > largestSpread) {
      largestSpread = poloniexVsGeminiBtc;
      spreadCurrency = "BTC";
      tradeAt = trades.poloniex;
      tradingAt = 'poloniex';
      withdrawFrom = 'gemini';
    }

    if (poloniexVsBittrexBtc > largestSpread) {
      largestSpread = poloniexVsBittrexBtc;
      spreadCurrency = "BTC";
      tradeAt = trades.poloniex;
      tradingAt = 'poloniex';
      withdrawFrom = 'bittrex';
    }

    if (gdaxVsPoloniexBtc > largestSpread) {
      largestSpread = gdaxVsPoloniexBtc;
      spreadCurrency = "BTC";
      tradeAt = trades.gdax;
      tradingAt = 'gdax';
      withdrawFrom = 'poloniex';
    }

    if (geminiVsPoloniexBtc > largestSpread) {
      largestSpread = geminiVsPoloniexBtc;
      spreadCurrency = "BTC";
      tradeAt = trades.gemini;
      tradingAt = 'gemini';
      withdrawFrom = 'poloniex';
    }

    if (bittrexVsPoloniexBtc > largestSpread) {
      largestSpread = bittrexVsPoloniexBtc;
      spreadCurrency = "BTC";
      tradeAt = trades.bittrex;
      tradingAt = 'bittrex';
      withdrawFrom = 'poloniex';
    }

    if (poloniexVsGdaxEth > largestSpread) {
      largestSpread = poloniexVsGdaxEth;
      spreadCurrency = "ETH";
      tradeAt = trades.poloniex;
      tradingAt = 'poloniex';
      withdrawFrom = 'gdax';
    }

    if (poloniexVsGeminiEth > largestSpread) {
      largestSpread = poloniexVsGeminiEth;
      spreadCurrency = "ETH";
      tradeAt = trades.poloniex;
      tradingAt = 'poloniex';
      withdrawFrom = 'gemini';
    }

    if (poloniexVsBittrexEth > largestSpread) {
      largestSpread = poloniexVsBittrexEth;
      spreadCurrency = "ETH";
      tradeAt = trades.poloniex;
      tradingAt = 'poloniex';
      withdrawFrom = 'bittrex';
    }

    if (gdaxVsPoloniexEth > largestSpread) {
      largestSpread = gdaxVsPoloniexEth;
      spreadCurrency = "ETH";
      tradeAt = trades.gdax;
      tradingAt = 'gdax';
      withdrawFrom = 'poloniex';
    }

    if (geminiVsPoloniexEth > largestSpread) {
      largestSpread = geminiVsPoloniexEth;
      spreadCurrency = "ETH";
      tradeAt = trades.gemini;
      tradingAt = 'gemini';
      withdrawFrom = 'poloniex';
    }

    if(bittrexVsPoloniexEth > largestSpread) {
      largestSpread = bittrexVsPoloniexEth;
      spreadCurrency = "ETH";
      tradeAt = trades.bittrex;
      tradingAt = 'bittrex';
      withdrawFrom = 'poloniex';
    }
  }

  if (exchange === 'bittrex') {
    //BTC
    let bittrexVsGdaxBtc = parseFloat((parseFloat((cryptoSocket.Exchanges.bittrex.BTCUSD - parseFloat((cryptoSocket.Exchanges.bittrex.BTCUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat((cryptoSocket.Exchanges.gdax.BTCUSD).toFixed(5)).toFixed(5)).toFixed(2));
    let bittrexVsGeminiBtc = parseFloat((parseFloat((cryptoSocket.Exchanges.bittrex.BTCUSD - parseFloat((cryptoSocket.Exchanges.bittrex.BTCUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.gemini.BTCUSD - (parseFloat((cryptoSocket.Exchanges.gemini.BTCUSD * .01).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let bittrexVsPoloniexBtc = parseFloat((parseFloat((cryptoSocket.Exchanges.bittrex.BTCUSD - parseFloat((cryptoSocket.Exchanges.bittrex.BTCUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.poloniex.BTCUSD - (parseFloat((cryptoSocket.Exchanges.poloniex.BTCUSD * .001).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let gdaxVsBittrexBtc = parseFloat((parseFloat((cryptoSocket.Exchanges.gdax.BTCUSD - parseFloat((cryptoSocket.Exchanges.gdax.BTCUSD * .003).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.bittrex.BTCUSD - (parseFloat((cryptoSocket.Exchanges.bittrex.BTCUSD * .001).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let geminiVsBittrexBtc = parseFloat((parseFloat((cryptoSocket.Exchanges.gemini.BTCUSD - parseFloat((cryptoSocket.Exchanges.gemini.BTCUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.bittrex.BTCUSD - (parseFloat((cryptoSocket.Exchanges.bittrex.BTCUSD * .001).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let poloniexVsBittrexBtc = parseFloat((parseFloat((cryptoSocket.Exchanges.poloniex.BTCUSD - parseFloat((cryptoSocket.Exchanges.poloniex.BTCUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.bittrex.BTCUSD - (parseFloat((cryptoSocket.Exchanges.bittrex.BTCUSD * .001).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));

    //ETH
    let bittrexVsGdaxEth = parseFloat((parseFloat((cryptoSocket.Exchanges.bittrex.ETHUSD - parseFloat((cryptoSocket.Exchanges.bittrex.ETHUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat((cryptoSocket.Exchanges.gdax.ETHUSD).toFixed(5)).toFixed(5)).toFixed(2));
    let bittrexVsGeminiEth = parseFloat((parseFloat((cryptoSocket.Exchanges.bittrex.ETHUSD - parseFloat((cryptoSocket.Exchanges.bittrex.ETHUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.gemini.ETHUSD - (parseFloat((cryptoSocket.Exchanges.gemini.ETHUSD * .01).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let bittrexVsPoloniexEth = parseFloat((parseFloat((cryptoSocket.Exchanges.bittrex.ETHUSD - parseFloat((cryptoSocket.Exchanges.bittrex.ETHUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.poloniex.ETHUSD - (parseFloat((cryptoSocket.Exchanges.poloniex.ETHUSD * .001).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let gdaxVsBittrexEth = parseFloat((parseFloat((cryptoSocket.Exchanges.gdax.ETHUSD - parseFloat((cryptoSocket.Exchanges.gdax.ETHUSD * .003).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.bittrex.ETHUSD - (parseFloat((cryptoSocket.Exchanges.bittrex.ETHUSD * .005).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let geminiVsBittrexEth = parseFloat((parseFloat((cryptoSocket.Exchanges.gemini.ETHUSD - parseFloat((cryptoSocket.Exchanges.gemini.ETHUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.bittrex.ETHUSD - (parseFloat((cryptoSocket.Exchanges.bittrex.ETHUSD * .005).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let poloniexVsBittrexEth = parseFloat((parseFloat((cryptoSocket.Exchanges.poloniex.ETHUSD - parseFloat((cryptoSocket.Exchanges.poloniex.ETHUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.bittrex.ETHUSD - (parseFloat((cryptoSocket.Exchanges.bittrex.ETHUSD * .005).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));

    //LTC
    let bittrexVsGdaxLtc = parseFloat((parseFloat((cryptoSocket.Exchanges.bittrex.LTCUSD - parseFloat((cryptoSocket.Exchanges.bittrex.LTCUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat((cryptoSocket.Exchanges.gdax.LTCUSD).toFixed(5)).toFixed(5)).toFixed(2));
    let bittrexVsPoloniexLtc = parseFloat((parseFloat((cryptoSocket.Exchanges.bittrex.LTCUSD - parseFloat((cryptoSocket.Exchanges.bittrex.LTCUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.poloniex.LTCUSD - (parseFloat((cryptoSocket.Exchanges.poloniex.LTCUSD * .0025).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let gdaxVsBittrexLtc = parseFloat((parseFloat((cryptoSocket.Exchanges.gdax.LTCUSD - parseFloat((cryptoSocket.Exchanges.gdax.LTCUSD * .003).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.bittrex.LTCUSD - (parseFloat((cryptoSocket.Exchanges.bittrex.LTCUSD * .002).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));
    let poloniexVsBittrexLtc = parseFloat((parseFloat((cryptoSocket.Exchanges.poloniex.LTCUSD - parseFloat((cryptoSocket.Exchanges.poloniex.LTCUSD * .0025).toFixed(5)).toFixed(5))) - parseFloat(((cryptoSocket.Exchanges.bittrex.LTCUSD - (parseFloat((cryptoSocket.Exchanges.bittrex.LTCUSD * .002).toFixed(5)))).toFixed(5))).toFixed(5)).toFixed(2));


    if (bittrexVsGdaxLtc > largestSpread) {
      largestSpread = bittrexVsGdaxLtc;
      spreadCurrency = "LTC";
      tradeAt = trades.bittrex;
      tradingAt = 'bittrex';
      withdrawFrom = 'gdax';
    }

    if (bittrexVsPoloniexLtc > largestSpread) {
      largestSpread = bittrexVsPoloniexLtc;
      spreadCurrency = "LTC";
      tradeAt = trades.bittrex;
      tradingAt = 'bittrex';
      withdrawFrom = 'poloniex';
    }

    if (gdaxVsBittrexLtc > largestSpread) {
      largestSpread = gdaxVsBittrexLtc;
      spreadCurrency = "LTC";
      tradeAt = trades.gdax;
      tradingAt = 'gdax';
      withdrawFrom = 'bittrex';
    }

    if (poloniexVsBittrexLtc > largestSpread) {
      largestSpread = poloniexVsBittrexLtc;
      spreadCurrency = "LTC";
      tradeAt = trades.poloniex;
      tradingAt = 'poloniex';
      withdrawFrom = 'bittrex';
    }

    if (bittrexVsGdaxBtc > largestSpread) {
      largestSpread = bittrexVsGdaxBtc;
      spreadCurrency = "BTC";
      tradeAt = trades.bittrex;
      tradingAt = 'bittrex';
      withdrawFrom = 'gdax';
    }

    if (bittrexVsGeminiBtc > largestSpread) {
      largestSpread = bittrexVsGeminiBtc;
      spreadCurrency = "BTC";
      tradeAt = trades.bittrex;
      tradingAt = 'bittrex';
      withdrawFrom = 'gemini';
    }

    if (bittrexVsPoloniexBtc > largestSpread) {
      largestSpread = bittrexVsPoloniexBtc;
      spreadCurrency = "BTC";
      tradeAt = trades.bittrex;
      tradingAt = 'bittrex';
      withdrawFrom = 'poloniex';
    }

    if (gdaxVsBittrexBtc > largestSpread) {
      largestSpread = gdaxVsBittrexBtc;
      spreadCurrency = "BTC";
      tradeAt = trades.gdax;
      tradingAt = 'gdax';
      withdrawFrom = 'bittrex';
    }

    if (geminiVsBittrexBtc > largestSpread) {
      largestSpread = geminiVsBittrexBtc;
      spreadCurrency = "BTC";
      tradeAt = trades.gemini;
      tradingAt = 'gemini';
      withdrawFrom = 'bittrex';
    }

    if (poloniexVsBittrexBtc > largestSpread) {
      largestSpread = poloniexVsBittrexBtc;
      spreadCurrency = "BTC";
      tradeAt = trades.poloniex;
      tradingAt = 'poloniex';
      withdrawFrom = 'bittrex';
    }

    if (bittrexVsGdaxEth > largestSpread) {
      largestSpread = bittrexVsGdaxEth;
      spreadCurrency = "ETH";
      tradeAt = trades.bittrex;
      tradingAt = 'bittrex';
      withdrawFrom = 'gdax';
    }

    if (bittrexVsGeminiEth > largestSpread) {
      largestSpread = bittrexVsGeminiEth;
      spreadCurrency = "ETH";
      tradeAt = trades.bittrex;
      tradingAt = 'bittrex';
      withdrawFrom = 'gemini';
    }

    if (bittrexVsPoloniexEth > largestSpread) {
      largestSpread = bittrexVsPoloniexEth;
      spreadCurrency = "ETH";
      tradeAt = trades.bittrex;
      tradingAt = 'bittrex';
      withdrawFrom = 'poloniex';
    }

    if (gdaxVsBittrexEth > largestSpread) {
      largestSpread = gdaxVsBittrexEth;
      spreadCurrency = "ETH";
      tradeAt = trades.gdax;
      tradingAt = 'gdax';
      withdrawFrom = 'bittrex';
    }

    if (geminiVsBittrexEth > largestSpread) {
      largestSpread = geminiVsBittrexEth;
      spreadCurrency = "ETH";
      tradeAt = trades.gemini;
      tradingAt = 'gemini';
      withdrawFrom = 'bittrex';
    }

    if (poloniexVsBittrexEth > largestSpread) {
      largestSpread = poloniexVsBittrexEth;
      spreadCurrency = "ETH";
      tradeAt = trades.poloniex;
      tradingAt = 'poloniex';
      withdrawFrom = 'bittrex';
    }
  }

  if (largestSpread) {
    //console.log(`${tradingAt} ${spreadCurrency} ARB OPPORTUNITY OF: $${largestSpread} AND WITHDRAWING FROM ${withdrawFrom}`)
    //loopConditonal(exchange, currency);
    flag = false;
    setImmediate(() => {loopConditional(tradingAt, spreadCurrency + 'USD', false)});
    //if withdraw
      //need to take into account for each exchanges withdraw function and their
      //unique function paramters
    //else if spreadCurrency === 'BTC'
      //trade BTC functions for each exchange
    //else if spreadCurency === 'ETH'
      //trade ETH functions for each exchange
    //else if spreadCurrency === 'LTC'
      //trade LTC functions for each exchange

      // if (withdrawFrom === 'gdax' && !sufficientFunds) {
      //   gdax.withdraw();
      // } else if (withdrawFrom === 'gemini' && !sufficientFunds) {
      //   gemini.withdraw();
      // } else if (withdrawFrom === 'poloniex' && !sufficientFunds) {
      //   poloniex.withdraw();
      // } else if (withdrawFrom === 'bitfinex' && !sufficientFunds) {
      //   bitfinex.withdraw();
      // } else if (withdrawFrom === 'bittrex' && !sufficientFunds) {
      //   bittrex.withdraw();
      // } else if (withdrawFrom === 'gdax' && sufficientFunds && tradingAt === exchange) {

      // } else if (withdrawFrom === 'gemini' && sufficientFunds && tradingAt === exchange) {

      // } else if (withdrawFrom === 'poloniex' && sufficientFunds && tradingAt === exchange) {

      // } else if (withdrawFrom === 'bitfinex' && sufficientFunds && tradingAt === exchange) {

      // } else if (withdrawFrom === 'bittrex' && sufficientFunds && tradingAt === exchange) {

      // } else {
      //   // error handle or just reinitiate checkArbitrage Function
      //   // loopConditional(exchange, currency);
      // }

    // if (currency === spreadCurrency) {
    //   //there are some catch 22's here we need to work out the kinks bruh
    //   setTimeout(trades[exchange].withdraw(spreadCurrency), 0);
    // } else if (currency === "BTC") {
    //   // Price to buy ETH with all BTC is 1 ETH converted to BTC + 10 cents in BTC
    //   let price = (cryptoSocket.Exchanges.gemini.ETHBTC + (0.10 / cryptoSocket.Exchanges.gemini.BTCUSD)).toFixed(5);
    //   setTimeout(() => trades[exchange].buy("eth", price), 0);
    // } else if (currency === "ETH") {
    //   // Price to sell all ETH for BTC is 1 ETH converted to BTC - 10 cents in BTC
    //   let price = (cryptoSocket.Exchanges.gemini.ETHBTC - (0.10 / cryptoSocket.Exchanges.gemini.BTCUSD)).toFixed(5);
    //   setTimeout(() => {() => trades[exchange].buy("btc" ,price)}, 0);
    // }
  }
};


loopConditional = (exchange, currency, needToWithdraw) => {
  flag = true;
  while (flag) {
    checkArbitrage(exchange, currency, needToWithdraw);
  }
};

module.exports.loopConditional = function (exchange, currency, needToWithdraw){
  flag = true;
  while (flag) {
    checkArbitrage(exchange, currency, needToWithdraw);
  }
}

setInterval(()=>{console.log(cryptoSocket.Exchanges)}, 0.001);
//setTimeout(() => {setInterval(() => {console.log(trackSpreads())}, 30000)}, 140000);
//setTimeout(() => {console.log(loopConditional('gdax', 'ETHUSD', false))}, 200000);
//setTimeout(() => {console.log(`CHECK ARB FUNCTION FIRED OFF ${functionCounter.count} TIMES IN ONE SECOND!`)}, 201000)



