"use strict"

var fs = require("fs");
var download = require("./download");
var cheerio = require("cheerio");
var iconv = require("iconv-lite");


module.exports = function(url, callback) {

    download(url, "gb2312", function(data) {
        var $ = cheerio.load(data, {
            decodeEntities: false
        });
        callback($("div#Zoom table tbody tr td").eq(0).find("a").attr("href"));
    });

};
