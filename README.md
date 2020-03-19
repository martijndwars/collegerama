# Collegerama offline viewer

## Info

Collegerama lacks a 'watch this video offline' button. This project downloads the lecture and its slides and watch it in your browser.
Collegerama offline viewer is a redesign of the repo [MartijnDwars/collegerama](https://github.com/MartijnDwars/collegerama) and uses a lot of code from that project.

## Installation

1. `git clone https://github.com/djosh34/collegerama-offline-viewer.git`
2. `cd collegerama-offline-viewer`
3. `yarn install`
4. `yarn run dev`


## Usage

To open Collegerama offline viewer go to `localhost:3000`.

### Downloading new lectures

1. Find the id of the lecture you want to view (you can find it on the collegerama site)
2. Go to `localhost:3000/download` and enter the id of the lecture
3. Press submit and wait....
4. Some flashing may occur, this is normal
5. It's done when after a long time the screen flashes again
