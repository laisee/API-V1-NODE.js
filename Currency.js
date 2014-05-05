var request = require("request");
var config = require('./config.js');
var base = require('./Base.js');

exports.GetCurrency = function (callback) {
    var URL = config.Config.BaseURL + "currency" + "/" + config.Config.ApiKey;
    console.log("GetCurrency request ");
    base.Request("GET", URL, null, null, callback);
};

exports.GetPairs = function (callback) {
    var URL = config.Config.BaseURL + "currency/pairs" + "/" + config.Config.ApiKey;
    console.log("GetPairs request ");
    base.Request("GET", URL, null, null, callback);
};


