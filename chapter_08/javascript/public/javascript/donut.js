var DonutChart = function(){
    var pi = Math.PI;
    var sensorDomainArray;
    var divIdName;
    var sensorAmount;
    var sensorText = "";

    var sensorScale;
    var foreground;
    var arc;
    var svg;
    var g;
    var textValue;

    function setSensorDomain(domainArray){
        sensorDomainArray = domainArray;
    }

    function setSvgDiv(name){
        divIdName = name;
    }

    function createChart(sensorTextNew, sensorType){
        
        sensorText = sensorTextNew;

        var margin = {top: 10, right: 10, bottom: 10, left: 10};
        var width = 240 - margin.left - margin.right;
        var height = 200;

        sensorScale = d3.scaleLinear()
            .range([0, 180]);

        arc = d3.arc()
            .innerRadius(70)
            .outerRadius(100)
            .startAngle(0);

        svg = d3.select(divIdName).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

        g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        g.append("text")
            .attr("text-anchor", "middle")
            .attr("font-size", "1.3em")
            .attr("y", -20)
            .text(sensorType);

        textValue = g.append("text")
         .attr("text-anchor", "middle")
         .attr('font-size', '1em')
         .attr('y', 0)
         .text(sensorAmount + "" +  sensorText);

        var background = g.append("path")
            .datum({endAngle: pi})
            .style("fill", "#ddd")
            .attr("d", arc)
            .attr("transform", "rotate(-90)")

        foreground = g.append("path")
            .datum({endAngle: 0.5 * pi})
            .style("fill", "#FE8402")
            .attr("d", arc)
            .attr("transform", "rotate(-90)");          
    }

    function updateChart(newSensorValue){
        
        sensorScale.domain(sensorDomainArray);

        var sensorValue = sensorScale(newSensorValue);

        sensorValue = sensorValue/180;

        textValue.text(newSensorValue + "" +  sensorText);

        foreground.transition()
          .duration(750)
          .attrTween("d", arcAnimation(sensorValue * pi));
    }

    function arcAnimation(newAngle) {
      return function(d) {
        var interpolate = d3.interpolate(d.endAngle, newAngle);

        return function(t) {
          d.endAngle = interpolate(t);
          return arc(d);
        };
      };
    }

    return{
        setSensorDomain: setSensorDomain,
        setSvgDiv: setSvgDiv,
        createChart:createChart,
        updateChart: updateChart
    }
};