new fullpage("#fullpage", {
  afterRender: function () {
    fullpage_api.setAllowScrolling(false);
  },
  onLeave: function () {
    disableAudio();
  },
});

const slide1 = new Audio("page0.mp3");
const slide2 = new Audio("ambient-piano-logo-165357.mp3");
const sound3 = new Audio("mixkit-arcade-retro-game-over-213.wav");
const sound4 = new Audio("mixkit-arcade-retro-game-over-213.wav");
const sound5 = new Audio("mixkit-arcade-retro-game-over-213.wav");
const sound6 = new Audio("mixkit-arcade-retro-game-over-213.wav");

let speech = document.querySelector(".speech-bubble");

speech.addEventListener("click", function () {
  toggleSpeechBubble();
});

function toggleSpeechBubble() {
  currentSection = fullpage_api.getActiveSection();
  ActiveSectionNumber = currentSection.anchor;
  if (ActiveSectionNumber === "1") {
    slide1.play();
  } else if (ActiveSectionNumber === "2") {
    slide2.play();
  }
}

function disableAudio() {
  slide1.pause();
  slide2.pause();
  sound3.pause();
  sound4.pause();
  sound5.pause();
  sound6.pause();
}
