var config = require('./config.js');
var currency = require('./Currency.js');
var tradeBook = require('./TradeBook.js');
var ticker = require('./Ticker.js');
var session = require('./Session.js');
var trade = require('./Trade.js');
var deposit = require('./Deposit.js');
var withdraw = require('./Withdraw.js');
var language = require('./Language.js');
var balances = require('./Balances.js');
var thirdParty = require('./ThirdParty.js');

exports.Currency =
    {
        GetCurrency: currency.GetCurrency,
        GetPairs: currency.GetPairs
    };

exports.TradeBook =
    {
        GetTradeBook: tradeBook.GetTradeBook
    }

exports.Ticker = 
    {
        GetTicker: ticker.GetTicker
    }

exports.Session =
    {
        SignIn: session.SignIn,
        SignOff: session.SignOff
    }

exports.Trade = 
    {
        New: trade.New,
        NewMany: trade.NewMany,
        GetOrderStatus: trade.GetOrderStatus,
        Cancel: trade.Cancel,
        CancelMany: trade.CancelMany,
        CancelAll: trade.CancelAll,
        GetOrders: trade.GetOrders,
        GetTrades: trade.GetTrades
    }

exports.Deposit =
    {
        GetAccountAddresses: deposit.GetAccountAddresses
    }

exports.Withdraw =
    {
        SendCoin: withdraw.SendCoin
    }

exports.Language =
    {
        GetLanguage: language.GetLanguage,
        SetLanguage: language.SetLanguage
    }

exports.Balances =
    {
        GetBalances: balances.GetBalances,
        GetBalance: balances.GetBalance
    }

exports.ThirdParty =
    {
        MoveCoin: thirdParty.MoveCoin,
        GetAddresses: thirdParty.GetAddresses,
        GetBalances: thirdParty.GetBalances
    }
