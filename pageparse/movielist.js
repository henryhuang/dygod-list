"use strict"

var download = require("../lib/download");
var parseftplink = require("../lib/parseftplink");
var cheerio = require("cheerio");
var fs = require("fs");
var iconv = require("iconv-lite");
var url = require("url");
var path = require("path");
var util = require("util");

var resource = [];

var rootUrl = "http://www.dygod.net";

var argv = process.argv;

// TODO 循环

download(url.resolve(rootUrl, function() {
    if (argv.length <= 2) {
        return "html/gndy/dyzz/index.html";
    } else {
        return util.format("html/gndy/dyzz/index_%d.html", argv[2]);
    }
}()), "GBK", function(data) {
    var $ = cheerio.load(data, {
        decodeEntities: false
    });
    var $ = cheerio.load(data, {
        decodeEntities: false
    });
    $("table.tbspan").each(function(index) {
        var tagA = $(this).find("tr").eq(1).find("b a");

        parseftplink(url.resolve(rootUrl, tagA.attr("href")), function(href) {
            var regex = /^[\s\S]*《([\s\S]*)》[\s\S]*$/g;
            var movieName = tagA.attr("title");
            try {
                movieName = regex.exec(movieName)[1];
            } catch(e) {
                // ignore
            }
            resource[index] = {
                title: movieName,
                movies: href
            };
        })
    });
});

process.on("exit", (code) => {
    console.log(JSON.stringify(resource, null, 2));
})
