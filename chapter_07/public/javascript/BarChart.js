var BarChart = (function(){
	
	var margin = {top: 20, right: 20, bottom: 40, left: 40};
	var width = 480 - margin.left - margin.right;
	var height = 500 - margin.top - margin.bottom;
	var x;
	var y;
	var bars;

	function setup(data){
	    x = d3.scaleBand()
	    .range([0, width], .1)
	    .padding(0.1);

	    y = d3.scaleLinear()
	    .range([height, 0]);

	    bars = d3.select("#bar-chart").append("svg")
	      .attr("width", width + margin.left + margin.right)
	      .attr("height", height + margin.top + margin.bottom)
	      .append("g")
	      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	    bars.selectAll(".bar")
	      .data(data)
	    .enter()
	      .append("rect")
	      .attr("class", "bar")
	      .attr("x", function(d, i) { return x(i); })
	      .attr("width", x.bandwidth())
	      .attr("y", function(d) {return y(d); })
	      .attr("height", function(d) {  return height - y(+d); });

	      bars.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(d3.axisBottom(x));
	      bars.append("g")
	      .attr("class", "y axis")
	      .call(d3.axisLeft(y)
	        .ticks(0));

	      bars.append("text")             
	      .attr("transform",
	            "translate(" + (width/2) + " ," + 
	                           (height + margin.top + 20) + ")")
	      .style("text-anchor", "middle")
	      .text("score");


	    bars.append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 0 - margin.left)
	      .attr("x",0 - (height / 2))
	      .attr("dy", "1em")
	      .style("text-anchor", "middle")
	      .text("freqency");  
	}

	function updateBar(data){
		x.domain(d3.range(data.length));
        y.domain([0, d3.max(data)]);

        var test = d3.max(data);

        var rect = bars.selectAll(".bar")
            .data(data);

        rect.enter().append("rect");
          
          rect.attr("class", "bar")
          .transition()
          .duration(1000)
          .attr("x", function(d, i) { return x(i); })
          .attr("width", x.bandwidth())
          .attr("y", function(d) {return y(d); })
          .attr("height", function(d) {  return height - y(+d); });

        bars.select(".x.axis")
            .transition()
            .duration(1000)
            .call(d3.axisBottom(x));

        bars.select(".y.axis")
            .transition()
            .duration(1000)
            .call(d3.axisLeft(y)
                .ticks(test)
                .tickFormat(d3.format("d")));
	}

	return{
		setup: setup,
		updateBar: updateBar
	}
})();