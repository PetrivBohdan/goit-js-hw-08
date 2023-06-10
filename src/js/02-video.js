import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');

const player = new Player(iframe);
const saveCurrentTime = throttle(async function() {
  const currentTime = await player.getCurrentTime();
  localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000);
async function restorePlayback() {
  const currentTime = localStorage.getItem('videoplayer-current-time');
  if (currentTime) {
    await player.setCurrentTime(currentTime);
  }
}
player.on('timeupdate', saveCurrentTime);
restorePlayback();