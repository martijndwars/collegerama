# Intro

Collegerama lacks a 'watch this video offline' button. This project downloads the lecture and its slides and watch it in your browser.

# Installation

1. `git clone git@github.com:MartijnDwars/collegerama.git`
2. `npm install`

# Download

If you just want to download the lecture, simply use `node download.js <resourceId>`. The resource id is the part next to 'Play' in the URL. For example, in:

> https://collegerama.tudelft.nl/Mediasite/Play/23c483f3255d411381c3ee583a8967451d?catalog=528e5b24-a2fc-4def-870e-65bd84b28a8c

it is *23c483f3255d411381c3ee583a8967451d*.

# Usage

If you want to use this as a local Collegerama clone:

1. Use `node download.js <resourceId>` to download the slides/video
2. Use `bower install` to install the javascript dependencies
3. Update the list of resourceIds in `index.html`
4. Serve `index.html`
  * Run Chrome with cross-origin check disabled (e.g `open /Applications/Google\ Chrome.app --args --allow-file-access-from-files`)
  * Open `index.html`, or run some webserver to serve it (e.g. Apache, nginx)
  * Click one of the `Lecture X` links


# FAQ

- You might need to increase the file descriptor limit. See http://stackoverflow.com/questions/34588/how-do-i-change-the-number-of-open-files-limit-in-linux
