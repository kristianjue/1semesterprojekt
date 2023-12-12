function vegetarian() {
  let datasetvegetarian = [];

  // Calls the function fetchContent
  fetchContent("https://api-7crq.onrender.com/vegetarian/").then((data) => {
    for (var i = 0; i < data.vegetarian.length; i++) {
      datasetvegetarian.push([
        parseInt(data.vegetarian[i].Year),
        parseInt(data.vegetarian[i].amount_of_vegetarians),
      ]);
    }
    displayData(datasetvegetarian);
  });

  //Defines height and width
  var w = 1050;
  var h = 525;

  //Finds the div with the ID datavisualiseirng and creates an SVG with defined height and width
  var svg = d3
    .select("#vegetarian")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  // Defines margin
  var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin;

  // Scales the data
  var xScale = d3.scaleLinear().domain([2017, 2022]).range([0, width]),
    yScale = d3.scaleLinear().domain([80000, 200000]).range([height, 0]);

  var g = svg
    .append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");

  // Creates variable to make labels
  var tooltip = d3
    .select("#vegetarian")
    .append("div")
    .style("position", "absolute")
    .style("background-color", "#fff")
    .style("padding", "3px")
    .style("border", "1px #333 solid")
    .style("border-radius", "5px")
    .style("opacity", "0")
    .style("transition", ".2s opacity");

  function displayData(datasetvegetarian) {
    //Adding text to top and bottom
    svg
      .append("text")
      .attr("x", width / 2 + 100)
      .attr("y", 100)
      .attr("text-anchor", "middle")
      .style("font-family", "Helvetica")
      .style("font-size", 32)
      .text("Development of vegetarians in Denmark");

    svg
      .append("text")
      .attr("x", width / 2 + 100)
      .attr("y", height - 15 + 150)
      .attr("text-anchor", "middle")
      .style("font-family", "Helvetica")
      .style("font-size", 20)
      .text("Year");

    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "translate(85,55)")
      .style("font-family", "Helvetica")
      .text("Vegetarians")
      .style("font-size", 20);

    // Creates values ​​on the x-axis, but only on specific years
    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(
        d3
          .axisBottom(xScale)
          .tickValues([2017, 2018, 2019, 2020, 2021, 2022])
          .tickFormat(d3.format("d"))
      )
      .selectAll("text")
      .style("font-size", "16px");

    // Creates values ​​on the y-axis, where the values ​​are displayed as integers
    g.append("g")
      .call(d3.axisLeft(yScale).tickFormat(d3.format("d")))
      .selectAll("text")
      .style("font-size", "16px");

    // Creates data points/dots on the graph
    svg
      .append("g")
      .selectAll("dot")
      .data(datasetvegetarian)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return xScale(d[0]);
      })
      .attr("cy", function (d) {
        return yScale(d[1]);
      })
      .attr("r", 10)
      .attr("transform", "translate(" + 100 + "," + 100 + ")")
      .style("fill", "#ffa406")
      .style("cursor", "zoom-in")

      // Logic for when hovering the mouse over a point, label is displayed (for 4 sec)
      .on("mouseover", function (event, d) {
        tooltip.transition().style("opacity", 1);

        tooltip
          .html(d[1].toLocaleString("da-DK") + " Vegetarians")
          .style("font-size", "20px")
          .style("left", event.pageX + "px")
          .style("top", event.pageY + 15 + "px");
        setTimeout(function () {
          tooltip.transition().style("opacity", 0);
        }, 4000);
      });

    // Defines the line
    var line = d3
      .line()
      .x(function (d) {
        return xScale(d[0]);
      })
      .y(function (d) {
        return yScale(d[1]);
      })
      .curve(d3.curveMonotoneX);

    //Creates the line
    svg
      .append("path")
      .datum(datasetvegetarian)
      .attr("class", "line")
      .attr("transform", "translate(" + 100 + "," + 100 + ")")
      .attr("d", line)
      .style("fill", "none")
      .style("stroke", "#ffa406")
      .style("stroke-width", "3")
      .style("cursor", "zoom-in");
  }

  // Defines the function that asynchronously retrieves data from a url provided as an argument and then returns the data as JSON
  async function fetchContent(url) {
    let request = await fetch(url);
    let json = await request.json();
    return json;
  }
}
