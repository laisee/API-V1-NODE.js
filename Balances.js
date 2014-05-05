var request = require("request");
var session = require('./Session.js'); 
var config = require('./Config.js');
var base = require('./Base.js');

exports.GetBalances = function (tradeLevel, callback) {
    var URL = config.Config.BaseURL + "account/balances/" + session.GetSessionToken() + "/" + tradeLevel;
    console.log("GetBalances request ");
    base.Request("GET", URL, null, null, callback);
};

exports.GetBalance = function (currency, tradeLevel, callback) {
    var URL = config.Config.BaseURL + "account/balance/" + session.GetSessionToken() + "/" + currency + "/" + tradeLevel;
    console.log("GetBalance request ");
    base.Request("GET", URL, null, null, callback);
};
