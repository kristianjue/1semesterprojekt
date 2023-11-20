//graf over brændsel
    // set the dimensions and margins of the graph
    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#line1")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Read the data
    var data = [
    {"periode": "2011-01", "antal": 2168019},
        {"periode": "2011-04", "antal": 2185561},
        {"periode": "2011-07", "antal": 2197595},
        {"periode": "2011-10", "antal": 2198355},
        {"periode": "2012-01", "antal": 2197013},
        {"periode": "2012-04", "antal": 2209589},
        {"periode": "2012-07", "antal": 2228038},
        {"periode": "2012-10", "antal": 2232297},
        {"periode": "2013-01", "antal": 2235376},	
        {"periode": "2013-04", "antal": 2249478},
        {"periode": "2013-07", "antal": 2265862},
        {"periode": "2013-10", "antal": 2272912},
        {"periode": "2014-01", "antal": 2266950},
        {"periode": "2014-04", "antal": 2284559},
        {"periode": "2014-07", "antal": 2303725},
        {"periode": "2014-10", "antal": 2311766},
        {"periode": "2015-01", "antal": 2320740},
        {"periode": "2015-04", "antal": 2342088},
        {"periode": "2015-07", "antal": 2365089},
        {"periode": "2015-10", "antal": 2376392},
        {"periode": "2016-01", "antal": 2387402},	
        {"periode": "2016-04", "antal": 2410439},
        {"periode": "2016-07", "antal": 2436961},
        {"periode": "2016-10", "antal": 2447871},
        {"periode": "2017-01", "antal": 2460431},	
        {"periode": "2017-04", "antal": 2484377},
        {"periode": "2017-07", "antal": 2508565},
        {"periode": "2017-10", "antal": 2513604},
        {"periode": "2018-01", "antal": 2525082},	
        {"periode": "2018-04", "antal": 2546514},
        {"periode": "2018-07", "antal": 2571186},
        {"periode": "2018-10", "antal": 2577221},
        {"periode": "2019-01", "antal": 2584019},	
        {"periode": "2019-04", "antal": 2603787},
        {"periode": "2019-07", "antal": 2623418},
        {"periode": "2019-10", "antal": 2626048},
        {"periode": "2020-01", "antal": 2629703},	
        {"periode": "2020-04", "antal": 2632040},
        {"periode": "2020-07", "antal": 2657451},
        {"periode": "2020-10", "antal": 2661315},
        {"periode": "2021-01", "antal": 2657423},	
        {"periode": "2021-04", "antal": 2665585},
        {"periode": "2021-07", "antal": 2674825},
        {"periode": "2021-10", "antal": 2658304},
        {"periode": "2022-01", "antal": 2638494},	
        {"periode": "2022-04", "antal": 2633618},
        {"periode": "2022-07", "antal": 2623639},
        {"periode": "2022-10", "antal": 2597984},
        {"periode": "2023-01", "antal": 2578139},	
        {"periode": "2023-04", "antal": 2570183},
        {"periode": "2023-07", "antal": 2557350},
        {"periode": "2023-10", "antal": 2522510}
    ];

    var parseTime = d3.timeParse("%Y-%m");
    data.forEach(function (d) {
      d.periode = parseTime(d.periode);
      d.antal = +d.antal;
    });

    // Add X axis --> it is a periode format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function (d) { return d.periode; }))
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear() 
      .domain([2150000, d3.max(data, function (d) { return +d.antal; })])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return x(d.periode); })
        .y(function (d) { return y(d.antal); })
      );

    // Beregn midtpunktet af grafen
    var midX = (width + margin.left + margin.right) / 2;
    var midY = (height + margin.top + margin.bottom) / 2;

    // Tilføj tekst til midten af grafen
    svg.append("text")
      .attr("x", midX)
      .attr("y", midY)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .text("-2,91%")
      .style("fill", "red")  
      .style("font-size", "50px")
      .style("bold");

    // Tilføj reference linje
    svg.append("line")
        .attr("x1", x(parseTime("2022-01")))
        .attr("x2", x(parseTime("2022-01")))
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke", "red")
        .attr("stroke-width", 1.5)
        .style("stroke-dasharray", ("3, 3"));


//graf over el
    // set the dimensions and margins of the graph
    var margin2 = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 460 - margin2.left - margin2.right,
      height = 400 - margin2.top - margin2.bottom;

    // append the svg object to the body of the page
    var svg2 = d3.select("#line2")
      .append("svg")
      .attr("width", width + margin2.left + margin2.right)
      .attr("height", height + margin2.top + margin2.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin2.left + "," + margin2.top + ")");

    // Read the data2
    var data2 = [
        {"periode": "2011-01", "antal": 357},
      {"periode": "2011-04", "antal": 596},
      {"periode": "2011-07", "antal": 671},
      {"periode": "2011-10", "antal": 692},
      {"periode": "2012-01", "antal": 815},
      {"periode": "2012-04", "antal": 870},
      {"periode": "2012-07", "antal": 1046},
      {"periode": "2012-10", "antal": 1184},
      {"periode": "2013-01", "antal": 1292},	
      {"periode": "2013-04", "antal": 1294},
      {"periode": "2013-07", "antal": 1266},
      {"periode": "2013-10", "antal": 1369},
      {"periode": "2014-01", "antal": 1622},
      {"periode": "2014-04", "antal": 1871},
      {"periode": "2014-07", "antal": 2085},
      {"periode": "2014-10", "antal": 2410},
      {"periode": "2015-01", "antal": 2960},
      {"periode": "2015-04", "antal": 3621},
      {"periode": "2015-07", "antal": 4170},
      {"periode": "2015-10", "antal": 5377},
      {"periode": "2016-01", "antal": 7901},	
      {"periode": "2016-04", "antal": 7868},
      {"periode": "2016-07", "antal": 7929},
      {"periode": "2016-10", "antal": 8321},
      {"periode": "2017-01", "antal": 8578},	
      {"periode": "2017-04", "antal": 8455},
      {"periode": "2017-07", "antal": 8381},
      {"periode": "2017-10", "antal": 8663},
      {"periode": "2018-01", "antal": 8780},	
      {"periode": "2018-04", "antal": 8995},
      {"periode": "2018-07", "antal": 9232},
      {"periode": "2018-10", "antal": 9587},
      {"periode": "2019-01", "antal": 10308},	
      {"periode": "2019-04", "antal": 11539},
      {"periode": "2019-07", "antal": 12698},
      {"periode": "2019-10", "antal": 14249},
      {"periode": "2020-01", "antal": 16085},	
      {"periode": "2020-04", "antal": 18205},
      {"periode": "2020-07", "antal": 20281},
      {"periode": "2020-10", "antal": 25566},
      {"periode": "2021-01", "antal": 32495},	
      {"periode": "2021-04", "antal": 36917},
      {"periode": "2021-07", "antal": 43646},
      {"periode": "2021-10", "antal": 55772},
      {"periode": "2022-01", "antal": 69175},	
      {"periode": "2022-04", "antal": 80063},
      {"periode": "2022-07", "antal": 91575},
      {"periode": "2022-10", "antal": 102029},
      {"periode": "2023-01", "antal": 115154},	
      {"periode": "2023-04", "antal": 131870},
      {"periode": "2023-07", "antal": 151967},
      {"periode": "2023-10", "antal": 177277}
    ];

    var parseTime = d3.timeParse("%Y-%m");
    data2.forEach(function (d) {
      d.periode = parseTime(d.periode);
      d.antal = +d.antal;
    });

    // Add x2 axis --> it is a periode format
    var x2 = d3.scaleTime()
      .domain(d3.extent(data2, function (d) { return d.periode; }))
      .range([0, width]);
    svg2.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x2));

    // Add Y axis
    var y2 = d3.scaleLinear()
      .domain([0, d3.max(data2, function (d) { return +d.antal; })])
      .range([height, 0]);
    svg2.append("g")
      .call(d3.axisLeft(y2));

    // Add the line
    svg2.append("path")
      .datum(data2)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return x2(d.periode); })
        .y(function (d) { return y2(d.antal); })
      );

    // Beregn midtpunktet
    var midX2 = (width + margin2.left + margin2.right) / 2;
    var midY2 = (height + margin2.top + margin2.bottom) / 2;

    // Tilføj tekst til midten af grafen
    svg2.append("text")
      .attr("x", midX2)
      .attr("y", midY2)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .text("73,75%")
      .style("fill", "green") 
      .style("font-size", "50px")
      .style("bold");

    // Tilføj reference linje
    svg2.append("line")
      .attr("x1", x2(parseTime("2022-10")))
      .attr("x2", x2(parseTime("2022-10")))
      .attr("y1", 0)
      .attr("y2", height)
      .attr("stroke", "green")
      .attr("stroke-width", 1.5)
      .style("stroke-dasharray", ("3, 3"));