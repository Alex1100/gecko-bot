require("dotenv").load();
const axios = require("axios");
let cryptoSocket = require("crypto-socket");
let flag = true;
// cryptoSocket.start("gemini");
// cryptoSocket.start("gdax");
// cryptoSocket.start("bitfinex");
// cryptoSocket.start("poloniex");
// cryptoSocket.start("bittrex");
let bitfinex = require('./exchanges/bitfinex');
let bittrex = require('./exchanges/bittrex');
let gdax = require('./exchanges/gdax');
let gemini = require('./exchanges/gemini');
let poloniex = require('./exchanges/poloniex');

bitfinex.requestBalances();


//DAVE's NEW CHECKARB FUNCTION
checkArbitrage = (exchange, currency) => {
  let largestSpread = -Infinity;
  let spreadCurrency;
  let trades = {
    gdax,
    gemini,
    poloniex,
    bitfinex,
    bittrex
  };

  if (exchange === "gdax") {
    //BTC
    let gdaxVsGeminiBtc = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;
    let gdaxVsPoloniexBtc = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.poloniex.BTCUSD;
    let gdaxVsBitfinexBtc = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.bitfinex.BTCUSD;
    let gdaxVsBittrexBtc = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.bittrex.BTCUSD;
    let geminiVsGdaxBtc = cryptoSocket.Exchanges.gemini.BTCUSD - cryptoSocket.Exchanges.gdax.BTCUSD;
    let poloniexVsGdaxBtc = cryptoSocket.Exchanges.poloniex.BTCUSD - cryptoSocket.Exchanges.gdax.BTCUSD;
    let bitfinexVsGdaxBtc = cryptoSocket.Exchanges.bitfinex.BTCUSD - cryptoSocket.Exchanges.gdax.BTCUSD;
    let bittrexVsGdaxBtc = cryptoSocket.Exchanges.bittrex.BTCUSD - cryptoSocket.Exchanges.gdax.BTCUSD;

    //ETH
    let gdaxVsGeminiEth = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;
    let gdaxVsPoloniexEth = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.poloniex.ETHUSD;
    let gdaxVsBitfinexEth = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.bitfinex.ETHUSD;
    let gdaxVsBittrexEth = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.bittrex.ETHUSD;
    let geminiVsGdaxEth = cryptoSocket.Exchanges.gemini.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
    let poloniexVsGdaxEth = cryptoSocket.Exchanges.poloniex.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
    let bitfinexVsGdaxEth = cryptoSocket.Exchanges.bitfinex.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
    let bittrexVsGdaxEth = cryptoSocket.Exchanges.bittrex.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;

    if (gdaxVsGeminiBtc > largestSpread) {
      largestSpread = gdaxVsGeminiBtc;
      spreadCurrency = "BTC";
    }

    if (gdaxVsPoloniexBtc > largestSpread) {
      largestSpread = gdaxVsPoloniexBtc;
      spreadCurrency = "BTC";
    }

    if (gdaxVsBitfinexBtc > largestSpread) {
      largestSpread = gdaxVsBitfinexBtc;
      spreadCurrency = "BTC";
    }

    if (gdaxVsBittrexBtc > largestSpread) {
      largestSpread = gdaxVsBittrexBtc;
      spreadCurrency = "BTC";
    }

    if (geminiVsGdaxBtc > largestSpread) {
      largestSpread = geminiVsGdaxBtc;
      spreadCurrency = "BTC";
    }

    if (poloniexVsGdaxBtc > largestSpread) {
      largestSpread = poloniexVsGdaxBtc;
      spreadCurrency = "BTC";
    }

    if (bitfinexVsGdaxBtc > largestSpread) {
      largestSpread = bitfinexVsGdaxBtc;
      spreadCurrency = "BTC";
    }

    if (bittrexVsGdaxBtc > largestSpread) {
      largestSpread = bittrexVsGdaxBtc;
      spreadCurrency = "BTC";
    }

    if (gdaxVsGeminiEth > largestSpread) {
      largestSpread = gdaxVsGeminiEth;
      spreadCurrency = "ETH";
    }

    if (gdaxVsPoloniexEth > largestSpread) {
      largestSpread = gdaxVsPoloniexEth;
      spreadCurrency = "ETH";
    }

    if (gdaxVsBitfinexEth > largestSpread) {
      largestSpread = gdaxVsBitfinexEth;
      spreadCurrency = "ETH";
    }

    if (gdaxVsBittrexEth > largestSpread) {
      largestSpread = gdaxVsBittrexEth;
      spreadCurrency = "ETH";
    }

    if (geminiVsGdaxEth > largestSpread) {
      largestSpread = geminiVsGdaxEth;
      spreadCurrency = "ETH";
    }

    if (poloniexVsGdaxEth > largestSpread) {
      largestSpread = poloniexVsGdaxEth;
      spreadCurrency = "ETH";
    }

    if (bitfinexVsGdaxEth > largestSpread) {
      largestSpread = bitfinexVsGdaxEth;
      spreadCurrency = "ETH";
    }

    if (bittrexVsGdaxEth > largestSpread) {
      largestSpread = bittrexVsGdaxEth;
      spreadCurrency = "ETH";
    }
  }

  if (exchange === "gemini") {
    //BTC
    let geminiVsGdaxBtc = cryptoSocket.Exchanges.gemini.BTCUSD - cryptoSocket.Exchanges.gdax.BTCUSD;
    let geminiVsPoloniexBtc = cryptoSocket.Exchanges.gemini.BTCUSD - cryptoSocket.Exchanges.poloniex.BTCUSD;
    let geminiVsBitfinexBtc = cryptoSocket.Exchanges.gemini.BTCUSD - cryptoSocket.Exchanges.bitfinex.BTCUSD;
    let geminiVsBittrexBtc = cryptoSocket.Exchanges.gemini.BTCUSD - cryptoSocket.Exchanges.bittrex.BTCUSD;
    let gdaxVsGeminiBtc = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;
    let poloniexVsGeminiBtc = cryptoSocket.Exchanges.poloniex.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;
    let bitfinexVsGeminiBtc = cryptoSocket.Exchanges.bitfinex.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;
    let bittrexVsGeminiBtc = cryptoSocket.Exchanges.bittrex.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;

    //ETH
    let geminiVsGdaxEth = cryptoSocket.Exchanges.gemini.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
    let geminiVsPoloniexEth = cryptoSocket.Exchanges.gemini.ETHUSD - cryptoSocket.Exchanges.poloniex.ETHUSD;
    let geminiVsBitfinexEth = cryptoSocket.Exchanges.gemini.ETHUSD - cryptoSocket.Exchanges.bitfinex.ETHUSD;
    let geminiVsBittrexEth = cryptoSocket.Exchanges.gemini.ETHUSD - cryptoSocket.Exchanges.bittrex.ETHUSD;
    let gdaxVsGeminiEth = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;
    let poloniexVsGeminiEth = cryptoSocket.Exchanges.poloniex.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;
    let bitfinexVsGeminiEth = cryptoSocket.Exchanges.bitfinex.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;
    let bittrexVsGeminiEth = cryptoSocket.Exchanges.bittrex.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;

    if (geminiVsGdaxBtc > largestSpread) {
      largestSpread = geminiVsGdaxBtc;
      spreadCurrency = "BTC";
    }

    if (geminiVsPoloniexBtc > largestSpread) {
      largestSpread = geminiVsPoloniexBtc;
      spreadCurrency = "BTC";
    }

    if (geminiVsBitfinexBtc > largestSpread) {
      largestSpread = geminiVsBitfinexBtc;
      spreadCurrency = "BTC";
    }

    if (geminiVsBittrexBtc > largestSpread) {
      largestSpread = geminiVsBittrexBtc;
      spreadCurrency = "BTC";
    }

    if (gdaxVsGeminiBtc > largestSpread) {
      largestSpread = gdaxVsGeminiBtc;
      spreadCurrency = "BTC";
    }

    if (poloniexVsGeminiBtc > largestSpread) {
      largestSpread = poloniexVsGeminiBtc;
      spreadCurrency = "BTC";
    }

    if (bitfinexVsGeminiBtc > largestSpread) {
      largestSpread = bitfinexVsGeminiBtc;
      spreadCurrency = "BTC";
    }

    if (bittrexVsGeminiBtc > largestSpread) {
      largestSpread = bittrexVsGeminiBtc;
      spreadCurrency = "BTC";
    }

    if (geminiVsGdaxEth > largestSpread) {
      largestSpread = geminiVsGdaxEth;
      spreadCurrency = "ETH";
    }

    if (geminiVsPoloniexEth > largestSpread) {
      largestSpread = geminiVsPoloniexEth;
      spreadCurrency = "ETH";
    }

    if (geminiVsBitfinexEth > largestSpread) {
      largestSpread = geminiVsBitfinexEth;
      spreadCurrency = "ETH";
    }

    if (geminiVsBittrexEth > largestSpread) {
      largestSpread = geminiVsBittrexEth;
      spreadCurrency = "ETH";
    }

    if (gdaxVsGeminiEth > largestSpread) {
      largestSpread = gdaxVsGeminiEth;
      spreadCurrency = "ETH";
    }

    if (poloniexVsGeminiEth > largestSpread) {
      largestSpread = poloniexVsGeminiEth;
      spreadCurrency = "ETH";
    }

    if (bitfinexVsGeminiEth > largestSpread) {
      largestSpread = bitfinexVsGeminiEth;
      spreadCurrency = "ETH";
    }

    if (bittrexVsGeminiEth > largestSpread) {
      largestSpread = bittrexVsGeminiEth;
      spreadCurrency = "ETH";
    }
  }

  if (exchange === 'poloniex') {
    //BTC
    let poloniexVsGdaxBtc = cryptoSocket.Exchanges.poloniex.BTCUSD - cryptoSocket.Exchanges.gdax.BTCUSD;
    let poloniexVsGeminiBtc = cryptoSocket.Exchanges.poloniex.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;
    let poloniexVsBitfinexBtc = cryptoSocket.Exchanges.poloniex.BTCUSD - cryptoSocket.Exchanges.bitfinex.BTCUSD;
    let poloniexVsBittrexBtc = cryptoSocket.Exchanges.poloniex.BTCUSD - cryptoSocket.Exchanges.bittrex.BTCUSD;
    let gdaxVsPoloniexBtc = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.poloniex.BTCUSD;
    let geminiVsPoloniexBtc = cryptoSocket.Exchanges.gemini.BTCUSD - cryptoSocket.Exchanges.poloniex.BTCUSD;
    let bitfinexVsPoloniexBtc = cryptoSocket.Exchanges.bitfinex.BTCUSD - cryptoSocket.Exchanges.poloniex.BTCUSD;
    let bittrexVsPoloniexBtc = cryptoSocket.Exchanges.bittrex.BTCUSD - cryptoSocket.Exchanges.poloniex.BTCUSD;

    //ETH
    let poloniexVsGdaxEth = cryptoSocket.Exchanges.poloniex.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
    let poloniexVsGeminiEth = cryptoSocket.Exchanges.poloniex.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;
    let poloniexVsBitfinexEth = cryptoSocket.Exchanges.poloniex.ETHUSD - cryptoSocket.Exchanges.bitfinex.ETHUSD;
    let poloniexVsBittrexEth = cryptoSocket.Exchanges.poloniex.ETHUSD - cryptoSocket.Exchanges.bittrex.ETHUSD;
    let gdaxVsPoloniexEth = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.poloniex.ETHUSD;
    let geminiVsPoloniexEth = cryptoSocket.Exchanges.gemini.ETHUSD - cryptoSocket.Exchanges.poloniex.ETHUSD;
    let bitfinexVsPoloniexEth = cryptoSocket.Exchanges.bitfinex.ETHUSD - cryptoSocket.Exchanges.poloniex.ETHUSD;
    let bittrexVsPoloniexEth = cryptoSocket.Exchanges.bittrex.ETHUSD - cryptoSocket.Exchanges.poloniex.ETHUSD;

    if (poloniexVsGdaxBtc > largestSpread) {
      largestSpread = poloniexVsGdaxBtc;
      spreadCurrency = "BTC";
    }

    if (poloniexVsGeminiBtc > largestSpread) {
      spreadCurrency = "BTC";
    }

    if (poloniexVsBitfinexBtc > largestSpread) {
      largestSpread = poloniexVsBitfinexBtc;
      spreadCurrency = "BTC";
    }

    if (poloniexVsBittrexBtc > largestSpread) {
      largestSpread = poloniexVsBittrexBtc;
      spreadCurrency = "BTC";
    }

    if (gdaxVsPoloniexBtc > largestSpread) {
      largestSpread = gdaxVsPoloniexBtc;
      spreadCurrency = "BTC";
    }

    if (geminiVsPoloniexBtc > largestSpread) {
      largestSpread = geminiVsPoloniexBtc;
      spreadCurrency = "BTC";
    }

    if (bitfinexVsPoloniexBtc > largestSpread) {
      largestSpread = bitfinexVsPoloniexBtc;
      spreadCurrency = "BTC";
    }

    if (bittrexVsPoloniexBtc > largestSpread) {
      largestSpread = bittrexVsPoloniexBtc;
      spreadCurrency = "BTC";
    }

    if (poloniexVsGdaxEth > largestSpread) {
      largestSpread = poloniexVsGdaxEth;
      spreadCurrency = "ETH";
    }

    if (poloniexVsGeminiEth > largestSpread) {
      largestSpread = poloniexVsGeminiEth;
      spreadCurrency = "ETH";
    }

    if (poloniexVsBitfinexEth > largestSpread) {
      largestSpread = poloniexVsBitfinexEth;
      spreadCurrency = "ETH";
    }

    if (poloniexVsBittrexEth > largestSpread) {
      largestSpread = poloniexVsBittrexEth;
      spreadCurrency = "ETH";
    }

    if (gdaxVsPoloniexEth > largestSpread) {
      largestSpread = gdaxVsPoloniexEth;
      spreadCurrency = "ETH";
    }

    if (geminiVsPoloniexEth > largestSpread) {
      largestSpread = geminiVsPoloniexEth;
      spreadCurrency = "ETH";
    }

    if(bitfinexVsPoloniexEth > largestSpread) {
      largestSpread = bitfinexVsPoloniexEth;
      spreadCurrency = "ETH";
    }

    if(bittrexVsPoloniexEth > largestSpread) {
      largestSpread = bittrexVsPoloniexEth;
      spreadCurrency = "ETH";
    }
  }

  if (exchange === 'bitfinex') {
    //BTC
    let bitfinexVsGdaxBtc = cryptoSocket.Exchanges.bitfinex.BTCUSD - cryptoSocket.Exchanges.gdax.BTCUSD;
    let bitfinexVsGeminiBtc = cryptoSocket.Exchanges.bitfinex.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;
    let bitfinexVsPoloniexBtc = cryptoSocket.Exchanges.bitfinex.BTCUSD - cryptoSocket.Exchanges.poloniex.BTCUSD;
    let bitfinexVsBittrexBtc = cryptoSocket.Exchanges.bitfinex.BTCUSD - cryptoSocket.Exchanges.bittrex.BTCUSD;
    let gdaxVsBitfinexBtc = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.bitfinex.BTCUSD;
    let geminiVsBitfinexBtc = cryptoSocket.Exchanges.gemini.BTCUSD - cryptoSocket.Exchanges.bitfinex.BTCUSD;
    let poloniexVsBitfinexBtc = cryptoSocket.Exchanges.poloniex.BTCUSD - cryptoSocket.Exchanges.bitfinex.BTCUSD;
    let bittrexVsBitfinexBtc = cryptoSocket.Exchanges.bittrex.BTCUSD - cryptoSocket.Exchanges.bitfinex.BTCUSD;

    //ETH
    let bitfinexVsGdaxEth = cryptoSocket.Exchanges.bitfinex.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
    let bitfinexVsGeminiEth = cryptoSocket.Exchanges.bitfinex.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;
    let bitfinexVsPoloniexEth = cryptoSocket.Exchanges.bitfinex.ETHUSD - cryptoSocket.Exchanges.poloniex.ETHUSD;
    let bitfinexVsBittrexEth = cryptoSocket.Exchanges.bitfinex.ETHUSD - cryptoSocket.Exchanges.bittrex.ETHUSD;
    let gdaxVsBitfinexEth = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.bitfinex.ETHUSD;
    let geminiVsBitfinexEth = cryptoSocket.Exchanges.gemini.ETHUSD - cryptoSocket.Exchanges.bitfinex.ETHUSD;
    let poloniexVsBitfinexEth = cryptoSocket.Exchanges.poloniex.ETHUSD - cryptoSocket.Exchanges.bitfinex.ETHUSD;
    let bittrexVsBitfinexEth = cryptoSocket.Exchanges.bittrex.ETHUSD - cryptoSocket.Exchanges.bitfinex.ETHUSD;

    if (bitfinexVsGdaxBtc > largestSpread) {
      largestSpread = bitfinexVsGdaxBtc;
      spreadCurrency = "BTC";
    }

    if (bitfinexVsGeminiBtc > largestSpread) {
      largestSpread = bitfinexVsGeminiBtc;
      spreadCurrency = "BTC";
    }

    if (bitfinexVsPoloniexBtc > largestSpread) {
      largestSpread = bitfinexVsPoloniexBtc;
      spreadCurrency = "BTC";
    }

    if (bitfinexVsBittrexBtc > largestSpread) {
      largestSpread = bitfinexVsBittrexBtc;
      spreadCurrency = "BTC";
    }

    if (gdaxVsBitfinexBtc > largestSpread) {
      largestSpread = gdaxVsBitfinexBtc;
      spreadCurrency = "BTC";
    }

    if (geminiVsBitfinexBtc > largestSpread) {
      largestSpread = geminiVsBitfinexBtc;
      spreadCurrency = "BTC";
    }

    if (poloniexVsBitfinexBtc > largestSpread) {
      largestSpread = poloniexVsBitfinexBtc;
      spreadCurrency = "BTC";
    }

    if (bittrexVsBitfinexBtc > largestSpread) {
      largestSpread = bittrexVsBitfinexBtc;
      spreadCurrency = "BTC";
    }

    if (bitfinexVsGdaxEth > largestSpread) {
      largestSpread = bitfinexVsGdaxEth;
      spreadCurrency = "ETH";
    }

    if (bitfinexVsGeminiEth > largestSpread) {
      largestSpread = bitfinexVsGeminiEth;
      spreadCurrency = "ETH";
    }

    if (bitfinexVsPoloniexEth > largestSpread) {
      largestSpread = bitfinexVsPoloniexEth;
      spreadCurrency = "ETH";
    }

    if (bitfinexVsBittrexEth > largestSpread) {
      largestSpread = bitfinexVsBittrexEth;
      spreadCurrency = "ETH";
    }

    if (gdaxVsBitfinexEth > largestSpread) {
      largestSpread = gdaxVsBitfinexEth;
      spreadCurrency = "ETH";
    }

    if (geminiVsBitfinexEth > largestSpread) {
      largestSpread = geminiVsBitfinexEth;
      spreadCurrency = "ETH";
    }

    if (poloniexVsBitfinexEth > largestSpread) {
      largestSpread = poloniexVsBitfinexEth;
      spreadCurrency = "ETH";
    }

    if (bittrexVsBitfinexEth > largestSpread) {
      largestSpread = bittrexVsBitfinexEth;
      spreadCurrency = "ETH";
    }
  }

  if (exchange === 'bittrex') {
    //BTC
    let bittrexVsGdaxBtc = cryptoSocket.Exchanges.bittrex.BTCUSD - cryptoSocket.Exchanges.gdax.BTCUSD;
    let bittrexVsGeminiBtc = cryptoSocket.Exchanges.bittrex.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;
    let bittrexVsPoloniexBtc = cryptoSocket.Exchanges.bittrex.BTCUSD - cryptoSocket.Exchanges.poloniex.BTCUSD;
    let bittrexVsBitfinexBtc = cryptoSocket.Exchanges.bittrex.BTCUSD - cryptoSocket.Exchanges.bitfinex.BTCUSD;
    let gdaxVsBittrexBtc = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.bittrex.BTCUSD;
    let geminiVsBittrexBtc = cryptoSocket.Exchanges.gemini.BTCUSD - cryptoSocket.Exchanges.bittrex.BTCUSD;
    let poloniexVsBittrexBtc = cryptoSocket.Exchanges.poloniex.BTCUSD - cryptoSocket.Exchanges.bittrex.BTCUSD;
    let bitfinexVsBittrexBtc = cryptoSocket.Exchanges.bitfinex.BTCUSD - cryptoSocket.Exchanges.bittrex.BTCUSD;

    //ETH
    let bittrexVsGdaxEth = cryptoSocket.Exchanges.bittrex.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
    let bittrexVsGeminiEth = cryptoSocket.Exchanges.bittrex.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;
    let bittrexVsPoloniexEth = cryptoSocket.Exchanges.bittrex.ETHUSD - cryptoSocket.Exchanges.poloniex.ETHUSD;
    let bittrexVsBitfinexEth = cryptoSocket.Exchanges.bittrex.ETHUSD - cryptoSocket.Exchanges.bitfinex.ETHUSD;
    let gdaxVsBittrexEth = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.bittrex.ETHUSD;
    let geminiVsBittrexEth = cryptoSocket.Exchanges.gemini.ETHUSD - cryptoSocket.Exchanges.bittrex.ETHUSD;
    let poloniexVsBittrexEth = cryptoSocket.Exchanges.poloniex.ETHUSD - cryptoSocket.Exchanges.bittrex.ETHUSD;
    let bitfinexVsBittrexEth = cryptoSocket.Exchanges.bitfinex.ETHUSD - cryptoSocket.Exchanges.bittrex.ETHUSD;

    if (bittrexVsGdaxBtc > largestSpread) {
      largestSpread = bittrexVsGdaxBtc;
      spreadCurrency = "BTC";
    }

    if (bittrexVsGeminiBtc > largestSpread) {
      largestSpread = bittrexVsGeminiBtc;
      spreadCurrency = "BTC";
    }

    if (bittrexVsPoloniexBtc > largestSpread) {
      largestSpread = bittrexVsPoloniexBtc;
      spreadCurrency = "BTC";
    }

    if (bittrexVsBitfinexBtc > largestSpread) {
      largestSpread = bittrexVsBitfinexBtc;
      spreadCurrency = "BTC";
    }

    if (gdaxVsBittrexBtc > largestSpread) {
      largestSpread = gdaxVsBittrexBtc;
      spreadCurrency = "BTC";
    }

    if (geminiVsBittrexBtc > largestSpread) {
      largestSpread = geminiVsBittrexBtc;
      spreadCurrency = "BTC";
    }

    if (poloniexVsBittrexBtc > largestSpread) {
      largestSpread = poloniexVsBittrexBtc;
      spreadCurrency = "BTC";
    }

    if (bitfinexVsBittrexBtc > largestSpread) {
      largestSpread = bitfinexVsBittrexBtc;
      spreadCurrency = "BTC";
    }

    if (bittrexVsGdaxEth > largestSpread) {
      largestSpread = bittrexVsGdaxEth;
      spreadCurrency = "ETH";
    }

    if (bittrexVsGeminiEth > largestSpread) {
      largestSpread = bittrexVsGeminiEth;
      spreadCurrency = "ETH";
    }

    if (bittrexVsPoloniexEth > largestSpread) {
      largestSpread = bittrexVsPoloniexEth;
      spreadCurrency = "ETH";
    }

    if (bittrexVsBitfinexEth > largestSpread) {
      largestSpread = bittrexVsBitfinexEth;
      spreadCurrency = "ETH";
    }

    if (gdaxVsBittrexEth > largestSpread) {
      largestSpread = gdaxVsBittrexEth;
      spreadCurrency = "ETH";
    }

    if (geminiVsBittrexEth > largestSpread) {
      largestSpread = geminiVsBittrexEth;
      spreadCurrency = "ETH";
    }

    if (poloniexVsBittrexEth > largestSpread) {
      largestSpread = poloniexVsBittrexEth;
      spreadCurrency = "ETH";
    }

    if (bitfinexVsBittrexEth > largestSpread) {
      largestSpread = bitfinexVsBittrexEth;
      spreadCurrency = "ETH";
    }
  }

  if (largestSpread) {
    flag = false;
    if (currency === spreadCurrency) {
      setTimeout(trades[exchange].withdraw(spreadCurrency), 0);
    } else if (currency === "BTC") {
      // Price to buy ETH with all BTC is 1 ETH converted to BTC + 10 cents in BTC
      let price = (cryptoSocket.Exchanges.gemini.ETHBTC + (0.10 / cryptoSocket.Exchanges.gemini.BTCUSD)).toFixed(5);
      setTimeout(() => trades[exchange].buy("eth", price), 0);
    } else if (currency === "ETH") {
      // Price to sell all ETH for BTC is 1 ETH converted to BTC - 10 cents in BTC
      let price = (cryptoSocket.Exchanges.gemini.ETHBTC - (0.10 / cryptoSocket.Exchanges.gemini.BTCUSD)).toFixed(5);
      setTimeout(() => {() => trades[exchange].buy("btc" ,price)}, 0);
    }
  }
};


//ALEX TO DO LIST//

//1. need to make withdraw to take out all available
//2. need to work at refactoring bittrex and bitfinex
//3. need to test out poloniex with dave's and my code
//4. test performance of overall functions, especially checkArb function!!!



//getAccountInfo('ETH');

//buyOnGdax("0.01", "0.07543", "sell");
//getAccountInfo('ETH');
//getDepositAddressBittrex();
//requestBalancesBittrex();
//createNewCurrencyAddress();
//returnPoloAddresses();
//withdrawEthOnGdax();
//setInterval(()=>{console.log(cryptoSocket.Exchanges)}, 200);

//setTimeout(() => {checkArbitrage()}, 140000);

checkArbitrage = (exchange, currency) => {
  let gdaxEthToGemini = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;
  //let gdaxBtcToGemini = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.gemini.BTCUSD;
  // let gdaxBtcToBitfinex = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.bitfinex.BTCUSD;
  // let gdaxEthToBitfinex = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.bitfinex.ETHUSD;
  // let gdaxEthToPoloniex = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.poloniex.BTCUSD;
  // let gdaxBtcToPoloniex = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.poloniex.ETHUSD;
  // let gdaxEthToBittrex = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.bittrex.ETHUSD;
  // let gdaxBtcToBittrex = cryptoSocket.Exchanges.gdax.BTCUSD - cryptoSocket.Exchanges.bittrex.BTCUSD;
  let geminiEthToGdax = cryptoSocket.Exchanges.gemini.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;
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

  let spread = -Infinity;
  let tradeType;
  let trades = {
    "1": buyOnGdax,
    "2": withdrawFromGdax,
    "3": getGdaxAccountInfo,
    //3: buyBtcOnGemini,
    //4: buyBtcOnGdax,
    // 5: buyBtcOnBitfinex,
    // 6: buyEthOnBitfinex,
    // 7: buyEthOnPoloniex,
    // 8: buyBtcOnPoloniex,
    // 9: buyEthOnBittrex,
    // 10: buyBtcOnBittrex,
    "13": withdrawEthOnGdax,
    //14: withdrawBtcOnGdax,
    "15": withdrawEthOnGemini,
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
  };

  if (exchange !== 'gemini' && exchange !== 'gdax'){
    console.log("SOMETHING WENT WRONG AND PROCESS TERMINATED.");
    process.exit(1);
  }

  if (exchange === 'gdax' && currency === 'ETHUSD') {
    let gdaxEthToGemini = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;
    let geminiEthToGdax = cryptoSocket.Exchanges.gemini.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;

    if (gdaxEthToGemini > 0 && gdaxEthToGemini > spread) {
      spread = gdaxEthToGemini;
      tradeType = "15";
    }

    if (geminiEthToGdax > 0 && geminiEthToGdax > spread) {
      spread = geminiEthToGdax;
      tradeType = "13";
    }

    if (spread > -Infinity) {
      console.log("STOPPING ARB");
      flag = false;
      setTimeout(() => {trades[tradeType]()}, 1);
    }
  } else if(exchange === 'gemini' && currency === 'ETHUSD') {
    let gdaxEthToGemini = cryptoSocket.Exchanges.gdax.ETHUSD - cryptoSocket.Exchanges.gemini.ETHUSD;
    let geminiEthToGdax = cryptoSocket.Exchanges.gemini.ETHUSD - cryptoSocket.Exchanges.gdax.ETHUSD;

    if (gdaxEthToGemini > 0 && gdaxEthToGemini > spread) {
      spread = gdaxEthToGemini;
      tradeType = "15";
    }

    if (geminiEthToGdax > 0 && geminiEthToGdax > spread) {
      spread = geminiEthToGdax;
      tradeType = "13";
    }
    if (spread > -Infinity) {
      console.log("STOPPING ARB");
      flag = false;
      setTimeout(() => {trades[tradeType]()}, 1);
    }
  }

  setTimeout(() => {loopConditional('gdax', 'ETHUSD')}, 0);
}


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



loopConditional = (exchange, currency) => {
  flag = true;
  console.log(exchange);
  while (flag) {
    checkArbitrage(exchange, currency);
  }
};

// setTimeout(() => {
//   loopConditional("gdax", "ETHUSD");
// }, 60000);

// setTimeout(checkArbitrageGemini, 160000);




module.exports = {
  loopConditional
}

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
