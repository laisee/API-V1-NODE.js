var request = require("request");
var session = require('./Session.js'); 
var config = require('./Config.js'); 
var base = require('./Base.js');

exports.GetAccountAddresses = function (callback) {
    var URL = config.Config.BaseURL + "account/addresses/" + session.GetSessionToken();
    console.log("GetAccountAddresses request ");
    base.Request("GET", URL, null, null, callback);
};
