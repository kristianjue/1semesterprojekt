<<<<<<< HEAD
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

    
=======
d3.json("/Data/electriccar.json").then(function(data) {
    var elbildata = data.elbildata.map(function(d) {
        return {
            period: parseInt(d.Period.slice(0, 4)), // Extract the year part
            el: +d.El // Convert 'El' to number
        };
    });

    var svg = d3.select("svg"),
        margin = {top: 30, right: 100, bottom: 70, left: 100},
        width = svg.attr("width") - margin.left - margin.right,
        height = svg.attr("height") - margin.top - margin.bottom;

    var xScale = d3.scaleLinear()
        .domain(d3.extent(elbildata, function(d) { return d.period; })) // Use the extent of years for domain
        .range([0, width]);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(elbildata, function(d) { return d.el; })]) // Use the max of 'El' for domain
        .range([height, 0]);

    var line = d3.line()
        .x(function(d) { return xScale(d.period); })
        .y(function(d) { return yScale(d.el); })
        .curve(d3.curveMonotoneX);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")));

    g.append("g")
        .call(d3.axisLeft(yScale));

    g.append("path")
        .datum(elbildata)
        .attr("class", "line")
        .attr("d", line);

    g.selectAll(".dot")
        .data(elbildata)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", function(d) { return xScale(d.period); })
        .attr("cy", function(d) { return yScale(d.el); })
        .attr("r", 5);

    // Tilføj titel
    svg.append("text")
        .attr("x", (width / 2) + margin.left)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Elbiler over Tid");

    // Tilføj X-akse label
    svg.append("text")
        .attr("x", (width / 2) + margin.left)
        .attr("y", height + margin.top + 40)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text("År");

    // Tilføj Y-akse label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", margin.left / 2)
        .attr("x", -(height / 2) - margin.top)
        .attr("dy", "1em")
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text("Antal Elbiler");
});
>>>>>>> 91a9a8dc4a1db587ac8870865e9517def6551371
