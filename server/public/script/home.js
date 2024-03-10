const audio = document.querySelector("audio");
const durationContainer = document.getElementById("audDuration");
const audioSeeker = document.getElementById("audSeeker");
const currentTimeContainer = document.getElementById('audCurrentTime');
const audPlaystateBtn = document.getElementById('playPause'); 
const volSeeker = document.getElementById("volSeeker");
let playState = "play";

audio.addEventListener('loadedmetadata', () =>{
    displayAudioDuration(audio.duration);
});

const calculateTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${returnedSeconds}`;
}

const displayDuration = () =>{
    durationContainer.textContent = calculateTime(audio.duration);
};

const setSliderMax = () => {
    audioSeeker.max = Math.floor(audio.duration);
};

audioSeeker.addEventListener("input", () => {
    currentTimeContainer.textContent = calculateTime(audioSeeker.value);
});

if (audio.readyState > 0) {
  displayDuration();
  setSliderMax();
} else {
  audio.addEventListener('loadedmetadata', () => {
    displayDuration();
    setSliderMax();
  });
}

const whilePlaying = () => {
  audioSeeker.value = Math.floor(audio.currentTime);
  currentTimeContainer.textContent = calculateTime(audioSeeker.value);
}

audPlaystateBtn.addEventListener('click', () => {
  if(playState === 'play') {
    audio.play();
    audio.volume = 0.25;
    audPlaystateBtn.src = "/icons/pause.png"
    whilePlaying();
    playState = 'pause';
  } else {
    audio.pause();
    audPlaystateBtn.src = "/icons/play.png"
    whilePlaying();
    playState = 'play';
  }
});

audioSeeker.addEventListener('change', () => {
  audio.currentTime = audioSeeker.value;
});

audio.addEventListener('timeupdate', () => {
  audioSeeker.value = Math.floor(audio.currentTime);
  currentTimeContainer.textContent = calculateTime(audioSeeker.value);
});

volSeeker.addEventListener('input', (e) => {
    const value = e.target.value;
    audio.volume = value / 100;
});

