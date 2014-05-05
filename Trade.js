var request = require("request");
var session = require('./Session.js'); 
var config = require('./Config.js'); 
var base = require('./Base.js');

exports.New = function (fromCoin, toCoint, tradeType, tradeSide, tradePrice, units, tradeLevel, callback) {
        console.log(session.GetSessionToken())
	 var URL = config.Config.BaseURL + "order/new/" + session.GetSessionToken() + "/" + fromCoin + "_" + toCoint + "/" + tradeType + "/" + tradeSide + "/" + tradePrice + "/" + units + "/" + tradeLevel;
    console.log("New request ");
    base.Request("POST", URL, null, null, callback);
};

exports.NewMany = function (trades, callback) {
    var URL = config.Config.BaseURL + "order/new/many/" + session.GetSessionToken();
    console.log("NewMany request ");
    base.Request("POST", URL, JSON.stringify(trades), null, callback);
};

exports.GetOrderStatus = function (tradeId, callback) {
    var URL = config.Config.BaseURL + "order/status/" + session.GetSessionToken() + "/" + tradeId;
    console.log("GetOrderStatus request ");
    base.Request("GET", URL, null, null, callback);
};

exports.Cancel = function (tradeId, callback) {
    var URL = config.Config.BaseURL + "order/cancel/" + session.GetSessionToken() + "/" + tradeId;
    console.log("Cancel request ");
    base.Request("POST", URL, null, null, callback);
};

exports.CancelMany = function (tradeLevel, tradeIds, callback) {
    var URL = config.Config.BaseURL + "order/cancel/many/" + session.GetSessionToken() + "/" + tradeLevel + "/" + tradeIds;
    console.log("CancelMany request ");
    base.Request("POST", URL, null, null, callback);
};

exports.CancelAll = function (tradeLevel, callback) {
    var URL = config.Config.BaseURL + "order/cancel/all/" + session.GetSessionToken() + "/" + tradeLevel;
    console.log("CancelAll request ");
    base.Request("POST", URL, null, null, callback);
};

exports.GetOrders = function (fromCoin, toCoin, tradeStatus, tradeLevel, callback) {
    var URL = config.Config.BaseURL + "orders/" + session.GetSessionToken() + "/" + fromCoin + "_" + toCoin + "/" + tradeStatus + "/" + tradeLevel;
    console.log("GetOrders request ");
    base.Request("GET", URL, null, null, callback);
};

exports.GetTrades = function (fromCoin, toCoin, tradeStatus, tradeLevel, callback) {
    var URL = config.Config.BaseURL + "trades/" + session.GetSessionToken() + "/" + fromCoin + "_" + toCoin + "/" + tradeStatus + "/" + tradeLevel;
    console.log("GetTrades request ");
    base.Request("GET", URL, null, null, callback);
};








