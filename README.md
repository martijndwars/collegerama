# Intro

Collegerama lacks a 'watch this video offline' button. This project downloads the lecture and its slides and watch it in your browser.

# Technology

Uses [video.js](http://www.videojs.com/) for brilliant HTML5 video. Use [node.js](http://nodejs.org/) to download the video and slides.

# Usage

1. Figure out how to download the .mp4 for yourself
2. Use `node download.js` to download the slides
3. Run some webserver that serves `index.html` (currently, I use nginx on OS X)
4. Point your browser to `http://localhost` and start watching!

# Todo

- Use embedded NodeJS webserver instead of relying on external webserver