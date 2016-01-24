"use strict"

var http = require("http");
var iconv = require("iconv-lite");
var BufferHelper = require('bufferhelper');

module.exports = function(url, encoding, callback) {

    if(!encoding) {
        encoding = "utf8";
    }

    http.get(url, function(res) {

        var bufferHelper = new BufferHelper();

        res.on("data", function(chunk) {
            bufferHelper.concat(chunk);
        });

        res.on("end", function() {
            callback(iconv.decode(bufferHelper.toBuffer(), encoding));
        });

    }).on("error", function(error) {
        callback(null);
    });

};
