var request = require("request");
var config = require('./Config.js'); 
var session = require('./Session.js'); 
var base = require('./Base.js');
var cryptojs = require("crypto-js");
var crypto = require("crypto");

exports.MoveCoin = function (symbol, amount, apiPin, usersThirdPartyAccountId, callback) {
    var URL = config.Config.BaseURL + "thirdparty/movecoinkey/" + session.GetSessionToken() + "/" + usersThirdPartyAccountId;
    console.log("MoveCoin request ");
    base.Request("GET", URL, null, null, function (result)
    {
        var key = cryptojs.enc.Utf8.parse(config.Config.ApiSecret);
        console.log("Secret(bytes) :", key.toString());
        
        // use crypto data structure to pass encrypted text, converted to base64 format 
        var cipherParams = cryptojs.lib.CipherParams.create({
            ciphertext: cryptojs.enc.Base64.parse(result.Key)
        });

        var decrypted = cryptojs.TripleDES.decrypt(cipherParams, key, { mode: cryptojs.mode.ECB, padding: cryptojs.pad.Pkcs7 });
        console.log('Decrypted Sign-in key : ' + decrypted.toString(cryptojs.enc.Utf8));

        var hashedPin = crypto.createHash('sha512').update(new Buffer(apiPin, "utf8")).digest('base64');
        
        console.log('hashedPin : ' + hashedPin);
        var hash = crypto.createHash('sha512').update(new Buffer(
            decrypted.toString(cryptojs.enc.Utf8) + config.Config.SecondaryKey + hashedPin, "utf8")).digest('base64');
        
        console.log('hash : ' + hash);
        var sendCoinURL = config.Config.BaseURL + "thirdparty/movecoin/" + session.GetSessionToken() + "/"
        + symbol + "/" + amount + "?hashedSendCoinKey=" + encodeURIComponent(hash);
        base.Request("POST", sendCoinURL, null, null, function (data) {
            callback(data);
        });
    });
};

exports.GetAddresses = function (accountId, callback) {
    var URL = config.Config.BaseURL + "thirdparty/addresses/" + session.GetSessionToken() + "/" + accountId;
    console.log("GetAddresses request ");
    base.Request("GET", URL, null, null, callback);
};

exports.GetBalances = function (accountId, tradeLevel, callback) {
    var URL = config.Config.BaseURL + "thirdparty/balances/" + session.GetSessionToken() + "/" + tradeLevel + "/" + accountId;
    console.log("GetBalances request ");
    base.Request("GET", URL, null, null, callback);
};


