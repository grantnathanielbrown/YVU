1 13 * * * /usr/local/bin/node /Users/grant/Desktop/YVU/built/reddit_video_download_script.js
3 13 * * * /usr/local/bin/melt /Users/grant/Desktop/YVU/downloaded_gifs/*.mp4 -consumer avformat:/Users/grant/Desktop/YVU/merged_videos_output/merged_videos.mp4 acodec=libmp3lame vcodec=libx264
10 13 * * * /usr/local/bin/node /Users/grant/Desktop/YVU/automatic_upload.js /Users/grant/Desktop/YVU/merged_videos_output/merged_videos.mp4
20 13 * * * rm /Users/grant/Desktop/YVU/downloaded_gifs/* ; rm /Users/grant/Desktop/YVU/merged_videos_output/*