var request = require("request");
var config = require('./Config.js'); 
var base = require('./Base.js');

exports.GetTradeBook = function (fromCoin, toCoin, tradeLevel, count, callback)
{
    if (!count) count = 50;
    console.log("GetTradeBook request ");
    var URL = config.Config.BaseURL + "book" + "/" + config.Config.ApiKey + "/" + fromCoin + "_" + toCoin + "/" + tradeLevel + "?Count=" + count;
    base.Request("GET", URL, null, null, callback);
};