<!-- Node script that uses a reddit api wrapper in order to download GIFS-->

1. /usr/local/bin/node /Users/grant/Desktop/YVU/built/reddit_video_download_script.js

<!-- Command line tool that merges videos together -->

2. /usr/local/bin/melt /Users/grant/Desktop/YVU/downloaded_gifs/*.mp4 -consumer avformat:/Users/grant/Desktop/YVU/merged_videos_output/merged_videos.mp4 acodec=libmp3lame vcodec=libx264

<!-- Upload the merged video -->

3. /usr/local/bin/node /Users/grant/Desktop/YVU/automatic_upload.js /Users/grant/Desktop/YVU/merged_videos_output/merged_videos.mp4

<!-- Clean up the input and output folders -->

4. rm /Users/grant/Desktop/YVU/downloaded_gifs/* ; rm /Users/grant/Desktop/YVU/merged_videos_output/*



# TODO

- optimize cronjob by making tasks activate after previous is finished
- add audio to videos
- add timestamps to videos
- add name of first gifs to youtube video title, perhaps all?
- make typescript => javascript conversion automatic
- See if it's possible to get more gifs (currently excluding the ones that aren't stored on Reddit)
