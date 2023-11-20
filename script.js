    d3.select("#vegetarianDish")
      .append("img")
      .attr("src", "vegetarian.png") 
      barchartVegetarian();
      
    d3.select("#meatDish")
      .append("img")
      .attr("src", "meatlover.png") 
      barchartMeatlover();

    d3.selectAll(".informations-billede")
        .append("img")
        .attr("src","informationbutton.png")
        .on("mouseover",function(event,d){
            d3.select(this)
            .style("opacity", 0.5);
         })
        .on("mouseout",function(event,d){
            d3.select(this)
            .style("opacity",1);
        })
    
    d3.selectAll(".informations-billede img")
        .on("click", showOverlayContentInfo);
    
    d3.select('#closeOverlay')
        .on('click', closeOverlayContentInfo);    
       
   

    let billede = document.getElementsByClassName("informations-billede");

    billede[0].addEventListener("click", function () {
        // Handle click for vegetarian information icon
        
        let vegetarianptag = document.createElement("p");
        vegetarianptag.textContent = "This is vegetarian information.";
        informationDisplay(vegetarianptag);
    });

    billede[1].addEventListener("click", function () {
        // Handle click for meat information icon
        let overlayContent = document.getElementById("overlayContent");    
        let meatptag = document.createElement("p");
        meatptag.textContent = "This is meat information.";
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
            d3.select('#overlayContent').style('display', 'block');
    }
        
    function closeOverlayContentInfo() {
            d3.select('#overlayContent').style('display', 'none');
    }  


    function barchartVegetarian() {
        let dataset = [0.1196, 0.0494, 0.0872, 0.1408, 0.1586, 0.0056];

        let colors = [
            "#A52A2A", // Brun
            "#FFFF00", // Gul
            "#FF0000", // Rød
            "#0000FF", // Blå
            "#800080", // Lilla
            "#FFA500"  // Orange
        ];

    
        let margin = {top: 20, right: 30, bottom: 40, left: 70},
            width = 550 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;
    
        let svg = d3.select("#VegetarianBarChart")
          .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
        let x = d3.scaleLinear()
            .domain([0, 0.45])
            .range([0, width]);
    
    
        let y = d3.scaleBand()
            .range([0, height])
            .domain(dataset.map((d, i) => 'Item ' + (i + 1))) 
            .padding(0.1);
    
       
        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", x(0))
            .attr("y", (d, i) => y('Item ' + (i + 1)))
            .attr("width", d => x(d))
            .attr("height", y.bandwidth())
            .style("fill", function(d, i) { return colors[i]; }); // Set fill color based on position in dataset
            //.attr("fill", "orange");
    
        // Add text labels
        svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .text(d => d.toFixed(4)) // Format the number to 4 decimal places
            .attr("x", d => x(d) + 5) // Position text a bit right of the bar end
            .attr("y", (d, i) => y('Item ' + (i + 1)) + y.bandwidth() / 2 + 5) // Center text in the bar
            .attr("alignment-baseline", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "black");
    
        // Append x-axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
    
        // Append y-axis
        svg.append("g")
            .call(d3.axisLeft(y));
    }

         

    function barchartMeatlover() {
        let dataset = [0.4335, 0.0695, 0.0025, 0.115, 0.071, 0.0025];

        let colors = [
            "#A52A2A", // Brun
            "#FFFF00", // Gul
            "#FF0000", // Rød
            "#0000FF", // Blå
            "#800080", // Lilla
            "#FFA500"  // Orange
        ];


        let margin = {top: 20, right: 30, bottom: 40, left: 70},
            width = 550 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;
    
        let svg = d3.select("#MeatBarChart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
        let x = d3.scaleLinear()
            .domain([0, 0.45])
            .range([0, width]);
    
        let y = d3.scaleBand()
            .range([0, height])
            .domain(dataset.map((d, i) => 'Item ' + (i + 1)))
            .padding(0.1);
    
        // Create bars
        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", x(0))
            .attr("y", (d, i) => y('Item ' + (i + 1)))
            .attr("width", d => x(d))
            .attr("height", y.bandwidth())
            .style("fill", function(d, i) { return colors[i]; }); // Set fill color based on position in dataset
            //.style("fill", "orange"); 
    
        // Add text labels
        svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .text(d => d.toFixed(4)) // Format the number to 4 decimal places
            .attr("x", d => x(d) + 5) // Position text a bit right of the bar end
            .attr("y", (d, i) => y('Item ' + (i + 1)) + y.bandwidth() / 2 + 5) // Center text in the bar
            .attr("alignment-baseline", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "black");

    
        // Append x-axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(8));
    
        // Append y-axis
        svg.append("g")
            .call(d3.axisLeft(y));
    }
    

    