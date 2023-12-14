//graph of fuel-car
// Define height, width and margin2
var margin2 = { top: 50, right: 95, bottom: 30, left: 60 },
  width = 620 - margin2.left - margin2.right,
  height = 527 - margin2.top - margin2.bottom;

//Add svg object to body of the page
var svg = d3
  .select("#line1")
  .append("svg")
  .attr("width", width + margin2.left + margin2.right)
  .attr("height", height + margin2.top + margin2.bottom)
  .append("g")
  .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

//Load Data, time format is used to get data in the correct format
let dataset = [];
let timeFormat = d3.timeFormat("%Y-%m");

fetchContent("https://api-7crq.onrender.com/car_development/2").then((data) => {
  for (var i = 0; i < data.car_development.length; i++) {
    dataset.push([
      data.car_development[i].yearandquarter,
      data.car_development[i].amount_of_cars,
    ]);
  }
  let parseTime = d3.timeParse("%Y-%m");

  dataset.forEach(function (d) {
    d[0] = parseTime(d[0]);
  });
  dataset.sort(function (a, b) {
    return a[0] - b[0];
  });

  createVisualization(dataset);
});

function createVisualization(dataset) {
  //Adds the X axis
  var x = d3
    .scaleTime()
    .domain(
      d3.extent(dataset, function (d) {
        return d[0];
      })
    )
    .range([0, width]);
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  //Adds the Y axis
  var y = d3
    .scaleLinear()
    .domain([
      2150000,
      d3.max(dataset, function (d) {
        return +d[1];
      }),
    ])
    .range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  //Variables for the reference area
  let referenceYear = 2022;
  let referenceMonth = 10;
  let referenceDate = d3.timeParse("%Y-%m")(
    `${referenceYear}-${referenceMonth}`
  );

  //Add text to the reference area
  svg
    .append("text")
    .attr("x", x(referenceDate) - 80) // Justér denne værdi for at justere vandret placering af teksten
    .attr("y", -30) // Justér denne værdi for at justere lodret placering af teksten
    .text("Decrease of -2.19%")
    .style("font-size", "14px")
    .style("font-weight", "bold")
    .append("tspan")
    .attr("x", x(referenceDate) - 80)
    .attr("dy", 20) // Justér denne værdi for at justere afstanden mellem linjerne
    .text("from 2022/10 to 2023/10")
    .style("font-size", "12px")
    .style("font-weight", "normal"); // Gør kun denne del ikke-fed

  //Colors the reference area
  svg
    .append("rect")
    .attr("x", x(referenceDate)) // Start x-koordinatet for farvet område
    .attr("width", width - x(referenceDate)) // Bredden af det farvede område
    .attr("y", 0)
    .attr("height", height)
    .attr("fill", "rgba(255, 164, 6, 0.3)");

  //Add clipPath
  svg
    .append("defs")
    .append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);

  //Add the line to the graph using clipPath
  svg
    .append("path")
    .datum(dataset)
    .attr("fill", "none")
    .attr("stroke", "#ffa406")
    .attr("stroke-width", 1.5)
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d[0]);
        })
        .y(function (d) {
          return y(d[1]);
        })
    )
    .attr("clip-path", "url(#clip)"); //Apply clipPath

  //Add label and circle to graph points
  var tooltip = d3
    .select("#line1")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  var focus = svg.append("g").style("display", "none");

  focus
    .append("circle")
    .attr("r", 5)
    .attr("class", "focus-circle")
    .style("fill", "#ffa406");

  focus
    .append("text")
    .attr("x", 9)
    .attr("dy", ".35em")
    .style("font-size", "18px")
    .attr("class", "focus-text");

  //Add an overlay to the entire graph to handle hover event
  svg
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all")
    .style("cursor", "zoom-in")
    .on("mouseover", handleMouseOver)
    .on("mousemove", handleMouseMove)
    .on("mouseout", handleMouseOut);

  //Function to handle hover event
  function handleMouseOver() {
    focus.style("display", null);
    tooltip.style("opacity", 1);
  }

  function handleMouseMove(event) {
    var xValue = x.invert(d3.pointer(event, this)[0]);
    var bisectDate = d3.bisector(function (d) {
      return d[0];
    }).left;
    var i = bisectDate(dataset, xValue, 1);
    var d = dataset[i];

    //Update the position of the circle and text
    focus.attr("transform", "translate(" + x(d[0]) + "," + y(d[1]) + ")");
    focus.select(".focus-text").text(d[1].toLocaleString("da-DK"));
  }

  function handleMouseOut() {
    focus.style("display", "none");
    tooltip.style("opacity", 0);
  }

  //Add a title to the left of the graph
  svg
    .append("text")
    .attr("x", -margin2.left) // Placer til venstre for grafområdet
    .attr("y", -margin2.top / 2) // Placer over toppen af grafområdet
    .attr("text-anchor", "start") // Juster til venstrejusteret tekst
    .style("font-size", "20px") // Juster størrelsen efter behov
    .style("fill", "black")
    .style("text-decoration", "underline")
    .text("Fuel-cars");
}

//Magic
async function fetchContent(url) {
  let request = await fetch(url);
  let json = await request.json();
  return json;
}

//graph over electric-car - this is done the same way as above
var margin2 = { top: 50, right: 95, bottom: 30, left: 60 },
  width2 = 620 - margin2.left - margin2.right,
  height2 = 527 - margin2.top - margin2.bottom;

//Add svg object to body of the page
var svg2 = d3
  .select("#line2")
  .append("svg")
  .attr("width", width2 + margin2.left + margin2.right)
  .attr("height", height2 + margin2.top + margin2.bottom)
  .append("g")
  .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

//Load Data, time format is used to get data in the correct format
let dataset2 = [];
let timeFormat2 = d3.timeFormat("%Y-%m");

fetchContent("https://api-7crq.onrender.com/car_development/1").then((data) => {
  for (var i = 0; i < data.car_development.length; i++) {
    dataset2.push([
      data.car_development[i].yearandquarter,
      data.car_development[i].amount_of_cars,
    ]);
  }
  let parseTime = d3.timeParse("%Y-%m");

  dataset2.forEach(function (d) {
    d[0] = parseTime(d[0]);
  });
  dataset2.sort(function (a, b) {
    return a[0] - b[0];
  });

  createVisualization2(dataset2);
});

function createVisualization2(dataset2) {
  //Adds the X axis
  var x2 = d3
    .scaleTime()
    .domain(
      d3.extent(dataset2, function (d) {
        return d[0];
      })
    )
    .range([0, width2]);
  svg2
    .append("g")
    .attr("transform", "translate(0," + height2 + ")")
    .call(d3.axisBottom(x2));

  //Adds the Y axis
  var y2 = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(dataset2, function (d) {
        return +d[1];
      }),
    ])
    .range([height2, 0]);
  svg2.append("g").call(d3.axisLeft(y2));

  //Variables for the reference area
  let referenceYear2 = 2022;
  let referenceMonth2 = 10;
  let referenceDate2 = d3.timeParse("%Y-%m")(
    `${referenceYear2}-${referenceMonth2}`
  );

  //Add text to the reference area
  svg2
    .append("text")
    .attr("x", x2(referenceDate2) - 80)
    .attr("y", -30)
    .text("Increase of 73.75%")
    .style("font-size", "14px")
    .style("font-weight", "bold")
    .append("tspan")
    .attr("x", x2(referenceDate2) - 80)
    .attr("dy", 20)
    .text("from 2022/10 to 2023/10")
    .style("font-size", "12px")
    .style("font-weight", "normal");

  //Colors the reference area
  svg2
    .append("rect")
    .attr("x", x2(referenceDate2))
    .attr("width", width2 - x2(referenceDate2))
    .attr("y", 0)
    .attr("height", height2)
    .attr("fill", "rgba(0, 150, 199, 0.3)");

  //Add clipPath
  svg2
    .append("defs")
    .append("clipPath")
    .attr("id", "clip2")
    .append("rect")
    .attr("width", width2)
    .attr("height", height2);

  //Add the line to the graph using clipPath
  svg2
    .append("path")
    .datum(dataset2)
    .attr("fill", "none")
    .attr("stroke", "#0096c7")
    .attr("stroke-width", 1.5)
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x2(d[0]);
        })
        .y(function (d) {
          return y2(d[1]);
        })
    )
    .attr("clip-path", "url(#clip2)"); //Apply clipPath

  //Add label and circle to graph points
  var tooltip2 = d3
    .select("#line2")
    .append("div")
    .attr("class", "tooltip2")
    .style("opacity", 0);

  var focus2 = svg2.append("g").style("display", "none");

  focus2
    .append("circle")
    .attr("r", 5)
    .attr("class", "focus-circle")
    .style("fill", "#0096c7");

  focus2
    .append("text")
    .attr("x", 9)
    .attr("dy", ".35em")
    .style("font-size", "18px")
    .attr("class", "focus-text");

  //Add an overlay to the entire graph to handle hover event
  svg2
    .append("rect")
    .attr("width", width2)
    .attr("height", height2)
    .style("fill", "none")
    .style("pointer-events", "all")
    .style("cursor", "zoom-in")
    .on("mouseover", handleMouseOver2)
    .on("mousemove", handleMouseMove2)
    .on("mouseout", handleMouseOut2);

  function handleMouseOver2() {
    focus2.style("display", null);
    tooltip2.style("opacity", 1);
  }

  //Function to handle hover event
  function handleMouseMove2(event) {
    var x2Value = x2.invert(d3.pointer(event, this)[0]);
    var bisectDate = d3.bisector(function (d) {
      return d[0];
    }).left;
    var i = bisectDate(dataset2, x2Value, 1);
    var d = dataset2[i];

    //Update the position of the circle and text
    focus2.attr("transform", "translate(" + x2(d[0]) + "," + y2(d[1]) + ")");
    focus2.select(".focus-text").text(d[1].toLocaleString("da-DK"));
  }

  function handleMouseOut2() {
    focus2.style("display", "none");
    tooltip2.style("opacity", 0);
  }

  //Add a title to the left of the graph
  svg2
    .append("text")
    .attr("x", -margin2.left)
    .attr("y", -margin2.top / 2)
    .attr("text-anchor", "start")
    .style("font-size", "20px")
    .style("fill", "black")
    .style("text-decoration", "underline")
    .text("Electric cars");
}

//Magic
async function fetchContent(url) {
  let request = await fetch(url);
  let json = await request.json();
  return json;
}
