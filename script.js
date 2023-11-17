
    // Tilføj billeder ved hjælp af D3.js
    d3.select('#vegetarianDish')
      .append('img')
      .attr('src', 'vegetarian.png') // Stien til dit vegetariske mad ikon
      .attr('alt', 'Vegetarisk ret')
      barchartVegetarian();

     
    d3.select('#meatDish')
      .append('img')
      .attr('src', 'meatlover.png') // Stien til dit kød mad ikon
      .attr('alt', 'Kødret');
      barchartMeatlover();


      
      function barchartVegetarian() {
        var w = 550;
        var h = 250;
    
        var dataset = [0.1196, 0.0494, 0.0872, 0.1408, 0.1586, 0.0056];
    
        // The xScale will determine the length of the bars.
        var xScale = d3.scaleLinear()
            .domain([0, d3.max(dataset)])
            .range([0, w]);
    
        // The yScale now uses scaleBand to determine the position along the Y axis.
        var yScale = d3.scaleBand()
            .domain(d3.range(dataset.length))
            .range([0, h])
            .paddingInner(0.05);
    
        // Create SVG element
        var svg = d3.select("#VegetarianPieChart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
    
        // Create bars
        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("y", function(d, i) {
                return yScale(i);
            })
            .attr("height", yScale.bandwidth())
            .attr("width", function(d) {
                return xScale(d); // Width is now based on the data value
            })
            
    
        // Create labels
        svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .text(function(d) {
                return d;
            })
            .attr("text-anchor", "left")
            .attr("y", function(d, i) {
                return yScale(i) + yScale.bandwidth() / 2;
            })
            .attr("x", function(d) {
                return xScale(d) + 3; // Offset a bit right for the label
            })
            .attr("alignment-baseline", "middle") // Center the text vertically in the bar
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "black"); // Change the color to something visible on a green bar
    }
    
    function barchartMeatlover() {
      var w = 550;
      var h = 250;
  
      var dataset = [0.4335, 0.0695, 0.0025, 0.115, 0.071, 0.0025];
  
      // The xScale will determine the length of the bars.
      var xScale = d3.scaleLinear()
          .domain([0, d3.max(dataset)])
          .range([0, w]);
  
      // The yScale now uses scaleBand to determine the position along the Y axis.
      var yScale = d3.scaleBand()
          .domain(d3.range(dataset.length))
          .range([0, h])
          .paddingInner(0.05);
  
      // Create SVG element
      var svg = d3.select("#MeatPieChart")
          .append("svg")
          .attr("width", w)
          .attr("height", h);
  
      // Create bars
      svg.selectAll("rect")
          .data(dataset)
          .enter()
          .append("rect")
          .attr("y", function(d, i) {
              return yScale(i);
          })
          .attr("height", yScale.bandwidth())
          .attr("width", function(d) {
              return xScale(d); // Width is now based on the data value
          })
          
  
      // Create labels
      svg.selectAll("text")
          .data(dataset)
          .enter()
          .append("text")
          .text(function(d) {
              return d;
          })
          .attr("text-anchor", "left")
          .attr("y", function(d, i) {
              return yScale(i) + yScale.bandwidth() / 2;
          })
          .attr("x", function(d) {
              return xScale(d) + 3; // Offset a bit right for the label
          })
          .attr("alignment-baseline", "middle") // Center the text vertically in the bar
          .attr("font-family", "sans-serif")
          .attr("font-size", "11px")
          .attr("fill", "black"); // Change the color to something visible on a green bar
  }

     

   // Hvis vi skal have mouse over funktion   
   /* document.addEventListener('DOMContentLoaded', function() {
    d3.select('#vegetarianDish img')
    .on('mouseover', function() {
        d3.select(this)
        .transition()
        .duration(100)
        .style('transform','scale(1.1)');
        pieChartVegetarian();
        })
    .on('mouseout',function(){
      d3.select("#pieChartVegetarian").remove();
      d3.select(this)
      .transition()
      .duration(100)
      .style('transform','scale(1.0)')  
        })
    
    d3.select('#meatDish img')
    .on('mouseover', function() {
      d3.select(this)
      .transition()
      .duration(100)
      .style('transform','scale(1.1)');
      pieChartMeatLover();
    })
    .on('mouseout',function(){
      d3.select("#pieChartMeatLover").remove();
      d3.select(this)
      .transition()
      .duration(100)
      .style('transform','scale(1.0)')
        })
    })*/


    // PIE CHART

    /*function pieChartVegetarian() {
      var w = 300;
      var h = 300;
  
      var dataset = [5, 10, 20, 45, 6, 70];
  
      var outerRadius = w / 2;
      var innerRadius = 0;
      var arc = d3.arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius);
  
      var pie = d3.pie();
  
      var color = d3.scaleOrdinal(d3.schemeCategory10);
  
      var svg = d3.select("#VegetarianPieChart")
          .append("svg")
          .attr("id", "pieChartVegetarian")
          .attr("width", w)
          .attr("height", h);
  
      var arcs = svg.selectAll("g.arc")
          .data(pie(dataset))
          .enter()
          .append("g")
          .attr("class", "arc")
          .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
  
      arcs.append("path")
          .attr("fill", function(d, i) {
              return color(i);
          })
          .attr("d", arc);
  
      arcs.append("text")
          .attr("transform", function(d) {
              return "translate(" + arc.centroid(d) + ")";
          })
          .attr("text-anchor", "middle")
          .text(function(d) {
              return d.value;
          });
  
      // Mouseover and mouseout events
      arcs.on("mouseover", function(d) {
          d3.select(this)
              .transition()
              .duration(200)
              .attr("transform", function(d) { 
                  var dist = 10;
                  var angle = (d.startAngle + d.endAngle) / 2;
                  var x = dist * Math.sin(angle);
                  var y = -dist * Math.cos(angle);
                  return "translate(" + outerRadius + "," + outerRadius + ") translate(" + x + "," + y + ")";
              });
      })
      .on("mouseout", function(d) {
          d3.select(this)
              .transition()
              .duration(200)
              .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
      });
  }
  
    function pieChartMeatLover(){

      var w = 200;
      var h = 200;
  
      var dataset = [ 5, 10, 20, 45, 6, 25 ];
  
      var outerRadius = w / 2;
      var innerRadius = 0;
      var arc = d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);
      
      var pie = d3.pie();
      
      //Easy colors accessible via a 10-step ordinal scale
      var color = d3.scaleOrdinal(d3.schemeCategory10);
  
      //Create SVG element
      var svg = d3.select("#MeatPieChart")
            .append("svg")
            .attr("id","pieChartMeatLover")
            .attr("width", w)
            .attr("height", h)
            
      
      //Set up groups
      var arcs = svg.selectAll("g.arc")
              .data(pie(dataset))
              .enter()
              .append("g")
              .attr("class", "arc")
              .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
      
      //Draw arc paths
      arcs.append("path")
          .attr("fill", function(d, i) {
            return color(i);
          })
          .attr("d", arc);
      
      //Labels
      arcs.append("text")
          .attr("transform", function(d) {
            return "translate(" + arc.centroid(d) + ")";
          })
          .attr("text-anchor", "middle")
          .text(function(d) {
            return d.value;
          });
    }*/


    

