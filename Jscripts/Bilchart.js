let eCardata = [];
let fuelCardata = [];

fetchContent("https://api.backlogbusters.tech/vehicle_co2_emissions/1").then(
  (data) => {
    for (i = 0; i < data.vehicle_co2_emissions.length; i++) {
      eCardata.push([
        Number(data.vehicle_co2_emissions[i].co2_t_pr_year) * 1000,
        data.vehicle_co2_emissions[i].stage_name,
      ]);
    }
    barchartel(eCardata);
  }
);

fetchContent("https://api.backlogbusters.tech/vehicle_co2_emissions/2").then(
  (data) => {
    for (i = 0; i < data.vehicle_co2_emissions.length; i++) {
      fuelCardata.push([
        Number(data.vehicle_co2_emissions[i].co2_t_pr_year) * 1000,
        data.vehicle_co2_emissions[i].stage_name,
      ]);
    }
    barchartFuel(fuelCardata);
  }
);

d3.select("#audi").append("img").attr("src", "Mediafiles/2audi.png");

d3.select("#mercedes").append("img").attr("src", "Mediafiles/mercedesamg.png");

d3.selectAll(".information-picture")
  .append("img")
  .attr("src", "Mediafiles/informationbutton.png")
  .on("mouseover", function (event, d) {
    d3.select(this).style("opacity", 0.5);
  })
  .on("mouseout", function (event, d) {
    d3.select(this).style("opacity", 1);
  });

d3.selectAll(".information-picture img").on("click", showOverlayContentInfocar);

d3.select("#closeOverlaycar").on("click", closeOverlayContentInfocar);

let billede = document.getElementsByClassName("information-picture");

billede[0].addEventListener("click", function () {
  // Handle click for vegetarian information icon

  let fuelCarptag = document.createElement("p");
  fuelCarptag.innerHTML =
    "<b>" +
    "Vehicle Size: " +
    "</b>" +
    "<i>" +
    "Large ICE " +
    "</i>" +
    "(Internal Combustion Engine)" +
    "<br/>" +
    "<br/>" +
    "<b>" +
    "Electric Car Emissions Breakdown: " +
    "</b>" +
    "The electric car, like this Audi e-tron, represents a move towards cleaner transportation with a total CO2 emission of 2,688 kg per year. Here's the emission distribution:" +
    "<br/>" +
    "<br/>" +
    "<b>" +
    "Vehicle manufacturing: " +
    "</b>" +
    "The initial production of the electric car, especially the battery, has a higher environmental cost compared to traditional cars. Battery manufacturing: The production of lithium-ion batteries is energy-intensive and contributes significantly to the vehicle's lifetime emissions." +
    "<br/>" +
    "<br/>" +
    "<b>" +
    "Fuel/electricity production: " +
    "</b>" +
    "Although much lower than fuel cars, the generation of electricity to power the vehicle still has an environmental impact, depending on the energy source." +
    "<br/>" +
    "<br/>" +
    "<b>" +
    "Tailpipe emissions: " +
    "</b>" +
    "Virtually zero, as electric cars do not burn fuel and hence have no exhaust emissions." +
    "<br/>" +
    "<br/>" +
    "<b>" +
    "Vehicle maintenance and end-of-life: " +
    "</b>" +
    "Emissions from these stages are relatively low but are part of the electric vehicle's total ecological footprint. Each aspect underscores the importance of clean energy sources and responsible end-of-life recycling to minimize the environmental impact of electric vehicles.";
  informationDisplaycar(fuelCarptag);
});

billede[1].addEventListener("click", function () {
  // Handle click for meat information icon
  let eCarptag = document.createElement("p");
  eCarptag.innerHTML =
    "<b>" +
    "Vehicle Size: " +
    "</b>" +
    "<i>" +
    "Large BEV " +
    "</i>" +
    "(Battery Electric Vehicle)" +
    "<br/>" +
    "<br/>" +
    "<b>" +
    "Fuel Car Emissions Breakdown: " +
    "</b>" +
    "The traditional fuel car, such as the one shown here, contributes significantly to environmental pollution, with a total CO2 emission of 4,250 kg per year. The detailed emissions are as follows:" +
    "<br/>" +
    "<br/>" +
    "<b>" +
    "Tailpipe emissions: " +
    "</b>" +
    "The combustion of fuel emits the most CO2, accounting for the majority of the car's carbon footprint." +
    "<br/>" +
    "<br/>" +
    "<b>" +
    "Fuel production: " +
    "</b>" +
    "The process of extracting, refining, and transporting fuel is the second-largest contributor to the vehicle's emissions. " +
    "<br/>" +
    "<br/>" +
    "<b>" +
    "Vehicle manufacturing, maintenance, and end-of-life: " +
    "</b>" +
    "These factors also contribute to the total emissions, highlighting the environmental impact throughout the car's lifecycle. Each component reflects the ongoing environmental challenges associated with fuel car ownership.";
  informationDisplaycar(eCarptag);
});

function informationDisplaycar(ptag) {
  // Append the new <p> tag
  let overlayContentcar = document.getElementById("overlayContentcar");
  let previousTag = overlayContentcar.querySelector("p");
  if (previousTag) {
    previousTag.remove();
  }
  overlayContentcar.appendChild(ptag);

  // Display the overlay
  overlayContentcar.style.display = "block";
}

function showOverlayContentInfocar() {
  d3.select("#overlayContentcar").style("display", "block");
}

function closeOverlayContentInfocar() {
  d3.select("#overlayContentcar").style("display", "none");
}

function barchartel(dataset) {
  const popout2 = d3.select("#popout2");

  let margin = { top: 20, right: 30, bottom: 40, left: 150 },
    width = 700 - margin.left - margin.right,
    height = 380 - margin.top - margin.bottom;

  let svg = d3
    .select("#eCarchart")
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

  // Append x-axis
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Append y-axis
  svg.append("g").call(d3.axisLeft(y));
}

function barchartFuel(dataset) {
  const popout = d3.select("#popout");
  let margin = { top: 20, right: 30, bottom: 40, left: 150 },
    width = 700 - margin.left - margin.right,
    height = 380 - margin.top - margin.bottom;

  let svg = d3
    .select("#fuelChart")
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
    .attr("class", "fuelCar")
    .on("mousemove", function (event, d) {
      d3.selectAll(".fuelCar")
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
      d3.selectAll(".fuelCar")
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
