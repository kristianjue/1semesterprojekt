let quizsubmitvegetarian = document.getElementById("vegetarvouch");
let quizsubmitmeatlover = document.getElementById("meatlovervouch");

quizsubmitvegetarian.addEventListener("click", function () {
  sendQuizRequest(1);
  console.log("Hej");
  if ("click") {
    quizsubmitvegetarian.disabled = true;
    quizsubmitmeatlover.disabled = true;
  }
});

quizsubmitmeatlover.addEventListener("click", function () {
  sendQuizRequest(2);
  console.log("hej igen");
  if ("click") {
    quizsubmitvegetarian.disabled = true;
    quizsubmitmeatlover.disabled = true;
  }
});

async function sendQuizRequest(value) {
  try {
    const response = await fetch("http://localhost:3000/quizvote/" + value, {
      method: "POST",
    });
  } catch (error) {
  } finally {
    console.log("Success");
    createQuizChart();
  }
}

function createQuizChart() {}
