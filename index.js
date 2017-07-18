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
    'gemini': {
      'geminiETH': 0,
      'geminiBTC': 0
    },
    'poloniex': {
      'poloniexETH': {
        'highestBid': 0,
        'lowestAsk': 0,
        'high24hour': 0,
        'low24hour': 0
      },
      'poloniexBTC': {
        'highestBid': 0,
        'lowestAsk': 0,
        'high24hour': 0,
        'low24hour': 0
      }
    },
};

//console.log(realTimePrices.poloniex.poloniexBTC.high24hr);


//POLONIEX LOGIC//
// plnx.push((session) => {
//   session.subscribe('channel', (data) => {
//     console.log(data);
//   })
// });

// setInterval(() => {
//   plnx.returnTicker()
//     .then((data) => {
//       console.log("JUST UPDATED: ");
//       //console.log(data.USDT_BTC.highestBid);
//       if(data.USDT_BTC.highestBid){
//         realTimePrices['poloniex']['poloniexBTC']['highestBid'] = Number(data.USDT_BTC.highestBid);
//       }
//       if(data.USDT_BTC.lowestAsk){
//         realTimePrices['poloniex']['poloniexBTC']['lowestAsk'] = Number(data.USDT_BTC.lowestAsk);
//       }
//       if(data.USDT_BTC.high24hr){
//         realTimePrices['poloniex']['poloniexBTC']['high24hour'] = Number(data.USDT_BTC.high24hr);
//       }
//       if(data.USDT_BTC.low24hr){
//         realTimePrices['poloniex']['poloniexBTC']['low24hour'] = Number(data.USDT_BTC.low24hr);
//       }
//       console.log("THE PRICE OF BTC AT POLONIEX IS: ", realTimePrices['poloniex']['poloniexBTC']);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }, 10000);



//GEMINI LOGIC//
var websocketClient = new GeminiAPI.default.WebsocketClient({ gemPub, gemPriv, sandbox: false });

// websocketClient.openMarketSocket('ethusd',(onOpen) => {
//   websocketClient.addMarketMessageListener(data => {
//     if(data.events[0].side === 'ask'){
//         realTimePrices['geminiETH'] = Number(data.events[0].price);
//         console.log("\n PRICE OF ETHER GEMINI IS: ", realTimePrices.geminiETH);
//     }
//   });
// });

//working
// websocketClient.openMarketSocket('btcusd',(onOpen) => {
//   websocketClient.addMarketMessageListener(data => {
//     if(data.events[0].side === 'ask'){
//       realTimePrices['gemini']['geminiBTC'] = Number(data.events[0].price);
//       console.log("\n PRICE OF BTC GEMINI IS: ", realTimePrices.gemini.geminiBTC);
//     }
//   });
// });

//working
websocketClient.openMarketSocket('ethusd',(onOpen) => {
  websocketClient.addMarketMessageListener(data => {
    if(data.events[0].side === 'ask'){
      realTimePrices['gemini']['geminiETH'] = Number(data.events[0].price);
      console.log("\n PRICE OF ETH GEMINI IS: ", realTimePrices.gemini.geminiETH);
    }
  });
});
