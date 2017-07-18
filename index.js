require('dotenv').config();
require('dotenv').load();
require('autobahn');

var GeminiAPI = require('gemini-api');
var plnx = require('plnx');

var gemPub = process.env.GEMINI_PUB;
var gemPriv = process.env.GEMINI_PRIV;
var polKey = process.env.POLONIEX_API_KEY;
var polPriv = process.env.POLONIEX_SECRET;

var realTimePrices = {
    gemini: {
      geminiETH: 0,
      geminiBTC: 0
    },
    poloniex: {
      poloniexETH: {
        highestBid: 0,
        lowestAsk: 0,
        high24hour: 0,
        low24hour: 0,
        transactionFee: 0,
        fourtyDayMovingAverage: 0
      },
      poloniexBTC: {
        highestBid: 0,
        lowestAsk: 0,
        high24hour: 0,
        low24hour: 0,
        transactionFee: 0,
        fourtyDayMovingAverage: 0
      }
    },
};


//GEMINI LOGIC//
var websocketClient = new GeminiAPI.default.WebsocketClient({ gemPub, gemPriv, sandbox: false });

//working for asking prices
websocketClient.openMarketSocket('btcusd',(onOpen) => {
  websocketClient.addMarketMessageListener(data => {
    if(data.events[0].side === 'ask'){
      realTimePrices['gemini']['geminiBTC'] = Number(data.events[0].price);
      console.log("\n PRICE OF BTC GEMINI IS: ", realTimePrices.gemini.geminiBTC);
    }
  });
});

//working for asking prices
websocketClient.openMarketSocket('ethusd',(onOpen) => {
  websocketClient.addMarketMessageListener(data => {
    if(data.events[0].side === 'ask'){
      realTimePrices['gemini']['geminiETH'] = Number(data.events[0].price);
      console.log("\n PRICE OF ETH GEMINI IS: ", realTimePrices.gemini.geminiETH);
    }
  });
});




//POLONIEX LOGIC

setTimeout(() => {
  setInterval(() => {
    plnx.returnTicker()
      .then((data) => {
        //USDT_BTC
        if(data.USDT_BTC.highestBid){
          realTimePrices['poloniex']['poloniexBTC']['highestBid'] = Number(data.USDT_BTC.highestBid);
        }
        if(data.USDT_BTC.lowestAsk){
          realTimePrices['poloniex']['poloniexBTC']['lowestAsk'] = Number(data.USDT_BTC.lowestAsk);
        }
        if(data.USDT_BTC.high24hr){
          realTimePrices['poloniex']['poloniexBTC']['high24hour'] = Number(data.USDT_BTC.high24hr);
        }
        if(data.USDT_BTC.low24hr){
          realTimePrices['poloniex']['poloniexBTC']['low24hour'] = Number(data.USDT_BTC.low24hr);
        }


        //USDT_ETH
        if(data.USDT_ETH.highestBid){
          realTimePrices['poloniex']['poloniexETH']['highestBid'] = Number(data.USDT_ETH.highestBid);
        }
        if(data.USDT_ETH.lowestAsk){
          realTimePrices['poloniex']['poloniexETH']['lowestAsk'] = Number(data.USDT_ETH.lowestAsk);
        }
        if(data.USDT_ETH.high24hr){
          realTimePrices['poloniex']['poloniexETH']['high24hour'] = Number(data.USDT_ETH.high24hr);
        }
        if(data.USDT_ETH.low24hr){
          realTimePrices['poloniex']['poloniexETH']['low24hour'] = Number(data.USDT_ETH.low24hr);
        }
      })
      .catch((err) => {
        console.log(err);
      });

      console.log("\n\nBTC AT POLONIEX IS: ", realTimePrices['poloniex']['poloniexBTC']);
      console.log("\n\n");
      console.log("ETH AT POLONIEX IS: ", realTimePrices['poloniex']['poloniexETH']);
  }, 250);
}, 10000);

setTimeout(() => {
  setInterval(() => {
    plnx.returnCurrencies()
        .then(data => {
          realTimePrices['poloniex']['poloniexBTC']['transactionFee'] = parseFloat(data['1CR'].BTC.txFee);
          realTimePrices['poloniex']['poloniexETH']['transctionFee'] = parseFloat(data['1CR'].ETH.txFee);
          console.log("\n\n\n\n\n\n\n\n\n\n\n\nTHE FLOATING POINT NUMBER IS: ", parseFloat(data['1CR'].ETH.txFee))
        })
        .catch(err => {
          console.log("ERROR GETTING TRANSACTION FEE: ", err);
        });
  }, 8000);
}, 15000);



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

        realTimePrices['poloniex']['poloniexBTC']['fourtyDayMovingAverage'] = movingAveragesBTC.reduce((a, b) => a + b, 0)/movingAveragesBTC.length;
        console.log(realTimePrices['poloniex']['poloniexBTC']['fourtyDayMovingAverage']);
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

        realTimePrices['poloniex']['poloniexETH']['fourtyDayMovingAverage'] = movingAveragesETH.reduce((a, b) => a + b, 0)/movingAveragesETH.length;
        //console.log(realTimePrices['poloniex']['poloniexETH']['fourtyDayMovingAverage']);
      })
      .catch(err => {
        console.log(err);
      });

  }, 150);
}, 25000);




// //DAVE's ARBITRAGE CHECKER VERSION1
checkArbitrage = () => {
  let mostProfitableSpread = -Infinity;
  let tradeType;

  if (
    realTimePrices.gemini.geminiBTC - realTimePrices.poloniex.poloniexBTC > 5 &&
    realTimePrices.poloniex.poloniexBTC !== 0 &&
    realTimePrices.gemini.geminiBTC !== 0
  ) {
    // console.log("BTC PRICE GAP FROM GEMINI TO POLONIEX", realTimePrices.gemini.geminiBTC - realTimePrices.poloniex.poloniexBTC);
    if (
      realTimePrices.gemini.geminiBTC - realTimePrices.poloniex.poloniexBTC > mostProfitableSpread
    ) {
      mostProfitableSpread = realTimePrices.gemini.geminiBTC - realTimePrices.poloniex.poloniexBTC;
      tradeType = "BTC IS WORTH MORE ON GEMINI THAN POLONIEX, SPREAD: ";
    }
  }

  if (
    realTimePrices.poloniex.poloniexBTC - realTimePrices.gemini.geminiBTC > 5 &&
    realTimePrices.poloniex.poloniexBTC !== 0 &&
    realTimePrices.gemini.geminiBTC !== 0
  ) {
    // console.log("BTC PRICE GAP FROM POLONIEX TO GEMINI", realTimePrices.poloBTC - realTimePrices.geminiBTC);
    if (
      realTimePrices.poloniex.poloniexBTC - realTimePrices.gemini.geminiBTC > mostProfitableSpread
    ) {
      mostProfitableSpread = realTimePrices.poloniex.poloniexBTC - realTimePrices.gemini.geminiBTC;
      tradeType = "BTC IS WORTH MORE ON POLONIEX THAN GEMINI, SPREAD: ";
    }
  }

  if (
    realTimePrices.poloniex.poloniexETH - realTimePrices.gemini.geminiETH > 5 &&
    realTimePrices.poloniex.poloniexETH !== 0 &&
    realTimePrices.gemini.geminiETH !== 0
  ) {
    // console.log("ETH PRICE GAP FROM POLONIEX TO GEMINI", realTimePrices.poloETH - realTimePrices.geminiETH);
    if (
      realTimePrices.poloniex.poloniexETH - realTimePrices.gemini.geminiETH > mostProfitableSpread
    ) {
      mostProfitableSpread = realTimePrices.poloniex.poloniexETH - realTimePrices.gemini.geminiETH;
      tradeType = "ETH IS WORTH MORE ON POLONIEX THAN GEMINI, SPREAD: ";
    }
  }

  if (
    realTimePrices.gemini.geminiETH - realTimePrices.poloniex.poloniexETH > 5 &&
    realTimePrices.poloniex.poloniexETH !== 0 &&
    realTimePrices.gemini.geminiETH !== 0
  ) {
    // console.log("ETH PRICE GAP FROM GEMINI TO POLONIEX", realTimePrices.gemoniETH - realTimePrices.poloETH);
    if (
      realTimePrices.gemini.geminiETH - realTimePrices.poloniex.poloniexETH > mostProfitableSpread
    ) {
      mostProfitableSpread = realTimePrices.gemini.geminiETH - realTimePrices.poloniex.poloniexETH;
      tradeType = "ETH IS WORTH MORE ON GEMINI THAN POLONIEX, SPREAD: ";
    }
  }

  if (mostProfitableSpread > -Infinity) {
    console.log(tradeType, mostProfitableSpread);
  }
};

loopConditional = () => {
  while (true) {
    if (
      realTimePrices.gemini.geminiBTC !== 0 &&
      realTimePrices.gemini.geminiETH !== 0 &&
      realTimePrices.poloniex.poloniexBTC !== 0 &&
      realTimePrices.poloniex.poloniexETH !== 0
    ) {
      checkArbitrage();
    }
  }
}

setTimeout(() => {
  setInterval(() => {
    loopConditional();
  }, 1000);
}, 40000);
