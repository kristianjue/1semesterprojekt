new fullpage("#fullpage", {
  afterRender: function () {
    fullpage_api.setAllowScrolling(false);
    fullpage_api.setKeyboardScrolling(false);
  },
  onLeave: function () {
    disableAudio();
    applyDatavisualization();
  },
});

const slide1 = new Audio("../Mediafiles/Introduction.mp3");
const slide2 = new Audio("../Mediafiles/development_of_vegetarians.mp3");
const slide3 = new Audio("../Mediafiles/Co2_meals.mp3");
const slide4 = new Audio("../Mediafiles/BEV_vs_ICE_graph.mp3");
const slide5 = new Audio("../Mediafiles/BEV_vs_ICE_co2_compareson.mp3");

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
  slide3.pause();
  slide4.pause();
  slide5.pause();
}

window.addEventListener("load", function () {
  window.location.hash = "1";
});
