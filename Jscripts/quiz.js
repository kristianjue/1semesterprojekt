let quizsubmitvegetarian = document.getElementById("vegetarvouch");
let quizsubmitmeatlover = document.getElementById("meatlovervouch");

quizsubmitvegetarian.addEventListener("click", function () {
  sendQuizRequest(1);
  showResult("vegetarvouch");

  if ("click") {
    quizsubmitvegetarian.disabled = true;
    quizsubmitmeatlover.disabled = true;
    fullpage_api.setAllowScrolling(true);
    fullpage_api.setKeyboardScrolling(true);
    fullpage_api.moveSectionDown();
  }
  return (wasAnwserCorrect = true);
});

quizsubmitmeatlover.addEventListener("click", function () {
  sendQuizRequest(2);
  showResult("meatlovervouch");

  if ("click") {
    quizsubmitvegetarian.disabled = true;
    quizsubmitmeatlover.disabled = true;
    fullpage_api.setAllowScrolling(true);
    fullpage_api.setKeyboardScrolling(true);
    fullpage_api.moveSectionDown();
  }
  return (wasAnwserCorrect = false);
});

async function sendQuizRequest(value) {
  try {
    await fetch("https://api-7crq.onrender.com/quizvote/" + value, {
      method: "POST",
    });
  } catch (error) {
  } finally {
    fetchdata();
  }
}

function createQuizChart(dataset) {
  const margin = { top: 70, right: 20, bottom: 30, left: 40 },
    width = 405 - margin.left - margin.right,
    height = 405 - margin.top - margin.bottom;

  const xScale = d3
    .scaleBand()
    .range([0, width])
    .domain(dataset.map((d) => d.Value))
    .padding(0.1);

  const yScale = d3
    .scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(dataset, (d) => d.Value)]);

  const svg = d3
    .select(".quizbarchartContainer")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg
    .selectAll(".bar")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => xScale(d.Value))
    .attr("width", xScale.bandwidth())
    .attr("y", (d) => yScale(d.Value))
    .attr("height", (d) => height - yScale(d.Value))
    .style("fill", function (d, i) {
      if (d.Person === "Vegetarian") {
        return "#ffa406";
      } else if (d.Person === "Meateater") {
        return "#0096c7";
      }
    });

  const labelAxis = d3
    .axisBottom(xScale)
    .tickFormat((d, i) => dataset[i].Person);

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(labelAxis)
    .style("font-size", "20px");

  svg
    .selectAll(".text")
    .data(dataset)
    .enter()
    .append("text")
    .attr("class", "label")
    // x position - centeret over baren
    .attr("x", (d) => xScale(d.Value) + xScale.bandwidth() / 2)
    // y position - lidt over baren
    .attr("y", (d) => yScale(d.Value) - 5)
    .attr("text-anchor", "middle")
    .text((d) => d.Value + "%") // Tekstindholdet - procentværdien
    .style("fill", function (d) {
      if (d.Person === "Vegetarian") {
        return "#ffa406";
      } else if (d.Person === "Meateater") {
        return "#0096c7";
      }
    })
    .style("font-size", "4vw") // Større skriftstørrelse
    .style("font-weight", "bold"); // Fed skrift
}

const correctAnswer = "vegetarvouch"; // ID af det korrekte svar

function showResult(selectedAnswer) {
  const resultElementId = selectedAnswer + "-result";
  const resultElement = document.getElementById(resultElementId);

  if (selectedAnswer === correctAnswer) {
    resultElement.style.display = "block";
  } else {
    resultElement.style.display = "block";
  }
}

function fetchdata() {
  let dataset = [];

  fetchContent("https://api-7crq.onrender.com/quizvote/results").then(
    (data) => {
      for (var i = 0; i < data.results.length; i++) {
        dataset.push({
          Person: "Vegetarian",
          Value: Number(data.results[i].percentageof1),
        });
        dataset.push({
          Person: "Meateater",
          Value: Number(data.results[i].percentageof2),
        });
      }
      createQuizChart(dataset);
    }
  );

  async function fetchContent(url) {
    let request = await fetch(url);
    let json = await request.json();
    return json;
  }
}
