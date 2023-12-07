const slide1 = new Audio("biodynamic-impact-braam-tonal-dark-176441.mp3");
const slide2 = new Audio("ambient-piano-logo-165357.mp3");
const sound4 = new Audio("mixkit-arcade-retro-game-over-213.wav");

let speech = document.querySelector(".speech-bubble");

speech.addEventListener("click", function () {
  toggleSpeechBubble();
});

function toggleSpeechBubble() {
  currentSection = fullpage_api.getActiveSection();
  ActiveSectionNumber = currentSection.anchor;
  console.log(ActiveSectionNumber);
  localStorage.setItem("PlayedSound",true);
  if (ActiveSectionNumber === "1") {
    slide1.play();
  } else if (ActiveSectionNumber === "2") {
    slide2.play();
  }
}

setTimeout(function () {
  iconAnimation();
}, 5000);

function iconAnimation(speech) {
  if ((localStorage.getItem("playedSound") = "true")) {
    console.log(localStorage.getItem("PlayedSound"));
    localStorage.clear();
  } else {
    speech.style("animation", "jump 1s ease-in-out infinite");
    console.log("kode kørt");
  }
}

