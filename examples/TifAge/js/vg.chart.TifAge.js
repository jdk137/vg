(function () {
//"TifAge";
vg.chart["TifAge"] = function (config) {
  this.intro = vg.chartIntro["TifAge"];
  this.config = config;
  //  4 params must need
  var width = config.width || 320,
      height = config.height || 190;
  var container = typeof config.container === "string" ? document.getElementById(config.container) : config.container; // id or dom node
  var data = config.data || [{name: "18", value: 40}, {name: "25", value: 60}];

  //  other optional params 
  var margin = config.margin || {
        "top": 80,
        "bottom": 40,
        "left": 30,
        "right": 30
      };
  var color = this.color = typeof data[0].color !== 'undefined' ?
    data.map(function (d) { return d.color; }) :
    d3.range(data.length).map(function () { return "#3fa9f5"; });
  var namePosition = config.namePosition || "middle"; // "left", "middle"
  var ratioWordHeight = config.ratioWordHeight || 20; // word Height

  var w = width - margin.left - margin.right;
  var h = height - margin.top - margin.bottom;
  var columnW = w / data.length;

  // data process;
  var sum = d3.sum(data, function (d) { return d.value; }); 
  var max = d3.max(data, function (d) { return d.value; }); 
  var hArr = this.hArr = data.map(function (d) {
        return max === 0 ? 0 : h * d.value / max;
      });
  var ratioArr = this.ratioArr = data.map(function (d) {
        return sum === 0 ? 0 : d.value / sum;
      });
  

  //draw column
  var paper = this.paper = new Raphael(container, width, height);
  var rects = this.rects = paper.set();
  data.forEach(function (d, i) {
      var rect = paper.rect(margin.left + columnW * i, margin.top + h - hArr[i], columnW, hArr[i])
        .attr({
          "r": 3,
          "fill": color[i],
          "stroke-width": 1,
          "stroke": "#fff"
        });
      rects.push(rect);
  });

  // draw words
  var ratioWord = this.ratioWord = paper.set();
  var nameWord = this.nameWord = paper.set();
  ratioArr.forEach(function (d, i) {
      var text = paper.text(
          margin.left + columnW * (i + 0.5), //x
          margin.top + h - hArr[i] - ratioWordHeight / 2, //y 
          Math.round(d * 1000) / 10 + "%" //text string
      ).attr({
          "fill": color[i]
      });
      ratioWord.push(text);
  })
  ratioWord.attr({
      "font-size": "12px"
  });
  data.forEach(function (d, i) {
      var text = paper.text(
          margin.left + columnW * i + (namePosition === "left" ? 0 : columnW * 0.5), //x
          margin.top + h + ratioWordHeight / 2, //y 
          d.name //test string
      ).attr({
          "fill": "black"
      });
      nameWord.push(text);
  })
  nameWord.attr({
      "font-family": "微软雅黑",
      "font-size": "12px"
  });
};
}());
