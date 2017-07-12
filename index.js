require('dotenv').config();
require('dotenv').load();
var GeminiAPI = require('gemini-api');

var gemPub = process.env.GEMINI_PUB;
var gemPriv = process.env.GEMINI_PRIV;
var realTimePrices = {
    'geminiETH': 0,
    'geminiBTC': 0
};

var websocketClient = new GeminiAPI.default.WebsocketClient({ gemPub, gemPriv, sandbox: false });

// websocketClient.openMarketSocket('ethusd',(onOpen) => {
//   websocketClient.addMarketMessageListener(data => {
//     if(data.events[0].side === 'ask'){
//         realTimePrices['geminiETH'] = Number(data.events[0].price);
//         console.log("\n PRICE OF ETHER GEMINI IS: ", realTimePrices.geminiETH);
//     }
//   });
// });

websocketClient.openMarketSocket('btcusd',(onOpen) => {
  websocketClient.addMarketMessageListener(data => {
    if(data.events[0].side === 'ask'){
      realTimePrices['geminiBTC'] = Number(data.events[0].price);
      console.log("\n PRICE OF BTC GEMINI IS: ", realTimePrices.geminiBTC);
    }
  });
});


websocketClient.openMarketSocket('ethusd',(onOpen) => {
  websocketClient.addMarketMessageListener(data => {
    if(data.events[0].side === 'ask'){
      realTimePrices['geminiETH'] = Number(data.events[0].price);
      console.log("\n PRICE OF ETH GEMINI IS: ", realTimePrices.geminiETH);
    }
  });
});
