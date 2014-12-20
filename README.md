# Intro

Collegerama lacks a 'watch this video offline' button. This project downloads the lecture and its slides and watch it in your browser.

# Technology

Uses [video.js](http://www.videojs.com/) for brilliant HTML5 video. Use [node.js](http://nodejs.org/) to download the video and slides.

# Usage

1. Figure out how to download the .mp4 for yourself
2. Use `node download.js <resourceId>` to download the slides
3. Serve `index.html`
  * Run some webserver that serves `index.html` (e.g. Apache, nginx)
  * Run Chrome with cross-origin check disabled (e.g `open /Applications/Google\ Chrome.app --args --allow-file-access-from-files`)

The resourceId is the bold part of the following URL: https://collegerama.tudelft.nl/Mediasite/Play/*23c483f3255d411381c3ee583a8967451d*?catalog=528e5b24-a2fc-4def-870e-65bd84b28a8c

# FAQ

- You might need to increase the file descriptor limit. See http://stackoverflow.com/questions/34588/how-do-i-change-the-number-of-open-files-limit-in-linux