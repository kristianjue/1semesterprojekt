//graf over brændsel
    // set the dimensions and margins of the graph
    var margin = { top: 40, right: 95, bottom: 30, left: 60 },
      width = 530 - margin.left - margin.right,
      height = 420 - margin.top - margin.bottom;

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
    
    
    //tilføj tekst til reference linjen
    svg.append("text")
    .attr("x", x(referenceDate) - 80) // Justér denne værdi for at justere vandret placering af teksten
    .attr("y", - 30) // Justér denne værdi for at justere lodret placering af teksten
    .text("Faldning på -2,19%")
    .style("font-size", "14px")
    .style("font-weight", "bold")
    .append("tspan")
    .attr("x", x(referenceDate) - 80)
    .attr("dy", 20) // Justér denne værdi for at justere afstanden mellem linjerne
    .text("fra 2022/10 til 2023/10")
    /*.style("fill", "#0096c7") */
    .style("font-size", "12px")
    .style("font-weight", "normal"); // Gør kun denne del ikke-fed

    // Farv det ønskede område
  svg.append("rect")
  .attr("x", x(referenceDate)) // Start x-koordinatet for farvet område
  .attr("width", width - x(referenceDate)) // Bredden af det farvede område
  .attr("y", 0)
  .attr("height", height)
  .attr("fill", "rgba(255, 164, 6, 0.3)"); // Farve og gennemsigtighed (juster efter behov)

    /* Beregn midtpunktet af grafen
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
      .style("bold"); */

    // Opret tooltip og cirkel
    var tooltip = d3.select("#line1")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var focus = svg.append("g")
        .style("display", "none");

    focus.append("circle")
    .attr("r", 5) // Cirkelradius
    .attr("class", "focus-circle")
    .style("fill", "#ffa406");

    focus.append("text")
    .attr("x", 9)
    .attr("dy", ".35em")
    .style("font-size", "15px")
    .attr("class", "focus-text");

// Tilføj en overlay til hele grafen for at håndtere hover-events
svg.append("rect")
  .attr("width", width)
  .attr("height", height)
  .style("fill", "none")
  .style("pointer-events", "all")
  .on("mouseover", handleMouseOver)
  .on("mousemove", handleMouseMove)
  .on("mouseout", handleMouseOut);

// Funktion til at håndtere hover-event
function handleMouseOver() {
  focus.style("display", null);
  tooltip.style("opacity", 1);
}

function handleMouseMove(event) {
  var xValue = x.invert(d3.pointer(event, this)[0]);
  var bisectDate = d3.bisector(function (d) { return d[0]; }).left;
  var i = bisectDate(dataset, xValue, 1);
  var d = dataset[i];

  // Opdater cirkelens og tooltipens position
  focus.attr("transform", "translate(" + x(d[0]) + "," + y(d[1]) + ")");

  // Opdater teksten ved siden af cirklen
  focus.select(".focus-text").text(d[1].toLocaleString('da-DK'));
}

function handleMouseOut() {
  focus.style("display", "none");
  tooltip.style("opacity", 0);
}

// ...

// Opret en clipPath
svg.append("defs").append("clipPath")
  .attr("id", "clip")
  .append("rect")
  .attr("width", width) // Bredden af det område, du vil farve
  .attr("height", height); // Højden af det område, du vil farve

// Add the line, men anvend clipPath
svg.append("path")
  .datum(dataset)
  .attr("fill", "none")
  .attr("stroke", "#ffa406")
  .attr("stroke-width", 1.5)
  .attr("d", d3.line()
    .x(function (d) { return x(d[0]); })
    .y(function (d) { return y(d[1]); })
  )
  .attr("clip-path", "url(#clip)"); // Anvend clipPath



// Tilføj en titel til venstre for grafen
svg.append("text")
  .attr("x", -margin.left)  // Placer til venstre for grafområdet
  .attr("y", -margin.top / 2)  // Placer over toppen af grafområdet
  .attr("text-anchor", "start")  // Juster til venstrejusteret tekst
  .style("font-size", "20px")  // Juster størrelsen efter behov
  .style("fill", "black")
  .style("text-decoration", "underline")
  .text("Brændsel-biler");

}
    
    //Magi - det taler vi om senere!!
    async function fetchContent(url) {
        let request = await fetch(url);
        let json = await request.json();
        return json;
    }


//graf over el
    // set the dimensions and margins of the graph
    var margin2 = { top: 40, right: 95, bottom: 30, left: 60 },
      width2 = 530 - margin2.left - margin2.right,
      height2 = 420 - margin2.top - margin2.bottom;

    // append the svg object to the body of the page
    var svg2 = d3.select("#line2")
      .append("svg")
      .attr("width", width2 + margin2.left + margin2.right)
      .attr("height", height2 + margin2.top + margin2.bottom)
      .append("g")
      .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

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

    //tilføj reference linje
    let referenceYear2 = 2022;
    let referenceMonth2 = 10; // Eksempel: januar
    let referenceDate2 = d3.timeParse("%Y-%m")(`${referenceYear2}-${referenceMonth2}`);
    
    svg2.append("line")
      .attr("x1", x2(referenceDate2))
      .attr("x2", x2(referenceDate2))
      .attr("y1", 0)
      .attr("y2", height2)
      .attr("stroke", "#0096c7")
      .attr("stroke-width", 1.5)
      .style("stroke-dasharray", ("3, 3"));

    //tilføj tekst til reference linjen
      svg2.append("text")
      .attr("x", x2(referenceDate2) - 80) // Justér denne værdi for at justere vandret placering af teksten
      .attr("y", - 30) // Justér denne værdi for at justere lodret placering af teksten
      .text("Stigning på 73,75%")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .append("tspan")
      .attr("x", x2(referenceDate2) - 80)
      .attr("dy", 20) // Justér denne værdi for at justere afstanden mellem linjerne
      .text("fra 2022/10 til 2023/10")
      /*.style("fill", "#0096c7") */
      .style("font-size", "12px")
      .style("font-weight", "normal"); // Gør kun denne del ikke-fed

      // Farv det ønskede område
  svg2.append("rect")
  .attr("x", x2(referenceDate2)) // Start x-koordinatet for farvet område
  .attr("width", width2 - x2(referenceDate2)) // Bredden af det farvede område
  .attr("y", 0)
  .attr("height", height2)
  .attr("fill", "rgba(0, 150, 199, 0.3)"); // Farve og gennemsigtighed (juster efter behov)

    /* Beregn midtpunktet
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
      .style("bold"); */

// Opret tooltip og cirkel
var tooltip2 = d3.select("#line2")
  .append("div")
  .attr("class", "tooltip2")
  .style("opacity", 0);

var focus2 = svg2.append("g")
  .style("display", "none");

focus2.append("circle")
  .attr("r", 5) // Cirkelradius
  .attr("class", "focus-circle")
  .style("fill", "#0096c7");

focus2.append("text")
  .attr("x", 9) // Opdateret fra x2 til x
  .attr("dy", ".35em") // Opdateret fra dy2 til dy
  .style("font-size", "15px")
  .attr("class", "focus-text");

// Tilføj en overlay til hele grafen for at håndtere hover-events
svg2.append("rect")
  .attr("width", width2)
  .attr("height", height2)
  .style("fill", "none")
  .style("pointer-events", "all")
  .on("mouseover", handleMouseOver2)
  .on("mousemove", handleMouseMove2)
  .on("mouseout", handleMouseOut2);

// Funktion til at håndtere hover-event
function handleMouseOver2() {
  focus2.style("display", null);
  tooltip2.style("opacity", 1);
}

function handleMouseMove2(event) {
  var x2Value = x2.invert(d3.pointer(event, this)[0]);
  var bisectDate = d3.bisector(function (d) { return d[0]; }).left;
  var i = bisectDate(dataset2, x2Value, 1);
  var d = dataset2[i];

  // Opdater cirkelens og tooltipens position
  focus2.attr("transform", "translate(" + x2(d[0]) + "," + y2(d[1]) + ")");

  // Opdater teksten ved siden af cirklen
  focus2.select(".focus-text").text(d[1].toLocaleString('da-DK'));
}

function handleMouseOut2() {
  focus2.style("display", "none");
  tooltip2.style("opacity", 0);
}

// Opret en clipPath
svg2.append("defs").append("clipPath")
  .attr("id", "clip2")
  .append("rect")
  .attr("width", width2) // Bredden af det område, du vil farve
  .attr("height", height2); // Højden af det område, du vil farve

// Add the line, men anvend clipPath
svg2.append("path")
  .datum(dataset2)
  .attr("fill", "none")
  .attr("stroke", "#0096c7")
  .attr("stroke-width", 1.5)
  .attr("d", d3.line()
    .x(function (d) { return x2(d[0]); })
    .y(function (d) { return y2(d[1]); })
  )
  .attr("clip-path", "url(#clip2)"); // Anvend clipPath


// Tilføj en titel til venstre for grafen
svg2.append("text")
  .attr("x", -margin.left)  // Placer til venstre for grafområdet
  .attr("y", -margin.top / 2)  // Placer over toppen af grafområdet
  .attr("text-anchor", "start")  // Juster til venstrejusteret tekst
  .style("font-size", "20px")  // Juster størrelsen efter behov
  .style("fill", "black")
  .style("text-decoration", "underline")
  .text("El-biler");

}

    //Magi - det taler vi om senere!!
    async function fetchContent(url) {
      let request = await fetch(url);
      let json = await request.json();
      return json;
  }