var request = require("request");

exports.TradeLevel = {
    PlayMoney: 0,
    RealMoney: 1
    
}

exports.TradeType = {
    Market : 0,
    Limit : 1
}

exports.TradeSide = {
    Buy : 0,
    Sell : 1
}

exports.TradeStatus = {
    Open : 0,
    Completed : 1,
    Cancelled : 2,
    Reversed : 3
}
   


