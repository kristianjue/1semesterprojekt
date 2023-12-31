// Fetch and setup chart
fetchContent("https://api-7crq.onrender.com/leaderboard").then((data) => {
  const dataset2 = data.leaderboard;
  drawStackedBarChart(dataset2);
});

// Function to create stacked bar chart
function drawStackedBarChart(data) {
  // set the dimensions and margins of the graph
  const margin1 = { top: 10, right: 30, bottom: 20, left: 60 },
    width = 460 - margin1.left - margin1.right,
    height = 400 - margin1.top - margin1.bottom;

  const keys = ["Co2_for_food", "Co2_for_car"];

  const svg = d3
    .select("#dataforleaderboard")
    .append("svg")
    .attr("width", width + margin1.left + margin1.right)
    .attr("height", height + margin1.top + margin1.bottom)
    .append("g")
    .attr("transform", `translate(${margin1.left},${margin1.top})`);

  const stack = d3.stack().keys(keys);

  const series = stack(data);

  const color = d3.scaleOrdinal().domain(keys).range(["#0096c7", "#ffa406"]);

  // Scaling of axes
  const xScale = d3.scaleBand().domain([0, 1]).range([0, 400]).padding(0.1);

  const yScale = d3.scaleLinear().domain([0, 5000]).range([300, 0]);

  // Add the title to the y-axis with an adjusted y-offset
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin1.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("font-size", "12px")
    .text("Co2-emissions (kg)");

  const popout3 = d3.select("#popout3");

  const tooltip3 = d3
    .select("#dataforleaderboard")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip3")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px");

  // Three functions that change the tooltip and handle opacity changes
  const mouseover = function (event, d) {
    const subgroupName = d3.select(this.parentNode).datum().key;
    const subgroupValue = d.data[subgroupName];
    tooltip3.html(subgroupName + ":" + " " + subgroupValue).style("opacity", 1);

    // Highlight the specific part of the bar
    d3.select(this)
      .transition()
      .duration(200)
      .style("opacity", 1)
      .style("transition", "opacity 200ms linear");

    // Fade out other bars and their corresponding parts
    d3.selectAll("rect")
      .filter((otherD) => {
        if (!otherD || otherD.length < 2 || !d || d.length < 2) {
          return false;
        }
        return otherD[0] != d[0] || otherD[1] != d[1];
      })
      .transition()
      .duration(200)
      .style("opacity", 0.2)
      .style("transition", "opacity 200ms linear");
  };

  const mouseleave = function (event, d) {
    tooltip3.style("opacity", 0);

    // Restore opacity of other bars and their corresponding parts
    d3.selectAll("rect")
      .transition()
      .duration(200)
      .style("opacity", 1)
      .style("transition", "opacity 200ms linear");
  };

  const mousemove = function (event, d) {
    tooltip3
      .style("transform", "translateY(-55%)")
      .style("left", event.x + 10 + "px")
      .style("top", event.y + 40 + "px");
  };

  // Create bars
  svg
    .selectAll("g")
    .data(series)
    .join("g")
    .attr("fill", (d) => color(d.key))
    .selectAll("rect")
    .data((d) => d)
    .join("rect")
    .attr("x", (d, i) => xScale(i))
    .attr("y", (d) => yScale(d[1]))
    .attr("height", (d) => yScale(d[0]) - yScale(d[1]))
    .attr("width", xScale.bandwidth())
    .attr("class", "Board")
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);

  // Create x axis
  svg
    .append("g")
    .attr(
      "transform",
      `translate(0, ${height + margin1.top + margin1.bottom - 100})`
    )
    .call(
      d3.axisBottom(xScale).tickFormat(function (d) {
        //while (d < data.length) {
        if (data[d].person_id === 1) {
          return "Meatlover";
        } else {
          return "Vegetarian";
        }
        //}
      })
    )
    .selectAll("text")
    .style("font-size", "12px");

  // Create y axis
  svg.append("g").call(d3.axisLeft(yScale));
}

async function fetchContent(url) {
  let request = await fetch(url);
  let json = await request.json();
  return json;
}
