let aggregatedVegetarData = 0;
let aggregatedMeatloverData = 0;
let maaltidVegetar = []; // maaltid 1, maaltid 4, maaltid 6
let maaltidMeatlover = []; // maaltid 2, maaltid 3, maaltid 5

fetchContent("Maaltider.json")
  .then((data) => {
    // Iterer over data og opdel i vegetarisk og kødelsker arrays
    data.tallerken.forEach((maaltid) => {
      if (
        maaltid.maaltid_id === 1 ||
        maaltid.maaltid_id === 4 ||
        maaltid.maaltid_id === 6
      ) {
        maaltidVegetar.push(maaltid);
      } else if (
        maaltid.maaltid_id === 2 ||
        maaltid.maaltid_id === 3 ||
        maaltid.maaltid_id === 5
      ) {
        maaltidMeatlover.push(maaltid);
      }
    });

    console.log(maaltidVegetar);
    console.log(maaltidMeatlover);

    aggregatedVegetarData = aggregateData(maaltidVegetar);
    aggregatedMeatloverData = aggregateData(maaltidMeatlover);
    createBarChart(
      aggregatedVegetarData,
      "#VegetarianBarChart",
      "rgb(255,201,7)",
      "rgb(204,131,4)"
    );
    createBarChart(
      aggregatedMeatloverData,
      "#MeatBarChart",
      "rgb(0,195,255)",
      "rgb(0,75,99)"
    );
  })
  .catch((error) => {
    console.error("Der opstod en fejl under hentning af JSON-data:", error);
  });

const translationMap = {
  Agriculture: "Landbrug",
  iLUC: "iLUC",
  FoodProcessing: "Fødevareforarbejdning",
  Packaging: "Emballage",
  Transport: "Transport",
  Retail: "Detailhandel",
};

function aggregateData(maaltider) {
  const aggregatedData = {
    Agriculture: 0,
    iLUC: 0,
    FoodProcessing: 0,
    Packaging: 0,
    Transport: 0,
    Retail: 0,
  };

  maaltider.forEach((maaltid) => {
    aggregatedData.Agriculture += parseFloat(maaltid.Agriculture * 365);
    aggregatedData.iLUC += parseFloat(maaltid.iLUC * 365);
    aggregatedData.FoodProcessing += parseFloat(maaltid.FoodProcessing * 365);
    aggregatedData.Packaging += parseFloat(maaltid.Packaging * 365);
    aggregatedData.Transport += parseFloat(maaltid.Transport * 365);
    aggregatedData.Retail += parseFloat(maaltid.Retail * 365);
  });
  return aggregatedData;
}

function createBarChart(
  aggregatedData,
  elementSelector,
  lightcolor,
  darkcolor
) {
  const margin = { top: 20, right: 20, bottom: 50, left: 100 },
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  const data = Object.entries(aggregatedData).map(([category, value]) => ({
    category,
    value,
  }));

  const svg = d3
    .select(elementSelector)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const x = d3.scaleLinear().domain([0, 650]).range([0, width]);

  const y = d3
    .scaleBand()
    .range([0, height])
    .domain(data.map((d) => d.category))
    .padding(0.3);

  const colorScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)])
    .range([lightcolor, darkcolor]); // Lys til mørk skala

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", (d) => y(d.category))
    .attr("width", (d) => x(d.value))
    .attr("height", y.bandwidth())
    .attr("fill", (d) => colorScale(d.value))
    .attr("class", "barcharts")
    .on("mouseover", function (event, d) {
      d3.selectAll(".barcharts")
        .transition()
        .duration(75)
        .style("opacity", 0.1);

      d3.select(this).transition().duration(10).style("opacity", 1);

      const tooltipText = getDescription(d.category);

      const xPosition = event.pageX;
      const yPosition = event.pageY;

      const tooltip = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      tooltip.transition().duration(200).style("opacity", 0.9);

      tooltip
        .html(tooltipText)
        .style("left", xPosition + "px")
        .style("top", yPosition - 50 + "px");
    })
    .on("mouseout", function (event, d) {
      d3.selectAll(".barcharts").transition().duration(10).style("opacity", 1);

      d3.selectAll(".tooltip").remove();
    })
    .on("click", function (event, d) {
      d3.selectAll(".contentplaceholder").style("display", "block");
      /*const category = d.category;
      if (category === "Agriculture") {
        scrollToElement("#detail");
      }*/
    });

  d3.select("#close-button").on("click", closeDescription);

  svg
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "value-label")
    .attr("x", (d) => x(d.value) + 5) // a little offset to the right of the bar's end
    .attr("y", (d) => y(d.category) + y.bandwidth() / 2) // centered in the bar
    .text((d) => d.value.toFixed(2))
    .style("fill", "black") // text color
    .style("font-size", "10px"); // text size

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  svg.append("g").call(d3.axisLeft(y));
}

function getDescription(category) {
  const descriptions = {
    Agriculture:
      "Tryk for at læse mere om hvordan Agriculture påvriker CO2-udledningen...",
    iLUC: "Tryk for at læse mere om hvordan iLUC påvriker CO2-udledningen...",
    FoodProcessing: "Tryk for at læse mere om hvordan FoodProcessing påvriker CO2-udledningen...",
    Packaging: "Tryk for at læse mere om hvordan Packaging påvriker CO2-udledningen...",
    Transport: "Tryk for at læse mere om hvordan Transport påvriker CO2-udledningen...",
    Retail: "Tryk for at læse mere om hvordan Retail påvriker CO2-udledningen...",
  };
  return descriptions[category];
}

function appendImg(place, img) {
  d3.select(place).append("img").attr("src", img);
}

appendImg("#vegetarianDish", "vegetarian.png");
appendImg("#meatDish", "meatlover.png");
appendImg("#vegetarianinformation", "informationbutton.png");
appendImg("#meatinformation", "informationbutton.png");

d3.selectAll(".informations-billede")
  .on("mouseover", function (event, d) {
    d3.select(this).style("opacity", 0.5);
  })
  .on("mouseout", function (event, d) {
    d3.select(this).style("opacity", 1);
  });

d3.selectAll(".informations-billede img").on("click", showOverlayContentInfo);

d3.select("#closeOverlay").on("click", closeOverlayContentInfo);

let billede = document.getElementsByClassName("informations-billede");

billede[0].addEventListener("click", function () {
  // Handle click for vegetarian information icon

  let vegetarianptag = document.createElement("p");
  vegetarianptag.innerHTML =
    "Resultat er baseret på en vegetarisk diæt for en hel dag. Diæten består af Morgenmad:" +
    "<br/>" +
    "170g Müsli, 210g Sødmælk, 30 Blåbær, 30g Jordbær. Frokost: 200g Rudbrød, 140g Æg, 10g Pesto, 10g Soltørrede tomater. Aftensmad: 100g Ris, 120g Falafel, 80g Rucola Salat, 100g Rødvin.";
  informationDisplay(vegetarianptag);
});

billede[1].addEventListener("click", function () {
  // Handle click for meat information icon
  //let overlayContent = document.getElementById("overlayContent");
  let meatptag = document.createElement("p");
  meatptag.innerHTML =
    "Resultatet er baseret på en normal diæt for en hel dag. Diæten består af Morgenmad: 120g Grovbolle, 50g Danbo Ost, 20g Roastbeef, 250g Appelsinjuice. Frokost: 200g Rugbrød, 80g Leverpostej, 60g Rødbede, 20g Agurk. Aftensmad: 150g Hakket Grisekød, 100g Kartoffeler, 50g Broccoli, 100g Hvidvin.";
  informationDisplay(meatptag);
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

function closeDescription() {
  d3.select(".contentplaceholder").style("display", "none");
}

async function fetchContent(url) {
  let response = await fetch(url);
  return await response.json();
}
