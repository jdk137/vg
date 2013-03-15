(function () {
//"PredictLine";
vg.chart["PredictLine"] = function (config) {
  this.intro = vg.chartIntro["PredictLine"];
  this.config = config;
  //  4 params must need
  var width = config.width || 320,
      height = config.height || 190;
  var container = typeof config.container === "string" ? document.getElementById(config.container) : config.container; // id or dom node
  var data = config.data || [{name: "18", value: 40}, {name: "19", value: 50}, {name: "20", value: 45}];

  //  other optional params 
  var margin = config.margin || {
        "top": 1,
        "left": 1,
        "bottom": 1,
        "right": 1
      };
  var color = config.color || {"old": "#e25a26", "new": "#337b00"};
  var areaOpacity = config.areaOpacity || 0.15;
  var splits = 3;

  var w = width - margin.left - margin.right;
  var h = height - margin.top - margin.bottom;
  
  // data process;
  var max = d3.max(data, function (d) { return d.value; });
  var splitValue = (function (max) {
    var digits = Math.floor(Math.log(max) / Math.log(10));
    var multiply = Math.pow(10, digits);
    var e = max / multiply;
    var split;
    if (e <= 1.5) {
      if (digits === 0) {
        split = 0.5;
      } else {
        split = Math.round(0.5 * multiply);
      }
    } else if (e <= 3) {
        split = Math.round(1 * multiply);
    } else if (e <= 6) {
        split = Math.round(2 * multiply);
    } else if (e <= 9) {
        split = Math.round(3 * multiply);
    } else {
        split = Math.round(4 * multiply);
    }
    return split;
  }(max));

  var points = data.map(function (d, i) {
      return {
        x: margin.left + i / (data.length - 1) * w,
        y: margin.top + h * (1 - d.value / (splitValue * splits)),
        name: d.name
      }
  });

  var svg = d3.select(container).append("svg:svg")
    .attr("width", width)
    .attr("height", height);

  var hLine = svg.append("g").selectAll(".hLine")
      .data(d3.range(splits + 1))
    .enter().append("g")
      .attr("class", "hLine");

  //h line
  hLine.append("line")
      .attr("stroke", "gray")
      .attr("stroke-dasharray", "1,1")
      .attr("stroke-width", 0.6)
      .attr("x1", margin.left)
      .attr("y1", function (d, i) { return margin.top + (1 - i / splits) * h; })
      .attr("x2", margin.left + w)
      .attr("y2", function (d, i) { return margin.top + (1 - i / splits) * h; });

  //h line text
  hLine.append("text")
      .attr("x", margin.left)
      .attr("y", function (d, i) { return margin.top + (1 - i / splits) * h + 13; })
      .attr("font-family", "微软雅黑")
      .attr("font-size", "12px")
      .attr("fill", "#bbb")
      .text(function (d, i) {
          return i === 0 ? "" : i * splitValue;
      });

  var bottomLine = svg.append("g").selectAll(".bottomLine")
      .data(points)
    .enter().append("g")
      .attr("class", "bottomLine");

  //bottom vertical line
  bottomLine.append("line")
      .attr("stroke", "gray")
      .attr("x1", function (d, i) { return margin.left + i / (points.length - 1) * w; })
      .attr("y1", margin.top + h)
      .attr("x2", function (d, i) { return margin.left + i / (points.length - 1) * w; })
      .attr("y2", margin.top + h - 4);

  //bottom text
  bottomLine.append("text")
      .attr("x", function (d, i) { return margin.left + i / (points.length - 1) * w; })
      .attr("y", margin.top + h + 15)
      .attr("font-family", "微软雅黑")
      .attr("font-size", "12px")
      .attr("fill", "gray")
      .attr("text-anchor", function (d, i) { return i === 0 ? "start" : (i === points.length - 1 ? "end" : "middle"); })
      .text(function (d) {
          return d.name;
      });

  // area and line
  var oldPath = "";
  var newPath = "";
  points.forEach(function (d, i) {
    //old path
    if (i === 0) {
      oldPath += "M" + d.x + "," + d.y;
    } else if (i < points.length - 1) {
      oldPath += "L" + d.x + "," + d.y;
    }
    //old path
    if (i === points.length - 2) {
      newPath += "M" + d.x + "," + d.y;
    } else if (i === points.length - 1) {
      newPath += "L" + d.x + "," + d.y;
    }
  });
  //old area
  svg.append("path")
    .attr("d", oldPath
        + "L" + points[points.length - 2].x + "," + (margin.top + h)
        + "L" + points[0].x + "," + (margin.top + h)
        )
    .attr("fill", color.old)
    .attr("opacity", areaOpacity);
  //new area
  svg.append("path")
    .attr("d", newPath
        + "L" + points[points.length - 1].x + "," + (margin.top + h)
        + "L" + points[points.length - 2].x + "," + (margin.top + h)
        )
    .attr("fill", color.new)
    .attr("opacity", areaOpacity);
  //old path
  svg.append("path")
    .attr("d", oldPath)
    .attr("fill", "none")
    .attr("stroke-width", 2)
    .attr("stroke", color.old);
  //new path
  svg.append("path")
    .attr("d", newPath)
    .attr("fill", "none")
    .attr("stroke-dasharray", "3,3")
    .attr("stroke-width", 2)
    .attr("stroke", color.new);

  //points
  svg.append("g").selectAll("circle")
      .data(points)
    .enter().append("circle")
      .attr("cx", function (d) { return d.x; })
      .attr("cy", function (d) { return d.y; })
      .attr("r", 5)
      .attr("fill", function (d, i) { return i < points.length - 1 ? color.old : color.new; })
      .attr("stroke-width", 1.5)
      .attr("stroke", "#fff");
};
}());
