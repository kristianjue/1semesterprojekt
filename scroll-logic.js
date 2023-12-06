/*let lastScrollPosition = 0;

window.addEventListener("scroll", function () {
  let currentScrollPosition = window.scrollY;

  if (currentScrollPosition > lastScrollPosition) {
    // Scrolling down
    console.log("Scrolling down");
  } else {
    // Scrolling up
    console.log("Scrolling up");
  }

  // Update last scroll position for next scroll event
  lastScrollPosition = currentScrollPosition;
});*/

/*document.addEventListener("wheel", handleScroll);

let lastScroll = 0;
const sections = document.querySelectorAll(".section");
let currentSection = 0;

function handleScroll(event) {
  const direction = event.deltaY;

  if (direction > 0) {
    // scrolling down
    changeSection(1);
  } else {
    // scrolling up
    changeSection(-1);
  }
}

function changeSection(direction) {
  if (direction === 1 && currentSection < sections.length - 1) {
    currentSection++;
    scrollToSection();
  } else if (direction === -1 && currentSection > 0) {
    currentSection--;
    scrollToSection();
  }
}

function scrollToSection() {
    sections[currentSection].scrollIntoView({ behavior: "smooth" });

}*/

new fullpage("#fullpage", {
  //options here
});
