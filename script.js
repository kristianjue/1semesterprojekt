
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
        })
    .on('mouseout',function(){
            d3.select(this)
            .transition()
            .duration(100)
            .style('transform','scale(1.0)');    
        })
    
    d3.select('#meatDish img')
    .on('mouseover', function() {
        d3.select(this)
        .transition()
        .duration(100)
        .style('transform','scale(1.1)');
        })
    .on('mouseout',function(){
            d3.select(this)
            .transition()
            .duration(100)
            .style('transform','scale(1.0)');    
        })
    })

    //fakataboks til tallerken
    function showInfo() {
        var infoBox = document.getElementById("infoBox");
        infoBox.style.display = "block";
      }
      
      function hideInfo() {
        var infoBox = document.getElementById("infoBox");
        infoBox.style.display = "none";
      }