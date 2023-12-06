let elbildata = [];
let brændselbildata = [];

fetchContent("https://api.backlogbusters.tech/vehicle_co2_emissions/1").then(
  (data) => {
    for (i = 0; i < data.vehicle_co2_emissions.length; i++) {
      elbildata.push([
        Number(data.vehicle_co2_emissions[i].co2_t_pr_year) * 1000,
        data.vehicle_co2_emissions[i].stage_name,
      ]);
    }
    barchartel(elbildata);
  }
);

fetchContent("https://api.backlogbusters.tech/vehicle_co2_emissions/2").then(
  (data) => {
    for (i = 0; i < data.vehicle_co2_emissions.length; i++) {
      brændselbildata.push([
        Number(data.vehicle_co2_emissions[i].co2_t_pr_year) * 1000,
        data.vehicle_co2_emissions[i].stage_name,
      ]);
    }
    barchartbrændsel(brændselbildata);
  }
);

d3.select("#audi").append("img").attr("src", "2audi.png");
// barchartel();

d3.select("#mercedes").append("img").attr("src", "mercedesamg.png");
// barchartbrændsel();

d3.selectAll(".information-picture")
  .append("img")
  .attr("src", "informationbutton.png")
  .on("mouseover", function (event, d) {
    d3.select(this).style("opacity", 0.5);
  })
  .on("mouseout", function (event, d) {
    d3.select(this).style("opacity", 1);
  });

d3.selectAll(".information-picture img").on("click", showOverlayContentInfo);

d3.select("#closeOverlay").on("click", closeOverlayContentInfo);

let billede = document.getElementsByClassName("information-picture");

billede[0].addEventListener("click", function () {
  // Handle click for vegetarian information icon

  let elbilptag = document.createElement("p");
  elbilptag.textContent =
    "This is information about CO2 emissions from electriccars";
  informationDisplay(elbilptag);
});

billede[1].addEventListener("click", function () {
  // Handle click for meat information icon
  let overlayContent = document.getElementById("overlayContent");
  let brændselbilptag = document.createElement("p");
  brændselbilptag.textContent =
    "This is information about CO2 emissions from fuelcars";
  informationDisplay(brændselbilptag);
});

function informationDisplay(ptag) {
  // Clear previous content
  // Append the new <p> tag
  let previousTag = overlayContent.querySelector("p");
  if (previousTag) {
    previousTag.remove();
  }
  overlayContent.appendChild(ptag);

  // Display the overlay
  overlayContent.style.display = "block";
}

function showOverlayContentInfo() {
  d3.select("#overlayContent").style("display", "block");
}

function closeOverlayContentInfo() {
  d3.select("#overlayContent").style("display", "none");
}

function barchartel(dataset) {
  const popout2 = d3.select("#popout2");

  let margin = { top: 20, right: 30, bottom: 40, left: 150 },
    width = 700 - margin.left - margin.right,
    height = 380 - margin.top - margin.bottom;

  let svg = d3
    .select("#elbilchart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  let x = d3
    .scaleLinear()
    .domain([
      d3.min(dataset, function (d) {
        return d[0];
      }),
      d3.max(dataset, function (d) {
        return d[0];
      }),
    ])

    .range([-0.2, width]);

  let y = d3
    .scaleBand()
    .range([0, height])
    .domain(dataset.map((d, i) => d[1]))
    .padding(0.1);

  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", x(0)) // Start from the y-axis position
    .attr("y", (d) => y(d[1]))
    .attr("width", 0) // Start with zero width
    .attr("height", y.bandwidth())
    .attr("class", "eCar")
    .on("mousemove", function (event, d) {
      d3.selectAll(".eCar").transition().duration(50).style("opacity", 0.1);
      d3.select(this).transition().duration(50).style("opacity", 1);
      popout2.html(`<p>${d[1]}: ${d[0]}</p>`);
      const [x, y] = d3.pointer(event, d);
      const offset = 10; // You can adjust this offset
      popout2.style("left", x + offset + "px").style("top", y + offset + "px");
      popout2.style("display", "block");
    })
    .on("mouseout", function (event, d) {
      d3.selectAll(".eCar").transition().duration(50).style("opacity", 1);
      popout2.style("display", "none");
    })
    .transition()
    .duration(1000) //The duration of the transition in milliseconds
    .ease(d3.easeCubic)
    .attr("width", function (d) {
      if (d[0] > 0) {
        return x(d[0]);
      } else if (d[0] == 0) {
        return 1;
      } else {
        return x(0);
      }
    })
    .attr("x", (d) => (d[0] > 0 ? x(0) : x(d[0]))) // Move to the final x position
    .transition()
    .duration(1000) //The duration of the transition in milliseconds
    .style("fill", function (d) {
      if (d[0] > 0) {
        // Set color based on positive values
        return (
          "rgb(0," +
          Math.round(200 - d[0] / 8 + 40) +
          "," +
          Math.round(255 - d[0] / 8 + 40) +
          ")"
        );
      } else {
        // Set light blue for negative values
        return "lightblue";
      }
    });

  // Add text labels
  /* svg
    .selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .attr("x", x(0)) // Start from the y-axis position
    .attr("y", (d) => y(d[1]) + y.bandwidth() / 2 + 5) // Center text in the bar
    .text((d) => d[0].toFixed(1)) // Format the number to 4 decimal places
    .transition()
    .duration(1000)
    .ease(d3.easeCubic)
    .attr("x", function (d) {
      if (d[0] > 1000) {
        return x(d[0]) - 5;
      } else if (d[0] == 0) {
        return 60;
      } else if (d[0] > 100 && d[0] < 1000) {
        return x(d[0]) + 20;
      } else if (d[0] > 60 && d[0] < 80) {
        return x(d[0]) + 26;
      } else {
        return x(0);
      }
    }) // Position text a bit right of the bar end
    .attr("y", (d, i) => y(d[1]) + y.bandwidth() / 2 + 5) // Center text in the bar
    .attr("alignment-baseline", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .style("fill", function (d) {
      return d[0] > 0 ? "white" : "black"; // Set the fill color based on the value of d
    });
*/
  // Append x-axis
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Append y-axis
  svg.append("g").call(d3.axisLeft(y));
}

function barchartbrændsel(dataset) {
  const popout = d3.select("#popout");
  let margin = { top: 20, right: 30, bottom: 40, left: 150 },
    width = 700 - margin.left - margin.right,
    height = 380 - margin.top - margin.bottom;

  let svg = d3
    .select("#brændselchart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  let x = d3
    .scaleLinear()
    .domain([
      d3.min(dataset, function (d) {
        return d[0];
      }),
      d3.max(dataset, function (d) {
        return d[0];
      }),
    ])
    .range([-0.1, width]);

  let y = d3
    .scaleBand()
    .range([0, height])
    .domain(dataset.map((d, i) => d[1]))
    .padding(0.1);

  // Create bars
  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", x(0)) // Start from the y-axis position
    .attr("y", (d) => y(d[1]))
    .attr("width", 0) // Start with zero width
    .attr("height", y.bandwidth())
    .attr("class", "brændselbil")
    .on("mousemove", function (event, d) {
      d3.selectAll(".brændselbil")
        .transition()
        .duration(50) //The duration of the transition in milliseconds
        .style("opacity", 0.1);
      d3.select(this).transition().duration(50).style("opacity", 1);
      popout.html(`<p>${d[1]}: ${d[0]}</p>`);
      const [x, y] = d3.pointer(event, d);
      const offset = 10; // You can adjust this offset
      popout.style("left", x + offset + "px").style("top", y + offset + "px");
      popout.style("display", "block");
    })
    .on("mouseout", function (event, d) {
      d3.selectAll(".brændselbil")
        .transition()
        .duration(50) //The duration of the transition in milliseconds
        .style("opacity", 1);
      popout.style("display", "none");
    })
    .transition()
    .duration(1000) //The duration of the transition in milliseconds
    .ease(d3.easeCubic)
    .attr("width", function (d) {
      if (d[0] > 0) {
        return x(d[0]);
      } else if (d[0] == 0) {
        return 1;
      } else {
        return x(0);
      }
    })
    .attr("x", (d) => (d[0] > 0 ? x(0) : x(d[0]))) // Move to the final x position
    .transition()
    .duration(1000) //The duration of the transition in milliseconds
    .style("fill", function (d) {
      if (d[0] > 0) {
        // Set color based on positive values
        return (
          "rgb(255," +
          Math.round(255 - d[0] / 5) +
          "," +
          Math.round(2 / d[0]) +
          ")"
        );
      } else {
        // Set light blue for negative values
        return "rgb(253,250,114)";
      }
    });

  // Set fill color based on position in dataset
  //.style("fill", "orange");

  // Add text labels
  /* svg
    .selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .attr("x", x(0)) // Start from the y-axis position
    .attr("y", (d) => y(d[1]) + y.bandwidth() / 2 + 5) // Center text in the bar
    .text((d) => d[0].toFixed(1)) // Format the number to 4 decimal places
    .transition()
    .duration(1000)
    .ease(d3.easeCubic)
    .attr("alignment-baseline", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .style("fill", function (d) {
      return d[0] > 0 ? "white" : "black"; // Set the fill color based on the value of d
    })
    .attr("x", function (d) {
      if (d[0] > 1000) {
        return x(d[0]) - 25;
      } else if (d[0] == 0) {
        return 20;
      } else if (d[0] > 100 && d[0] < 1000) {
        return x(d[0] - 100);
      } else {
        return x(0);
      }
    });
*/
  // Append x-axis
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(8));

  // Append y-axis
  svg.append("g").call(d3.axisLeft(y));
}

async function fetchContent(url) {
  let request = await fetch(url);
  let json = await request.json();
  return json;
}
