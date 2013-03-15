(function () {
//"SparkLine"
vg.chart.SparkLine = function (config) {
  this.intro = vg.chartIntro["SparkLine"];
  this.config = config;
  //  4 param must need
  var container = typeof config.container === "string" ? document.getElementById(config.container) : config.container;
  var width = config.width || 100,
      height = config.height || 20;
  var data = config.data || [1, 2, 3, 4, 2];

  //  other optional params
  var margin = config.margin || {
        "top": 1,
        "left": 1,
        "bottom": 1,
        "right": 1
      };
  var showBasicLine = config.showBasicLine || false;
  var lineWidth = config.lineWidth || 0.8;
  var lineColor = config.lineColor || "steelblue";

  var w = width - margin.left - margin.right;
  var h = height - margin.top - margin.bottom;
  var min = d3.min(data);
  var max = d3.max(data);
  if (min === max) {
    max += 1;
    min -= 1;
  }

  var x = d3.scale.linear()
      .range([0, w])
      .domain([0, data.length - 1]);

  var y = d3.scale.linear()
      .range([h, 0])
      .domain([min, max]);

  var line = d3.svg.line()
    .x(function(d, i) { return x(i); })
    .y(function(d) { return y(d); });
 
  var svg = d3.select(container).append("svg:svg")
      .attr("width", width)
      .attr("height", height);
  //basicLine
  if (showBasicLine) {
    svg.append("svg:line")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("x1", 0)
      .attr("y1", y(data[0]))
      .attr("x2", w)
      .attr("y2", y(data[0]))
      .attr("stroke", "#ccc")
      .attr("stroke-width", "1px")
      .attr("stroke-dasharray", "4 2");
  }
  //line
  var line = svg.append("svg:path")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .data([data])
      .attr("class", "line")
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke-width", lineWidth + "px")
      .attr("stroke", lineColor);
}
}());
