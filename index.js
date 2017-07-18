require('dotenv').config();
require('dotenv').load();

const coinTicker = require('coin-ticker');
var GeminiAPI = require('gemini-api');
var plnx = require('plnx');

var gemPub = process.env.GEMINI_PUB;
var gemPriv = process.env.GEMINI_PRIV;
var polKey = process.env.POLONIEX_API_KEY;
var polPriv = process.env.POLONIEX_SECRET;

var realTimePrices = {
    gemini: {
      geminiETH_USD: 0,
      geminiBTC_USD: 0
    },
    poloniex: {
      poloniexUSDT_ETH: {
        highestBid: 0,
        lowestAsk: 0,
        high24hour: 0,
        low24hour: 0,
        fourtyDayMovingAverage: 0,
        transactionFee: 0.0,
      },
      poloniexUSDT_BTC: {
        highestBid: 0,
        lowestAsk: 0,
        high24hour: 0,
        low24hour: 0,
        fourtyDayMovingAverage: 0,
        transactionFee: 0.0,
      }
    },
    kraken: {
      krakenETH_USD: {
        last: 0,
        ask: 0,
        bid: 0,
        high: 0,
        vol: 0,
        timestamp: '',
        exchange: 'kraken',
        pair: 'eth_usd',
      },
      krakenBTC_USD: {
        last: 0,
        ask: 0,
        bid: 0,
        high: 0,
        vol: 0,
        timestamp: '',
        exchange: 'kraken',
        pair: 'btc_usd',
      },
      krakenETH_BTC: {
        last: 0,
        ask: 0,
        bid: 0,
        high: 0,
        vol: 0,
        timestamp: '',
        exchange: 'kraken',
        pair: 'eth_btc',
      },
    },
    okcoin: {
      okcoinBTC_USD: {
        last: 0,
        ask: 0,
        bid: 0,
        high: 0,
        vol: 0,
        timestamp: '',
        exchange: 'okcoin',
        pair: 'btc_usd',
      },
      okcoinETH_USD: {
        last: 0,
        ask: 0,
        bid: 0,
        high: 0,
        vol: 0,
        timestamp: '',
        exchange: 'okcoin',
        pair: 'eth_usd',
      }
    },
    BTCe: {
      BTCeBTC_USD: {
        last: 0,
        ask: 0,
        bid: 0,
        high: 0,
        vol: 0,
        timestamp: '',
        exchange: 'btce',
        pair: 'btc_usd',
      },
      BTCeETH_USD: {
        last: 0,
        ask: 0,
        bid: 0,
        high: 0,
        vol: 0,
        timestamp: '',
        exchange: 'btce',
        pair: 'eth_usd',
      },
      BTCeETH_BTC: {
        last: 0,
        ask: 0,
        bid: 0,
        high: 0,
        vol: 0,
        timestamp: '',
        exchange: 'btce',
        pair: 'eth_btc',
      }
    },
    bittrex: {
      bittrexBTC_USD: {
        last: 0,
        ask: 0,
        bid: 0,
        high: 0,
        vol: 0,
        timestamp: '',
        exchange: 'bittrex',
        pair: 'btc_usd',
      },
      bittrexETH_USD: {
        last: 0,
        ask: 0,
        bid: 0,
        high: 0,
        vol: 0,
        timestamp: '',
        exchange: 'bittrex',
        pair: 'eth_usd',
      }
    },
    bitfinex: {
      bitfinexBTC_USD: {
        last: 0,
        ask: 0,
        bid: 0,
        high: 0,
        vol: 0,
        timestamp: '',
        exchange: 'bitfinex',
        pair: 'btc_usd',
      },
      bitfinexETH_USD: {
        last: 0,
        ask: 0,
        bid: 0,
        high: 0,
        vol: 0,
        timestamp: '',
        exchange: 'bitfinex',
        pair: 'eth_usd',
      },
      bitfinexETH_BTC: {
        last: 0,
        ask: 0,
        bid: 0,
        high: 0,
        vol: 0,
        timestamp: '',
        exchange: 'bitfinex',
        pair: 'eth_btc',
      }
    },
    exmo: {
      exmoBTC_USD: {
        last: 0,
        ask: 0,
        bid: 0,
        high: 0,
        vol: 0,
        timestamp: '',
        exchange: 'exmo',
        pair: 'btc_usd',
      },
      exmoETH_USD: {
        last: 0,
        ask: 0,
        bid: 0,
        high: 0,
        vol: 0,
        timestamp: '',
        exchange: 'exmo',
        pair: 'eth_usd',
      },
      exmoETH_BTC: {
        last: 0,
        ask: 0,
        bid: 0,
        high: 0,
        vol: 0,
        timestamp: '',
        exchange: 'exmo',
        pair: 'eth_btc',
      }
    }
};



//KRAKEN, OKCOIN, BTCE, BITTREX LOGIC
setTimeout(() => {
  setInterval(() => {
    coinTicker('kraken', 'ETH_USD')
      .then(tick => {
        realTimePrices.kraken.krakenETH_USD.last = parseFloat(tick.last);
        realTimePrices.kraken.krakenETH_USD.ask = parseFloat(tick.ask);
        realTimePrices.kraken.krakenETH_USD.bid = parseFloat(tick.bid);
        realTimePrices.kraken.krakenETH_USD.high = parseFloat(tick.high);
        realTimePrices.kraken.krakenETH_USD.vol = parseFloat(tick.vol);
        realTimePrices.kraken.krakenETH_USD.timestamp = tick.timestamp;
        realTime
        realTi.log("\n\n\n\nETH_USD AT KRAKEN IS: ", realTimePrices.kraken.krakenETH_USD);
      });

      coinTicker('kraken', 'BTC_USD')
        .then(tick => {
          realTimePrices.kraken.krakenBTC_USD.last = parseFloat(tick.last);
          realTimePrices.kraken.krakenBTC_USD.ask = parseFloat(tick.ask);
          realTimePrices.kraken.krakenBTC_USD.bid = parseFloat(tick.bid);
          realTimePrices.kraken.krakenBTC_USD.high = parseFloat(tick.high);
          realTimePrices.kraken.krakenBTC_USD.vol = parseFloat(tick.vol);
          realTimePrices.kraken.krakenBTC_USD.timestamp = tick.timestamp;
          console.log("\n\n\n\nBTC_USD AT KRAKEN IS: ", realTimePrices.kraken.krakenBTC_USD);
        });

        coinTicker('kraken', 'ETH_BTC')
          .then(tick => {
            realTimePrices.kraken.krakenETH_BTC.last = parseFloat(tick.last);
            realTimePrices.kraken.krakenETH_BTC.ask = parseFloat(tick.ask);
            realTimePrices.kraken.krakenETH_BTC.bid = parseFloat(tick.bid);
            realTimePrices.kraken.krakenETH_BTC.high = parseFloat(tick.high);
            realTimePrices.kraken.krakenETH_BTC.vol = parseFloat(tick.vol);
            realTimePrices.kraken.krakenETH_BTC.timestamp = tick.timestamp;
            console.log("\n\n\n\nETH_BTC AT KRAKEN IS: ", realTimePrices.kraken.krakenETH_BTC);
          });

        coinTicker('okcoin', 'ETH_USD')
          .then(tick => {
            realTimePrices.okcoin.okcoinETH_USD.last = parseFloat(tick.last);
            realTimePrices.okcoin.okcoinETH_USD.ask = parseFloat(tick.ask);
            realTimePrices.okcoin.okcoinETH_USD.bid = parseFloat(tick.bid);
            realTimePrices.okcoin.okcoinETH_USD.high = parseFloat(tick.high);
            realTimePrices.okcoin.okcoinETH_USD.vol = parseFloat(tick.vol);
            realTimePrices.okcoin.okcoinETH_USD.timestamp = tick.timestamp;
            console.log("\n\n\n\nETH_USD AT OKCOIN IS: ", realTimePrices.okcoin.okcoinETH_USD);
          });

        coinTicker('okcoin', 'BTC_USD')
          .then(tick => {
            realTimePrices.okcoin.okcoinBTC_USD.last = parseFloat(tick.last);
            realTimePrices.okcoin.okcoinBTC_USD.ask = parseFloat(tick.ask);
            realTimePrices.okcoin.okcoinBTC_USD.bid = parseFloat(tick.bid);
            realTimePrices.okcoin.okcoinBTC_USD.high = parseFloat(tick.high);
            realTimePrices.okcoin.okcoinBTC_USD.vol = parseFloat(tick.vol);
            realTimePrices.okcoin.okcoinBTC_USD.timestamp = tick.timestamp;
            console.log("\n\n\n\nBTC_USD AT OKCOIN IS: ", realTimePrices.okcoin.okcoinBTC_USD);
          });

        coinTicker('btce', 'BTC_USD')
          .then(tick => {
            realTimePrices.BTCe.BTCeBTC_USD.last = parseFloat(tick.last);
            realTimePrices.BTCe.BTCeBTC_USD.ask = parseFloat(tick.ask);
            realTimePrices.BTCe.BTCeBTC_USD.bid = parseFloat(tick.bid);
            realTimePrices.BTCe.BTCeBTC_USD.high = parseFloat(tick.high);
            realTimePrices.BTCe.BTCeBTC_USD.vol = parseFloat(tick.vol);
            realTimePrices.BTCe.BTCeBTC_USD.timestamp = tick.timestamp;
            console.log("\n\n\n\nBTC_USD AT BTCe IS: ", realTimePrices.BTCe.BTCeBTC_USD);
          });

        coinTicker('btce', 'ETH_USD')
          .then(tick => {
            realTimePrices.BTCe.BTCeETH_USD.last = parseFloat(tick.last);
            realTimePrices.BTCe.BTCeETH_USD.ask = parseFloat(tick.ask);
            realTimePrices.BTCe.BTCeETH_USD.bid = parseFloat(tick.bid);
            realTimePrices.BTCe.BTCeETH_USD.high = parseFloat(tick.high);
            realTimePrices.BTCe.BTCeETH_USD.vol = parseFloat(tick.vol);
            realTimePrices.BTCe.BTCeETH_USD.timestamp = tick.timestamp;
            console.log("\n\n\n\nETH_USD AT BTCe IS: ", realTimePrices.BTCe.BTCeETH_USD);
          });

        coinTicker('btce', 'ETH_BTC')
          .then(tick => {
            realTimePrices.BTCe.BTCeETH_BTC.last = parseFloat(tick.last);
            realTimePrices.BTCe.BTCeETH_BTC.ask = parseFloat(tick.ask);
            realTimePrices.BTCe.BTCeETH_BTC.bid = parseFloat(tick.bid);
            realTimePrices.BTCe.BTCeETH_BTC.high = parseFloat(tick.high);
            realTimePrices.BTCe.BTCeETH_BTC.vol = parseFloat(tick.vol);
            realTimePrices.BTCe.BTCeETH_BTC.timestamp = tick.timestamp;
            console.log("\n\n\n\nETH_BTC AT BTCe IS: ", realTimePrices.BTCe.BTCeETH_BTC);
          });

      coinTicker('bittrex', 'ETH_USD')
        .then(tick => {
          realTimePrices.bittrex.bittrexETH_USD.last = parseFloat(tick.last);
          realTimePrices.bittrex.bittrexETH_USD.ask = parseFloat(tick.ask);
          realTimePrices.bittrex.bittrexETH_USD.bid = parseFloat(tick.bid);
          realTimePrices.bittrex.bittrexETH_USD.high = parseFloat(tick.high);
          realTimePrices.bittrex.bittrexETH_USD.vol = parseFloat(tick.vol);
          realTimePrices.bittrex.bittrexETH_USD.timestamp = tick.timestamp;
          console.log("\n\n\n\nETH_USD AT bittrex IS: ", realTimePrices.bittrex.bittrexETH_USD);
        });

      coinTicker('bittrex', 'BTC_USD')
        .then(tick => {
          realTimePrices.bittrex.bittrexBTC_USD.last = parseFloat(tick.last);
          realTimePrices.bittrex.bittrexBTC_USD.ask = parseFloat(tick.ask);
          realTimePrices.bittrex.bittrexBTC_USD.bid = parseFloat(tick.bid);
          realTimePrices.bittrex.bittrexBTC_USD.high = parseFloat(tick.high);
          realTimePrices.bittrex.bittrexBTC_USD.vol = parseFloat(tick.vol);
          realTimePrices.bittrex.bittrexBTC_USD.timestamp = tick.timestamp;
          console.log("\n\n\n\nBTC_USD AT BITTREX IS: ", realTimePrices.bittrex.bittrexBTC_USD);
        });

    }, 1200);
}, 10500);


setTimeout(() => {
  setInterval(() => {
    coinTicker('bitfinex', 'ETH_USD')
      .then(tick => {
        realTimePrices.bitfinex.bitfinexETH_USD.last = parseFloat(tick.last);
        realTimePrices.bitfinex.bitfinexETH_USD.ask = parseFloat(tick.ask);
        realTimePrices.bitfinex.bitfinexETH_USD.bid = parseFloat(tick.bid);
        realTimePrices.bitfinex.bitfinexETH_USD.high = parseFloat(tick.high);
        realTimePrices.bitfinex.bitfinexETH_USD.vol = parseFloat(tick.vol);
        realTimePrices.bitfinex.bitfinexETH_USD.timestamp = tick.timestamp;
        console.log("\n\n\n\nETH_USD AT BITFINEX IS: ", realTimePrices.bitfinex.bitfinexETH_USD);
      });

    coinTicker('bitfinex', 'BTC_USD')
      .then(tick => {
        realTimePrices.bitfinex.bitfinexBTC_USD.last = parseFloat(tick.last);
        realTimePrices.bitfinex.bitfinexBTC_USD.ask = parseFloat(tick.ask);
        realTimePrices.bitfinex.bitfinexBTC_USD.bid = parseFloat(tick.bid);
        realTimePrices.bitfinex.bitfinexBTC_USD.high = parseFloat(tick.high);
        realTimePrices.bitfinex.bitfinexBTC_USD.vol = parseFloat(tick.vol);
        realTimePrices.bitfinex.bitfinexBTC_USD.timestamp = tick.timestamp;
        console.log("\n\n\n\nBTC_USD AT BITFINEX IS: ", realTimePrices.bitfinex.bitfinexBTC_USD);
      });

      coinTicker('bitfinex', 'ETH_BTC')
        .then(tick => {
          realTimePrices.bitfinex.bitfinexETH_BTC.last = parseFloat(tick.last);
          realTimePrices.bitfinex.bitfinexETH_BTC.ask = parseFloat(tick.ask);
          realTimePrices.bitfinex.bitfinexETH_BTC.bid = parseFloat(tick.bid);
          realTimePrices.bitfinex.bitfinexETH_BTC.high = parseFloat(tick.high);
          realTimePrices.bitfinex.bitfinexETH_BTC.vol = parseFloat(tick.vol);
          realTimePrices.bitfinex.bitfinexETH_BTC.timestamp = tick.timestamp;
          console.log("\n\n\n\nETH_BTC AT BITFINEX IS: ", realTimePrices.bitfinex.bitfinexETH_BTC);
        });
      }, 1900)
}, 10500);


setTimeout(() => {
  setInterval(() => {
    coinTicker('exmo', 'ETH_USD')
      .then(tick => {
        realTimePrices.exmo.exmoETH_USD.last = parseFloat(tick.last);
        realTimePrices.exmo.exmoETH_USD.ask = parseFloat(tick.ask);
        realTimePrices.exmo.exmoETH_USD.bid = parseFloat(tick.bid);
        realTimePrices.exmo.exmoETH_USD.high = parseFloat(tick.high);
        realTimePrices.exmo.exmoETH_USD.vol = parseFloat(tick.vol);
        realTimePrices.exmo.exmoETH_USD.timestamp = tick.timestamp;
        console.log("\n\n\n\nETH_USD AT EXMO IS: ", realTimePrices.exmo.exmoETH_USD);
      });

    coinTicker('exmo', 'BTC_USD')
      .then(tick => {
        realTimePrices.exmo.exmoBTC_USD.last = parseFloat(tick.last);
        realTimePrices.exmo.exmoBTC_USD.ask = parseFloat(tick.ask);
        realTimePrices.exmo.exmoBTC_USD.bid = parseFloat(tick.bid);
        realTimePrices.exmo.exmoBTC_USD.high = parseFloat(tick.high);
        realTimePrices.exmo.exmoBTC_USD.vol = parseFloat(tick.vol);
        realTimePrices.exmo.exmoBTC_USD.timestamp = tick.timestamp;
        console.log("\n\n\n\nBTC_USD AT EXMO IS: ", realTimePrices.exmo.exmoBTC_USD);
      });

      coinTicker('exmo', 'ETH_BTC')
        .then(tick => {
          realTimePrices.exmo.exmoETH_BTC.last = parseFloat(tick.last);
          realTimePrices.exmo.exmoETH_BTC.ask = parseFloat(tick.ask);
          realTimePrices.exmo.exmoETH_BTC.bid = parseFloat(tick.bid);
          realTimePrices.exmo.exmoETH_BTC.high = parseFloat(tick.high);
          realTimePrices.exmo.exmoETH_BTC.vol = parseFloat(tick.vol);
          realTimePrices.exmo.exmoETH_BTC.timestamp = tick.timestamp;
          console.log("\n\n\n\nETH_BTC AT EXMO IS: ", realTimePrices.exmo.exmoETH_BTC);
        });


  }, 1500)
}, 10500)



//GEMINI LOGIC//
var websocketClient = new GeminiAPI.default.WebsocketClient({ gemPub, gemPriv, sandbox: false });

//working for asking prices
setTimeout(() => {
  websocketClient.openMarketSocket('btcusd',(onOpen) => {
    websocketClient.addMarketMessageListener(data => {
      if(data.events[0].side === 'ask'){
        realTimePrices['gemini']['geminiBTC_USD'] = Number(data.events[0].price);
        console.log("\n PRICE OF BTC GEMINI IS: ", realTimePrices.gemini.geminiBTC_USD);
      }
    });
  });
}, 2500)

// //working for asking prices
setTimeout(() => {
  websocketClient.openMarketSocket('ethusd',(onOpen) => {
    websocketClient.addMarketMessageListener(data => {
      if(data.events[0].side === 'ask'){
        realTimePrices['gemini']['geminiETH_USD'] = Number(data.events[0].price);
        console.log("\n PRICE OF ETH GEMINI IS: ", realTimePrices.gemini.geminiETH_USD);
      }
    });
  });
}, 5600)




// //POLONIEX LOGIC
setTimeout(() => {
  setInterval(() => {
    plnx.returnTicker()
      .then((data) => {
        //USDT_BTC
        if(data.USDT_BTC.highestBid){
          realTimePrices['poloniex']['poloniexUSDT_BTC']['highestBid'] = parseFloat(data.USDT_BTC.highestBid);
        }
        if(data.USDT_BTC.lowestAsk){
          realTimePrices['poloniex']['poloniexUSDT_BTC']['lowestAsk'] = parseFloat(data.USDT_BTC.lowestAsk);
        }
        if(data.USDT_BTC.high24hr){
          realTimePrices['poloniex']['poloniexUSDT_BTC']['high24hour'] = parseFloat(data.USDT_BTC.high24hr);
        }
        if(data.USDT_BTC.low24hr){
          realTimePrices['poloniex']['poloniexUSDT_BTC']['low24hour'] = parseFloat(data.USDT_BTC.low24hr);
        }


        //USDT_ETH
        if(data.USDT_ETH.highestBid){
          realTimePrices['poloniex']['poloniexUSDT_ETH']['highestBid'] = parseFloat(data.USDT_ETH.highestBid);
        }
        if(data.USDT_ETH.lowestAsk){
          realTimePrices['poloniex']['poloniexUSDT_ETH']['lowestAsk'] = parseFloat(data.USDT_ETH.lowestAsk);
        }
        if(data.USDT_ETH.high24hr){
          realTimePrices['poloniex']['poloniexUSDT_ETH']['high24hour'] = parseFloat(data.USDT_ETH.high24hr);
        }
        if(data.USDT_ETH.low24hr){
          realTimePrices['poloniex']['poloniexUSDT_ETH']['low24hour'] = parseFloat(data.USDT_ETH.low24hr);
        }
      })
      .catch((err) => {
        console.log("GOOD BYE: ", err);
        console.log(err);
      });

      console.log("\n\nBTC AT POLONIEX IS: ", realTimePrices['poloniex']['poloniexUSDT_BTC']);
      console.log("\n\n");
      console.log("ETH AT POLONIEX IS: ", realTimePrices['poloniex']['poloniexUSDT_ETH']);

      plnx.returnCurrencies({})
        .then(data => {
          console.log("FEES ARE: ", realTimePrices.poloniex.poloniexUSDT_BTC.transactionFee)
          realTimePrices.poloniex.poloniexUSDT_BTC.transactionFee = parseFloat(data.BTC.txFee);
          realTimePrices.poloniex.poloniexUSDT_ETH.transactionFee = parseFloat(data.ETH.txFee);
        })
        .catch(err => {
          console.log("ERROR GETTING TRANSACTION FEE: ", err);
        });

  }, 175);
}, 6000);



setTimeout(() => {
  setInterval(() => {
    var movingAverages = [];
    var today = new Date();
    var todayDate = Math.floor(today.setDate(today.getDate()-0)/1000);
    var fourtyDaysAgoDate = Math.floor(today.setDate(today.getDate()-40)/1000);

    plnx.returnChartData({ currencyPair: 'USDT_BTC', start: fourtyDaysAgoDate, end: todayDate, period: 86400 })
      .then(data => {
        var movingAveragesBTC = [];
        data.forEach(day => {
          movingAveragesBTC.push(day.close);
        })

        realTimePrices['poloniex']['poloniexUSDT_BTC']['fourtyDayMovingAverage'] = movingAveragesBTC.reduce((a, b) => a + b, 0)/movingAveragesBTC.length;
        //console.log(realTimePrices['poloniex']['poloniexUSDT_BTC']['fourtyDayMovingAverage']);
      })
      .catch(err => {
        console.log(err);
      });


    plnx.returnChartData({ currencyPair: 'USDT_ETH', start: fourtyDaysAgoDate, end: todayDate, period: 86400 })
      .then(data => {
        var movingAveragesETH = [];
        data.forEach(day => {
          movingAveragesETH.push(day.close);
        })

        realTimePrices['poloniex']['poloniexUSDT_ETH']['fourtyDayMovingAverage'] = movingAveragesETH.reduce((a, b) => a + b, 0)/movingAveragesETH.length;
        //console.log(realTimePrices['poloniex']['poloniexUSDT_ETH']['fourtyDayMovingAverage']);
      })
      .catch(err => {
        console.log(err);
      });

  }, 280);
}, 7000);




// //DAVE's ARBITRAGE CHECKER VERSION1
function checkArbitrage(){
  var mostProfitableSpread = -1000000;
  var tradeType;

  if (
    (realTimePrices.gemini.geminiBTC_USD - realTimePrices.poloniex.poloniexUSDT_BTC) > 5 &&
    realTimePrices.poloniex.poloniexUSDT_BTC !== 0 &&
    realTimePrices.gemini.geminiBTC_USD !== 0
  ) {
    // console.log("BTC PRICE GAP FROM GEMINI TO POLONIEX", realTimePrices.gemini.geminiBTC_USD - realTimePrices.poloniex.poloniexUSDT_BTC);
    if (
      (realTimePrices.gemini.geminiBTC_USD - realTimePrices.poloniex.poloniexUSDT_BTC) > mostProfitableSpread
    ) {
      mostProfitableSpread = realTimePrices.gemini.geminiBTC_USD - realTimePrices.poloniex.poloniexUSDT_BTC;
      tradeType = "BTC IS WORTH MORE ON GEMINI THAN POLONIEX, SPREAD: ";
    }
  }

  if (
    (realTimePrices.poloniex.poloniexUSDT_BTC - realTimePrices.gemini.geminiBTC_USD) > 5 &&
    realTimePrices.poloniex.poloniexUSDT_BTC !== 0 &&
    realTimePrices.gemini.geminiBTC_USD !== 0
  ) {
    // console.log("BTC PRICE GAP FROM POLONIEX TO GEMINI", realTimePrices.poloBTC - realTimePrices.geminiBTC_USD);
    if (
      (realTimePrices.poloniex.poloniexUSDT_BTC - realTimePrices.gemini.geminiBTC_USD) > mostProfitableSpread
    ) {
      mostProfitableSpread = realTimePrices.poloniex.poloniexUSDT_BTC - realTimePrices.gemini.geminiBTC_USD;
      tradeType = "BTC IS WORTH MORE ON POLONIEX THAN GEMINI, SPREAD: ";
    }
  }

  if (
    (realTimePrices.poloniex.poloniexUSDT_ETH - realTimePrices.gemini.geminiETH_USD) > 5 &&
    realTimePrices.poloniex.poloniexUSDT_ETH !== 0 &&
    realTimePrices.gemini.geminiETH_USD !== 0
  ) {
    // console.log("ETH PRICE GAP FROM POLONIEX TO GEMINI", realTimePrices.poloETH - realTimePrices.geminiETH_USD);
    if (
      (realTimePrices.poloniex.poloniexUSDT_ETH - realTimePrices.gemini.geminiETH_USD) > mostProfitableSpread
    ) {
      mostProfitableSpread = realTimePrices.poloniex.poloniexUSDT_ETH - realTimePrices.gemini.geminiETH_USD;
      tradeType = "ETH IS WORTH MORE ON POLONIEX THAN GEMINI, SPREAD: ";
    }
  }

  if (
    (realTimePrices.gemini.geminiETH_USD - realTimePrices.poloniex.poloniexUSDT_ETH) > 5 &&
    realTimePrices.poloniex.poloniexUSDT_ETH !== 0 &&
    realTimePrices.gemini.geminiETH_USD !== 0
  ) {
    // console.log("ETH PRICE GAP FROM GEMINI TO POLONIEX", realTimePrices.gemoniETH - realTimePrices.poloETH);
    if (
      (realTimePrices.gemini.geminiETH_USD - realTimePrices.poloniex.poloniexUSDT_ETH) > mostProfitableSpread
    ) {
      mostProfitableSpread = realTimePrices.gemini.geminiETH_USD - realTimePrices.poloniex.poloniexUSDT_ETH;
      tradeType = "ETH IS WORTH MORE ON GEMINI THAN POLONIEX, SPREAD: ";
    }
  }

  if (mostProfitableSpread > -1000000) {
    console.log(tradeType, mostProfitableSpread);
  }
};

function loopConditional(){
  while (true) {
    if (
      realTimePrices.gemini.geminiBTC_USD !== 0 &&
      realTimePrices.gemini.geminiETH_USD !== 0 &&
      realTimePrices.poloniex.poloniexUSDT_BTC !== 0 &&
      realTimePrices.poloniex.poloniexUSDT_ETH !== 0
    ) {
      checkArbitrage();
    }
  }
}


//checkArbitrage function does not work and freezes
//loop from gathering information
// setTimeout(() => {
//   setInterval(() => {
//     console.log(realTimePrices.poloniex.poloniexUSDT_BTC.transactionFee);
//     loopConditional();
//   }, 2000);
// }, 11000);
