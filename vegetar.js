let dataset = [];

// Kalder funktionen fetchContent
fetchContent("http://localhost:3000/vegetarer/").then((data) => {
    for (var i = 0; i < data.vegetarer.length; i++) {
        dataset.push([parseInt(data.vegetarer[i].År), parseInt(data.vegetarer[i].antal_vegetarer)]);
    }
    displayData(dataset)

});


//Definerer højde og bredde
var w = 1000;
var h = 500;


//Finder div med ID'et datavisualiseirng og laver en SVG med defineret højde og bredde
var svg = d3.select("#datavisualiseirng")
    .append("svg")
    .attr("width", w)
    .attr("height", h)

// Definerer margin
var svg = d3.select("svg"),
    margin = 200,
    width = svg.attr("width") - margin,
    height = svg.attr("height") - margin

// Laver en skalering af dataen
var xScale = d3.scaleLinear().domain([2017, 2022]).range([0, width]),
    yScale = d3.scaleLinear().domain([80000, 200000]).range([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + 100 + "," + 100 + ")");

// Opretter variabel til at lave labels 
var tooltip = d3.select("#datavisualiseirng").append("div")
    .style("position", "absolute")
    .style("background-color", "#fff")
    .style("padding", "3px")
    .style("border", "1px #333 solid")
    .style("border-radius", "5px")
    .style("opacity", "0")
    .style("transition", ".2s opacity")


function displayData(dataset) {


    //Tilføjelse af tekst til top og bund
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
        .attr('transform', 'translate(85,85)')
        .style('font-family', 'Helvetica')
        .style('font-size', 12)
        .text('Antal vegetarer');

    // Opretter værdier på x-aksen, men kun på specifikke årstal
    g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale).tickValues([2017, 2018, 2019, 2020, 2021, 2022]).tickFormat(d3.format("d")));

    // Opretter værdier på y-aksen, hvor værdierne bliver vist som heltal
    g.append("g")
        .call(d3.axisLeft((yScale)).tickFormat(d3.format("d")));

    // Opretter datapunkter/prikker på grafen
    svg.append('g')
        .selectAll("dot")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xScale(d[0]); })
        .attr("cy", function (d) { return yScale(d[1]); })
        .attr("r", 5)
        .attr("transform", "translate(" + 100 + "," + 100 + ")")
        .style("fill", "#ffa406")

        // Logik til når man holder musen over et punkt, vises label (for 2 sek)
        .on('mouseover', function (event, d) {
            tooltip.transition()
                .style('opacity', 1)

            tooltip.html(d[1].toLocaleString('da-DK') + ' Vegetarer')
                .style("left", (event.pageX) + "px")
                .style("top", (event.pageY) + 15 + "px")
            setTimeout(
                function () { tooltip.transition().style('opacity', 0) }, 3000)
        })


    // Definerer kurven
    var line = d3.line()
        .x(function (d) { return xScale(d[0]); })
        .y(function (d) { return yScale(d[1]); })
        .curve(d3.curveMonotoneX)

    //Opretter kurven
    svg.append("path")
        .datum(dataset)
        .attr("class", "line")
        .attr("transform", "translate(" + 100 + "," + 100 + ")")
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", "#ffa406")
        .style("stroke-width", "3");
}

// Definerer funktionen som asynkront henter data fra en url der kommer med som argument og derefter retunerer dataen som JSON  
async function fetchContent(url) {
    let request = await fetch(url);
    let json = await request.json();
    return json;
}