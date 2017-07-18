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
        transactionFee: 0
      },
      poloniexBTC: {
        highestBid: 0,
        lowestAsk: 0,
        high24hour: 0,
        low24hour: 0,
        transactionFee: 0
      }
    },
};


//POLONIEX LOGIC//
// plnx.push((session) => {
//   session.subscribe('channel', (data) => {
//     console.log(data);
//   })
// });

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

    var today = new Date();
    var todayDate = today.setDate(today.getDate()-0);
    var fourtyDaysAgoDate = today.setDate(today.getDate()-40);

    // plnx.returnChartData({ currencyPair: 'USDT_BTC', start: fourtyDaysAgoDate, end: todayDate, period: 86400 })
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    plnx.returnCurrencies({})
      .then(data => {
        //console.log(data);
        realTimePrices.poloniex.poloniexBTC.transactionFee = Number(data.BTC.txFee);
        realTimePrices.poloniex.poloniexETH.transctionFee = Number(data.ETH.txFee);
      })
      .catch(err => {
        console.log("ERROR GETTING TRANSACTION FEE: ", err);
      });

      console.log("\n\nBTC AT POLONIEX IS: ", realTimePrices['poloniex']['poloniexBTC']);
      console.log("\n\n");
      console.log("ETH AT POLONIEX IS: ", realTimePrices['poloniex']['poloniexETH']);

}, 80);



// //GEMINI LOGIC//
var websocketClient = new GeminiAPI.default.WebsocketClient({ gemPub, gemPriv, sandbox: false });

// //working
websocketClient.openMarketSocket('btcusd',(onOpen) => {
  websocketClient.addMarketMessageListener(data => {
    if(data.events[0].side === 'ask'){
      realTimePrices['gemini']['geminiBTC'] = Number(data.events[0].price);
      console.log("\n PRICE OF BTC GEMINI IS: ", realTimePrices.gemini.geminiBTC);
    }
  });
});

//working
websocketClient.openMarketSocket('ethusd',(onOpen) => {
  websocketClient.addMarketMessageListener(data => {
    if(data.events[0].side === 'ask'){
      realTimePrices['gemini']['geminiETH'] = Number(data.events[0].price);
      console.log("\n PRICE OF ETH GEMINI IS: ", realTimePrices.gemini.geminiETH);
    }
  });
});
