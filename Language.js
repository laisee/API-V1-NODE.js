var request = require("request");
var session = require('./Session.js'); 
var config = require('./Config.js'); 
var base = require('./Base.js');

exports.GetLanguage = function (callback) {
    var URL = config.Config.BaseURL + "language/" + session.GetSessionToken();
    console.log("GetLanguage request ");
    base.Request("GET", URL, null, null, callback);
};

exports.SetLanguage = function (lang, callback) {
    var URL = config.Config.BaseURL + "language/" + session.GetSessionToken() + "/" + lang;
    console.log("SetLanguage request ");
    base.Request("POST", URL, null, null, callback);
};

