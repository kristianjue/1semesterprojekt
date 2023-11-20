var dataset1 = [
    [1,1], [12,20], [24,36],
    [32, 50], [40, 70], [50, 100],
    [55, 106], [65, 123], [73, 130],
    [78, 134], [83, 136], [89, 138],
    [100, 140]
];

var svg = d3.select("body"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin;

var xScale = d3.scaleLinear().domain([0, 100]).range([0, width]),
    yScale = d3.scaleLinear().domain([0, 200]).range([height, 0]);

// Step 5: Tilføje tekst
svg.append('text')
    .attr('x', width / 2 + 100)
    .attr('y', 100)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 20)
    .text('Line Chart');

svg.append('text')
    .attr('x', width / 2 + 100)
    .attr('y', height - 15 + 150)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 12)
    .text('Independant');

svg.append('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(60,' + height + ')rotate(-90)')
    .style('font-family', 'Helvetica')
    .style('font-size', 12)
    .text('Dependant');

// Step 6: Tilføje akser
svg.append("g")
    .attr("transform", "translate(100," + height + ")")
    .call(d3.axisBottom(xScale));

svg.append("g")
    .attr("transform", "translate(100,0)")
    .call(d3.axisLeft(yScale));

// Step 7: Scatter dots
svg.append('g')
    .selectAll("dot")
    .data(dataset1)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return xScale(d[0]); } )
    .attr("cy", function (d) { return yScale(d[1]); } )
    .attr("r", 2)
    .attr("transform", "translate(100,0)")
    .style("fill", "#CC0000");

// Step 8: Plot Line
var line = d3.line()
    .x(function(d) { return xScale(d[0]); }) 
    .y(function(d) { return yScale(d[1]); }) 
    .curve(d3.curveMonotoneX);

svg.append("path")
    .datum(dataset1)
    .attr("class", "line")
    .attr("transform", "translate(100,0)")
    .attr("d", line);

    