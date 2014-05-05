var request = require("request");
var crypto = require("crypto");
var qs = require("querystring");
var cryptojs = require("crypto-js");
var config = require('./Config.js');
var base = require('./Base.js');
var sessionToken = "";

exports.SignIn = function (tradeLevel, callback) {
    console.log("SignIn request ");
    var URLSigninKey = config.Config.BaseURL + "session/signinkey" + "/" + config.Config.ApiKey;
    base.Request("GET", URLSigninKey, null, null, function (result)
    {
        var URLSessionToken = config.Config.BaseURL + "session/new" + "/" + config.Config.ApiKey + "/" + tradeLevel;
        var key = cryptojs.enc.Utf8.parse(config.Config.ApiSecret);
        console.log("Secret(bytes) :", key.toString());

        // use crypto data structure to pass encrypted text, converted to base64 format 
        var cipherParams = cryptojs.lib.CipherParams.create({
            ciphertext: cryptojs.enc.Base64.parse(result.Key)
        });

        var decrypted = cryptojs.TripleDES.decrypt(cipherParams, key, { mode: cryptojs.mode.ECB, padding: cryptojs.pad.Pkcs7 });
        console.log('Decrypted Sign-in key : ' + decrypted.toString(cryptojs.enc.Utf8));

        var decryptedStr = decrypted.toString(cryptojs.enc.Utf8);

        // create 'SHA-2 512' Hash of API Pin
        var hashed = crypto.createHash('sha512').update(new Buffer(decryptedStr + config.Config.SecondaryKey, "utf8")).digest('base64');
        console.log("hashed = " + hashed);
        console.log("SessionToken request ");
        base.Request("GET", URLSessionToken + "?hashedSignInKey=" + qs.escape(hashed), null, null, function (data) {
            sessionToken = data["SessionToken"];
            console.log("SessionToken  :" + sessionToken);
            callback(data);
        });
    });
};

exports.GetSessionToken = function () {
	return sessionToken;
};

exports.SignOff = function (callback) {
    var URL = config.Config.BaseURL + "session/end/" + sessionToken;
    console.log("SingOff request ");
    base.Request("GET", URL, null, null, callback);
};
