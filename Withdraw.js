var request = require("request");
var session = require('./Session.js'); 
var config = require('./Config.js'); 
var base = require('./Base.js');
var cryptojs = require("crypto-js");
var crypto = require("crypto");

exports.SendCoin = function (symbol, amount, destinationAddress, apiPin, addTxFee, callback) {
    var URL = config.Config.BaseURL + "wallet/sendcoinkey/new" + "/" + session.GetSessionToken();
    console.log("SendCoin request ");
    base.Request("POST", URL, null, null, function (result)
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

        if (addTxFee)
            addUrlSerment = 1;
        else
            addUrlSerment = 0;
        console.log('hash : ' + hash);
        var sendCoinURL = config.Config.BaseURL + "wallet/sendcoin" + "/" + session.GetSessionToken() + "/"
        + symbol + "/" + amount + "/" + destinationAddress + "/" + addUrlSerment + "?hashedSendCoinKey=" + encodeURIComponent(hash);
        base.Request("POST", sendCoinURL, null, null, function (data) {
            callback(data);
        });
    });
};
