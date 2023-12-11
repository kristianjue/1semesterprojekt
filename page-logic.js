new fullpage("#fullpage", {
  afterRender: function () {
    fullpage_api.setAllowScrolling(false);
  },
  onLeave: function () {
    disableAudio();
  },
});

const slide1 = new Audio("/sound_files/Introduction.mp3");
const slide2 = new Audio("/sound_files/development_of_vegetarians.mp3");
const sound3 = new Audio("/sound_files/Co2_meals.mp3");
const sound4 = new Audio("/sound_files/BEV_vs_ICE_graph.mp3");
const sound5 = new Audio("/sound_files/BEV_vs_ICE_co2_compareson.mp3");

let speech = document.querySelector(".speech-bubble");

speech.addEventListener("click", function () {
  toggleSpeechBubble();
});

function toggleSpeechBubble() {
  currentSection = fullpage_api.getActiveSection();
  ActiveSectionNumber = currentSection.anchor;
  console.log(currentSection);
  if (ActiveSectionNumber === "1") {
    slide1.play();
  } else if (ActiveSectionNumber === "2") {
    slide2.play();
  } else if (ActiveSectionNumber === "3") {
    slide3.play();
  } else if (ActiveSectionNumber === "4") {
    slide4.play();
  } else if (ActiveSectionNumber === "5") {
    slide5.play();
  }
}

function disableAudio() {
  slide1.pause();
  slide2.pause();
  sound3.pause();
  sound4.pause();
  sound5.pause();
}

window.addEventListener("load", function () {
  window.location.hash = "1";
});
