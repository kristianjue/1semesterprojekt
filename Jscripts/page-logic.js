new fullpage("#fullpage", {
  afterRender: function () {
    fullpage_api.setAllowScrolling(false);
    fullpage_api.setKeyboardScrolling(false);
  },
  onLeave: function () {
    disableAudio();
  },
});

const slide1 = new Audio("../Mediafiles/Introduction.mp3");
const slide2 = new Audio("../Mediafiles/development_of_vegetarians.mp3");
const slide3 = new Audio("../Mediafiles/Co2_meals.mp3");
const slide4 = new Audio("../Mediafiles/BEV_vs_ICE_graph.mp3");
const slide5 = new Audio("../Mediafiles/BEV_vs_ICE_co2_compareson.mp3");
const slide6 = new Audio("../Mediafiles/Leaderboard.mp3");
const slide7 = new Audio("../Mediafiles/Congrats.mp3");
const slide8 = new Audio("../Mediafiles/Wrong.mp3");

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
  } else if (ActiveSectionNumber === "3") {
    slide3.play();
  } else if (ActiveSectionNumber === "4") {
    slide4.play();
  } else if (ActiveSectionNumber === "5") {
    slide5.play();
  } else if (ActiveSectionNumber === "6") {
    slide6.play();
  } else if (ActiveSectionNumber === "7" && wasAnwserCorrect === true) {
    slide7.play();
  } else if (ActiveSectionNumber === "7" && wasAnwserCorrect === false) {
    slide8.play();
  }
}

function disableAudio() {
  slide1.pause();
  slide1.currentTime = 0;
  slide2.pause();
  slide2.currentTime = 0;
  slide3.pause();
  slide3.currentTime = 0;
  slide4.pause();
  slide4.currentTime = 0;
  slide5.pause();
  slide5.currentTime = 0;
  slide6.pause();
  slide6.currentTime = 0;
  slide7.pause();
  slide7.currentTime = 0;
  slide8.pause();
  slide8.currentTime = 0;
}

window.addEventListener("load", function () {
  window.location.hash = "1";
});
