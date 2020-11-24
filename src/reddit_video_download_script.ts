const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');

function downloadVideo(url, filename) {
  const request = https.get(url, function(response) {
    if (response.statusCode === 200) {
        var file = fs.createWriteStream(`/Users/grant/Desktop/YVU/merged_videos_output/${filename}.mp4`);
        response.pipe(file);
    }
    request.setTimeout(60000, function() { // if after 60s file not downloaded, we abort a request 
        request.abort();
    });
});
}

var snoowrap = require('snoowrap');


const r = new snoowrap({
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
  clientId: '38BBGLjgEX3i8A',
  clientSecret: '3Ji_s4lJ4RzlXSIfxngu9WvTOfk',
  refreshToken: '23280913-oFa2QT9FoJEU2mLC2r-WeyHsXN0'
});


  r.getHot("gifs").
  then( (data) => {
    data = data.slice(1);
    data.forEach( (post, index) => {
      console.log(post?.preview);
      if (post?.preview?.reddit_video_preview) {
        downloadVideo(post?.preview?.reddit_video_preview?.fallback_url, `${index} - ${post?.title}`);
      }
    })
  })
