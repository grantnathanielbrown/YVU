var express = require('express');
var app = express();
var https = require('https');
var fs = require('fs');
function downloadVideo(url, filename) {
    var request = https.get(url, function (response) {
        if (response.statusCode === 200) {
            var file = fs.createWriteStream("/Users/grant/Desktop/YVU/downloaded_gifs/" + filename + ".mp4");
            response.pipe(file);
        }
        request.setTimeout(60000, function () {
            request.abort();
        });
    });
}
var snoowrap = require('snoowrap');
var r = new snoowrap({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
    clientId: '38BBGLjgEX3i8A',
    clientSecret: '3Ji_s4lJ4RzlXSIfxngu9WvTOfk',
    refreshToken: '23280913-oFa2QT9FoJEU2mLC2r-WeyHsXN0'
});
r.getHot("gifs").
    then(function (data) {
    data = data.slice(1);
    data.forEach(function (post, index) {
        var _a, _b, _c;
        console.log(post === null || post === void 0 ? void 0 : post.preview);
        if ((_a = post === null || post === void 0 ? void 0 : post.preview) === null || _a === void 0 ? void 0 : _a.reddit_video_preview) {
            downloadVideo((_c = (_b = post === null || post === void 0 ? void 0 : post.preview) === null || _b === void 0 ? void 0 : _b.reddit_video_preview) === null || _c === void 0 ? void 0 : _c.fallback_url, index + " - " + (post === null || post === void 0 ? void 0 : post.title));
        }
    });
});
