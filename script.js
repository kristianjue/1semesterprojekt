
    // Tilføj billeder ved hjælp af D3.js
    d3.select('#vegetarianDish')
      .append('img')
      .attr('src', 'MadIcon.png') // Stien til dit vegetariske mad ikon
      .attr('alt', 'Vegetarisk ret')
     
    d3.select('#meatDish')
      .append('img')
      .attr('src', 'MadIcon.png') // Stien til dit kød mad ikon
      .attr('alt', 'Kødret')
    
    document.addEventListener('DOMContentLoaded', function() {
    d3.select('#vegetarianDish img')
    .on('mouseover', function() {
        d3.select(this)
        .transition()
        .duration(100)
        .style('transform','scale(1.1)');
        pieChartVegetar();
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
    })










    // PIE CHART

    function pieChartVegetar(){

    var w = 200;
    var h = 200;

    var dataset = [ 5, 10, 20, 45, 6,70];

    var outerRadius = w / 2;
    var innerRadius = 0;
    var arc = d3.arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius);
    
    var pie = d3.pie();
    
    //Easy colors accessible via a 10-step ordinal scale
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    //Create SVG element
    var svg = d3.select("body")
          .append("svg")
          .attr("id","pieChartVegetarian")
          .attr("width", w)
          .attr("height", h);
    
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
      var svg = d3.select("body")
            .append("svg")
            .attr("id","pieChartMeatLover")
            .attr("width", w)
            .attr("height", h)
            .style("position", "absolute")
            .style("top", "100px");
      
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
    }
    

