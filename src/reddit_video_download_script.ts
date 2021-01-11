const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');

function downloadVideo(url, filename) {
  const request = https.get(url, function(response) {
    if (response.statusCode === 200) {
        var file = fs.createWriteStream(`/Users/grant/Desktop/YVU/downloaded_gifs/${filename}.mp4`);
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

    // data.forEach( (post) => {
    //   console.log("before getting sorted", "\n", post?.preview?.reddit_video_preview?.height, " ",post?.preview?.reddit_video_preview?.width);
    // })
    let sortedData = data.slice(1).filter( (post) => {
      return post?.preview?.reddit_video_preview !== undefined
    });

    sortedData.sort( (a,b) => {
      if (b?.preview?.reddit_video_preview?.height !== a?.preview?.reddit_video_preview?.height ) {
        return b?.preview?.reddit_video_preview?.height - a?.preview?.reddit_video_preview?.height
      } else {
        return b?.preview?.reddit_video_preview?.width - a?.preview?.reddit_video_preview?.width
      }
    });

    // sortedData.forEach( (post) => {
    //   console.log("after getting sorted", "\n", post?.preview?.reddit_video_preview?.height, " ",post?.preview?.reddit_video_preview?.width);
    // })
    
    sortedData.forEach( (post, index) => {
      console.log(post?.preview?.reddit_video_preview?.fallback_url, "\n", post?.title);
      if (post?.preview?.reddit_video_preview) {
        downloadVideo(post?.preview?.reddit_video_preview?.fallback_url, `${index} - ${post?.title}`);
      }
    })
  })
