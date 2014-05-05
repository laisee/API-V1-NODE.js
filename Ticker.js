var request = require("request");
var coin = require('./Config.js');
var base = require('./Base.js');

exports.GetTicker = function (fromCoin, toCoin, tradeLevel, callback) {
    console.log("GetTicker request ");
    var URL = coin.Config.BaseURL + "ticker" + "/" + coin.Config.ApiKey + "/" + fromCoin + "_" + toCoin + "/" + tradeLevel;
    base.Request("GET", URL, null, null, callback);
};


