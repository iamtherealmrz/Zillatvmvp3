
const low = ["assets/audio/low1.mp3","assets/audio/low2.mp3"];
const high = ["assets/audio/high1.mp3","assets/audio/high2.mp3"];

let rancid='low';
let idx=0;
let paused=false;

const player=document.getElementById('player');
const status=document.getElementById('status');
const knob=document.getElementById('knob');
const skip=document.getElementById('skipBtn');
const pauseBtn=document.getElementById('pauseBtn');

function pool(){return rancid==='low'?low:high;}

function play(){
  const list=pool();
  const src=list[idx%list.length];
  player.src=src;
  player.play();
  paused=false;
  pauseBtn.src='assets/img/btn_pause.png';
  status.textContent='Now Playing: '+src.split('/').pop();
}

function toggleRancid(){
  rancid = rancid==='low'?'high':'low';
  knob.style.left = rancid==='low'?'95px':'575px';
  idx=0;
  play();
}

function skipTrack(){
  idx=(idx+1)%pool().length;
  play();
}

function togglePause(){
  if(paused){
    player.play();
    paused=false;
    pauseBtn.src='assets/img/btn_pause.png';
    status.textContent='Now Playing: '+player.src.split('/').pop();
  }else{
    player.pause();
    paused=true;
    pauseBtn.src='assets/img/btn_pause.png'; // same image, optional change
    status.textContent='Paused';
  }
}

knob.addEventListener('click',toggleRancid);
skip.addEventListener('click',skipTrack);
pauseBtn.addEventListener('click',togglePause);

window.onload=()=>{
  knob.style.left='95px'; // ensure start pos
  play();
};
