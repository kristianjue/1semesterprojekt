    d3.select("#vegetarianDish")
      .append("img")
      .attr("src", "2audi.png") 
      barchartVegetarian();
      
    d3.select("#meatDish")
      .append("img")
      .attr("src", "mercedesamg.png") 
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
        vegetarianptag.textContent = "Dette er information omkring CO2 udledning Elbiler.";
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
        let dataset = [0.6875, 0.3750, 1.7500, 0.0000, 0.0625, -0.1875];

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
            .domain([d3.min(dataset), d3.max(dataset)])
            .range([-0.2, width]);
    
    
        let y = d3.scaleBand()
            .range([0, height])
            .domain(dataset.map((d, i) => 'Item ' + (i + 1))) 
            .padding(0.1);
    
       
            svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr('x', x(0))  // Start from the y-axis position
            .attr("y", (d, i) => y('Item ' + (i + 1)))
            .attr("width", 0)  // Start with zero width
            .attr("height", y.bandwidth())
            .transition()
            .duration(1000)
            .ease(d3.easeCubic)
            .attr("width", function (d) {
                if (d > 0) {
                    return x(d);
                } else if (d == 0) {
                    return 1;
                } else {
                    return x(0);
                }
            })
            .attr('x', d => d > 0 ? x(0) : x(d))  // Move to the final x position
            .transition()
            .duration(1000)
            .style("fill", function (d) {
                if (d > 0) {
                    // Set color based on positive values
                    return "rgb(0, 0, " + Math.round(255 / d / 2 - 10) + ")";
                } else {
                    // Set light blue for negative values
                    return "lightblue";
                }
            });
        
    
        // Add text labels
        svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .attr("x", x(0))  // Start from the y-axis position
            .attr("y", (d, i) => y('Item ' + (i + 1)) + y.bandwidth() / 2 + 5) // Center text in the bar
            .text(d => d.toFixed(4)) // Format the number to 4 decimal places
            .transition()
            .duration(1000)
            .ease(d3.easeCubic)
            .attr("x", function (d) {
                if(d>1){return x(d)-5}
                else if (d==0) {return 50}
                else if (d > 0.01 && d < 1) {return x(d)+9}
                else {return x(0)}}) // Position text a bit right of the bar end
            .attr("y", (d, i) => y('Item ' + (i + 1)) + y.bandwidth() / 2 + 5) // Center text in the bar
            .attr("alignment-baseline", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .style("fill", function (d) {
                return d > 0 ? "white" : "black"; // Set the fill color based on the value of d
            });
    
        // Append x-axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
    
        // Append y-axis
        svg.append("g")
            .call(d3.axisLeft(y));
    }

         

    function barchartMeatlover() {
        let dataset = [0.6875, 0.0000, 0.8125, 2.6875, 0.1250, -0.0625];

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
            .domain([d3.min(dataset), d3.max(dataset)])
            .range([-0.1, width]);
    
        let y = d3.scaleBand()
            .range([0, height])
            .domain(dataset.map((d, i) => 'Item ' + (i + 1)))
            .padding(0.1);
    
        // Create bars
        svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr('x', x(0))  // Start from the y-axis position
        .attr("y", (d, i) => y('Item ' + (i + 1)))
        .attr("width", 0)  // Start with zero width
        .attr("height", y.bandwidth())
        .transition()
        .duration(1000)
        .ease(d3.easeCubic)
        .attr("width", function (d) {
            if (d > 0) {
                return x(d);
            } else if (d == 0) {
                return 1;
            } else {
                return x(0);
            }
        })
        .attr('x', d => d > 0 ? x(0) : x(d))  // Move to the final x position
        .transition()
        .duration(1000)
        .style("fill", function (d) {
            if (d > 0) {
                // Set color based on positive values
                return "rgb(0, 0, " + Math.round(255 / d / 2 - 10) + ")";
            } else {
                // Set light blue for negative values
                return "lightblue";
            }
        });
    
             // Set fill color based on position in dataset
            //.style("fill", "orange"); 
    
        // Add text labels
        svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .attr("x", x(0))  // Start from the y-axis position
        .attr("y", (d, i) => y('Item ' + (i + 1)) + y.bandwidth() / 2 + 5) // Center text in the bar
        .text(d => d.toFixed(4)) // Format the number to 4 decimal places
        .transition()
        .duration(1000)
        .ease(d3.easeCubic)
        .attr("alignment-baseline", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .style("fill", function (d) {
            return d > 0 ? "white" : "black"; // Set the fill color based on the value of d
        })
        .attr("x", function (d) {
            if (d > 0) {
                return x(d) - 24;
            } else if (d == 0) {
                return 14;
            } else {
                return x(0);
            }
        });
    
    
        // Append x-axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(8));
    
        // Append y-axis
        svg.append("g")
            .call(d3.axisLeft(y));
    }
    

    