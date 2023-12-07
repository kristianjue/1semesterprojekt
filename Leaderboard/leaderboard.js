// set the dimensions and margins of the graph
const margin = { top: 10, right: 30, bottom: 20, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

// Fetch og opsætning af diagram
fetchContent("http://localhost:3000/leaderboard").then((data) => {
  const dataset = data.leaderboard;
  drawStackedBarChart(dataset);
});

// Funktion til at oprette stacked bar chart
function drawStackedBarChart(data) {
  const keys = ["fooddata", "vehicledata"];

  const svg = d3
    .select("#dataforleaderboard")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const stack = d3.stack().keys(keys);

  const series = stack(data);

  const color = d3.scaleOrdinal().domain(keys).range(["#66c2a5", "#fc8d62"]);

  // Skalering af akser
  const xScale = d3.scaleBand().domain([0, 1]).range([0, 400]).padding(0.1);

  const yScale = d3.scaleLinear().domain([0, 5000]).range([400, 0]);

  // Tilføj titlen til y-aksen med en justeret y-offset
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("font-size", "12px")
    //.style("font-style", "italic")
    .text("Co2-udledning");

  const popout2 = d3.select("#popout2");

  const tooltip = d3
    .select("#dataforleaderboard")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px");

  // Three functions that change the tooltip and handle opacity changes
  const mouseover = function (event, d) {
    console.log(d);
    const subgroupName = d3.select(this.parentNode).datum().key;
    const subgroupValue = d.data[subgroupName];
    tooltip.html(subgroupName + ":" + " " + subgroupValue).style("opacity", 1);

    // Highlight the specific part of the bar
    d3.select(this).transition().duration(200).style("opacity", 1);

    // Fade out other bars and their corresponding parts
    d3.selectAll("rect")
      .filter((otherD) => {
        return otherD[0] != d[0] || otherD[1] != d[1];
      })
      .transition()
      .duration(200)
      .style("opacity", 0.2);
  };

  const mouseleave = function (event, d) {
    tooltip.style("opacity", 0);

    // Restore opacity of other bars and their corresponding parts
    d3.selectAll("rect").transition().duration(200).style("opacity", 1);
  };

  const mousemove = function (event, d) {
    tooltip
      .style("transform", "translateY(-55%)")
      .style("left", event.x + 10 + "px")
      .style("top", event.y + 40 + "px");
  };

  // Opret bjælker
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

  // Opret x-akse
  svg
    .append("g")
    .attr("transform", `translate(0, ${400})`)
    .call(
      d3.axisBottom(xScale).tickFormat(function (d) {
        console.log(data);
        console.log(d);
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

  // Opret y-akse
  svg.append("g").call(d3.axisLeft(yScale));
}

async function fetchContent(url) {
  let request = await fetch(url);
  let json = await request.json();
  return json;
}
