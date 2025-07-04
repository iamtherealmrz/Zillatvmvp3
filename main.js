/* ---------- audio pools ---------- */
const low  = ['assets/audio/low1.mp3','assets/audio/low2.mp3'];
const high = ['assets/audio/high1.mp3','assets/audio/high2.mp3'];

/* ---------- state ---------- */
let rancid = 'low';
let idx    = 0;
let paused = false;

/* ---------- elements ---------- */
const player   = document.getElementById('player');
const statusEl = document.getElementById('status');
const knobArt  = document.getElementById('knobArt');
const knobHit  = document.getElementById('knobHit');
const skipHit  = document.getElementById('skipHit');
const pauseHit = document.getElementById('pauseHit');

/* ---------- helpers ---------- */
function pool(){ return rancid === 'low' ? low : high; }

function updateStatus(t){ statusEl.textContent = t; }

function updateKnobPos(){
  const lowPx  = 95;
  const highPx = 575;             // 95 + 578 - 38
  const x = (rancid === 'low') ? lowPx : highPx;
  knobArt.style.left = x + 'px';
  knobHit.style.left = x + 'px';
}

/* ---------- playback ---------- */
function play(){
  const track = pool()[idx % pool().length];
  player.src = track;
  player.play();
  paused = false;
  updateStatus('Now Playing: ' + track.split('/').pop());
  updateKnobPos();
}

function toggleRancid(){
  rancid = (rancid === 'low') ? 'high' : 'low';
  idx = 0;
  play();
}

function skipTrack(){ idx = (idx + 1) % pool().length; play(); }

function togglePause(){
  if(paused){
    player.play(); paused=false;
    updateStatus('Now Playing: ' + player.src.split('/').pop());
  }else{
    player.pause(); paused=true;
    updateStatus('Paused');
  }
}

/* ---------- events ---------- */
knobHit.addEventListener('click', toggleRancid);
skipHit.addEventListener('click', skipTrack);
pauseHit.addEventListener('click', togglePause);

/* ---------- init ---------- */
window.onload = play;