var request = require("request");
var api = require('./CoinMktAPI.js');
var enums = require('./Enums.js');

var testSteps = [];
var TradeId = "";

testSteps.push(api.Currency.GetCurrency);
testSteps.push(api.Currency.GetPairs);
testSteps.push(function (callback) { api.TradeBook.GetTradeBook("ALL", "ALL", enums.TradeLevel.PlayMoney, 5, callback); });
testSteps.push(function (callback) { api.Ticker.GetTicker("BTC", "USD", enums.TradeLevel.PlayMoney, callback); });
testSteps.push(function (callback) { api.Session.SignIn(enums.TradeLevel.PlayMoney, callback); });
testSteps.push(function (callback) {
    api.Trade.New("BTC", "USD", enums.TradeType.Limit, enums.TradeSide.Sell, 1.0, 1.0, enums.TradeLevel.PlayMoney, function (res) {
        TradeId = res.TradeId;
        callback(res);
    }
    );
});

testSteps.push(function (callback) { 
    var trade = {
        FromCoinSymbol : "BTC",
        ToCoinSymbol : "USD",
        TradeType : enums.TradeType.Limit,
        TradeSide : enums.TradeSide.Sell,
        TradePrice : 1.0,
        Units : 1.0,
        TradeLevel : enums.TradeLevel.PlayMoney
    }
    api.Trade.NewMany([trade, trade, trade], callback);
});
   
testSteps.push(api.Deposit.GetAccountAddresses);
testSteps.push(function (callback) { api.Withdraw.SendCoin("BTC", 1, "testaddress", "testpin", true, callback) });
testSteps.push(api.Language.GetLanguage);
testSteps.push(function (callback) { api.Language.SetLanguage("EN-US", callback); });
testSteps.push(function (callback) { api.Trade.GetOrderStatus(TradeId, callback); });
testSteps.push(function (callback) { api.Trade.Cancel(TradeId, callback); });
testSteps.push(function (callback) { api.Trade.GetOrderStatus(TradeId, callback); });
testSteps.push(function (callback) {
    api.Trade.New("BTC", "USD", enums.TradeType.Limit, enums.TradeSide.Sell, 1.0, 1.0, enums.TradeLevel.PlayMoney, function (res) {
        TradeId1 = res.TradeId;
        callback(res);
    });
});

testSteps.push(function (callback) {
    var res = api.Trade.New("BTC", "USD", enums.TradeType.Limit, enums.TradeSide.Sell, 1.0, 1.0, enums.TradeLevel.PlayMoney, function (res) {
        TradeId2 = res.TradeId;
        callback(res);
    });
});

testSteps.push(function (callback) {
    var res = api.Trade.New("BTC", "USD", enums.TradeType.Limit, enums.TradeSide.Sell, 1.0, 1.0, enums.TradeLevel.PlayMoney, function (res) {
        TradeId3 = res.TradeId;
        callback(res);
    });
});

testSteps.push(function (callback) { api.Trade.CancelMany(enums.TradeLevel.PlayMoney, [TradeId1, TradeId2, TradeId3], callback); });
testSteps.push(function (callback) {
    var res = api.Trade.New("BTC", "USD", enums.TradeType.Limit, enums.TradeSide.Sell, 1.0, 1.0, enums.TradeLevel.PlayMoney, function (res) {
        TradeId2 = res.TradeId;
        callback(res);
    });
});

testSteps.push(function (callback) {
    var res = api.Trade.New("BTC", "USD", enums.TradeType.Limit, enums.TradeSide.Sell, 1.0, 1.0, enums.TradeLevel.PlayMoney, function (res) {
        TradeId3 = res.TradeId;
        callback(res);
    });
});

testSteps.push(function (callback) { api.Trade.CancelAll(enums.TradeLevel.PlayMoney, callback); });
testSteps.push(function (callback) { api.Trade.GetOrders("BTC", "USD", enums.TradeStatus.Open, enums.TradeLevel.PlayMoney, callback); });
testSteps.push(function (callback) { api.Trade.GetTrades("BTC", "USD", enums.TradeStatus.Completed, enums.TradeLevel.PlayMoney, callback); });

testSteps.push(function (callback) { api.Balances.GetBalances(enums.TradeLevel.PlayMoney, callback); });
testSteps.push(function (callback) { api.Balances.GetBalance("BTC", enums.TradeLevel.PlayMoney, callback); });

testSteps.push(function (callback) { api.ThirdParty.MoveCoin("BTC", 1, "testpin", "testThirdPartyId", callback); });
testSteps.push(function (callback) { api.ThirdParty.GetAddresses("testThirdPartyId", callback); });
testSteps.push(function (callback) { api.ThirdParty.GetBalances("testThirdPartyId", enums.TradeLevel.PlayMoney, callback); });

testSteps.push(function (callback) { api.Session.SignOff(callback); });

var counter = 0;
var callback = function (data) {
    counter++;
    console.log("TestStep " + counter + " finished!");
    if (counter < testSteps.length)
        testSteps[counter](callback);
}
testSteps[0](callback);

