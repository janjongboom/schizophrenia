require("requirejsnode");

var express = require("express");
var jsdom = require("jsdom").jsdom;
var fs = require("fs");
var url = require("url");

var app = express.createServer();

// calc + jQuery plugin running on the client
app.get("/", function(req, res) {
    fs.readFile("./client/index.html", "utf8", function(err, content) {
        res.send(content);
    });
});

// call via /calc?1&3&5 -> 1 + 3 + 5 = 9
app.get("/calc", function(req, res) {
    var query = (url.parse(req.url, true)).query;
    
    // grab keys
    var keys = [];
    for (var k in query) {
        if (query.hasOwnProperty(k)) {
            keys.push(k);
        }
    }
    
    var calc = require("./require_modules/calc.js");

    res.end(calc.sum(keys).toString());
});

// jQuery plugin that runs on the server
app.get("/server", function(req, res) {
    jsdom.env("./client/index.html", [ "http://code.jquery.com/jquery-latest.min.js", "require_modules/schizo.js" ], {}, function (err, window) {
        var $ = window.jQuery;
            
        $('h1').jan();
            
        res.end(window.document.documentElement.outerHTML);
    });
});

// serves static javascript files, yeah security-risk :-)
app.get(/(.*?\.js)$/, function(req, res) {
    res.header("content-type", "application/javascript");
    fs.readFile("./" + req.params[0], "utf8", function(err, content) {
        res.send(content);
    });
});

app.listen(process.env.C9_PORT);