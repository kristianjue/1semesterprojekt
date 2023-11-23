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
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Read the data //periode og antal skal ændres til det der står i json
    let dataset = [];
    let timeFormat = d3.timeFormat("%Y-%m")

    fetchContent("http://localhost:3000/personbil_udvikling/2").then((data) => {
        for (var i = 0; i < data.personbil_udvikling.length; i++) {
         dataset.push([(data.personbil_udvikling[i].årogkvartal), (data.personbil_udvikling[i].antal_biler)]);
        } console.log(dataset)
         let parseTime = d3.timeParse("%Y-%m");
    
         dataset.forEach(function (d) {
            console.log(d[0])
            d[0] = (parseTime(d[0]));
            console.log(d[0])

        });
        dataset.sort(function (a,b){
            return a[0]-b[0];
            
        });
    
        console.log(dataset)
        createVisualization(dataset)
    });


    function createVisualization(dataset) {

    // Add X axis --> it is a periode format
    var x = d3.scaleTime()
      .domain(d3.extent(dataset, function (d) { return (d[0]); }))
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear() 
      .domain([2150000, d3.max(dataset, function (d) { return +d[1]; })])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
      .datum(dataset)
      .attr("fill", "none")
      .attr("stroke", "#ffa406")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return x(d[0]); })
        .y(function (d) { return y(d[1]); })
      );

    //tilføj reference linje
    let referenceYear = 2022;
    let referenceMonth = 10; // Eksempel: januar
    let referenceDate = d3.timeParse("%Y-%m")(`${referenceYear}-${referenceMonth}`);

    svg.append("line")
      .attr("x1", x(referenceDate))
      .attr("x2", x(referenceDate))
      .attr("y1", 0)
      .attr("y2", height)
      .attr("stroke", "#ffa406")
      .attr("stroke-width", 1.5)
      .style("stroke-dasharray", ("3, 3"));


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
      .style("fill", "#ffa406")  
      .style("font-size", "50px")
      .style("bold");
    }
    
    //Magi - det taler vi om senere!!
    async function fetchContent(url) {
        let request = await fetch(url);
        let json = await request.json();
        return json;
    }


//graf over el
    // set the dimensions and margins of the graph
    var margin2 = { top: 10, right: 30, bottom: 30, left: 60 },
      width2 = 460 - margin2.left - margin2.right,
      height2 = 400 - margin2.top - margin2.bottom;

    // append the svg object to the body of the page
    var svg2 = d3.select("#line2")
      .append("svg")
      .attr("width", width2 + margin2.left + margin2.right)
      .attr("height", height2 + margin2.top + margin2.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin2.left + "," + margin2.top + ")");

    // Read the data2
        // Read the data //periode og antal skal ændres til det der står i json
        let dataset2 = [];
        let timeFormat2 = d3.timeFormat("%Y-%m")
    
        fetchContent("http://localhost:3000/personbil_udvikling/1").then((data) => {
            for (var i = 0; i < data.personbil_udvikling.length; i++) {
             dataset2.push([(data.personbil_udvikling[i].årogkvartal), (data.personbil_udvikling[i].antal_biler)]);
            } console.log(dataset2)
             let parseTime = d3.timeParse("%Y-%m");
        
             dataset2.forEach(function (d) {
                console.log(d[0])
                d[0] = (parseTime(d[0]));
                console.log(d[0])
    
            });
            dataset2.sort(function (a,b){
                return a[0]-b[0];
                
            });
        
            console.log(dataset2)
            createVisualization2(dataset2)
        });
    
    
        function createVisualization2(dataset2) {

    // Add x2 axis --> it is a periode format
    var x2 = d3.scaleTime()
      .domain(d3.extent(dataset2, function (d) { return d[0]; }))
      .range([0, width2]);
    svg2.append("g")
      .attr("transform", "translate(0," + height2 + ")")
      .call(d3.axisBottom(x2));

    // Add Y axis
    var y2 = d3.scaleLinear()
      .domain([0, d3.max(dataset2, function (d) { return +d[1]; })])
      .range([height2, 0]);
    svg2.append("g")
      .call(d3.axisLeft(y2));

    // Add the line
    svg2.append("path")
      .datum(dataset2)
      .attr("fill", "none")
      .attr("stroke", "#0096c7")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return x2(d[0]); })
        .y(function (d) { return y2(d[1]); })
      );

    // Beregn midtpunktet
    var midX2 = (width2 + margin2.left + margin2.right) / 2;
    var midY2 = (height2 + margin2.top + margin2.bottom) / 2;

    // Tilføj tekst til midten af grafen
    svg2.append("text")
      .attr("x", midX2)
      .attr("y", midY2)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .text("73,75%")
      .style("fill", "#0096c7") 
      .style("font-size", "50px")
      .style("bold");

    // Tilføj reference linje
    svg2.append("line")
      .attr("x1", x2(parseTime("2022-10")))
      .attr("x2", x2(parseTime("2022-10")))
      .attr("y1", 0)
      .attr("y2", height2)
      .attr("stroke", "#0096c7")
      .attr("stroke-width", 1.5)
      .style("stroke-dasharray", ("3, 3"));}

    //Magi - det taler vi om senere!!
    async function fetchContent(url) {
      let request = await fetch(url);
      let json = await request.json();
      return json;
  }