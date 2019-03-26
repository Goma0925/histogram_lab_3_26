var dataPromise = d3.json("classData.json")


var reformatData = function(dataP){
  scoreFrequencies = {}
    dataP.then(function(data){
      data.forEach(function(peng){
        peng.quizes.forEach(function(quiz){
          var day = "day"+quiz.day;
          var grade = quiz.grade;
          if (typeof scoreFrequencies[day] === 'undefined') {
              // if the day's frequency counter is undefined
              //Set the {score:frequency} counter
              scoreFrequencies[day] = {0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,};
              scoreFrequencies[day][grade] = scoreFrequencies[day][grade] + 1;
          }
          else {
            scoreFrequencies[day][grade] = scoreFrequencies[day][grade] + 1;
          }
        });
      });
    })
  return scoreFrequencies;
  //scoreFrequencies format:
  //  {"day1": {score:frequency, score:frequency...}, "day2":{score:frequency, score:frequency...},...}
  };

var frequencyData = reformatData(dataPromise);
console.log("-------Data-----");
console.log("scoreFrequencies", frequencyData)



//Graph settings
var screenSettings = {
width:700,
height:400
};

var marginSettings = {
  top:20,
  bottom: 30,
  left: 50,
  right: 100
}

//Function settings
var drawChart = function(scoreFrequencies, svgSelector, selectedDay, screen, margins)
{

  //Draw a histogram using the selectedDay's info

  var graphWidth  = screen.width - margins.left - margins.right;
  var graphHeight = screen.height - margins.top - margins.bottom;
  var borderWidth = 1;

  var xScale = d3.scaleLinear()
                .domain([0, 10])
                .range([0, graphWidth])

  var yScale = d3.scaleLinear()
                .domain([0, scoreFrequencies.length])
                .range([0, graphHeight - 15]);

  //var yAxisScale = d3.scaleLinear()
                //.domain([0, 100])
                //.range([graphHeight - 15, 0]);

  //var yAxis = d3.axisLeft().scale(yAxisScale);

  var colorScale = d3.scaleOrdinal(d3.schemeAccent);

  var barWidth = graphWidth / scoreFrequencies.length;
  //
  var graphSVG = d3.select(svgSelector)
              .attr("width", screen.width)
              .attr("height", screen.height);
  console.log(graphSVG);

  graphBorder = graphSVG.append("rect")
                  .attr("border-style", "solid")
                  .attr("x", margins.left)
                  .attr("y", margins.top)
                  .attr("width", graphWidth)
                  .attr("height", graphHeight)
                  .attr("fill", "white")
                  .style("stroke", "black")
                  .style("stroke-width", borderWidth)
                  .classed("graph-border", true);

var graphData = graphSVG.append("g")
                  .classed("graph-data", true);

var graphBars = graphData.selectAll("rect")
                     .data(scoreFrequencies)
                     .enter()
                     .append("rect")
                     .attr("width", barWidth)
                     .attr("height", function(d){console.log("Loop"); return 10;})

                    //  .attr("width", barWidth)
                    //  .attr("height", function(peng){
                    //                   console.log(peng[selectedDay]);
                    //                   return yScale(peng[selectedDay])})
                    //  .attr("x", function(d,i)
                    //  { return margins.left + i*barWidth + (graphWidth/16);})//adjusting the center of bar
                    //  .attr("y", function(person){
                    //                   return graphHeight + margins.top- yScale(peng[selectedDay]) - 2})
                    // .attr("fill", function(person){return colorScale(person.name)})
                    // .style("stroke", "#EBFCFB")
                    // .style("stroke-width", 2)
                    // .classed("data-bar", true);

  };

drawChart(scoreFrequencies, "#histogram", 1, screenSettings, marginSettings);

//Next: Set the buckets
