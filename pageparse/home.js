"use strict"

var download = require("../lib/download");
var parseftplink = require("../lib/parseftplink");
var cheerio = require("cheerio");
var fs = require("fs");
var iconv = require("iconv-lite");
var url = require("url");

var resource = [];

var rootUrl = "http://www.dygod.net";

download(url.resolve(rootUrl, "index.html"), "GBK", function(data) {
    var $ = cheerio.load(data, {
        decodeEntities: false
    });
    $("html body div#header div.contain div.bd2 div.bd3 div.bd3r div div.bd3rl div.co_area2").each(function(i) {
        if (i == 0) {
            resource[i] = {
                title: $(this).find("div.title_all p strong").text(),
                movies: []
            };
            $(this).find("div").eq(1).find("ul table tr").each(function(trIndex) {
                var movieA = $(this).find("td").eq(0).find("a").eq(1);
                var link = url.resolve(rootUrl, movieA.attr("href"));
                parseftplink(link, function(href) {

                    resource[i].movies[trIndex] = {
                        name: movieA.text().trim(),
                        href: href
                    }
                })

            });

        }

    });
});

process.on("exit", (code) => {
    console.log(JSON.stringify(resource, null, 2));
})
