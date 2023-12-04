//graf over brændsel
    // Definer højde, brede og margin
    var margin = { top: 40, right: 95, bottom: 30, left: 60 },
      width = 530 - margin.left - margin.right,
      height = 420 - margin.top - margin.bottom;

    //Tilføj svg object til body på siden
    var svg = d3.select("#line1")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Indlæs Data, her bruges timeformat for at få daten i den korrekt format
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

    //Tilføjer X-aksen
    var x = d3.scaleTime()
      .domain(d3.extent(dataset, function (d) { return (d[0]); }))
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    //Tilføjer Y-aksen
    var y = d3.scaleLinear() 
      .domain([2150000, d3.max(dataset, function (d) { return +d[1]; })])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    //Variabler til reference området
    let referenceYear = 2022;
    let referenceMonth = 10;
    let referenceDate = d3.timeParse("%Y-%m")(`${referenceYear}-${referenceMonth}`);
    
    //Tilføj tekst til reference området
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
    .style("font-size", "12px")
    .style("font-weight", "normal"); // Gør kun denne del ikke-fed

  //Farver det ønskede reference område
  svg.append("rect")
  .attr("x", x(referenceDate)) // Start x-koordinatet for farvet område
  .attr("width", width - x(referenceDate)) // Bredden af det farvede område
  .attr("y", 0)
  .attr("height", height)
  .attr("fill", "rgba(255, 164, 6, 0.3)"); 

    //Tilføj etiket og cirkel til grafens punkter
    var tooltip = d3.select("#line1")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    var focus = svg.append("g")
        .style("display", "none");

    focus.append("circle")
    .attr("r", 5) 
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
  .style("cursor", "zoom-in")
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

  // Opdater cirkelens og etikkens position
  focus.attr("transform", "translate(" + x(d[0]) + "," + y(d[1]) + ")");

  // Opdater teksten ved siden af cirklen
  focus.select(".focus-text").text(d[1].toLocaleString('da-DK'));
}

function handleMouseOut() {
  focus.style("display", "none");
  tooltip.style("opacity", 0);
}

//Tilføj clipPath
svg.append("defs").append("clipPath")
  .attr("id", "clip")
  .append("rect")
  .attr("width", width) // Bredden af det område, du vil farve
  .attr("height", height); // Højden af det område, du vil farve

//Tilføj linjen på grafen ved, at anvende clipPath
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


//graf over el, her gøres det samme som ved grafen over brændsel
    var margin2 = { top: 40, right: 95, bottom: 30, left: 60 },
      width2 = 530 - margin2.left - margin2.right,
      height2 = 420 - margin2.top - margin2.bottom;

    var svg2 = d3.select("#line2")
      .append("svg")
      .attr("width", width2 + margin2.left + margin2.right)
      .attr("height", height2 + margin2.top + margin2.bottom)
      .append("g")
      .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

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

    var x2 = d3.scaleTime()
      .domain(d3.extent(dataset2, function (d) { return d[0]; }))
      .range([0, width2]);
    svg2.append("g")
      .attr("transform", "translate(0," + height2 + ")")
      .call(d3.axisBottom(x2));

    var y2 = d3.scaleLinear()
      .domain([0, d3.max(dataset2, function (d) { return +d[1]; })])
      .range([height2, 0]);
    svg2.append("g")
      .call(d3.axisLeft(y2));

    let referenceYear2 = 2022;
    let referenceMonth2 = 10; 
    let referenceDate2 = d3.timeParse("%Y-%m")(`${referenceYear2}-${referenceMonth2}`);

      svg2.append("text")
      .attr("x", x2(referenceDate2) - 80) 
      .attr("y", - 30) 
      .text("Stigning på 73,75%")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .append("tspan")
      .attr("x", x2(referenceDate2) - 80)
      .attr("dy", 20) 
      .text("fra 2022/10 til 2023/10")
      .style("font-size", "12px")
      .style("font-weight", "normal"); 

  svg2.append("rect")
  .attr("x", x2(referenceDate2)) 
  .attr("width", width2 - x2(referenceDate2)) 
  .attr("y", 0)
  .attr("height", height2)
  .attr("fill", "rgba(0, 150, 199, 0.3)"); 

var tooltip2 = d3.select("#line2")
  .append("div")
  .attr("class", "tooltip2")
  .style("opacity", 0);

var focus2 = svg2.append("g")
  .style("display", "none");

focus2.append("circle")
  .attr("r", 5) 
  .attr("class", "focus-circle")
  .style("fill", "#0096c7");

focus2.append("text")
  .attr("x", 9) 
  .attr("dy", ".35em") 
  .style("font-size", "15px")
  .attr("class", "focus-text");

svg2.append("rect")
  .attr("width", width2)
  .attr("height", height2)
  .style("fill", "none")
  .style("pointer-events", "all")
  .style("cursor", "zoom-in")
  .on("mouseover", handleMouseOver2)
  .on("mousemove", handleMouseMove2)
  .on("mouseout", handleMouseOut2);

function handleMouseOver2() {
  focus2.style("display", null);
  tooltip2.style("opacity", 1);
}

function handleMouseMove2(event) {
  var x2Value = x2.invert(d3.pointer(event, this)[0]);
  var bisectDate = d3.bisector(function (d) { return d[0]; }).left;
  var i = bisectDate(dataset2, x2Value, 1);
  var d = dataset2[i];

  focus2.attr("transform", "translate(" + x2(d[0]) + "," + y2(d[1]) + ")");

  focus2.select(".focus-text").text(d[1].toLocaleString('da-DK'));
}

function handleMouseOut2() {
  focus2.style("display", "none");
  tooltip2.style("opacity", 0);
}

svg2.append("defs").append("clipPath")
  .attr("id", "clip2")
  .append("rect")
  .attr("width", width2) 
  .attr("height", height2); 

svg2.append("path")
  .datum(dataset2)
  .attr("fill", "none")
  .attr("stroke", "#0096c7")
  .attr("stroke-width", 1.5)
  .attr("d", d3.line()
    .x(function (d) { return x2(d[0]); })
    .y(function (d) { return y2(d[1]); })
  )
  .attr("clip-path", "url(#clip2)"); 

svg2.append("text")
  .attr("x", -margin.left)  
  .attr("y", -margin.top / 2)  
  .attr("text-anchor", "start")  
  .style("font-size", "20px") 
  .style("fill", "black")
  .style("text-decoration", "underline")
  .text("El-biler");
}

    async function fetchContent(url) {
      let request = await fetch(url);
      let json = await request.json();
      return json;
  }