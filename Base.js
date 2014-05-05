var request = require("request");

exports.Request = function (method, url, body, headers, callback) {
    console.log("URI:  ", url);
    request({
        url: url,
        method: method,
        body: body,
        headers: headers
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Status", response.statusCode);
            console.log("Response received", body);
            callback(JSON.parse(body)); 
        } else {
            console.log("ERROR " + error);
            console.log("Status", response.statusCode);
            callback(null);
        }
    });
}

