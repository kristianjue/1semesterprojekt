let vegetarianData = 0;
let meateaterData = 0;
let vegetarianArray = []; // Array for vegetarian meals
let meateaterArray = []; // Array for meat meals

fetchContent("https://api.backlogbusters.tech/tallerken/")
  .then((data) => {
    // iterates over data and groups by vegetarian or normal meals
    data.tallerken.forEach((meal) => {
      if (
        meal.maaltid_id === 1 ||
        meal.maaltid_id === 4 ||
        meal.maaltid_id === 6
      ) {
        vegetarianArray.push(meal);
      } else if (
        meal.maaltid_id === 2 ||
        meal.maaltid_id === 3 ||
        meal.maaltid_id === 5
      ) {
        meateaterArray.push(meal);
      }
    });

    console.log(vegetarianArray);
    console.log(meateaterArray);

    vegetarianData = transformData(vegetarianArray);
    meateaterData = transformData(meateaterArray);
    console.log(vegetarianData);

    createBarChart(
      vegetarianData,
      "#VegetarianBarChart",
      "rgb(255,201,7)",
      "rgb(204,131,4)"
    );
    createBarChart(
      meateaterData,
      "#MeatBarChart",
      "rgb(0,195,255)",
      "rgb(0,75,99)"
    );
  })
  .catch((error) => {
    console.error("Der opstod en fejl under hentning af JSON-data:", error);
  });

/*In out dataset, the CO2 emissions data is showed for each ingredient and not for each diet. We therefore
need to sum the CO2 emissions data for each diet and group them by category to make our visualization. 
This function iterates through each meal in the diet
and sums up the CO2 emissions data for each category. Becuase all of our data is written in strings,
we then use parseFloat to transform it to decimal numbers. We then times every category with 365, as our
visualization examines the CO2 emission for each diet pr year  */

function transformData(diet) {
  const transformData = {
    Agriculture: 0,
    iLUC: 0,
    FoodProcessing: 0,
    Packaging: 0,
    Transport: 0,
    Retail: 0,
  };

  diet.forEach((meal) => {
    transformData.Agriculture += parseFloat(meal.Agriculture * 365);
    transformData.iLUC += parseFloat(meal.iLUC * 365);
    transformData.FoodProcessing += parseFloat(meal.FoodProcessing * 365);
    transformData.Packaging += parseFloat(meal.Packaging * 365);
    transformData.Transport += parseFloat(meal.Transport * 365);
    transformData.Retail += parseFloat(meal.Retail * 365);
  });
  return transformData;
}

/* This function is used to create our barchart with d3. It takes 4 parameters.
one is our transformedData, which is the result of the function above, that we have used on both arrays containing our meals.
second is our elementSelector, which is where in our document we should place our svg
third and fourth takes in two colorcodes which we use to make our barcharts have a darker shade based on the min and max values in our data.
*/

function createBarChart(transformData, elementSelector, lightcolor, darkcolor) {
  const margin = { top: 20, right: 20, bottom: 50, left: 100 },
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  /* In following code we have an object called transformData that contains data categorized 
  by different categories and each category has a value representing CO2 emissions.
  To make it easier to make a barchart based on category and co2 emission 
  we needed to transform this object into an array of objects, where each object represents a category and its corresponding value 
  We first transform our transformData object into an array with key(category) and value(co2) pairs.
  We then map the key and value pairs into object with properties category and value. We can now
  seperate and access the two easilier.  
  */
  const data = Object.entries(transformData).map(([category, value]) => ({
    category,
    value,
  }));

  console.log(data);

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
    .range([lightcolor, darkcolor]);

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", function (d) {
      return y(d.category);
    })
    .attr("width", function (d) {
      return x(d.value);
    })
    .attr("height", y.bandwidth())
    .attr("fill", function (d) {
      return colorScale(d.value);
    })
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
        .attr("class", "tooltip_food")
        .style("opacity", 0);

      tooltip.transition().duration(200).style("opacity", 0.9);

      tooltip
        .html(tooltipText)
        .style("left", xPosition + "px")
        .style("top", yPosition - 50 + "px");
    })
    .on("mouseout", function () {
      d3.selectAll(".barcharts").transition().duration(10).style("opacity", 1);

      d3.selectAll(".tooltip_food").remove();
    })
    .on("click", function (event, d) {
      d3.selectAll(".contentplaceholder").style("display", "block");
      const AllCategories = [
        "Agriculture",
        "iLUC",
        "FoodProcessing",
        "Packaging",
        "Transport",
        "Retail",
      ];
      for (let i = 0; i < AllCategories.length; i++) {
        const categorySection = document.getElementById(AllCategories[i]);
        categorySection.style.display = "none";
      }
      const category = d.category;
      const categorySection = document.getElementById(category);
      console.log(category);
      categorySection.style.display = "flex";
      if (document.getElemensByClass()) {
        categorySection.style.display = "block";
      }
    });

  d3.select("#close-button").on("click", closeDescription);

  svg
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "value-label")
    .attr("x", function (d) {
      return x(d.value) + 5;
    })
    .attr("y", function (d) {
      return y(d.category) + y.bandwidth() / 2;
    })
    .text((d) => d.value.toFixed(2))
    .style("fill", "black")
    .style("font-size", "10px");

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  svg.append("g").call(d3.axisLeft(y));
}

function getDescription(category) {
  const descriptions = {
    Agriculture:
      "Press to learn more about how Agriculture effects the increase in CO2 emissions",
    iLUC: "Press to learn more about how iLUC effects the increase in CO2 emissions",
    FoodProcessing:
      "Press to learn more about how Food Processing effects the increase in CO2 emissions",
    Packaging:
      "Press to learn more about how Packaging effects the increase in CO2 emissions",
    Transport:
      "Press to learn more about how Transport effects the increase in CO2 emissions",
    Retail:
      "Press to learn more about how Retail effects the increase in CO2 emissions",
  };
  return descriptions[category];
}

//Function to append images
function appendImg(place, img) {
  d3.select(place).append("img").attr("src", img);
}

appendImg("#vegetarianDish", "vegetarian.png");
appendImg("#meatDish", "meatlover.png");
appendImg("#vegetarianinformation", "informationbutton.png");
appendImg("#meatinformation", "informationbutton.png");

//mouseover design for when hovering over informationbutton
d3.selectAll(".informations-billede")
  .on("mouseover", function () {
    d3.select(this).style("opacity", 0.5);
  })
  .on("mouseout", function () {
    d3.select(this).style("opacity", 1);
  });

d3.selectAll(".informations-billede img").on("click", showOverlayContentInfo);

d3.select("#closeOverlay").on("click", closeOverlayContentInfo);

/*Handle click for vegetarian information icon. If clicked it creates a paragraph element and
  writes the relevant description. It then calls the display function
  */
let image = document.getElementsByClassName("informations-billede");

image[0].addEventListener("click", function () {
  let vegetarianptag = document.createElement("p");
  vegetarianptag.innerHTML =
    "The following vegetarian diet has been customized and the CO2 footprint has been calculated, taking into account the measurements.<br>The diet consists of Breakfast: 170g of Muesli, 210g of Milk, 30g of Blueberries, 30g of Strawberries.<br>Lunch: 200g of Rye Bread, 140g of Eggs, 10g of Pesto, 10g of Sun-dried Tomatoes.<br>Dinner: 100g of Rice, 120g of Falafel, 80g of Arugula Salad, 100g of Red Wine.";
  informationDisplay(vegetarianptag);
});

image[1].addEventListener("click", function () {
  let meatptag = document.createElement("p");
  meatptag.innerHTML =
    "The following standard diet has been customized and the CO2 footprint has been calculated, taking into account the measurements.<br>The diet consists of Breakfast: 120g of whole grain bun, 50g of Danbo cheese, 20g of roast beef, 250g of orange juice.<br>Lunch: 200g of rye bread, 80g of liver pâté, 60g of beetroot, 20g of cucumber.<br>Dinner: 150g of minced pork, 100g of potatoes, 50g of broccoli, 100g of white wine.";
  informationDisplay(meatptag);
});

/* This function handles what to display based on if the user presses the
vegetarian informationbutton or the meateater informationbutton. It first clears the previous
p tag element and then it appends a new p tag element with the relevant description*/
function informationDisplay(ptag) {
  let previousTag = overlayContent.querySelector("p");
  if (previousTag) {
    previousTag.remove();
  }
  overlayContent.appendChild(ptag);

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
