require("dotenv").load();
require('./database/database');
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const axios = require("axios");
let cryptoSocket = require("crypto-socket");
let flag = true;
cryptoSocket.start("gemini");
cryptoSocket.start("gdax");
cryptoSocket.start("poloniex");
cryptoSocket.start("bittrex");
let bitfinex = require('./exchanges/bitfinex');
let bittrex = require('./exchanges/bittrex');
let gdax = require('./exchanges/gdax');
let gemini = require('./exchanges/gemini');
let poloniex = require('./exchanges/poloniex');
let livecoin = require('./exchanges/livecoin');
let cCex = require('./exchanges/cCex');
let SMA = require('technicalindicators').SMA;
let EMA = require('technicalindicators').EMA;
let RSI = require('technicalindicators').RSI;
let MACD = require('technicalindicators').MACD;
let BB = require('technicalindicators').BollingerBands;
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

let bittrexBTCUSDNumberToCountFromDB = 0;
let bittrexBTCUSDNumberToInsertLogsToDB = 1;
let bittrexETHBTCNumberToCountFromDB = 0;
let bittrexETHBTCNumberToInsertLogsToDB = 1;
let bittrexLTCETHNumberToCountFromDB = 0;
let bittrexLTCETHNumberToInsertLogsToDB = 1;
let gdaxBTCUSDNumberToCountFromDB = 0;
let gdaxBTCUSDNumberToInsertLogsToDB = 1;
let gdaxETHBTCNumberToCountFromDB = 0;
let gdaxETHBTCNumberToInsertLogsToDB = 1;
let gdaxLTCBTCNumberToCountFromDB = 0;
let gdaxLTCBTCNumberToInsertLogsToDB = 1;
let gdaxETHUSDNumberToCountFromDB = 0;
let gdaxETHUSDNumberToInsertLogsToDB = 1;
let gdaxLTCUSDNumberToCountFromDB = 0;
let gdaxLTCUSDNumberToInsertLogsToDB = 1;
let geminiETHBTCNumberToCountFromDB = 0;
let geminiETHBTCNumberToInsertLogsToDB = 1;
let geminiETHUSDNumberToCountFromDB = 0;
let geminiETHUSDNumberToInsertLogsToDB = 1;
let geminiBTCUSDNumberToCountFromDB = 0;
let geminiBTCUSDNumberToInsertLogsToDB = 1;
let poloniexETHUSDNumberToCountFromDB = 0;
let poloniexETHUSDNumberToInsertLogsToDB = 1;
let poloniexBTCUSDNumberToCountFromDB = 0;
let poloniexBTCUSDNumberToInsertLogsToDB = 1;
let poloniexLTCUSDNumberToCountFromDB = 0;
let poloniexLTCUSDNumberToInsertLogsToDB = 1;
let poloniexETHBTCNumberToCountFromDB = 0;
let poloniexETHBTCNumberToInsertLogsToDB = 1;
let poloniexLTCBTCNumberToCountFromDB = 0;
let poloniexLTCBTCNumberToInsertLogsToDB = 1;

let bittrexBTCUSDModel = require('./database/models/bittrexBTCUSD');
let bittrexETHBTCModel = require('./database/models/bittrexETHBTC');
let bittrexLTCETHModel = require('./database/models/bittrexLTCETH');
let gdaxBTCUSDModel = require('./database/models/gdaxBTCUSD');
let gdaxETHBTCModel = require('./database/models/gdaxETHBTC');
let gdaxLTCBTCModel = require('./database/models/gdaxLTCBTC');
let gdaxETHUSDModel = require('./database/models/gdaxETHUSD');
let gdaxLTCUSDModel = require('./database/models/gdaxLTCUSD');
let geminiETHBTCModel = require('./database/models/geminiETHBTC');
let geminiETHUSDModel = require('./database/models/geminiETHUSD');
let geminiBTCUSDModel = require('./database/models/geminiBTCUSD');
let poloniexETHBTCModel = require('./database/models/poloniexETHBTC');
let poloniexBTCUSDModel = require('./database/models/poloniexBTCUSD');
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
      'BTCUSD': []
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
      'LTCUSD': []
    }
};

let hourlyAvgPrices = {
    'bittrex': {
      'ETHBTC': [],
      'LTCETH': [],
      'BTCUSD': []
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
      'LTCUSD': []
    }
};


//setTimeout(() => {setInterval(() => {console.log(historicDataLogs.bittrex.ETHBTC)}, 500)}, 121000);
// setTimeout(() => {
//   setInterval(() => {
//     console.log("THERE ARE " + historicDataLogs['bittrex']['BTCUSD'].length + " NUMBER OF ENTRIES IN THE BITTREX BTCUSD ARRAY!");
//     console.log("\n\n");
//     console.log("THERE ARE " + historicDataLogs['bittrex']['ETHBTC'].length + " NUMBER OF ENTRIES IN THE BITTREX ETHBTC ARRAY!");
//     console.log("\n\n");
//     console.log("THERE ARE " + historicDataLogs['bittrex']['LTCETH'].length + " NUMBER OF ENTRIES IN THE BITTREX LTCETH ARRAY!");
//     console.log("\n\n");
//     console.log("THERE ARE " + historicDataLogs['gdax']['BTCUSD'].length + " NUMBER OF ENTRIES IN THE GDAX BTCUSD ARRAY!");
//     console.log("\n\n");
//     console.log("THERE ARE " + historicDataLogs['gdax']['ETHUSD'].length + " NUMBER OF ENTRIES IN THE GDAX ETHUSD ARRAY!");
//     console.log("\n\n");
//     console.log("THERE ARE " + historicDataLogs['gdax']['ETHBTC'].length + " NUMBER OF ENTRIES IN THE GDAX ETHBTC ARRAY!");
//     console.log("\n\n");
//     console.log("THERE ARE " + historicDataLogs['gdax']['LTCBTC'].length + " NUMBER OF ENTRIES IN THE GDAX LTCBTC ARRAY!");
//     console.log("\n\n");
//     console.log("THERE ARE " + historicDataLogs['gdax']['LTCUSD'].length + " NUMBER OF ENTRIES IN THE GDAX LTCUSD ARRAY!");
//     console.log("\n\n");
//     console.log("THERE ARE " + historicDataLogs['poloniex']['BTCUSD'].length + " NUMBER OF ENTRIES IN THE POLONIEX BTCUSD ARRAY!");
//     console.log("\n\n");
//     console.log("THERE ARE " + historicDataLogs['poloniex']['ETHBTC'].length + " NUMBER OF ENTRIES IN THE POLONIEX ETHBTC ARRAY!");
//     console.log("\n\n");
//     console.log("THERE ARE " + historicDataLogs['poloniex']['LTCBTC'].length + " NUMBER OF ENTRIES IN THE POLONIEX LTCBTC ARRAY!");
//     console.log("\n\n");
//     console.log("THERE ARE " + historicDataLogs['poloniex']['ETHUSD'].length + " NUMBER OF ENTRIES IN THE POLONIEX ETHUSD ARRAY!");
//     console.log("\n\n");
//     console.log("THERE ARE " + historicDataLogs['poloniex']['LTCUSD'].length + " NUMBER OF ENTRIES IN THE POLONIEX LTCUSD ARRAY!");
//     console.log("\n\n");
//     console.log("THERE ARE " + historicDataLogs['gemini']['BTCUSD'].length + " NUMBER OF ENTRIES IN THE GEMINI BTCUSD ARRAY!");
//     console.log("\n\n");
//     console.log("THERE ARE " + historicDataLogs['gemini']['ETHBTC'].length + " NUMBER OF ENTRIES IN THE GEMINI ETHBTC ARRAY!");
//     console.log("\n\n");
//     console.log("THERE ARE " + historicDataLogs['gemini']['ETHUSD'].length + " NUMBER OF ENTRIES IN THE GEMINI ETHUSD ARRAY!");
//     console.log("\n\n");
//   }, 10000);
// }, 140000);



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



// cryptoSocket.Exchanges.livecoin = {};
// cryptoSocket.Exchanges.cCex = {};
// cryptoSocket.Exchanges.livecoin.BTCUSD = '';
// cryptoSocket.Exchanges.livecoin.ETHUSD = '';
// cryptoSocket.Exchanges.livecoin.LTCUSD = '';
// cryptoSocket.Exchanges.livecoin.LTCBTC = '';
// cryptoSocket.Exchanges.livecoin.ETHBTC = '';
// cryptoSocket.Exchanges.cCex.BTCUSD = '';
// cryptoSocket.Exchanges.cCex.ETHUSD = '';
// cryptoSocket.Exchanges.cCex.LTCUSD = '';
// cryptoSocket.Exchanges.cCex.LTCBTC = '';
// cryptoSocket.Exchanges.cCex.ETHBTC = '';






// setImmediate(() => {
//   setInterval(() => {
//     axios.get('https://api.livecoin.net/exchange/ticker')
//       .then(data => {
//         if(data.data){
//           cryptoSocket.Exchanges.livecoin.BTCUSD = parseFloat(data.data.filter(coin => coin.symbol === 'BTC/USD')[0].last);
//           cryptoSocket.Exchanges.livecoin.ETHUSD = parseFloat(data.data.filter(coin => coin.symbol === 'ETH/USD')[0].last);
//           cryptoSocket.Exchanges.livecoin.LTCUSD = parseFloat(data.data.filter(coin => coin.symbol === 'LTC/USD')[0].last);
//           cryptoSocket.Exchanges.livecoin.LTCBTC = parseFloat(data.data.filter(coin => coin.symbol === 'LTC/BTC')[0].last);
//           cryptoSocket.Exchanges.livecoin.ETHBTC = parseFloat(data.data.filter(coin => coin.symbol === 'ETH/BTC')[0].last);
//         }
//       })
//       .catch(err => console.log("COULD NOT GET LIVECOIN QUOTES BECAUSE: ", err));

//       axios.get("https://c-cex.com/t/prices.json")
//         .then(data => {
//           cryptoSocket.Exchanges.cCex.BTCUSD = parseFloat(data.data['btc-usd'].lastprice)
//           cryptoSocket.Exchanges.cCex.ETHUSD = parseFloat(data.data['eth-usd'].lastprice)
//           cryptoSocket.Exchanges.cCex.LTCUSD = parseFloat(data.data['ltc-usd'].lastprice)
//           cryptoSocket.Exchanges.cCex.ETHBTC = parseFloat(data.data['eth-btc'].lastprice)
//           cryptoSocket.Exchanges.cCex.LTCBTC = parseFloat(data.data['ltc-btc'].lastprice)
//         })
//         .catch(err => console.log("COULD NOT GET C-CEX QUOTES BECAUSE: ", err));
//   }, 1500)
// });


checkArbitrage = (exchange, currency, needToWithdraw) => {
  if(needToWithdraw === false && historicDataLogs['bittrex'].BTCUSD.length > bittrexBTCUSDNumberToInsertLogsToDB){
    let bittrexBTCUSDArray = historicDataLogs['bittrex'].BTCUSD.slice(bittrexBTCUSDNumberToCountFromDB, bittrexBTCUSDNumberToInsertLogsToDB);
    let bittrexBTCUSDData = [];
    bittrexBTCUSDArray.forEach((spotPrice, i) => {
      bittrexBTCUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    bittrexBTCUSDModel.insertMany(bittrexBTCUSDData);

    bittrexBTCUSDNumberToCountFromDB = bittrexBTCUSDNumberToCountFromDB + 1000;
    bittrexBTCUSDNumberToInsertLogsToDB = bittrexBTCUSDNumberToInsertLogsToDB + 1000;
    console.log("BITTREX BTCUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['bittrex'].ETHBTC.length > bittrexETHBTCNumberToInsertLogsToDB){
    let bittrexETHBTCArray = historicDataLogs['bittrex'].ETHBTC.slice(bittrexETHBTCNumberToCountFromDB, bittrexETHBTCNumberToInsertLogsToDB);
    let bittrexETHBTCData = [];

    bittrexETHBTCArray.forEach((spotPrice, i) => {
      bittrexETHBTCData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    bittrexETHBTCModel.insertMany(bittrexETHBTCData);

    bittrexETHBTCNumberToCountFromDB = bittrexETHBTCNumberToCountFromDB + 1000;
    bittrexETHBTCNumberToInsertLogsToDB = bittrexETHBTCNumberToInsertLogsToDB + 1000;
    console.log("BITTREX ETHBTC INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['bittrex'].LTCETH.length > bittrexLTCETHNumberToInsertLogsToDB){
    let bittrexLTCETHArray = historicDataLogs['bittrex'].LTCETH.slice(bittrexLTCETHNumberToCountFromDB, bittrexLTCETHNumberToInsertLogsToDB);
    let bittrexLTCETHData = [];
    bittrexLTCETHArray.forEach((spotPrice, i) => {
      bittrexLTCETHData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    bittrexLTCETHModel.insertMany(bittrexLTCETHData);

    bittrexLTCETHNumberToCountFromDB = bittrexLTCETHNumberToCountFromDB + 1000;
    bittrexLTCETHNumberToInsertLogsToDB = bittrexLTCETHNumberToInsertLogsToDB + 1000;
  }

  if(needToWithdraw === false && historicDataLogs['gdax'].BTCUSD.length > gdaxBTCUSDNumberToInsertLogsToDB){
    let gdaxBTCUSDArray = historicDataLogs['gdax'].BTCUSD.slice(gdaxBTCUSDNumberToCountFromDB, gdaxBTCUSDNumberToInsertLogsToDB);
    let gdaxBTCUSDData = [];
    gdaxBTCUSDArray.forEach((spotPrice, i) => {
      gdaxBTCUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    gdaxBTCUSDModel.insertMany(gdaxBTCUSDData);

    gdaxBTCUSDNumberToCountFromDB = gdaxBTCUSDNumberToCountFromDB + 1000;
    gdaxBTCUSDNumberToInsertLogsToDB = gdaxBTCUSDNumberToInsertLogsToDB + 1000;
    console.log("GDAX BTCUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['gdax'].ETHBTC.length > gdaxETHBTCNumberToInsertLogsToDB){
    let gdaxETHBTCArray = historicDataLogs['gdax'].ETHBTC.slice(gdaxETHBTCNumberToCountFromDB, gdaxETHBTCNumberToInsertLogsToDB);
    let gdaxETHBTCData = [];

    gdaxETHBTCArray.forEach((spotPrice, i) => {
      gdaxETHBTCData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    gdaxETHBTCModel.insertMany(gdaxETHBTCData);

    gdaxETHBTCNumberToCountFromDB = gdaxETHBTCNumberToCountFromDB + 1000;
    gdaxETHBTCNumberToInsertLogsToDB = gdaxETHBTCNumberToInsertLogsToDB + 1000;
    console.log("GDAX ETHBTC INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['gdax'].LTCBTC.length > gdaxLTCBTCNumberToInsertLogsToDB){
    let gdaxLTCBTCArray = historicDataLogs['gdax'].LTCBTC.slice(gdaxLTCBTCNumberToCountFromDB, gdaxLTCBTCNumberToInsertLogsToDB);
    let gdaxLTCBTCData = [];

    gdaxLTCBTCArray.forEach((spotPrice, i) => {
      gdaxLTCBTCData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    gdaxLTCBTCModel.insertMany(gdaxLTCBTCData);

    gdaxLTCBTCNumberToCountFromDB = gdaxLTCBTCNumberToCountFromDB + 1000;
    gdaxLTCBTCNumberToInsertLogsToDB = gdaxLTCBTCNumberToInsertLogsToDB + 1000;
    console.log("GDAX LTCBTC INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['gdax'].ETHUSD.length > gdaxETHUSDNumberToInsertLogsToDB){
    let gdaxETHUSDArray = historicDataLogs['gdax'].ETHUSD.slice(gdaxETHUSDNumberToCountFromDB, gdaxETHUSDNumberToInsertLogsToDB);
    let gdaxETHUSDData = [];

    gdaxETHUSDArray.forEach((spotPrice, i) => {
      gdaxETHUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    gdaxETHUSDModel.insertMany(gdaxETHUSDData);

    gdaxETHUSDNumberToCountFromDB = gdaxETHUSDNumberToCountFromDB + 1000;
    gdaxETHUSDNumberToInsertLogsToDB = gdaxETHUSDNumberToInsertLogsToDB + 1000;
    console.log("GDAX ETHUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['gdax'].LTCUSD.length > gdaxLTCUSDNumberToInsertLogsToDB){
    let gdaxLTCUSDArray = historicDataLogs['gdax'].LTCUSD.slice(gdaxLTCUSDNumberToCountFromDB, gdaxLTCUSDNumberToInsertLogsToDB);
    let gdaxLTCUSDData = [];

    gdaxLTCUSDArray.forEach((spotPrice, i) => {
      gdaxLTCUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    gdaxLTCUSDModel.insertMany(gdaxLTCUSDData);

    gdaxLTCUSDNumberToCountFromDB = gdaxLTCUSDNumberToCountFromDB + 1000;
    gdaxLTCUSDNumberToInsertLogsToDB = gdaxLTCUSDNumberToInsertLogsToDB + 1000;
    console.log("GDAX LTCUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['gemini'].ETHBTC.length > geminiETHBTCNumberToInsertLogsToDB){
    let geminiETHBTCArray = historicDataLogs['gemini'].ETHBTC.slice(geminiETHBTCNumberToCountFromDB, geminiETHBTCNumberToInsertLogsToDB);
    let geminiETHBTCData = [];

    geminiETHBTCArray.forEach((spotPrice, i) => {
      geminiETHBTCData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    geminiETHBTCModel.insertMany(geminiETHBTCData);

    geminiETHBTCNumberToCountFromDB = geminiETHBTCNumberToCountFromDB + 1000;
    geminiETHBTCNumberToInsertLogsToDB = geminiETHBTCNumberToInsertLogsToDB + 1000;
    console.log("GEMINI ETHBTC INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['gemini'].ETHUSD.length > geminiETHUSDNumberToInsertLogsToDB){
    let geminiETHUSDArray = historicDataLogs['gemini'].ETHUSD.slice(geminiETHUSDNumberToCountFromDB, geminiETHUSDNumberToInsertLogsToDB);
    let geminiETHUSDData = [];

    geminiETHUSDArray.forEach((spotPrice, i) => {
      geminiETHUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    geminiETHUSDModel.insertMany(geminiETHUSDData);

    geminiETHUSDNumberToCountFromDB = geminiETHUSDNumberToCountFromDB + 1000;
    geminiETHUSDNumberToInsertLogsToDB = geminiETHUSDNumberToInsertLogsToDB + 1000;
    console.log("GEMINI ETHUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['gemini'].BTCUSD.length > geminiBTCUSDNumberToInsertLogsToDB){
    let geminiBTCUSDArray = historicDataLogs['gemini'].BTCUSD.slice(geminiBTCUSDNumberToCountFromDB, geminiBTCUSDNumberToInsertLogsToDB);
    let geminiBTCUSDData = [];

    geminiBTCUSDArray.forEach((spotPrice, i) => {
      geminiBTCUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    geminiBTCUSDModel.insertMany(geminiBTCUSDData);

    geminiBTCUSDNumberToCountFromDB = geminiBTCUSDNumberToCountFromDB + 1000;
    geminiBTCUSDNumberToInsertLogsToDB = geminiBTCUSDNumberToInsertLogsToDB + 1000;
    console.log("GEMINI BTCUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['poloniex'].ETHBTC.length > poloniexETHBTCNumberToInsertLogsToDB){
    let poloniexETHBTCArray = historicDataLogs['poloniex'].ETHBTC.slice(poloniexETHBTCNumberToCountFromDB, poloniexETHBTCNumberToInsertLogsToDB);
    let poloniexETHBTCData = [];

    poloniexETHBTCArray.forEach((spotPrice, i) => {
      poloniexETHBTCData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    poloniexETHBTCModel.insertMany(poloniexETHBTCData);

    poloniexETHBTCNumberToCountFromDB = poloniexETHBTCNumberToCountFromDB + 1000;
    poloniexETHBTCNumberToInsertLogsToDB = poloniexETHBTCNumberToInsertLogsToDB + 1000;
    console.log("POLONIEX ETHBTC INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['poloniex'].BTCUSD.length > poloniexBTCUSDNumberToInsertLogsToDB){
    let poloniexBTCUSDArray = historicDataLogs['poloniex'].BTCUSD.slice(poloniexBTCUSDNumberToCountFromDB, poloniexBTCUSDNumberToInsertLogsToDB);
    let poloniexBTCUSDData = [];

    poloniexBTCUSDArray.forEach((spotPrice, i) => {
      poloniexBTCUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    poloniexBTCUSDModel.insertMany(poloniexBTCUSDData);

    poloniexBTCUSDNumberToCountFromDB = poloniexBTCUSDNumberToCountFromDB + 1000;
    poloniexBTCUSDNumberToInsertLogsToDB = poloniexBTCUSDNumberToInsertLogsToDB + 1000;
    console.log("POLONIEX BTCUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['poloniex'].ETHUSD.length > poloniexETHUSDNumberToInsertLogsToDB){
    let poloniexETHUSDArray = historicDataLogs['poloniex'].ETHUSD.slice(poloniexETHUSDNumberToCountFromDB, poloniexETHUSDNumberToInsertLogsToDB);
    let poloniexETHUSDData = [];

    poloniexETHUSDArray.forEach((spotPrice, i) => {
      poloniexETHUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    poloniexETHUSDModel.insertMany(poloniexETHUSDData);

    poloniexETHUSDNumberToCountFromDB = poloniexETHUSDNumberToCountFromDB + 1000;
    poloniexETHUSDNumberToInsertLogsToDB = poloniexETHUSDNumberToInsertLogsToDB + 1000;
    console.log("POLONIEX ETHUSD INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['poloniex'].LTCBTC.length > poloniexLTCBTCNumberToInsertLogsToDB){
    let poloniexLTCBTCArray = historicDataLogs['poloniex'].LTCBTC.slice(poloniexLTCBTCNumberToCountFromDB, poloniexLTCBTCNumberToInsertLogsToDB);
    let poloniexLTCBTCData = [];

    poloniexLTCBTCArray.forEach((spotPrice, i) => {
      poloniexLTCBTCData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    poloniexLTCBTCModel.insertMany(poloniexLTCBTCData);

    poloniexLTCBTCNumberToCountFromDB = poloniexLTCBTCNumberToCountFromDB + 1000;
    poloniexLTCBTCNumberToInsertLogsToDB = poloniexLTCBTCNumberToInsertLogsToDB + 1000;
    console.log("POLONIEX LTCBTC INSERTED");
  }

  if(needToWithdraw === false && historicDataLogs['poloniex'].LTCUSD.length > poloniexLTCUSDNumberToInsertLogsToDB){
    let poloniexLTCUSDArray = historicDataLogs['poloniex'].LTCUSD.slice(poloniexLTCUSDNumberToCountFromDB, poloniexLTCUSDNumberToInsertLogsToDB);
    let poloniexLTCUSDData = [];

    poloniexLTCUSDArray.forEach((spotPrice, i) => {
      poloniexLTCUSDData.push({_id: (Date.now() + i).toString(), time: spotPrice[0], price: spotPrice[1]});
    });

    poloniexLTCUSDModel.insertMany(poloniexLTCUSDData);

    poloniexLTCUSDNumberToCountFromDB = poloniexLTCUSDNumberToCountFromDB + 1000;
    poloniexLTCUSDNumberToInsertLogsToDB = poloniexLTCUSDNumberToInsertLogsToDB + 1000;
    console.log("POLONIEX LTCUSD INSERTED");
  }

  if(historicDataLogs['bittrex'].ETHBTC.length > 0 && historicDataLogs['bittrex'].BTCUSD.length > 0 && historicDataLogs['bittrex'].LTCETH.length > 0){
    if(cryptoSocket.Exchanges.bittrex.ETHBTC > historicDataLogs['bittrex'].ETHBTC[historicDataLogs['bittrex'].ETHBTC.length - 1][1] || cryptoSocket.Exchanges.bittrex.ETHBTC < historicDataLogs['bittrex'].ETHBTC[historicDataLogs['bittrex'].ETHBTC.length - 1][1]){
      historicDataLogs['bittrex'].ETHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.bittrex.ETHBTC]);
    }

    if(cryptoSocket.Exchanges.bittrex.BTCUSD > historicDataLogs['bittrex'].BTCUSD[historicDataLogs['bittrex'].BTCUSD.length - 1][1] || cryptoSocket.Exchanges.bittrex.BTCUSD < historicDataLogs['bittrex'].BTCUSD[historicDataLogs['bittrex'].BTCUSD.length - 1][1]){
      historicDataLogs['bittrex'].BTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.bittrex.BTCUSD]);
    }

    if(cryptoSocket.Exchanges.bittrex.LTCETH > historicDataLogs['bittrex'].LTCETH[historicDataLogs['bittrex'].LTCETH.length - 1][1] || cryptoSocket.Exchanges.bittrex.LTCETH < historicDataLogs['bittrex'].LTCETH[historicDataLogs['bittrex'].LTCETH.length - 1][1]){
      historicDataLogs['bittrex'].LTCETH.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.bittrex.LTCETH]);
    }
  } else {
    historicDataLogs['bittrex'].ETHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.bittrex.ETHBTC]);
    historicDataLogs['bittrex'].BTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.bittrex.BTCUSD]);
    historicDataLogs['bittrex'].LTCETH.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.bittrex.LTCETH]);
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

  if(historicDataLogs['poloniex'].ETHBTC.length > 0 && historicDataLogs['poloniex'].BTCUSD.length > 0 && historicDataLogs['poloniex'].LTCBTC.length > 0 && historicDataLogs['poloniex'].ETHUSD.length > 0 && historicDataLogs['poloniex'].LTCUSD.length > 0){
    if(cryptoSocket.Exchanges.poloniex.ETHBTC > historicDataLogs['poloniex'].ETHBTC[historicDataLogs['poloniex'].ETHBTC.length - 1][1] || cryptoSocket.Exchanges.poloniex.ETHBTC < historicDataLogs['poloniex'].ETHBTC[historicDataLogs['poloniex'].ETHBTC.length - 1][1]){
      historicDataLogs['poloniex'].ETHBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.poloniex.ETHBTC]);
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
    historicDataLogs['poloniex'].BTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.poloniex.BTCUSD]);
    historicDataLogs['poloniex'].LTCBTC.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.poloniex.LTCBTC]);
    historicDataLogs['poloniex'].LTCUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.poloniex.LTCUSD]);
    historicDataLogs['poloniex'].ETHUSD.push([new Date(Date.now()).toLocaleTimeString(), cryptoSocket.Exchanges.poloniex.ETHUSD]);
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
    bittrex
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
  //functionCounter.count = 0;
  flag = true;
  while (flag) {
    checkArbitrage(exchange, currency, needToWithdraw);
  }
};

module.exports.loopConditional = function (exchange, currency, needToWithdraw){
    //functionCounter.count = 0;
    flag = true;
    while (flag) {
      checkArbitrage(exchange, currency, needToWithdraw);
    }
  }

//setTimeout(()=> {gemini.withdraw('ETH', 'gdax', process.env.GDAX_ETH_DEPOSIT_ADDRESS)}, 5000);

//gemini.withdraw('ETH', 'gdax', process.env.GDAX_ETH_DEPOSIT_ADDRESS);



//loopConditional('gdax','ETHUSD');


// setTimeout(() => {
//   loopConditional("gdax", "ETHUSD");
// }, 60000);

// setTimeout(checkArbitrageGemini, 160000);




//console.log(module.exports);


//ALEX TO DO LIST//

//1. need to make withdraw to take out all available
//2. need to work at refactoring bittrex and bitfinex
//3. need to test out poloniex with dave's and my code
//4. test performance of overall functions, especially checkArb function!!!


//setInterval(()=>{console.log(cryptoSocket.Exchanges)}, 0.001);

//setTimeout(() => {setInterval(() => {console.log(trackSpreads())}, 30000)}, 140000);

setTimeout(() => {console.log(loopConditional('gdax', 'ETHUSD', false))}, 130000);
//setTimeout(() => {console.log(`CHECK ARB FUNCTION FIRED OFF ${functionCounter.count} TIMES IN ONE SECOND!`)}, 201000)

//checkArbitrage = (exchange, currency) => {
  //let gdaxEthToGemini = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;
  //let gdaxBtcToGemini = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;
  // let gdaxBtcToBitfinex = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.bitfinex.BTCUSD;
  // let gdaxEthToBitfinex = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.bitfinex.ETHUSD;
  // let gdaxEthToPoloniex = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.poloniex.BTCUSD;
  // let gdaxBtcToPoloniex = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.poloniex.ETHUSD;
  // let gdaxEthToBittrex = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.bittrex.ETHUSD;
  // let gdaxBtcToBittrex = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.bittrex.BTCUSD;
  //let geminiEthToGdax = cryptoSocket.Exchanges.gemini.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
  // let geminiBtcToGdax = cryptoSocket.Exchanges.gemini.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;
  // let geminiBtcToBitfinex = cryptoSocket.Exchanges.gemini.BTCUSD - cryptoSocket.Exchanges.bitfinex.BTCUSD;
  // let geminiEthToBitfinex = cryptoSocket.Exchanges.gemini.ETHUSD - cryptoSocket.Exchanges.bitfinex.ETHUSD;
  // let geminiBtcToPoloniex = cryptoSocket.Exchanges.gemini.BTCUSD - cryptoSocket.Exchanges.poloniex.BTCUSD;
  // let geminiEthToPoloniex = cryptoSocket.Exchanges.gemini.ETHUSD - cryptoSocket.Exchanges.poloniex.ETHUSD;
  // let geminiEthToBittrex = cryptoSocket.Exchanges.gemini.ETHUSD - cryptoSocket.Exchanges.bittrex.ETHUSD;
  // let geminiBtcToBittrex = cryptoSocket.Exchanges.gemini.BTCUSD - cryptoSocket.Exchanges.bittrex.BTCUSD;
  // let bitfinexEthToGdax = cryptoSocket.Exchanges.bitfinex.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
  // let bitfinexBtcToGdax = cryptoSocket.Exchanges.bitfinex.BTCUSD - cryptoSocket.Exchanges.gdax.BTCUSD;
  // let bitfinexEthToGemini = cryptoSocket.Exchanges.bitfinex.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;
  // let bitfinexBtcToGemini = cryptoSocket.Exchanges.bitfinex.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;
  // let bitfinexEthToPoloniex = cryptoSocket.Exchanges.bitfinex.ETHUSD - cryptoSocket.Exchanges.poloniex.ETHUSD;
  // let bitfinexBtcToPoloniex = cryptoSocket.Exchanges.bitfinex.BTCUSD - cryptoSocket.Exchanges.poloniex.BTCUSD;
  // let bitfinexEthToBittrex = cryptoSocket.Exchanges.bitfinex.ETHUSD - cryptoSocket.Exchanges.bittrex.ETHUSD;
  // let bitfinexBtcToBittrex = cryptoSocket.Exchanges.bitfinex.BTCUSD - cryptoSocket.Exchanges.bittrex.BTCUSD;
  // let poloniexEthToGemini = cryptoSocket.Exchanges.poloniex.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;
  // let poloniexBtcToGemini = cryptoSocket.Exchanges.poloniex.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;
  // let poloniexEthToGdax = cryptoSocket.Exchanges.poloniex.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
  // let poloniexBtcToGdax = cryptoSocket.Exchanges.poloniex.BTCUSD - cryptoSocket.Exchanges.gdax.BTCUSD;
  // let poloniexEthToBitfinex = cryptoSocket.Exchanges.poloniex.ETHUSD - cryptoSocket.Exchanges.bitfinex.ETHUSD;
  // let poloniexBtcToBitfinex = cryptoSocket.Exchanges.poloniex.BTCUSD - cryptoSocket.Exchanges.bitfinex.BTCUSD;
  // let poloniexEthToBittrex = cryptoSocket.Exchanges.poloniex.ETHUSD - cryptoSocket.Exchanges.bittrex.ETHUSD;
  // let poloniexBtcToBittrex = cryptoSocket.Exchanges.poloniex.BTCUSD - cryptoSocket.Exchanges.bittrex.BTCUSD;
  // let bittrexEthToBitfinex = cryptoSocket.Exchanges.bittrex.ETHUSD - cryptoSocket.Exchanges.bitfinex.ETHUSD;
  // let bittrexBtcToBitfinex = cryptoSocket.Exchanges.bittrex.BTCUSD - cryptoSocket.Exchanges.bitfinex.BTCUSD;
  // let bittrexEthToGemini = cryptoSocket.Exchanges.bittrex.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;
  // let bittrexBtcToGemini = cryptoSocket.Exchanges.bittrex.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;
  // let bittrexEthToPoloniex = cryptoSocket.Exchanges.bittrex.ETHUSD - cryptoSocket.Exchanges.poloniex.ETHUSD;
  // let bittrexBtcToPoloniex = cryptoSocket.Exchanges.bittrex.BTCUSD - cryptoSocket.Exchanges.poloniex.BTCUSD;
  // let bittrexEthToGdax = cryptoSocket.Exchanges.bittrex.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
  // let bittrexBtcToGdax = cryptoSocket.Exchanges.bittrex.BTCUSD - cryptoSocket.Exchanges.gdax.BTCUSD;

  // let spread = -Infinity;
  // let tradeType;
  // let trades = {
  //   "1": buyOnGdax,
  //   "2": withdrawFromGdax,
  //   "3": getGdaxAccountInfo,
    //3: buyBtcOnGemini,
    //4: buyBtcOnGdax,
    // 5: buyBtcOnBitfinex,
    // 6: buyEthOnBitfinex,
    // 7: buyEthOnPoloniex,
    // 8: buyBtcOnPoloniex,
    // 9: buyEthOnBittrex,
    // 10: buyBtcOnBittrex,
    //"13": withdrawEthOnGdax,
    //14: withdrawBtcOnGdax,
    //"15": withdrawEthOnGemini,
    // 16: withdrawBtcOnGemini,
    // 17: withdrawEthOnBitfinex,
    // 18: withdrawBtcOnBitfinex,
    // 19: withdrawEthOnPoloniex,
    // 20: withdrawBtcOnPoloniex,
    // 21: withdrawEthOnBittrex,
    // 22: withdrawBtcOnBittrex,
    // 25: sellEthOnGdax,
    // 26: sellBtcOnGdax,
    // 27: sellEthOnGemini,
    // 28: sellBtcOnGemini,
    // 29: sellEthOnPoloniex,
    // 30: sellBtcOnPoloniex,
    // 31: sellEthOnBitfinex,
    // 32: sellBtcOnBitfinex,
    // 33: sellEthOnBittrex,
    // 34: selBtcOnBittrex,
  //};

//   if (exchange !== 'gemini' && exchange !== 'gdax'){
//     console.log("SOMETHING WENT WRONG AND PROCESS TERMINATED.");
//     process.exit(1);
//   }

//   if (exchange === 'gdax' && currency === 'ETHUSD') {
//     let gdaxEthToGemini = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;
//     let geminiEthToGdax = cryptoSocket.Exchanges.gemini.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;

//     if (gdaxEthToGemini > 0 && gdaxEthToGemini > spread) {
//       spread = gdaxEthToGemini;
//       tradeType = "15";
//     }

//     if (geminiEthToGdax > 0 && geminiEthToGdax > spread) {
//       spread = geminiEthToGdax;
//       tradeType = "13";
//     }

//     if (spread > -Infinity) {
//       console.log("STOPPING ARB");
//       flag = false;
//       setTimeout(() => {trades[tradeType]()}, 1);
//     }
//   } else if(exchange === 'gemini' && currency === 'ETHUSD') {
//     let gdaxEthToGemini = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;
//     let geminiEthToGdax = cryptoSocket.Exchanges.gemini.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;

//     if (gdaxEthToGemini > 0 && gdaxEthToGemini > spread) {
//       spread = gdaxEthToGemini;
//       tradeType = "15";
//     }

//     if (geminiEthToGdax > 0 && geminiEthToGdax > spread) {
//       spread = geminiEthToGdax;
//       tradeType = "13";
//     }
//     if (spread > -Infinity) {
//       console.log("STOPPING ARB");
//       flag = false;
//       setTimeout(() => {trades[tradeType]()}, 1);
//     }
//   }

//   setTimeout(() => {loopConditional('gdax', 'ETHUSD')}, 0);
// }


  // if (exchange === 'gdax' && currency === 'ETHUSD') {
  //   let gdaxEthToGemini = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;
  //   let geminiEthToGdax = cryptoSocket.Exchanges.gemini.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
    // let bitfinexEthToGdax = cryptoSocket.Exchanges.bitfinex.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
    // let poloniexEthToGdax = cryptoSocket.Exchanges.poloniex.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
    // let bittrexEthToGdax = cryptoSocket.Exchanges.bittrex.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
    // let cexEthToGdax = cryptoSocket.Exchanges.cex.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
    // let gdaxEthToBitfinex = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.bitfinex.ETHUSD;
    // let gdaxEthToPoloniex = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.poloniex.BTCUSD;
    // let gdaxEthToBittrex = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.bittrex.ETHUSD;
    // let gdaxEthToCex = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.cex.ETHUSD;

    // if (gdaxEthToGemini > 5 && gdaxEthToGemini > spread) {
    //   spread = gdaxEthToGemini;
    //   tradeType = "15";
    // }

    // if (geminiEthToGdax > 5 && geminiEthToGdax > spread) {
    //   spread = geminiEthToGdax;
    //   tradeType = "13";
    // }

    // if (bitfinexEthToGdax > 5 && bitfinexEthToGdax > spread) {
    //   spread = bitfinexEthToGdax;
    //   tradeType = "13";
    // }

    // if (poloniexEthToGdax > 5 && poloniexEthToGdax > spread) {
    //   spread = poloniexEthToGdax;
    //   tradeType = "13";
    // }

    // if (bittrexEthToGdax > 5 && bittrexEthToGdax > spread) {
    //   spread = bittrexEthToGdax;
    //   tradeType = "13";
    // }

    // if (cexEthToGdax > 5 && cexEthToGdax > spread) {
    //   spread = cexEthToGdax;
    //   tradeType = "13";
    // }

    // if (gdaxEthToBitfinex > 5 && gdaxEthToBitfinex > spread) {
    //   spread = gdaxEthToBitfinex;
    //   tradeType = "17";
    // }

    // if (gdaxEthToPoloniex > 5 && gdaxEthToPoloniex > spread) {
    //   spread = gdaxEthToPoloniex;
    //   tradeType = "19";
    // }

    // if (gdaxEthToBittrex > 5 && gdaxEthToBittrex > spread) {
    //   spread = gdaxEthToBittrex;
    //   tradeType = "21";
    // }

    // if (gdaxEthToCex > 5 && gdaxEthToCex > spread) {
    //   spread = gdaxEthToCex;
    //   tradeType = "23";
    // }

  // } else if (exchange === 'gdax' && currency === 'BTCUSD') {
  //   let gdaxBtcToGemini = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;
  //   let geminiBtcToGdax = cryptoSocket.Exchanges.gemini.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;
  //   let bitfinexBtcToGdax = cryptoSocket.Exchanges.bitfinex.BTCUSD - cryptoSocket.Exchanges.gdax.BTCUSD;
  //   let poloniexBtcToGdax = cryptoSocket.Exchanges.poloniex.BTCUSD - cryptoSocket.Exchanges.gdax.BTCUSD;
  //   let bittrexBtcToGdax = cryptoSocket.Exchanges.bittrex.BTCUSD - cryptoSocket.Exchanges.gdax.BTCUSD;
  //   let cexBtcToGdax = cryptoSocket.Exchanges.cex.BTCUSD - cryptoSocket.Exchanges.gdax.BTCUSD;
  //   let gdaxBtcToBitfinex = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.bitfinex.BTCUSD;
  //   let gdaxBtcToPoloniex = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.poloniex.ETHUSD;
  //   let gdaxBtcToBittrex = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.bittrex.BTCUSD;
  //   let gdaxBtcToCex = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.cex.BTCUSD;

  //   if (gdaxBtcToGemini > 5 && gdaxBtcToGemini > spread) {
  //     spread = gdaxBtcToGemini;
  //     tradeType = "15";
  //   }

  //   if (geminiBtcToGdax > 5 && geminiBtcToGdax > spread) {
  //     spread = geminiBtcToGdax;
  //     tradeType = "13";
  //   }

  //   if (bitfinexBtcToGdax > 5 && bitfinexBtcToGdax > spread) {
  //     spread = bitfinexBtcToGdax;
  //     tradeType = "13";
  //   }

  //   if (poloniexBtcToGdax > 5 && poloniexBtcToGdax > spread) {
  //     spread = poloniexBtcToGdax;
  //     tradeType = "13";
  //   }

  //   if (bittrexBtcToGdax > 5 && bittrexBtcToGdax > spread) {
  //     spread = bittrexBtcToGdax;
  //     tradeType = "13";
  //   }

  //   if (cexBtcToGdax > 5 && cexBtcToGdax > spread) {
  //     spread = cexBtcToGdax;
  //     tradeType = "13";
  //   }

  //   if (gdaxBtcToBitfinex > 5 && gdaxBtcToBitfinex > spread) {
  //     spread = gdaxBtcToBitfinex;
  //     tradeType = "17";
  //   }

  //   if (gdaxBtcToPoloniex > 5 && gdaxBtcToPoloniex > spread) {
  //     spread = gdaxBtcToPoloniex;
  //     tradeType = "19";
  //   }

  //   if (gdaxBtcToBittrex > 5 && gdaxBtcToBittrex > spread) {
  //     spread = gdaxBtcToBittrex;
  //     tradeType = "21";
  //   }

  //   if (gdaxBtcToCex > 5 && gdaxBtcToCex > spread) {
  //     spread = gdaxBtcToCex;
  //     tradeType = "23";
  //   }

  // } else if (exchange === 'gemini' && currency === 'ETHUSD') {
  //   if (gdaxEthToGemini > 5 && gdaxEthToGemini > spread) {
  //     spread = gdaxEthToGemini;
  //     tradeType = "15";
  //   }

  //   if (geminiEthToGdax > 5 && geminiEthToGdax > spread) {
  //     spread = geminiEthToGdax;
  //     tradeType = "13";
  //   }

  // } else if (exchange === 'gemini' && currency === 'BTCUSD') {

  // } else if (exchange === 'poloniex' && currency === 'ETHUSD') {

  // } else if (exchange === 'poloniex' && currency === 'BTCUSD') {

  // } else if (exchange === 'bitfinex' && currency === 'ETHUSD') {

  // } else if (exchange === 'bitfinex' && currency === 'BTCUSD') {

  // } else if (exchange === 'bittrex' && currency === 'ETHUSD') {

  // } else if (exchange === 'cex' && currency === 'ETHUSD') {

  // } else if (exchange === 'cex' && currency === 'BTCUSD') {

  // }

// } else {
//   console.log("SOMETHING WENT WRONG AND PROCESS TERMINATED.");
//   process.exit(1);
// }

// if (spread > -Infinity) {
//   console.log("STOPPING ARB");
//   flag = false;
//   setTimeout(trades[tradeType], 1);
// }

// }
// } else if (action === 'buy') {
//   if (exchange === 'gdax' && currency === 'ETHUSD') {
//     let gdaxEthToGemini = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;
//     let geminiEthToGdax = cryptoSocket.Exchanges.gemini.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
//     let bitfinexEthToGdax = cryptoSocket.Exchanges.bitfinex.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
//     let poloniexEthToGdax = cryptoSocket.Exchanges.poloniex.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
//     let bittrexEthToGdax = cryptoSocket.Exchanges.bittrex.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
//     let cexEthToGdax = cryptoSocket.Exchanges.cex.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
//     let gdaxEthToBitfinex = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.bitfinex.ETHUSD;
//     let gdaxEthToPoloniex = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.poloniex.BTCUSD;
//     let gdaxEthToBittrex = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.bittrex.ETHUSD;
//     let gdaxEthToCex = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.cex.ETHUSD;

//     if (gdaxEthToGemini > 5 && gdaxEthToGemini > spread) {
//       spread = gdaxEthToGemini;
//       tradeType = "2";
//     }

//     if (geminiEthToGdax > 5 && geminiEthToGdax > spread) {
//       spread = geminiEthToGdax;
//       tradeType = "1";
//     }

//     if (bitfinexEthToGdax > 5 && bitfinexEthToGdax > spread) {
//       spread = bitfinexEthToGdax;
//       tradeType = "1";
//     }

//     if (poloniexEthToGdax > 5 && poloniexEthToGdax > spread) {
//       spread = poloniexEthToGdax;
//       tradeType = "1";
//     }

//     if (bittrexEthToGdax > 5 && bittrexEthToGdax > spread) {
//       spread = bittrexEthToGdax;
//       tradeType = "1";
//     }

//     if (cexEthToGdax > 5 && cexEthToGdax > spread) {
//       spread = cexEthToGdax;
//       tradeType = "1";
//     }

//     if (gdaxEthToBitfinex > 5 && gdaxEthToBitfinex > spread) {
//       spread = gdaxEthToBitfinex;
//       tradeType = "6";
//     }

//     if (gdaxEthToPoloniex > 5 && gdaxEthToPoloniex > spread) {
//       spread = gdaxEthToPoloniex;
//       tradeType = "7";
//     }

//     if (gdaxEthToBittrex > 5 && gdaxEthToBittrex > spread) {
//       spread = gdaxEthToBittrex;
//       tradeType = "9";
//     }

//     if (gdaxEthToCex > 5 && gdaxEthToCex > spread) {
//       spread = gdaxEthToCex;
//       tradeType = "11";
//     }

  // } else if (exchange === 'gdax' && currency === 'BTCUSD') {
  //   let gdaxBtcToGemini = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;
  //   let geminiBtcToGdax = cryptoSocket.Exchanges.gemini.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;
  //   let bitfinexBtcToGdax = cryptoSocket.Exchanges.bitfinex.BTCUSD - cryptoSocket.Exchanges.gdax.BTCUSD;
  //   let poloniexBtcToGdax = cryptoSocket.Exchanges.poloniex.BTCUSD - cryptoSocket.Exchanges.gdax.BTCUSD;
  //   let bittrexBtcToGdax = cryptoSocket.Exchanges.bittrex.BTCUSD - cryptoSocket.Exchanges.gdax.BTCUSD;
  //   let cexBtcToGdax = cryptoSocket.Exchanges.cex.BTCUSD - cryptoSocket.Exchanges.gdax.BTCUSD;
  //   let gdaxBtcToBitfinex = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.bitfinex.BTCUSD;
  //   let gdaxBtcToPoloniex = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.poloniex.ETHUSD;
  //   let gdaxBtcToBittrex = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.bittrex.BTCUSD;
  //   let gdaxBtcToCex = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.cex.BTCUSD;


  //   if (gdaxBtcToGemini > 5 && gdaxBtcToGemini > spread) {
  //     spread = gdaxBtcToGemini;
  //     tradeType = "3";
  //   }

  //   if (geminiBtcToGdax > 5 && geminiBtcToGdax > spread) {
  //     spread = geminiBtcToGdax;
  //     tradeType = "4";
  //   }

  //   if (bitfinexBtcToGdax > 5 && bitfinexBtcToGdax > spread) {
  //     spread = bitfinexBtcToGdax;
  //     tradeType = "4";
  //   }

  //   if (poloniexBtcToGdax > 5 && poloniexBtcToGdax > spread) {
  //     spread = poloniexBtcToGdax;
  //     tradeType = "4";
  //   }

  //   if (bittrexBtcToGdax > 5 && bittrexBtcToGdax > spread) {
  //     spread = bittrexBtcToGdax;
  //     tradeType = "4";
  //   }

  //   if (cexBtcToGdax > 5 && cexBtcToGdax > spread) {
  //     spread = cexBtcToGdax;
  //     tradeType = "4";
  //   }

  //   if (gdaxBtcToBitfinex > 5 && gdaxBtcToBitfinex > spread) {
  //     spread = gdaxBtcToBitfinex;
  //     tradeType = "5";
  //   }

  //   if (gdaxBtcToPoloniex > 5 && gdaxBtcToPoloniex > spread) {
  //     spread = gdaxBtcToPoloniex;
  //     tradeType = "8";
  //   }

  //   if (gdaxBtcToBittrex > 5 && gdaxBtcToBittrex > spread) {
  //     spread = gdaxBtcToBittrex;
  //     tradeType = "10";
  //   }

  //   if (gdaxBtcToCex > 5 && gdaxBtcToCex > spread) {
  //     spread = gdaxBtcToCex;
  //     tradeType = "12";
  //   }

   //}
// } else {
//   console.log("SOMETHING WENT WRONG AND PROCESS TERMINATED.");
//   process.exit(1);
// }

// if (spread > -Infinity) {
//   console.log("STOPPING ARB");
//   flag = false;
//   setTimeout(trades[tradeType], 1);
// }

// }





  // if (bitfinexEthToGemini > 5 && bitfinexEthToGemini > spread) {
  //   spread = bitfinexEthToGemini;
  //   tradeType = "1";
  // }

  // if (poloniexEthToGemini > 5 && poloniexEthToGemini > spread) {
  //   spread = poloniexEthToGemini;
  //   tradeType = "1";
  // }

  // if (bittrexEthToGemini > 5 && bittrexEthToGemini > spread) {
  //   spread = bittrexEthToGemini;
  //   tradeType = "1";
  // }

  // if (cexEthToGemini > 5 && cexEthToGemini > spread) {
  //   spread = cexEthToGemini;
  //   tradeType = "1";
  // }

  // if (gdaxBtcToGemini > 5 && gdaxBtcToGemini > spread) {
  //   spread = gdaxBtcToGemini;
  //   tradeType = "2";
  // }

  // if (bitfinexBtcToGemini > 5 && bitfinexBtcToGemini > spread) {
  //   spread = bitfinexBtcToGemini;
  //   tradeType = "2";
  // }

  // if (poloniexBtcToGemini > 5 && poloniexBtcToGemini > spread) {
  //   spread = poloniexBtcToGemini;
  //   tradeType = "2";
  // }

  // if (bittrexBtcToGemini > 5 && bittrexBtcToGemini > spread) {
  //   spread = bittrexBtcToGemini;
  //   tradeType = "2";
  // }

  // if (cexBtcToGemini > 5 && cexBtcToGemini > spread) {
  //   spread = cexBtcToGemini;
  //   tradeType = "2";
  // }



  // if (geminiBtcToGdax > 5 && geminiBtcToGdax > spread) {
  //   spread = geminiBtcToGdax;
  //   tradeType = "4";
  // }

  // if (bitfinexBtcToGdax > 5 && bitfinexBtcToGdax > spread) {
  //   spread = bitfinexBtcToGdax;
  //   tradeType = "4";
  // }

  // if (poloniexBtcToGdax > 5 && poloniexBtcToGdax > spread) {
  //   spread = poloniexBtcToGdax;
  //   tradeType = "4";
  // }

  // if (bittrexBtcToGdax > 5 && bittrexBtcToGdax > spread) {
  //   spread = bittrexBtcToGdax;
  //   tradeType = "4";
  // }

  // if (cexBtcToGdax > 5 && cexBtcToGdax > spread) {
  //   spread = cexBtcToGdax;
  //   tradeType = "4";
  // }

  // if (gdaxBtcToBitfinex > 5 && gdaxBtcToBitfinex > spread) {
  //   spread = gdaxBtcToBitfinex;
  //   tradeType = "5";
  // }

  // if (geminiBtcToBitfinex > 5 && geminiBtcToBitfinex > spread) {
  //   spread = geminiBtcToBitfinex;
  //   tradeType = "5";
  // }

  // if (poloniexBtcToBitfinex > 5 && poloniexBtcToBitfinex > spread) {
  //   spread = poloniexBtcToBitfinex;
  //   tradeType = "5";
  // }

  // if (bittrexBtcToBitfinex > 5 && bittrexBtcToBitfinex > spread) {
  //   spread = bittrexBtcToBitfinex;
  //   tradeType = "5";
  // }

  // if (cexBtcToBitfinex > 5 && cexBtcToBitfinex > spread) {
  //   spread = cexBtcToBitfinex;
  //   tradeType = "5";
  // }

  // if (gdaxEthToBitfinex > 5 && gdaxEthToBitfinex > spread) {
  //   spread = gdaxEthToBitfinex;
  //   tradeType = "6";
  // }

  // if (geminiEthToBitfinex > 5 && geminiEthToBitfinex > spread) {
  //   spread = geminiEthToBitfinex;
  //   tradeType = "6";
  // }

  // if (poloniexEthToBitfinex > 5 && poloniexEthToBitfinex > spread) {
  //   spread = poloniexEthToBitfinex;
  //   tradeType = "6";
  // }

  // if (bittrexEthToBitfinex > 5 && bittrexEthToBitfinex > spread) {
  //   spread = bittrexEthToBitfinex;
  //   tradeType = "6";
  // }

  // if (cexEthToBitfinex > 5 && cexEthToBitfinex > spread) {
  //   spread = cexEthToBitfinex;
  //   tradeType = "6";
  // }

  // if (geminiBtcToPoloniex > 5 && geminiBtcToPoloniex > spread) {
  //   spread = geminiBtcToPoloniex;
  //   tradeType = "7";
  // }

  // if (gdaxBtcToPoloniex > 5 && gdaxBtcToPoloniex > spread) {
  //   spread = gdaxBtcToPoloniex;
  //   tradeType = "7";
  // }

  // if (bitfinexBtcToPoloniex > 5 && bitfinexBtcToPoloniex > spread) {
  //   spread = bitfinexBtcToPoloniex;
  //   tradeType = "7";
  // }

  // if (bittrexBtcToPoloniex > 5 && bittrexBtcToPoloniex > spread) {
  //   spread = bittrexBtcToPoloniex;
  //   tradeType = "7";
  // }

  // if (cexBtcToPoloniex > 5 && cexBtcToPoloniex > spread) {
  //   spread = cexBtcToPoloniex;
  //   tradeType = "7";
  // }

  // if (geminiEthToPoloniex > 5 && geminiEthToPoloniex > spread) {
  //   spread = geminiEthToPoloniex;
  //   tradeType = "8";
  // }

  // if (gdaxEthToPoloniex > 5 && gdaxEthToPoloniex > spread) {
  //   spread = gdaxEthToPoloniex;
  //   tradeType = "8";
  // }

  // if (bitfinexEthToPoloniex > 5 && bitfinexEthToPoloniex > spread) {
  //   spread = bitfinexEthToPoloniex;
  //   tradeType = "8";
  // }

  // if (bittrexEthToPoloniex > 5 && bittrexEthToPoloniex > spread) {
  //   spread = bittrexEthToPoloniex;
  //   tradeType = "8";
  // }

  // if (cexEthToPoloniex > 5 && cexEthToPoloniex > spread) {
  //   spread = cexEthToPoloniex;
  //   tradeType = "8";
  // }

  // if(geminiEthToBittrex > 5 && geminiEthToBittrex > spread) {
  //   spread = geminiEthToBittrex;
  //   tradeType = "9";
  // }

  // if(poloniexEthToBittrex > 5 && poloniexEthToBittrex > spread) {
  //   spread = poloniexEthToBittrex;
  //   tradeType = "9";
  // }

  // if(bitfinexEthToBittrex > 5 && bitfinexEthToBittrex > spread) {
  //   spread = bitfinexEthToBittrex;
  //   tradeType = "9";
  // }

  // if(gdaxEthToBittrex > 5 && gdaxEthToBittrex > spread) {
  //   spread = gdaxEthToBittrex;
  //   tradeType = "9";
  // }

  // if(cexEthToBittrex > 5 && cexEthToBittrex > spread) {
  //   spread = cexEthToBittrex;
  //   tradeType = "9";
  // }

  // if(geminiBtcToBittrex > 5 && geminiBtcToBittrex > spread) {
  //   spread = geminiBtcToBittrex;
  //   tradeType = "10";
  // }

  // if(poloniexBtcToBittrex > 5 && poloniexBtcToBittrex > spread) {
  //   spread = poloniexBtcToBittrex;
  //   tradeType = "10";
  // }

  // if(gdaxBtcToBittrex > 5 && gdaxBtcToBittrex > spread) {
  //   spread = gdaxBtcToBittrex;
  //   tradeType = "10";
  // }

  // if(bitfinexBtcToBittrex > 5 && bitfinexBtcToBittrex > spread) {
  //   spread = bitfinexBtcToBittrex;
  //   tradeType = "10";
  // }

  // if(cexBtcToBittrex > 5 && cexBtcToBittrex > spread) {
  //   spread = cexBtcToBittrex;
  //   tradeType = "10";
  // }

  // if(geminiEthToCex > 5 && geminiEthToCex > spread) {
  //   spread = geminiEthToCex;
  //   tradeType = "11";
  // }

  // if(bitfinexEthToCex > 5 && bitfinexEthToCex > spread) {
  //   spread = bitfinexEthToCex;
  //   tradeType = "11";
  // }

  // if(bittrexEthToCex > 5 && bittrexEthToCex > spread) {
  //   spread = bittrexEthToCex;
  //   tradeType = "11";
  // }

  // if(gdaxEthToCex > 5 && gdaxEthToCex > spread) {
  //   spread = gdaxEthToCex;
  //   tradeType = "11";
  // }

  // if(poloniexEthToCex > 5 && poloniexEthToCex > spread) {
  //   spread = poloniexEthToCex;
  //   tradeType = "11";
  // }

  // if(geminiBtcToCex > 5 && geminiBtcToCex > spread) {
  //   spread = geminiBtcToCex;
  //   tradeType = "12";
  // }

  // if(gdaxBtcToCex > 5 && gdaxBtcToCex > spread) {
  //   spread = gdaxBtcToCex;
  //   tradeType = "12";
  // }

  // if(bitfinexBtcToCex > 5 && bitfinexBtcToCex > spread) {
  //   spread = bitfinexBtcToCex;
  //   tradeType = "12";
  // }

  // if(bittrexBtcToCex > 5 && bittrexBtcToCex > spread) {
  //   spread = bittrexBtcToCex;
  //   tradeType = "12";
  // }

  // if(poloniexBtcToCex > 5 && poloniexBtcToCex > spread) {
  //   spread = poloniexBtcToCex;
  //   tradeType = "12";
  // }

  // if (spread > -Infinity) {
  //   console.log("STOPPING ARB");
  //   flag = false;
  //   setTimeout(trades[tradeType], 1);
  // }
//};



// loopConditional = (exchange, currency) => {
//   flag = true;
//   console.log(exchange);
//   while (flag) {
//     checkArbitrage(exchange, currency);
//   }
// };

// setTimeout(() => {
//   loopConditional("gdax", "ETHUSD");
// }, 60000);

// setTimeout(checkArbitrageGemini, 160000);




// module.exports = {
//   loopConditional
// }

// checkArbitrageGemini = () => {
//   //sell functions
//   let gdaxEthToGemini = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;
//   let gdaxBtcToGemini = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;
//   let bitfinexEthToGemini = cryptoSocket.Exchanges.bitfinex.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;
//   let bitfinexBtcToGemini = cryptoSocket.Exchanges.bitfinex.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;
//   let poloniexEthToGemini = cryptoSocket.Exchanges.poloniex.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;
//   let poloniexBtcToGemini = cryptoSocket.Exchanges.poloniex.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;
//   let bittrexEthToGemini = cryptoSocket.Exchanges.bittrex.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;
//   let bittrexBtcToGemini = cryptoSocket.Exchanges.bittrex.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;
//   let cexEthToGemini = cryptoSocket.Exchanges.cex.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;
//   let cexBtcToGemini = cryptoSocket.Exchanges.cex.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;

//   //buy functions
//   let geminiBtcToBitfinex = cryptoSocket.Exchanges.gemini.BTCUSD - cryptoSocket.Exchanges.bitfinex.BTCUSD;
//   let geminiEthToBitfinex = cryptoSocket.Exchanges.gemini.ETHUSD - cryptoSocket.Exchanges.bitfinex.ETHUSD;
//   let geminiBtcToPoloniex = cryptoSocket.Exchanges.gemini.BTCUSD - cryptoSocket.Exchanges.poloniex.BTCUSD;
//   let geminiEthToPoloniex = cryptoSocket.Exchanges.gemini.ETHUSD - cryptoSocket.Exchanges.poloniex.ETHUSD;
//   let geminiEthToBittrex = cryptoSocket.Exchanges.gemini.ETHUSD - cryptoSocket.Exchanges.bittrex.ETHUSD;
//   let geminiBtcToBittrex = cryptoSocket.Exchanges.gemini.BTCUSD - cryptoSocket.Exchanges.bittrex.BTCUSD;
//   let geminiEthToCex = cryptoSocket.Exchanges.gemini.ETHUSD - cryptoSocket.Exchanges.cex.ETHUSD;
//   let geminiBtcToCex = cryptoSocket.Exchanges.gemini.BTCUSD - cryptoSocket.Exchanges.cex.BTCUSD;

//   let spread = -Infinity;
//   let tradeType;
//   let trades = {
//     1: buyEthOnGdax,
//     2: buyEthOnGemini,
//     3: buyBtcOnGemini,
//     4: buyBtcOnGdax,
//     5: buyBtcOnBitfinex,
//     6: buyEthOnBitfinex,
//     7: buyEthOnPoloniex,
//     8: buyBtcOnPoloniex,
//     9: buyEthOnBittrex,
//     10: buyBtcOnBittrex,
//     11: buyEthOnCex,
//     12: buyBtcOnCex
//   };


//   if (gdaxEthToGemini > 5 && gdaxEthToGemini > spread) {
//     spread = gdaxEthToGemini;
//     tradeType = "1";
//   }

//   if (bitfinexEthToGemini > 5 && bitfinexEthToGemini > spread) {
//     spread = bitfinexEthToGemini;
//     tradeType = "1";
//   }

//   if (poloniexEthToGemini > 5 && poloniexEthToGemini > spread) {
//     spread = poloniexEthToGemini;
//     tradeType = "1";
//   }

//   if (bittrexEthToGemini > 5 && bittrexEthToGemini > spread) {
//     spread = bittrexEthToGemini;
//     tradeType = "1";
//   }

//   if (cexEthToGemini > 5 && cexEthToGemini > spread) {
//     spread = cexEthToGemini;
//     tradeType = "1";
//   }

//   if (gdaxBtcToGemini > 5 && gdaxBtcToGemini > spread) {
//     spread = gdaxBtcToGemini;
//     tradeType = "2";
//   }

//   if (bitfinexBtcToGemini > 5 && bitfinexBtcToGemini > spread) {
//     spread = bitfinexBtcToGemini;
//     tradeType = "2";
//   }

//   if (poloniexBtcToGemini > 5 && poloniexBtcToGemini > spread) {
//     spread = poloniexBtcToGemini;
//     tradeType = "2";
//   }

//   if (bittrexBtcToGemini > 5 && bittrexBtcToGemini > spread) {
//     spread = bittrexBtcToGemini;
//     tradeType = "2";
//   }

//   if (cexBtcToGemini > 5 && cexBtcToGemini > spread) {
//     spread = cexBtcToGemini;
//     tradeType = "2";
//   }

//   if (geminiEthToGdax > 5 && geminiEthToGdax > spread) {
//     spread = geminiEthToGdax;
//     tradeType = "3";
//   }

//   if (geminiBtcToGdax > 5 && geminiBtcToGdax > spread) {
//     spread = geminiBtcToGdax;
//     tradeType = "4";
//   }

//   if (geminiBtcToBitfinex > 5 && geminiBtcToBitfinex > spread) {
//     spread = geminiBtcToBitfinex;
//     tradeType = "5";
//   }

//   if (geminiEthToBitfinex > 5 && geminiEthToBitfinex > spread) {
//     spread = geminiEthToBitfinex;
//     tradeType = "6";
//   }

//   if (geminiBtcToPoloniex > 5 && geminiBtcToPoloniex > spread) {
//     spread = geminiBtcToPoloniex;
//     tradeType = "7";
//   }

//   if (geminiEthToPoloniex > 5 && geminiEthToPoloniex > spread) {
//     spread = geminiEthToPoloniex;
//     tradeType = "8";
//   }

//   if (geminiEthToBittrex > 5 && geminiEthToBittrex > spread) {
//     spread = geminiEthToBittrex;
//     tradeType = "9";
//   }

//   if (geminiBtcToBittrex > 5 && geminiBtcToBittrex > spread) {
//     spread = geminiBtcToBittrex;
//     tradeType = "10";
//   }

//   if (geminiEthToCex > 5 && geminiEthToCex > spread) {
//     spread = geminiEthToCex;
//     tradeType = "11";
//   }

//   if (geminiBtcToCex > 5 && geminiBtcToCex > spread) {
//     spread = geminiBtcToCex;
//     tradeType = "12";
//   }

//   if (spread > -Infinity) {
//     console.log("STOPPING ARB");
//     flag = false;
//     setTimeout(trades[tradeType], 1);
//   }

// };

// checkArbitrageGdax = () => {
//   //sell functions
//   let geminiEthToGdax = cryptoSocket.Exchanges.gemini.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
//   let geminiBtcToGdax = cryptoSocket.Exchanges.gemini.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;
//   let bitfinexEthToGdax = cryptoSocket.Exchanges.bitfinex.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
//   let bitfinexBtcToGdax = cryptoSocket.Exchanges.bitfinex.BTCUSD - cryptoSocket.Exchanges.gdax.BTCUSD;
//   let poloniexEthToGdax = cryptoSocket.Exchanges.poloniex.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
//   let poloniexBtcToGdax = cryptoSocket.Exchanges.poloniex.BTCUSD - cryptoSocket.Exchanges.gdax.BTCUSD;
//   let bittrexEthToGdax = cryptoSocket.Exchanges.bittrex.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
//   let bittrexBtcToGdax = cryptoSocket.Exchanges.bittrex.BTCUSD - cryptoSocket.Exchanges.gdax.BTCUSD;
//   let cexEthToGdax = cryptoSocket.Exchanges.cex.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
//   let cexBtcToGdax = cryptoSocket.Exchanges.cex.BTCUSD - cryptoSocket.Exchanges.gdax.BTCUSD;

//   //buy functions
//   let gdaxEthToGemini = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;
//   let gdaxBtcToGemini = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;
//   let gdaxBtcToBitfinex = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.bitfinex.BTCUSD;
//   let gdaxEthToBitfinex = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.bitfinex.ETHUSD;
//   let gdaxEthToPoloniex = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.poloniex.BTCUSD;
//   let gdaxBtcToPoloniex = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.poloniex.ETHUSD;
//   let gdaxEthToBittrex = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.bittrex.ETHUSD;
//   let gdaxBtcToBittrex = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.bittrex.BTCUSD;
//   let gdaxEthToCex = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.cex.ETHUSD;
//   let gdaxBtcToCex = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.cex.BTCUSD;

//   let spread = -Infinity;
//   let tradeType;
//   let trades = {
//     1: buyEthOnGdax,
//     2: buyEthOnGemini,
//     3: buyBtcOnGemini,
//     4: buyBtcOnGdax,
//     5: buyBtcOnBitfinex,
//     6: buyEthOnBitfinex,
//     7: buyEthOnPoloniex,
//     8: buyBtcOnPoloniex,
//     9: buyEthOnBittrex,
//     10: buyBtcOnBittrex,
//     11: buyEthOnCex,
//     12: buyBtcOnCex
//   };

//   if (gdaxEthToGemini > 5 && gdaxEthToGemini > spread) {
//     spread = gdaxEthToGemini;
//     tradeType = "1";
//   }

//   if (gdaxBtcToGemini > 5 && gdaxBtcToGemini > spread) {
//     spread = gdaxBtcToGemini;
//     tradeType = "2";
//   }

//   if (geminiEthToGdax > 5 && geminiEthToGdax > spread) {
//     spread = geminiEthToGdax;
//     tradeType = "3";
//   }

//   if (bitfinexEthToGdax > 5 && bitfinexEthToGdax > spread) {
//     spread = bitfinexEthToGdax;
//     tradeType = "3";
//   }

//   if (poloniexEthToGdax > 5 && poloniexEthToGdax > spread) {
//     spread = poloniexEthToGdax;
//     tradeType = "3";
//   }

//   if (bittrexEthToGdax > 5 && bittrexEthToGdax > spread) {
//     spread = bittrexEthToGdax;
//     tradeType = "3";
//   }

//   if (cexEthToGdax > 5 && cexEthToGdax > spread) {
//     spread = cexEthToGdax;
//     tradeType = "3";
//   }

//   if (geminiBtcToGdax > 5 && geminiBtcToGdax > spread) {
//     spread = geminiBtcToGdax;
//     tradeType = "4";
//   }

//   if (bitfinexBtcToGdax > 5 && bitfinexBtcToGdax > spread) {
//     spread = bitfinexBtcToGdax;
//     tradeType = "4";
//   }

//   if (poloniexBtcToGdax > 5 && poloniexBtcToGdax > spread) {
//     spread = poloniexBtcToGdax;
//     tradeType = "4";
//   }

//   if (bittrexBtcToGdax > 5 && bittrexBtcToGdax > spread) {
//     spread = bittrexBtcToGdax;
//     tradeType = "4";
//   }

//   if (gdaxBtcToBitfinex > 5 && gdaxBtcToBitfinex > spread) {
//     spread = gdaxBtcToBitfinex;
//     tradeType = "5";
//   }

//   if (gdaxEthToBitfinex > 5 && gdaxEthToBitfinex > spread) {
//     spread = gdaxEthToBitfinex;
//     tradeType = "6";
//   }

//   if (gdaxBtcToPoloniex > 5 && gdaxBtcToPoloniex > spread) {
//     spread = gdaxBtcToPoloniex;
//     tradeType = "7";
//   }

//   if (gdaxEthToPoloniex > 5 && gdaxEthToPoloniex > spread) {
//     spread = gdaxEthToPoloniex;
//     tradeType = "8";
//   }

//   if (gdaxEthToBittrex > 5 && gdaxEthToBittrex > spread) {
//     spread = gdaxEthToBittrex;
//     tradeType = "9";
//   }

//   if (gdaxBtcToBittrex > 5 && gdaxBtcToBittrex > spread) {
//     spread = gdaxBtcToBittrex;
//     tradeType = "10";
//   }

//   if (gdaxEthToCex > 5 && gdaxEthToCex > spread) {
//     spread = gdaxEthToCex;
//     tradeType = "11";
//   }

//   if (gdaxBtcToCex > 5 && gdaxBtcToCex > spread) {
//     spread = gdaxBtcToCex;
//     tradeType = "12";
//   }

//   if (spread > -Infinity) {
//     console.log("STOPPING ARB");
//     flag = false;
//     setTimeout(trades[tradeType], 1);
//   }

// };

// checkArbitragePoloniex = () => {
//   //sell functions
//   let gdaxEthToPoloniex = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.poloniex.BTCUSD;
//   let gdaxBtcToPoloniex = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.poloniex.ETHUSD;
//   let geminiBtcToPoloniex = cryptoSocket.Exchanges.gemini.BTCUSD - cryptoSocket.Exchanges.poloniex.BTCUSD;
//   let geminiEthToPoloniex = cryptoSocket.Exchanges.gemini.ETHUSD - cryptoSocket.Exchanges.poloniex.ETHUSD;
//   let bitfinexEthToPoloniex = cryptoSocket.Exchanges.bitfinex.ETHUSD - cryptoSocket.Exchanges.poloniex.ETHUSD;
//   let bitfinexBtcToPoloniex = cryptoSocket.Exchanges.bitfinex.BTCUSD - cryptoSocket.Exchanges.poloniex.BTCUSD;
//   let bittrexEthToPoloniex = cryptoSocket.Exchanges.bittrex.ETHUSD - cryptoSocket.Exchanges.poloniex.ETHUSD;
//   let bittrexBtcToPoloniex = cryptoSocket.Exchanges.bittrex.BTCUSD - cryptoSocket.Exchanges.poloniex.BTCUSD;
//   let cexEthToPoloniex = cryptoSocket.Exchanges.cex.ETHUSD - cryptoSocket.Exchanges.poloniex.ETHUSD;
//   let cexBtcToPoloniex = cryptoSocket.Exchanges.cex.BTCUSD - cryptoSocket.Exchanges.poloniex.BTCUSD;

//   //buy functions
//   let poloniexEthToGemini = cryptoSocket.Exchanges.poloniex.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;
//   let poloniexBtcToGemini = cryptoSocket.Exchanges.poloniex.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;
//   let poloniexEthToGdax = cryptoSocket.Exchanges.poloniex.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
//   let poloniexBtcToGdax = cryptoSocket.Exchanges.poloniex.BTCUSD - cryptoSocket.Exchanges.gdax.BTCUSD;
//   let poloniexEthToBitfinex = cryptoSocket.Exchanges.poloniex.ETHUSD - cryptoSocket.Exchanges.bitfinex.ETHUSD;
//   let poloniexBtcToBitfinex = cryptoSocket.Exchanges.poloniex.BTCUSD - cryptoSocket.Exchanges.bitfinex.BTCUSD;
//   let poloniexEthToBittrex = cryptoSocket.Exchanges.poloniex.ETHUSD - cryptoSocket.Exchanges.bittrex.ETHUSD;
//   let poloniexBtcToBittrex = cryptoSocket.Exchanges.poloniex.BTCUSD - cryptoSocket.Exchanges.bittrex.BTCUSD;
//   let poloniexEthToCex = cryptoSocket.Exchanges.poloniex.ETHUSD - cryptoSocket.Exchanges.cex.ETHUSD;
//   let poloniexBtcToCex = cryptoSocket.Exchanges.poloniex.BTCUSD - cryptoSocket.Exchanges.cex.BTCUSD;


//   let spread = -Infinity;
//   let tradeType;
//   let trades = {
//     1: buyEthOnGdax,
//     2: buyEthOnGemini,
//     3: buyBtcOnGemini,
//     4: buyBtcOnGdax,
//     5: buyBtcOnBitfinex,
//     6: buyEthOnBitfinex,
//     7: buyEthOnPoloniex,
//     8: buyBtcOnPoloniex,
//     9: buyEthOnBittrex,
//     10: buyBtcOnBittrex,
//     11: buyEthOnCex,
//     12: buyBtcOnCex
//   };

//   if (poloniexEthToGemini > 5 && poloniexEthToGemini > spread) {
//     spread = poloniexEthToGemini;
//     tradeType = "1";
//   }

//   if (poloniexBtcToGemini > 5 && poloniexBtcToGemini > spread) {
//     spread = poloniexBtcToGemini;
//     tradeType = "2";
//   }

//   if (poloniexEthToGdax > 5 && poloniexEthToGdax > spread) {
//     spread = poloniexEthToGdax;
//     tradeType = "3";
//   }

//   if (poloniexBtcToGdax > 5 && poloniexBtcToGdax > spread) {
//     spread = poloniexBtcToGdax;
//     tradeType = "4";
//   }

//   if (poloniexBtcToBitfinex > 5 && poloniexBtcToBitfinex > spread) {
//     spread = poloniexBtcToBitfinex;
//     tradeType = "5";
//   }

//   if (poloniexEthToBitfinex > 5 && poloniexEthToBitfinex > spread) {
//     spread = poloniexEthToBitfinex;
//     tradeType = "6";
//   }

//   if (geminiBtcToPoloniex > 5 && geminiBtcToPoloniex > spread) {
//     spread = geminiBtcToPoloniex;
//     tradeType = "7";
//   }

//   if (gdaxBtcToPoloniex > 5 && gdaxBtcToPoloniex > spread) {
//     spread = gdaxBtcToPoloniex;
//     tradeType = "7";
//   }

//   if (bitfinexBtcToPoloniex > 5 && bitfinexBtcToPoloniex > spread) {
//     spread = bitfinexBtcToPoloniex;
//     tradeType = "7";
//   }

//   if (bittrexBtcToPoloniex > 5 && bittrexBtcToPoloniex > spread) {
//     spread = bittrexBtcToPoloniex;
//     tradeType = "7";
//   }

//   if (cexBtcToPoloniex > 5 && cexBtcToPoloniex > spread) {
//     spread = cexBtcToPoloniex;
//     tradeType = "7";
//   }

//   if (geminiEthToPoloniex > 5 && geminiEthToPoloniex > spread) {
//     spread = geminiEthToPoloniex;
//     tradeType = "8";
//   }

//   if (gdaxEthToPoloniex > 5 && gdaxEthToPoloniex > spread) {
//     spread = gdaxEthToPoloniex;
//     tradeType = "8";
//   }

//   if (bitfinexEthToPoloniex > 5 && bitfinexEthToPoloniex > spread) {
//     spread = bitfinexEthToPoloniex;
//     tradeType = "8";
//   }

//   if (bittrexEthToPoloniex > 5 && bittrexEthToPoloniex > spread) {
//     spread = bittrexEthToPoloniex;
//     tradeType = "8";
//   }

//   if (cexEthToPoloniex > 5 && cexEthToPoloniex > spread) {
//     spread = cexEthToPoloniex;
//     tradeType = "8";
//   }

//   if (poloniexEthToBittrex > 5 && poloniexEthToBittrex > spread) {
//     spread = poloniexEthToBittrex;
//     tradeType = "9";
//   }

//   if (poloniexBtcToBittrex > 5 && poloniexBtcToBittrex > spread) {
//     spread = poloniexBtcToBittrex;
//     tradeType = "10";
//   }

//   if (poloniexEthToCex > 5 && poloniexEthToCex > spread) {
//     spread = poloniexEthToCex;
//     tradeType = "11";
//   }

//   if (poloniexBtcToCex > 5 && poloniexBtcToCex > spread) {
//     spread = poloniexBtcToCex;
//     tradeType = "12";
//   }

//   if (spread > -Infinity) {
//     console.log("STOPPING ARB");
//     flag = false;
//     setTimeout(trades[tradeType], 1);
//   }

// };

// checkArbitrageCex = () => {
//   //sell functions
//   let gdaxEthToCex = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.cex.ETHUSD;
//   let gdaxBtcToCex = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.cex.BTCUSD;
//   let geminiEthToCex = cryptoSocket.Exchanges.gemini.ETHUSD - cryptoSocket.Exchanges.cex.ETHUSD;
//   let geminiBtcToCex = cryptoSocket.Exchanges.gemini.BTCUSD - cryptoSocket.Exchanges.cex.BTCUSD;
//   let bitfinexEthToCex = cryptoSocket.Exchanges.bitfinex.ETHUSD - cryptoSocket.Exchanges.cex.ETHUSD;
//   let bitfinexBtcToCex = cryptoSocket.Exchanges.bitfinex.BTCUSD - cryptoSocket.Exchanges.cex.BTCUSD;
//   let poloniexEthToCex = cryptoSocket.Exchanges.poloniex.ETHUSD - cryptoSocket.Exchanges.cex.ETHUSD;
//   let poloniexBtcToCex = cryptoSocket.Exchanges.poloniex.BTCUSD - cryptoSocket.Exchanges.cex.BTCUSD;
//   let bittrexEthToCex = cryptoSocket.Exchanges.bittrex.ETHUSD - cryptoSocket.Exchanges.cex.ETHUSD;
//   let bittrexBtcToCex = cryptoSocket.Exchanges.bittrex.BTCUSD - cryptoSocket.Exchanges.cex.BTCUSD;

//   //buy functions
//   let cexEthToGemini = cryptoSocket.Exchanges.cex.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;
//   let cexEthToPoloniex = cryptoSocket.Exchanges.cex.ETHUSD - cryptoSocket.Exchanges.poloniex.ETHUSD;
//   let cexEthToGdax = cryptoSocket.Exchanges.cex.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
//   let cexEthToBitfinex = cryptoSocket.Exchanges.cex.ETHUSD - cryptoSocket.Exchanges.bitfinex.ETHUSD;
//   let cexEthToBittrex = cryptoSocket.Exchanges.cex.ETHUSD - cryptoSocket.Exchanges.bittrex.ETHUSD;
//   let cexBtcToGemini = cryptoSocket.Exchanges.cex.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;
//   let cexBtcToPoloniex = cryptoSocket.Exchanges.cex.BTCUSD - cryptoSocket.Exchanges.poloniex.BTCUSD;
//   let cexBtcToGdax = cryptoSocket.Exchanges.cex.BTCUSD - cryptoSocket.Exchanges.gdax.BTCUSD;
//   let cexBtcToBitfinex = cryptoSocket.Exchanges.cex.BTCUSD - cryptoSocket.Exchanges.bitfinex.BTCUSD;
//   let cexBtcToBittrex = cryptoSocket.Exchanges.cex.BTCUSD - cryptoSocket.Exchanges.bittrex.BTCUSD;

//   let spread = -Infinity;
//   let tradeType;
//   let trades = {
//     1: buyEthOnGdax,
//     2: buyEthOnGemini,
//     3: buyBtcOnGemini,
//     4: buyBtcOnGdax,
//     5: buyBtcOnBitfinex,
//     6: buyEthOnBitfinex,
//     7: buyEthOnPoloniex,
//     8: buyBtcOnPoloniex,
//     9: buyEthOnBittrex,
//     10: buyBtcOnBittrex,
//     11: buyEthOnCex,
//     12: buyBtcOnCex
//   };

//   if (cexEthToGemini > 5 && cexEthToGemini > spread) {
//     spread = cexEthToGemini;
//     tradeType = "1";
//   }

//   if (cexBtcToGemini > 5 && cexBtcToGemini > spread) {
//     spread = cexBtcToGemini;
//     tradeType = "2";
//   }

//   if (cexEthToGdax > 5 && cexEthToGdax > spread) {
//     spread = cexEthToGdax;
//     tradeType = "3";
//   }

//   if (cexBtcToGdax > 5 && cexBtcToGdax > spread) {
//     spread = cexBtcToGdax;
//     tradeType = "4";
//   }

//   if (cexBtcToBitfinex > 5 && cexBtcToBitfinex > spread) {
//     spread = cexBtcToBitfinex;
//     tradeType = "5";
//   }

//   if (cexEthToBitfinex > 5 && cexEthToBitfinex > spread) {
//     spread = cexEthToBitfinex;
//     tradeType = "6";
//   }

//   if (cexBtcToPoloniex > 5 && cexBtcToPoloniex > spread) {
//     spread = cexBtcToPoloniex;
//     tradeType = "7";
//   }

//   if (cexEthToPoloniex > 5 && cexEthToPoloniex > spread) {
//     spread = cexEthToPoloniex;
//     tradeType = "8";
//   }

//   if (cexEthToBittrex > 5 && cexEthToBittrex > spread) {
//     spread = cexEthToBittrex;
//     tradeType = "9";
//   }

//   if (cexBtcToBittrex > 5 && cexBtcToBittrex > spread) {
//     spread = cexBtcToBittrex;
//     tradeType = "10";
//   }

//   if (geminiEthToCex > 5 && geminiEthToCex > spread) {
//     spread = geminiEthToCex;
//     tradeType = "11";
//   }

//   if (bitfinexEthToCex > 5 && bitfinexEthToCex > spread) {
//     spread = bitfinexEthToCex;
//     tradeType = "11";
//   }

//   if (bittrexEthToCex > 5 && bittrexEthToCex > spread) {
//     spread = bittrexEthToCex;
//     tradeType = "11";
//   }

//   if (gdaxEthToCex > 5 && gdaxEthToCex > spread) {
//     spread = gdaxEthToCex;
//     tradeType = "11";
//   }

//   if (poloniexEthToCex > 5 && poloniexEthToCex > spread) {
//     spread = poloniexEthToCex;
//     tradeType = "11";
//   }

//   if (geminiBtcToCex > 5 && geminiBtcToCex > spread) {
//     spread = geminiBtcToCex;
//     tradeType = "12";
//   }

//   if (gdaxBtcToCex > 5 && gdaxBtcToCex > spread) {
//     spread = gdaxBtcToCex;
//     tradeType = "12";
//   }

//   if (bitfinexBtcToCex > 5 && bitfinexBtcToCex > spread) {
//     spread = bitfinexBtcToCex;
//     tradeType = "12";
//   }

//   if (bittrexBtcToCex > 5 && bittrexBtcToCex > spread) {
//     spread = bittrexBtcToCex;
//     tradeType = "12";
//   }

//   if (poloniexBtcToCex > 5 && poloniexBtcToCex > spread) {
//     spread = poloniexBtcToCex;
//     tradeType = "12";
//   }

//   if (spread > -Infinity) {
//     console.log("STOPPING ARB");
//     flag = false;
//     setTimeout(trades[tradeType], 1);
//   }

// };

// checkArbitrageBitfinex = () => {
//   //sell functions
//   let gdaxBtcToBitfinex = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.bitfinex.BTCUSD;
//   let gdaxEthToBitfinex = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.bitfinex.ETHUSD;
//   let geminiBtcToBitfinex = cryptoSocket.Exchanges.gemini.BTCUSD - cryptoSocket.Exchanges.bitfinex.BTCUSD;
//   let geminiEthToBitfinex = cryptoSocket.Exchanges.gemini.ETHUSD - cryptoSocket.Exchanges.bitfinex.ETHUSD;
//   let poloniexEthToBitfinex = cryptoSocket.Exchanges.poloniex.ETHUSD - cryptoSocket.Exchanges.bitfinex.ETHUSD;
//   let poloniexBtcToBitfinex = cryptoSocket.Exchanges.poloniex.BTCUSD - cryptoSocket.Exchanges.bitfinex.BTCUSD;
//   let bittrexEthToBitfinex = cryptoSocket.Exchanges.bittrex.ETHUSD - cryptoSocket.Exchanges.bitfinex.ETHUSD;
//   let bittrexBtcToBitfinex = cryptoSocket.Exchanges.bittrex.BTCUSD - cryptoSocket.Exchanges.bitfinex.BTCUSD;
//   let cexEthToBitfinex = cryptoSocket.Exchanges.cex.ETHUSD - cryptoSocket.Exchanges.bitfinex.ETHUSD;
//   let cexBtcToBitfinex = cryptoSocket.Exchanges.cex.BTCUSD - cryptoSocket.Exchanges.bitfinex.BTCUSD;

//   //buy functions
//   let bitfinexEthToGdax = cryptoSocket.Exchanges.bitfinex.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
//   let bitfinexBtcToGdax = cryptoSocket.Exchanges.bitfinex.BTCUSD - cryptoSocket.Exchanges.gdax.BTCUSD;
//   let bitfinexEthToGemini = cryptoSocket.Exchanges.bitfinex.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;
//   let bitfinexBtcToGemini = cryptoSocket.Exchanges.bitfinex.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;
//   let bitfinexEthToPoloniex = cryptoSocket.Exchanges.bitfinex.ETHUSD - cryptoSocket.Exchanges.poloniex.ETHUSD;
//   let bitfinexBtcToPoloniex = cryptoSocket.Exchanges.bitfinex.BTCUSD - cryptoSocket.Exchanges.poloniex.BTCUSD;
//   let bitfinexEthToBittrex = cryptoSocket.Exchanges.bitfinex.ETHUSD - cryptoSocket.Exchanges.bittrex.ETHUSD;
//   let bitfinexBtcToBittrex = cryptoSocket.Exchanges.bitfinex.BTCUSD - cryptoSocket.Exchanges.bittrex.BTCUSD;
//   let bitfinexEthToCex = cryptoSocket.Exchanges.bitfinex.ETHUSD - cryptoSocket.Exchanges.cex.ETHUSD;
//   let bitfinexBtcToCex = cryptoSocket.Exchanges.bitfinex.BTCUSD - cryptoSocket.Exchanges.cex.BTCUSD;


//   let spread = -Infinity;
//   let tradeType;
//   let trades = {
//     1: buyEthOnGdax,
//     2: buyEthOnGemini,
//     3: buyBtcOnGemini,
//     4: buyBtcOnGdax,
//     5: buyBtcOnBitfinex,
//     6: buyEthOnBitfinex,
//     7: buyEthOnPoloniex,
//     8: buyBtcOnPoloniex,
//     9: buyEthOnBittrex,
//     10: buyBtcOnBittrex,
//     11: buyEthOnCex,
//     12: buyBtcOnCex
//   };

//   if (bitfinexEthToGemini > 5 && bitfinexEthToGemini > spread) {
//     spread = bitfinexEthToGemini;
//     tradeType = "1";
//   }

//   if (bitfinexBtcToGemini > 5 && bitfinexBtcToGemini > spread) {
//     spread = bitfinexBtcToGemini;
//     tradeType = "2";
//   }

//   if (bitfinexEthToGdax > 5 && bitfinexEthToGdax > spread) {
//     spread = bitfinexEthToGdax;
//     tradeType = "3";
//   }

//   if (bitfinexBtcToGdax > 5 && bitfinexBtcToGdax > spread) {
//     spread = bitfinexBtcToGdax;
//     tradeType = "4";
//   }

//   if (gdaxBtcToBitfinex > 5 && gdaxBtcToBitfinex > spread) {
//     spread = gdaxBtcToBitfinex;
//     tradeType = "5";
//   }

//   if (geminiBtcToBitfinex > 5 && geminiBtcToBitfinex > spread) {
//     spread = geminiBtcToBitfinex;
//     tradeType = "5";
//   }

//   if (poloniexBtcToBitfinex > 5 && poloniexBtcToBitfinex > spread) {
//     spread = poloniexBtcToBitfinex;
//     tradeType = "5";
//   }

//   if (bittrexBtcToBitfinex > 5 && bittrexBtcToBitfinex > spread) {
//     spread = bittrexBtcToBitfinex;
//     tradeType = "5";
//   }

//   if (cexBtcToBitfinex > 5 && cexBtcToBitfinex > spread) {
//     spread = cexBtcToBitfinex;
//     tradeType = "5";
//   }

//   if (gdaxEthToBitfinex > 5 && gdaxEthToBitfinex > spread) {
//     spread = gdaxEthToBitfinex;
//     tradeType = "6";
//   }

//   if (geminiEthToBitfinex > 5 && geminiEthToBitfinex > spread) {
//     spread = geminiEthToBitfinex;
//     tradeType = "6";
//   }

//   if (poloniexEthToBitfinex > 5 && poloniexEthToBitfinex > spread) {
//     spread = poloniexEthToBitfinex;
//     tradeType = "6";
//   }

//   if (bittrexEthToBitfinex > 5 && bittrexEthToBitfinex > spread) {
//     spread = bittrexEthToBitfinex;
//     tradeType = "6";
//   }

//   if (cexEthToBitfinex > 5 && cexEthToBitfinex > spread) {
//     spread = cexEthToBitfinex;
//     tradeType = "6";
//   }

//   if (bitfinexBtcToPoloniex > 5 && bitfinexBtcToPoloniex > spread) {
//     spread = bitfinexBtcToPoloniex;
//     tradeType = "7";
//   }

//   if (bitfinexEthToPoloniex > 5 && bitfinexEthToPoloniex > spread) {
//     spread = bitfinexEthToPoloniex;
//     tradeType = "8";
//   }

//   if (bitfinexEthToBittrex > 5 && bitfinexEthToBittrex > spread) {
//     spread = bitfinexEthToBittrex;
//     tradeType = "9";
//   }

//   if (bitfinexBtcToBittrex > 5 && bitfinexBtcToBittrex > spread) {
//     spread = bitfinexBtcToBittrex;
//     tradeType = "10";
//   }

//   if (bitfinexEthToCex > 5 && bitfinexEthToCex > spread) {
//     spread = bitfinexEthToCex;
//     tradeType = "11";
//   }

//   if (bitfinexBtcToCex > 5 && bitfinexBtcToCex > spread) {
//     spread = bitfinexBtcToCex;
//     tradeType = "12";
//   }

//   if (spread > -Infinity) {
//     console.log("STOPPING ARB");
//     flag = false;
//     setTimeout(trades[tradeType], 1);
//   }

// };


// checkArbitrageBittrex = () => {
//   //sell functions
//   let gdaxEthToBittrex = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.bittrex.ETHUSD;
//   let gdaxBtcToBittrex = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.bittrex.BTCUSD;
//   let geminiEthToBittrex = cryptoSocket.Exchanges.gemini.ETHUSD - cryptoSocket.Exchanges.bittrex.ETHUSD;
//   let geminiBtcToBittrex = cryptoSocket.Exchanges.gemini.BTCUSD - cryptoSocket.Exchanges.bittrex.BTCUSD;
//   let bitfinexEthToBittrex = cryptoSocket.Exchanges.bitfinex.ETHUSD - cryptoSocket.Exchanges.bittrex.ETHUSD;
//   let bitfinexBtcToBittrex = cryptoSocket.Exchanges.bitfinex.BTCUSD - cryptoSocket.Exchanges.bittrex.BTCUSD;
//   let poloniexEthToBittrex = cryptoSocket.Exchanges.poloniex.ETHUSD - cryptoSocket.Exchanges.bittrex.ETHUSD;
//   let poloniexBtcToBittrex = cryptoSocket.Exchanges.poloniex.BTCUSD - cryptoSocket.Exchanges.bittrex.BTCUSD;
//   let cexEthToBittrex = cryptoSocket.Exchanges.cex.ETHUSD - cryptoSocket.Exchanges.bittrex.ETHUSD;
//   let cexBtcToBittrex = cryptoSocket.Exchanges.cex.BTCUSD - cryptoSocket.Exchanges.bittrex.BTCUSD;

//   //buy functions
//   let bittrexEthToBitfinex = cryptoSocket.Exchanges.bittrex.ETHUSD - cryptoSocket.Exchanges.bitfinex.ETHUSD;
//   let bittrexBtcToBitfinex = cryptoSocket.Exchanges.bittrex.BTCUSD - cryptoSocket.Exchanges.bitfinex.BTCUSD;
//   let bittrexEthToGemini = cryptoSocket.Exchanges.bittrex.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;
//   let bittrexBtcToGemini = cryptoSocket.Exchanges.bittrex.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;
//   let bittrexEthToPoloniex = cryptoSocket.Exchanges.bittrex.ETHUSD - cryptoSocket.Exchanges.poloniex.ETHUSD;
//   let bittrexBtcToPoloniex = cryptoSocket.Exchanges.bittrex.BTCUSD - cryptoSocket.Exchanges.poloniex.BTCUSD;
//   let bittrexEthToGdax = cryptoSocket.Exchanges.bittrex.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
//   let bittrexBtcToGdax = cryptoSocket.Exchanges.bittrex.BTCUSD - cryptoSocket.Exchanges.gdax.BTCUSD;
//   let bittrexEthToCex = cryptoSocket.Exchanges.bittrex.ETHUSD - cryptoSocket.Exchanges.cex.ETHUSD;
//   let bittrexBtcToCex = cryptoSocket.Exchanges.bittrex.BTCUSD - cryptoSocket.Exchanges.cex.BTCUSD;


//   let spread = -Infinity;
//   let tradeType;
//   let trades = {
//     1: buyEthOnGdax,
//     2: buyEthOnGemini,
//     3: buyBtcOnGemini,
//     4: buyBtcOnGdax,
//     5: buyBtcOnBitfinex,
//     6: buyEthOnBitfinex,
//     7: buyEthOnPoloniex,
//     8: buyBtcOnPoloniex,
//     9: buyEthOnBittrex,
//     10: buyBtcOnBittrex,
//     11: buyEthOnCex,
//     12: buyBtcOnCex
//   };


//   if (bittrexEthToGemini > 5 && bittrexEthToGemini > spread) {
//     spread = bittrexEthToGemini;
//     tradeType = "1";
//   }

//   if (bittrexBtcToGemini > 5 && bittrexBtcToGemini > spread) {
//     spread = bittrexBtcToGemini;
//     tradeType = "2";
//   }

//   if (bittrexEthToGdax > 5 && bittrexEthToGdax > spread) {
//     spread = bittrexEthToGdax;
//     tradeType = "3";
//   }

//   if (bittrexBtcToGdax > 5 && bittrexBtcToGdax > spread) {
//     spread = bittrexBtcToGdax;
//     tradeType = "4";
//   }

//   if (bittrexBtcToBitfinex > 5 && bittrexBtcToBitfinex > spread) {
//     spread = bittrexBtcToBitfinex;
//     tradeType = "5";
//   }

//   if (bittrexEthToBitfinex > 5 && bittrexEthToBitfinex > spread) {
//     spread = bittrexEthToBitfinex;
//     tradeType = "6";
//   }

//   if (bittrexBtcToPoloniex > 5 && bittrexBtcToPoloniex > spread) {
//     spread = bittrexBtcToPoloniex;
//     tradeType = "7";
//   }

//   if (bittrexEthToPoloniex > 5 && bittrexEthToPoloniex > spread) {
//     spread = bittrexEthToPoloniex;
//     tradeType = "8";
//   }

//   if (geminiEthToBittrex > 5 && geminiEthToBittrex > spread) {
//     spread = geminiEthToBittrex;
//     tradeType = "9";
//   }

//   if (poloniexEthToBittrex > 5 && poloniexEthToBittrex > spread) {
//     spread = poloniexEthToBittrex;
//     tradeType = "9";
//   }

//   if (bitfinexEthToBittrex > 5 && bitfinexEthToBittrex > spread) {
//     spread = bitfinexEthToBittrex;
//     tradeType = "9";
//   }

//   if (gdaxEthToBittrex > 5 && gdaxEthToBittrex > spread) {
//     spread = gdaxEthToBittrex;
//     tradeType = "9";
//   }

//   if (cexEthToBittrex > 5 && cexEthToBittrex > spread) {
//     spread = cexEthToBittrex;
//     tradeType = "9";
//   }

//   if (geminiBtcToBittrex > 5 && geminiBtcToBittrex > spread) {
//     spread = geminiBtcToBittrex;
//     tradeType = "10";
//   }

//   if (poloniexBtcToBittrex > 5 && poloniexBtcToBittrex > spread) {
//     spread = poloniexBtcToBittrex;
//     tradeType = "10";
//   }

//   if (gdaxBtcToBittrex > 5 && gdaxBtcToBittrex > spread) {
//     spread = gdaxBtcToBittrex;
//     tradeType = "10";
//   }

//   if (bitfinexBtcToBittrex > 5 && bitfinexBtcToBittrex > spread) {
//     spread = bitfinexBtcToBittrex;
//     tradeType = "10";
//   }

//   if (cexBtcToBittrex > 5 && cexBtcToBittrex > spread) {
//     spread = cexBtcToBittrex;
//     tradeType = "10";
//   }

//   if (bittrexEthToCex > 5 && bittrexEthToCex > spread) {
//     spread = bittrexEthToCex;
//     tradeType = "11";
//   }

//   if (bittrexBtcToCex > 5 && bittrexBtcToCex > spread) {
//     spread = bittrexBtcToCex;
//     tradeType = "12";
//   }

//   if (spread > -Infinity) {
//     console.log("STOPPING ARB");
//     flag = false;
//     setTimeout(trades[tradeType], 1);
//   }

// };






// require('dotenv').config();
// require('dotenv').load();
// const coinTicker = require('coin-ticker');
// const GeminiAPI = require('gemini-api');
// const plnx = require('plnx');
// const gemPub = process.env.GEMINI_PUB;
// const gemPriv = process.env.GEMINI_PRIV;
// const polKey = process.env.POLONIEX_API_KEY;
// const polPriv = process.env.POLONIEX_SECRET;
// const btoa = require('btoa');
// var createHmac = require('create-hmac');
// var cryptoSocket = require('crypto-socket');
// var flag = true;
// cryptoSocket.start("gemini");
// cryptoSocket.start("gdax");

// var functionFrequencyCounter = {
//   geminiChecker: 0,
//   poloniexChecker: 0
// };



// var realTimePrices = {
//     gemini: {
//       geminiETH_USD: cryptoSocket.Exchanges.gemini.ETHUSD,
//       //geminiETH_USD: 0,
//       geminiBTC_USD: cryptoSocket.Exchanges.gemini.BTCUSD
//       //geminiBTC_USD: 0
//     },
//     poloniex: {
//       // poloniexUSDT_ETH: {
//       //   highestBid: 0,
//       //   lowestAsk: 0,
//       //   high24hour: 0,
//       //   low24hour: 0,
//       //   fourtyDayMovingAverage: 0,
//       //   transactionFee: 0.0,
//       // },
//       // poloniexUSDT_BTC: {
//       //   highestBid: 0,
//       //   lowestAsk: 0,
//       //   high24hour: 0,
//       //   low24hour: 0,
//       //   fourtyDayMovingAverage: 0,
//       //   transactionFee: 0.0,
//       // }
//     },
//     // kraken: {
//     //   krakenETH_USD: {
//     //     last: 0,
//     //     ask: 0,
//     //     bid: 0,
//     //     high: 0,
//     //     vol: 0,
//     //     timestamp: '',
//     //     exchange: 'kraken',
//     //     pair: 'eth_usd',
//     //   },
//     //   krakenBTC_USD: {
//     //     last: 0,
//     //     ask: 0,
//     //     bid: 0,
//     //     high: 0,
//     //     vol: 0,
//     //     timestamp: '',
//     //     exchange: 'kraken',
//     //     pair: 'btc_usd',
//     //   },
//     //   krakenETH_BTC: {
//     //     last: 0,
//     //     ask: 0,
//     //     bid: 0,
//     //     high: 0,
//     //     vol: 0,
//     //     timestamp: '',
//     //     exchange: 'kraken',
//     //     pair: 'eth_btc',
//     //   },
//     // },
//     // BTCe: {
//     //   BTCeBTC_USD: {
//     //     last: 0,
//     //     ask: 0,
//     //     bid: 0,
//     //     high: 0,
//     //     vol: 0,
//     //     timestamp: '',
//     //     exchange: 'btce',
//     //     pair: 'btc_usd',
//     //   },
//     //   BTCeETH_USD: {
//     //     last: 0,
//     //     ask: 0,
//     //     bid: 0,
//     //     high: 0,
//     //     vol: 0,
//     //     timestamp: '',
//     //     exchange: 'btce',
//     //     pair: 'eth_usd',
//     //   },
//     //   BTCeETH_BTC: {
//     //     last: 0,
//     //     ask: 0,
//     //     bid: 0,
//     //     high: 0,
//     //     vol: 0,
//     //     timestamp: '',
//     //     exchange: 'btce',
//     //     pair: 'eth_btc',
//     //   }
//     // },
//     bittrex: {
//       // bittrexBTC_USD: {
//       //   last: 0,
//       //   ask: 0,
//       //   bid: 0,
//       //   high: 0,
//       //   vol: 0,
//       //   timestamp: '',
//       //   exchange: 'bittrex',
//       //   pair: 'btc_usd',
//       // },
//       // bittrexETH_USD: {
//       //   last: 0,
//       //   ask: 0,
//       //   bid: 0,
//       //   high: 0,
//       //   vol: 0,
//       //   timestamp: '',
//       //   exchange: 'bittrex',
//       //   pair: 'eth_usd',
//       // }
//     },
//     bitfinex: {
//       // bitfinexBTC_USD: {
//       //   last: 0,
//       //   ask: 0,
//       //   bid: 0,
//       //   high: 0,
//       //   vol: 0,
//       //   timestamp: '',
//       //   exchange: 'bitfinex',
//       //   pair: 'btc_usd',
//       // },
//       // bitfinexETH_USD: {
//       //   last: 0,
//       //   ask: 0,
//       //   bid: 0,
//       //   high: 0,
//       //   vol: 0,
//       //   timestamp: '',
//       //   exchange: 'bitfinex',
//       //   pair: 'eth_usd',
//       // },
//       // bitfinexETH_BTC: {
//       //   last: 0,
//       //   ask: 0,
//       //   bid: 0,
//       //   high: 0,
//       //   vol: 0,
//       //   timestamp: '',
//       //   exchange: 'bitfinex',
//       //   pair: 'eth_btc',
//       // }
//     },
//     exmo: {
//       exmoBTC_USD: {
//         last: 0,
//         ask: 0,
//         bid: 0,
//         high: 0,
//         vol: 0,
//         timestamp: '',
//         exchange: 'exmo',
//         pair: 'btc_usd',
//       },
//       exmoETH_USD: {
//         last: 0,
//         ask: 0,
//         bid: 0,
//         high: 0,
//         vol: 0,
//         timestamp: '',
//         exchange: 'exmo',
//         pair: 'eth_usd',
//       },
//       exmoETH_BTC: {
//         last: 0,
//         ask: 0,
//         bid: 0,
//         high: 0,
//         vol: 0,
//         timestamp: '',
//         exchange: 'exmo',
//         pair: 'eth_btc',
//       }
//     }
// };



// //KRAKEN, OKCOIN, BTCE, BITTREX LOGIC
// setTimeout(() => {
//   setInterval(() => {
//     coinTicker('kraken', 'ETH_USD')
//       .then(tick => {
//         realTimePrices.kraken.krakenETH_USD.last = parseFloat(tick.last);
//         realTimePrices.kraken.krakenETH_USD.ask = parseFloat(tick.ask);
//         realTimePrices.kraken.krakenETH_USD.bid = parseFloat(tick.bid);
//         realTimePrices.kraken.krakenETH_USD.high = parseFloat(tick.high);
//         realTimePrices.kraken.krakenETH_USD.vol = parseFloat(tick.vol);
//         realTimePrices.kraken.krakenETH_USD.timestamp = tick.timestamp;
//         console.log("\n\n\n\nETH_USD AT KRAKEN IS: ", realTimePrices.kraken.krakenETH_USD);
//       });

//       coinTicker('kraken', 'BTC_USD')
//         .then(tick => {
//           realTimePrices.kraken.krakenBTC_USD.last = parseFloat(tick.last);
//           realTimePrices.kraken.krakenBTC_USD.ask = parseFloat(tick.ask);
//           realTimePrices.kraken.krakenBTC_USD.bid = parseFloat(tick.bid);
//           realTimePrices.kraken.krakenBTC_USD.high = parseFloat(tick.high);
//           realTimePrices.kraken.krakenBTC_USD.vol = parseFloat(tick.vol);
//           realTimePrices.kraken.krakenBTC_USD.timestamp = tick.timestamp;
//           console.log("\n\n\n\nBTC_USD AT KRAKEN IS: ", realTimePrices.kraken.krakenBTC_USD);
//         });

//         coinTicker('kraken', 'ETH_BTC')
//           .then(tick => {
//             realTimePrices.kraken.krakenETH_BTC.last = parseFloat(tick.last);
//             realTimePrices.kraken.krakenETH_BTC.ask = parseFloat(tick.ask);
//             realTimePrices.kraken.krakenETH_BTC.bid = parseFloat(tick.bid);
//             realTimePrices.kraken.krakenETH_BTC.high = parseFloat(tick.high);
//             realTimePrices.kraken.krakenETH_BTC.vol = parseFloat(tick.vol);
//             realTimePrices.kraken.krakenETH_BTC.timestamp = tick.timestamp;
//             console.log("\n\n\n\nETH_BTC AT KRAKEN IS: ", realTimePrices.kraken.krakenETH_BTC);
//           });


//         coinTicker('btce', 'BTC_USD')
//           .then(tick => {
//             realTimePrices.BTCe.BTCeBTC_USD.last = parseFloat(tick.last);
//             realTimePrices.BTCe.BTCeBTC_USD.ask = parseFloat(tick.ask);
//             realTimePrices.BTCe.BTCeBTC_USD.bid = parseFloat(tick.bid);
//             realTimePrices.BTCe.BTCeBTC_USD.high = parseFloat(tick.high);
//             realTimePrices.BTCe.BTCeBTC_USD.vol = parseFloat(tick.vol);
//             realTimePrices.BTCe.BTCeBTC_USD.timestamp = tick.timestamp;
//             console.log("\n\n\n\nBTC_USD AT BTCe IS: ", realTimePrices.BTCe.BTCeBTC_USD);
//           });

//         coinTicker('btce', 'ETH_USD')
//           .then(tick => {
//             realTimePrices.BTCe.BTCeETH_USD.last = parseFloat(tick.last);
//             realTimePrices.BTCe.BTCeETH_USD.ask = parseFloat(tick.ask);
//             realTimePrices.BTCe.BTCeETH_USD.bid = parseFloat(tick.bid);
//             realTimePrices.BTCe.BTCeETH_USD.high = parseFloat(tick.high);
//             realTimePrices.BTCe.BTCeETH_USD.vol = parseFloat(tick.vol);
//             realTimePrices.BTCe.BTCeETH_USD.timestamp = tick.timestamp;
//             console.log("\n\n\n\nETH_USD AT BTCe IS: ", realTimePrices.BTCe.BTCeETH_USD);
//           });

//         coinTicker('btce', 'ETH_BTC')
//           .then(tick => {
//             realTimePrices.BTCe.BTCeETH_BTC.last = parseFloat(tick.last);
//             realTimePrices.BTCe.BTCeETH_BTC.ask = parseFloat(tick.ask);
//             realTimePrices.BTCe.BTCeETH_BTC.bid = parseFloat(tick.bid);
//             realTimePrices.BTCe.BTCeETH_BTC.high = parseFloat(tick.high);
//             realTimePrices.BTCe.BTCeETH_BTC.vol = parseFloat(tick.vol);
//             realTimePrices.BTCe.BTCeETH_BTC.timestamp = tick.timestamp;
//             console.log("\n\n\n\nETH_BTC AT BTCe IS: ", realTimePrices.BTCe.BTCeETH_BTC);
//           });

//       coinTicker('bittrex', 'ETH_USD')
//         .then(tick => {
//           realTimePrices.bittrex.bittrexETH_USD.last = parseFloat(tick.last);
//           realTimePrices.bittrex.bittrexETH_USD.ask = parseFloat(tick.ask);
//           realTimePrices.bittrex.bittrexETH_USD.bid = parseFloat(tick.bid);
//           realTimePrices.bittrex.bittrexETH_USD.high = parseFloat(tick.high);
//           realTimePrices.bittrex.bittrexETH_USD.vol = parseFloat(tick.vol);
//           realTimePrices.bittrex.bittrexETH_USD.timestamp = tick.timestamp;
//           console.log("\n\n\n\nETH_USD AT bittrex IS: ", realTimePrices.bittrex.bittrexETH_USD);
//         });

//       coinTicker('bittrex', 'BTC_USD')
//         .then(tick => {
//           realTimePrices.bittrex.bittrexBTC_USD.last = parseFloat(tick.last);
//           realTimePrices.bittrex.bittrexBTC_USD.ask = parseFloat(tick.ask);
//           realTimePrices.bittrex.bittrexBTC_USD.bid = parseFloat(tick.bid);
//           realTimePrices.bittrex.bittrexBTC_USD.high = parseFloat(tick.high);
//           realTimePrices.bittrex.bittrexBTC_USD.vol = parseFloat(tick.vol);
//           realTimePrices.bittrex.bittrexBTC_USD.timestamp = tick.timestamp;
//           console.log("\n\n\n\nBTC_USD AT BITTREX IS: ", realTimePrices.bittrex.bittrexBTC_USD);
//         });

//     }, 1200);
// }, 10500);


// setTimeout(() => {
//   setInterval(() => {
//     coinTicker('bitfinex', 'ETH_USD')
//       .then(tick => {
//         realTimePrices.bitfinex.bitfinexETH_USD.last = parseFloat(tick.last);
//         realTimePrices.bitfinex.bitfinexETH_USD.ask = parseFloat(tick.ask);
//         realTimePrices.bitfinex.bitfinexETH_USD.bid = parseFloat(tick.bid);
//         realTimePrices.bitfinex.bitfinexETH_USD.high = parseFloat(tick.high);
//         realTimePrices.bitfinex.bitfinexETH_USD.vol = parseFloat(tick.vol);
//         realTimePrices.bitfinex.bitfinexETH_USD.timestamp = tick.timestamp;
//         console.log("\n\n\n\nETH_USD AT BITFINEX IS: ", realTimePrices.bitfinex.bitfinexETH_USD);
//       });

//     coinTicker('bitfinex', 'BTC_USD')
//       .then(tick => {
//         realTimePrices.bitfinex.bitfinexBTC_USD.last = parseFloat(tick.last);
//         realTimePrices.bitfinex.bitfinexBTC_USD.ask = parseFloat(tick.ask);
//         realTimePrices.bitfinex.bitfinexBTC_USD.bid = parseFloat(tick.bid);
//         realTimePrices.bitfinex.bitfinexBTC_USD.high = parseFloat(tick.high);
//         realTimePrices.bitfinex.bitfinexBTC_USD.vol = parseFloat(tick.vol);
//         realTimePrices.bitfinex.bitfinexBTC_USD.timestamp = tick.timestamp;
//         console.log("\n\n\n\nBTC_USD AT BITFINEX IS: ", realTimePrices.bitfinex.bitfinexBTC_USD);
//       });

//       coinTicker('bitfinex', 'ETH_BTC')
//         .then(tick => {
//           realTimePrices.bitfinex.bitfinexETH_BTC.last = parseFloat(tick.last);
//           realTimePrices.bitfinex.bitfinexETH_BTC.ask = parseFloat(tick.ask);
//           realTimePrices.bitfinex.bitfinexETH_BTC.bid = parseFloat(tick.bid);
//           realTimePrices.bitfinex.bitfinexETH_BTC.high = parseFloat(tick.high);
//           realTimePrices.bitfinex.bitfinexETH_BTC.vol = parseFloat(tick.vol);
//           realTimePrices.bitfinex.bitfinexETH_BTC.timestamp = tick.timestamp;
//           console.log("\n\n\n\nETH_BTC AT BITFINEX IS: ", realTimePrices.bitfinex.bitfinexETH_BTC);
//         });
//       }, 1900)
// }, 10500);


// setTimeout(() => {
//   setInterval(() => {
//     coinTicker('exmo', 'ETH_USD')
//       .then(tick => {
//         realTimePrices.exmo.exmoETH_USD.last = parseFloat(tick.last);
//         realTimePrices.exmo.exmoETH_USD.ask = parseFloat(tick.ask);
//         realTimePrices.exmo.exmoETH_USD.bid = parseFloat(tick.bid);
//         realTimePrices.exmo.exmoETH_USD.high = parseFloat(tick.high);
//         realTimePrices.exmo.exmoETH_USD.vol = parseFloat(tick.vol);
//         realTimePrices.exmo.exmoETH_USD.timestamp = tick.timestamp;
//         console.log("\n\n\n\nETH_USD AT EXMO IS: ", realTimePrices.exmo.exmoETH_USD);
//       });

//     coinTicker('exmo', 'BTC_USD')
//       .then(tick => {
//         realTimePrices.exmo.exmoBTC_USD.last = parseFloat(tick.last);
//         realTimePrices.exmo.exmoBTC_USD.ask = parseFloat(tick.ask);
//         realTimePrices.exmo.exmoBTC_USD.bid = parseFloat(tick.bid);
//         realTimePrices.exmo.exmoBTC_USD.high = parseFloat(tick.high);
//         realTimePrices.exmo.exmoBTC_USD.vol = parseFloat(tick.vol);
//         realTimePrices.exmo.exmoBTC_USD.timestamp = tick.timestamp;
//         console.log("\n\n\n\nBTC_USD AT EXMO IS: ", realTimePrices.exmo.exmoBTC_USD);
//       });

//       coinTicker('exmo', 'ETH_BTC')
//         .then(tick => {
//           realTimePrices.exmo.exmoETH_BTC.last = parseFloat(tick.last);
//           realTimePrices.exmo.exmoETH_BTC.ask = parseFloat(tick.ask);
//           realTimePrices.exmo.exmoETH_BTC.bid = parseFloat(tick.bid);
//           realTimePrices.exmo.exmoETH_BTC.high = parseFloat(tick.high);
//           realTimePrices.exmo.exmoETH_BTC.vol = parseFloat(tick.vol);
//           realTimePrices.exmo.exmoETH_BTC.timestamp = tick.timestamp;
//           console.log("\n\n\n\nETH_BTC AT EXMO IS: ", realTimePrices.exmo.exmoETH_BTC);
//         });


//   }, 1500)
// }, 10500)



// //GEMINI LOGIC//
// var websocketClient = new GeminiAPI.default.WebsocketClient({ gemPub, gemPriv, sandbox: false });

// //working for asking prices
// setTimeout(() => {
//   websocketClient.openMarketSocket('btcusd',(onOpen) => {
//     websocketClient.addMarketMessageListener(data => {
//       if(data.events[0].side === 'ask'){
//         realTimePrices['gemini']['geminiBTC_USD'] = Number(data.events[0].price);
//         console.log("\n PRICE OF BTC GEMINI IS: ", realTimePrices.gemini.geminiBTC_USD);
//         //checkArbitrage(realTimePrices);
//       }
//     });
//   });
// }, 2500)

// // //working for asking prices
// setTimeout(() => {
//   websocketClient.openMarketSocket('ethusd',(onOpen) => {
//     websocketClient.addMarketMessageListener(data => {
//       if(data.events[0].side === 'ask'){
//         realTimePrices['gemini']['geminiETH_USD'] = Number(data.events[0].price);
//         console.log("\n PRICE OF ETH GEMINI IS: ", realTimePrices.gemini.geminiETH_USD);
//         //checkArbitrage(realTimePrices);
//       }
//     });
//   });
// }, 5600)




// // //POLONIEX LOGIC
// setTimeout(() => {
//   setInterval(() => {
//     plnx.returnTicker()
//       .then((data) => {
//         //USDT_BTC
//         if(data.USDT_BTC.highestBid){
//           realTimePrices['poloniex']['poloniexUSDT_BTC']['highestBid'] = parseFloat(data.USDT_BTC.highestBid);
//         }
//         if(data.USDT_BTC.lowestAsk){
//           realTimePrices['poloniex']['poloniexUSDT_BTC']['lowestAsk'] = parseFloat(data.USDT_BTC.lowestAsk);
//         }
//         if(data.USDT_BTC.high24hr){
//           realTimePrices['poloniex']['poloniexUSDT_BTC']['high24hour'] = parseFloat(data.USDT_BTC.high24hr);
//         }
//         if(data.USDT_BTC.low24hr){
//           realTimePrices['poloniex']['poloniexUSDT_BTC']['low24hour'] = parseFloat(data.USDT_BTC.low24hr);
//         }


//         //USDT_ETH
//         if(data.USDT_ETH.highestBid){
//           realTimePrices['poloniex']['poloniexUSDT_ETH']['highestBid'] = parseFloat(data.USDT_ETH.highestBid);
//         }
//         if(data.USDT_ETH.lowestAsk){
//           realTimePrices['poloniex']['poloniexUSDT_ETH']['lowestAsk'] = parseFloat(data.USDT_ETH.lowestAsk);
//         }
//         if(data.USDT_ETH.high24hr){
//           realTimePrices['poloniex']['poloniexUSDT_ETH']['high24hour'] = parseFloat(data.USDT_ETH.high24hr);
//         }
//         if(data.USDT_ETH.low24hr){
//           realTimePrices['poloniex']['poloniexUSDT_ETH']['low24hour'] = parseFloat(data.USDT_ETH.low24hr);
//         }
//       })
//       .catch((err) => {
//         console.log("GOOD BYE: ", err);
//         console.log(err);
//       });

//       // console.log("\n\nBTC AT POLONIEX IS: ", realTimePrices['poloniex']['poloniexUSDT_BTC']);
//       // console.log("\n\n");
//       // console.log("ETH AT POLONIEX IS: ", realTimePrices['poloniex']['poloniexUSDT_ETH']);

//       plnx.returnCurrencies({})
//         .then(data => {
//           console.log("FEES ARE: ", realTimePrices.poloniex.poloniexUSDT_BTC.transactionFee)
//           realTimePrices.poloniex.poloniexUSDT_BTC.transactionFee = parseFloat(data.BTC.txFee);
//           realTimePrices.poloniex.poloniexUSDT_ETH.transactionFee = parseFloat(data.ETH.txFee);
//         })
//         .catch(err => {
//           console.log("ERROR GETTING TRANSACTION FEE: ", err);
//         });

//         //checkArbitrage(realTimePrices);

//   }, 175);
// }, 6000);



// setTimeout(() => {
//   setInterval(() => {
//     var movingAverages = [];
//     var today = new Date();
//     var todayDate = Math.floor(today.setDate(today.getDate()-0)/1000);
//     var fourtyDaysAgoDate = Math.floor(today.setDate(today.getDate()-40)/1000);

//     plnx.returnChartData({ currencyPair: 'USDT_BTC', start: fourtyDaysAgoDate, end: todayDate, period: 86400 })
//       .then(data => {
//         var movingAveragesBTC = [];
//         data.forEach(day => {
//           movingAveragesBTC.push(day.close);
//         })

//         realTimePrices['poloniex']['poloniexUSDT_BTC']['fourtyDayMovingAverage'] = movingAveragesBTC.reduce((a, b) => a + b, 0)/movingAveragesBTC.length;
//         console.log(realTimePrices['poloniex']['poloniexUSDT_BTC']['fourtyDayMovingAverage']);
//       })
//       .catch(err => {
//         console.log(err);
//       });


//     plnx.returnChartData({ currencyPair: 'USDT_ETH', start: fourtyDaysAgoDate, end: todayDate, period: 86400 })
//       .then(data => {
//         var movingAveragesETH = [];
//         data.forEach(day => {
//           movingAveragesETH.push(day.close);
//         })

//         realTimePrices['poloniex']['poloniexUSDT_ETH']['fourtyDayMovingAverage'] = movingAveragesETH.reduce((a, b) => a + b, 0)/movingAveragesETH.length;
//         console.log(realTimePrices['poloniex']['poloniexUSDT_ETH']['fourtyDayMovingAverage']);
//       })
//       .catch(err => {
//         console.log(err);
//       });

//   }, 280);
// }, 7000);


// //Alex Arbitrage Checker Version 1
// function checkArbitrage(info){
//   checkGeminiToPoloniexETH_USD_ETH_USDT(info.gemini, info.poloniex.poloniexUSDT_ETH);
//   checkPoloniexToGeminiETH_USDT_ETH_USD(info.poloniex.poloniexUSDT_ETH, info.gemini);
// }

// //CHECK USD_BTC ARBITRAGE BETWEEN GEMINI AND POLONIEX
// function checkGeminiToPoloniexETH_USD_ETH_USDT(gem, pol){
//   var geminiToPoloniexSpread = (gem.geminiETH_USD - (pol.highestBid * 0.98));
//   if(geminiToPoloniexSpread > 1.0){
//     var time = new Date();
//     console.log(`Gemini vs Poloniex Spread is ${geminiToPoloniexSpread} at ${time.toLocaleString('en-US', { hour: 'numeric', minute:'numeric', second: 'numeric', hour12: true })}`);
//   }
//   functionFrequencyCounter.geminiChecker += 1;
// }

// //CHECK USD_BTC ARBITRAGE BETWEEN POLONIEX AND GEMINI
// function checkPoloniexToGeminiETH_USDT_ETH_USD(pol, gem){
//   console.log("GOT IN THE POLO TO GEM CHECKER BRUHHHHH: ", ((pol.highestBid * 0.98) - gem.geminiETH_USD)) ;
//   var poloniexToGeminiSpread = ((pol.highestBid * 0.98) - gem.geminiETH_USD);
//   if(poloniexToGeminiSpread > 1.0){
//     var time = new Date();
//     console.log(`Poloniex vs Gemini Spread is ${poloniexToGeminiSpread} at ${time.toLocaleString('en-US', { hour: 'numeric', minute:'numeric', second: 'numeric', hour12: true })}`);
//   }
//   functionFrequencyCounter.poloniexChecker += 1;
// }

// setTimeout(() => {
//   setInterval(() => {
//     checkArbitrage(realTimePrices);
//   }, 0.000000000000000001);
// }, 60000);


// // setTimeout(() => {
// //   setInterval(() => {
// //     console.log(`\nTHE COUNT OF FUNCTIONS ARE GEMII: ${functionFrequencyCounter.geminiChecker} and POLO: ${functionFrequencyCounter.poloniexChecker}\n`);
// //     functionFrequencyCounter.poloniexChecker = 0;
// //     functionFrequencyCounter.geminiChecker = 0;
// //   }, 1000);
// // }, 60000);



// // //DAVE's ARBITRAGE CHECKER VERSION1
// // function checkArbitrage(){
// //   var mostProfitableSpread = -1000000;
// //   var tradeType;

// //   if (
// //     (realTimePrices.gemini.geminiBTC_USD - realTimePrices.poloniex.poloniexUSDT_BTC) > 5 &&
// //     realTimePrices.poloniex.poloniexUSDT_BTC !== 0 &&
// //     realTimePrices.gemini.geminiBTC_USD !== 0
// //   ) {
// //     // console.log("BTC PRICE GAP FROM GEMINI TO POLONIEX", realTimePrices.gemini.geminiBTC_USD - realTimePrices.poloniex.poloniexUSDT_BTC);
// //     if (
// //       (realTimePrices.gemini.geminiBTC_USD - realTimePrices.poloniex.poloniexUSDT_BTC) > mostProfitableSpread
// //     ) {
// //       mostProfitableSpread = realTimePrices.gemini.geminiBTC_USD - realTimePrices.poloniex.poloniexUSDT_BTC;
// //       tradeType = "BTC IS WORTH MORE ON GEMINI THAN POLONIEX, SPREAD: ";
// //     }
// //   }

// //   if (
// //     (realTimePrices.poloniex.poloniexUSDT_BTC - realTimePrices.gemini.geminiBTC_USD) > 5 &&
// //     realTimePrices.poloniex.poloniexUSDT_BTC !== 0 &&
// //     realTimePrices.gemini.geminiBTC_USD !== 0
// //   ) {
// //     // console.log("BTC PRICE GAP FROM POLONIEX TO GEMINI", realTimePrices.poloBTC - realTimePrices.geminiBTC_USD);
// //     if (
// //       (realTimePrices.poloniex.poloniexUSDT_BTC - realTimePrices.gemini.geminiBTC_USD) > mostProfitableSpread
// //     ) {
// //       mostProfitableSpread = realTimePrices.poloniex.poloniexUSDT_BTC - realTimePrices.gemini.geminiBTC_USD;
// //       tradeType = "BTC IS WORTH MORE ON POLONIEX THAN GEMINI, SPREAD: ";
// //     }
// //   }

// //   if (
// //     (realTimePrices.poloniex.poloniexUSDT_ETH - realTimePrices.gemini.geminiETH_USD) > 5 &&
// //     realTimePrices.poloniex.poloniexUSDT_ETH !== 0 &&
// //     realTimePrices.gemini.geminiETH_USD !== 0
// //   ) {
// //     // console.log("ETH PRICE GAP FROM POLONIEX TO GEMINI", realTimePrices.poloETH - realTimePrices.geminiETH_USD);
// //     if (
// //       (realTimePrices.poloniex.poloniexUSDT_ETH - realTimePrices.gemini.geminiETH_USD) > mostProfitableSpread
// //     ) {
// //       mostProfitableSpread = realTimePrices.poloniex.poloniexUSDT_ETH - realTimePrices.gemini.geminiETH_USD;
// //       tradeType = "ETH IS WORTH MORE ON POLONIEX THAN GEMINI, SPREAD: ";
// //     }
// //   }

// //   if (
// //     (realTimePrices.gemini.geminiETH_USD - realTimePrices.poloniex.poloniexUSDT_ETH) > 5 &&
// //     realTimePrices.poloniex.poloniexUSDT_ETH !== 0 &&
// //     realTimePrices.gemini.geminiETH_USD !== 0
// //   ) {
// //     // console.log("ETH PRICE GAP FROM GEMINI TO POLONIEX", realTimePrices.gemoniETH - realTimePrices.poloETH);
// //     if (
// //       (realTimePrices.gemini.geminiETH_USD - realTimePrices.poloniex.poloniexUSDT_ETH) > mostProfitableSpread
// //     ) {
// //       mostProfitableSpread = realTimePrices.gemini.geminiETH_USD - realTimePrices.poloniex.poloniexUSDT_ETH;
// //       tradeType = "ETH IS WORTH MORE ON GEMINI THAN POLONIEX, SPREAD: ";
// //     }
// //   }

// //   if (mostProfitableSpread > -1000000) {
// //     console.log(tradeType, mostProfitableSpread);
// //   }
// // };

// // function loopConditional(){
// //   while (true) {
// //     if (
// //       realTimePrices.gemini.geminiBTC_USD !== 0 &&
// //       realTimePrices.gemini.geminiETH_USD !== 0 &&
// //       realTimePrices.poloniex.poloniexUSDT_BTC !== 0 &&
// //       realTimePrices.poloniex.poloniexUSDT_ETH !== 0
// //     ) {
// //       checkArbitrage();
// //     }
// //   }
// // }


// //checkArbitrage function does not work and freezes
// //loop from gathering information
// // setTimeout(() => {
// //   setInterval(() => {
// //     console.log(realTimePrices.poloniex.poloniexUSDT_BTC.transactionFee);
// //     loopConditional();
// //   }, 2000);
// // }, 11000);
