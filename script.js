/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// Playback configuration
// Replace these with your own Amazon IVS Playback URLs
const playbackUrl1 = "https://b43189d95416.eu-west-1.playback.live-video.net/api/video/v1/eu-west-1.248056333272.channel.X3k9AgkWFOnT.m3u8";


const playbackUrls = [
  playbackUrl1,

];

// App
const players = document.getElementById('players');

(function (IVSPlayer) {

  // handlePlayerReady
  let handlePlayerReady = function(src, elPlayer) {
    elPlayer.setRebufferToLive(true);
    elPlayer.setAutoplay(true);
    elPlayer.load(src);
    elPlayer.setVolume(0);
  }

  // createPlayers
  let createPlayers = function(src, id){
    const PlayerState = IVSPlayer.PlayerState;
    const PlayerEventType = IVSPlayer.PlayerEventType;

    let video = document.createElement('video');
    video.autoplay = true;
    video.playsinline = true;
    video.className = 'player';
    video.id = 'player-' + id;
    players.appendChild(video);

    // Initialize player
    const elPlayer = IVSPlayer.create();
    elPlayer.attachHTMLVideoElement(video);

    // Attach event listeners
    elPlayer.addEventListener(PlayerState.PLAYING, function () {
      console.log("Player State - PLAYING");
    });
    elPlayer.addEventListener(PlayerState.ENDED, function () {
      console.log("Player State - ENDED");
    });
    elPlayer.addEventListener(PlayerState.READY, function () {
      console.log("Player State - READY");
    });
    elPlayer.addEventListener(PlayerEventType.ERROR, function (err) {
      console.warn("Player Event - ERROR:", err);
    });
    elPlayer.addEventListener(PlayerEventType.TEXT_METADATA_CUE, function (cue) {
      const metadataText = cue.text;
      const position = elPlayer.getPosition().toFixed(2);
      console.log(
        `Player Event - TEXT_METADATA_CUE: "${metadataText}". Observed ${position}s after playback started.`
      );
    });
    
    // Player config
    handlePlayerReady(src, elPlayer);
  }

  // Create 4 players based on the playbackUrls array
  for (var i = 0; i < 4; i++) {
    createPlayers(playbackUrls[i], i);
  }

})(window.IVSPlayer);

