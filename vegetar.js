let dataset = [];

fetchContent("http://localhost:3000/vegetarer/").then((data) => {
    for (var i = 0; i < data.vegetarer.length; i++) {
        dataset.push([Number(data.vegetarer[i].År), Number(data.vegetarer[i].antal_vegetarer)]);
    }
    displayData(dataset)

    console.log(dataset)
});


var margin = { top: 10, right: 10, bottom: 10, left: 10 };
var w = 1000 - margin.left - margin.right;
var h = 500 - margin.top - margin.bottom;


var svg = d3.select("#datavisualiseirng")
    .append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)


var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin

var xScale = d3.scaleLinear().domain([2017, 2022]).range([0, width]),
    yScale = d3.scaleLinear().domain([80000, 200000]).range([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");

function displayData(dataset) {

    svg.append('text')
        .attr('x', width / 2 + 100)
        .attr('y', 100)
        .attr('text-anchor', 'middle')
        .style('font-family', 'Helvetica')
        .style('font-size', 20)
        .text('Antal vegetarer i Danmark');

    svg.append('text')
        .attr('x', width / 2 + 100)
        .attr('y', height - 15 + 150)
        .attr('text-anchor', 'middle')
        .style('font-family', 'Helvetica')
        .style('font-size', 12)
        .text('År');

    svg.append('text')
        .attr('text-anchor', 'middle')
        .attr('transform', 'translate(60,' + height + ')rotate(-90)')
        .style('font-family', 'Helvetica')
        .style('font-size', 12)
        .text('Antal veganere');

    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    g.append("g")
        .call(d3.axisLeft(yScale));

    svg.append('g')
        .selectAll("dot")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xScale(d[0]); })
        .attr("cy", function (d) { return yScale(d[1]); })
        .attr("r", 3)
        .attr("transform", "translate(" + 100 + "," + 100 + ")")
        .style("fill", "#CC0000");

    var line = d3.line()
        .x(function (d) { return xScale(d[0]); })
        .y(function (d) { return yScale(d[1]); })
        .curve(d3.curveMonotoneX)

    svg.append("path")
        .datum(dataset)
        .attr("class", "line")
        .attr("transform", "translate(" + 100 + "," + 100 + ")")
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", "#CC0000")
        .style("stroke-width", "2");
}

async function fetchContent(url) {
    let request = await fetch(url);
    let json = await request.json();
    return json;
}