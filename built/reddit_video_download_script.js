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
    // data.forEach( (post) => {
    //   console.log("before getting sorted", "\n", post?.preview?.reddit_video_preview?.height, " ",post?.preview?.reddit_video_preview?.width);
    // })
    var sortedData = data.slice(1).filter(function (post) {
        var _a;
        return ((_a = post === null || post === void 0 ? void 0 : post.preview) === null || _a === void 0 ? void 0 : _a.reddit_video_preview) !== undefined;
    });
    sortedData.sort(function (a, b) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        if (((_b = (_a = b === null || b === void 0 ? void 0 : b.preview) === null || _a === void 0 ? void 0 : _a.reddit_video_preview) === null || _b === void 0 ? void 0 : _b.height) !== ((_d = (_c = a === null || a === void 0 ? void 0 : a.preview) === null || _c === void 0 ? void 0 : _c.reddit_video_preview) === null || _d === void 0 ? void 0 : _d.height)) {
            return ((_f = (_e = b === null || b === void 0 ? void 0 : b.preview) === null || _e === void 0 ? void 0 : _e.reddit_video_preview) === null || _f === void 0 ? void 0 : _f.height) - ((_h = (_g = a === null || a === void 0 ? void 0 : a.preview) === null || _g === void 0 ? void 0 : _g.reddit_video_preview) === null || _h === void 0 ? void 0 : _h.height);
        }
        else {
            return ((_k = (_j = b === null || b === void 0 ? void 0 : b.preview) === null || _j === void 0 ? void 0 : _j.reddit_video_preview) === null || _k === void 0 ? void 0 : _k.width) - ((_m = (_l = a === null || a === void 0 ? void 0 : a.preview) === null || _l === void 0 ? void 0 : _l.reddit_video_preview) === null || _m === void 0 ? void 0 : _m.width);
        }
    });
    // sortedData.forEach( (post) => {
    //   console.log("after getting sorted", "\n", post?.preview?.reddit_video_preview?.height, " ",post?.preview?.reddit_video_preview?.width);
    // })
    sortedData.forEach(function (post, index) {
        var _a, _b, _c, _d, _e;
        console.log((_b = (_a = post === null || post === void 0 ? void 0 : post.preview) === null || _a === void 0 ? void 0 : _a.reddit_video_preview) === null || _b === void 0 ? void 0 : _b.fallback_url, "\n", post === null || post === void 0 ? void 0 : post.title);
        if ((_c = post === null || post === void 0 ? void 0 : post.preview) === null || _c === void 0 ? void 0 : _c.reddit_video_preview) {
            downloadVideo((_e = (_d = post === null || post === void 0 ? void 0 : post.preview) === null || _d === void 0 ? void 0 : _d.reddit_video_preview) === null || _e === void 0 ? void 0 : _e.fallback_url, index + " - " + (post === null || post === void 0 ? void 0 : post.title));
        }
    });
});
