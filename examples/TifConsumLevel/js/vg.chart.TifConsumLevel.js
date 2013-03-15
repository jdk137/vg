(function () {
//"TifConsumLevel";
vg.chart["TifConsumLevel"] = function (config) {
  this.intro = vg.chartIntro["TifConsumLevel"];
  this.config = config;
  //  4 params must need
  var width = config.width || 320,
      height = config.height || 190;
  var container = typeof config.container === "string" ? document.getElementById(config.container) : config.container; // id or dom node
  var data = config.data || [{name: "18", value: 40}, {name: "25", value: 60}];

  //  other optional params 
  var margin = config.margin || {
        "top": 1,
        "left": 1,
        "bottom": 1,
        "right": 1
      };
  var color = this.color = typeof data[0].color !== 'undefined' ?
    data.map(function (d) { return d.color; }) :
    d3.range(data.length).map(function () { return "#3fa9f5"; });
  var wordSpacing = config.wordSpacing || 10; // distance between word and bar

  var w = width - margin.left - margin.right;
  var h = height - margin.top - margin.bottom;
  var barH = h / data.length;

  // data process;
  var sum = d3.sum(data, function (d) { return d.value; }); 
  var max = d3.max(data, function (d) { return d.value; }); 
  var wArr = this.hArr = data.map(function (d) {
        return max === 0 ? 0 : w * d.value / max;
      });
  var ratioArr = this.ratioArr = data.map(function (d) {
        return sum === 0 ? 0 : d.value / sum;
      });
  
  //draw bar
  var paper = this.paper = new Raphael(container, width, height);
  var rects = this.rects = paper.set();
  data.forEach(function (d, i) {
      var rect = paper.rect(margin.left, margin.top + barH * i, wArr[i], barH)
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
          margin.left + wArr[i] + wordSpacing, //x
          margin.top + barH * (i + 0.5), //y 
          Math.round(d * 1000) / 10 + "%" //text string
      ).attr({
          "text-anchor": "start",
          "fill": color[i]
      });
      ratioWord.push(text);
  })
  ratioWord.attr({
      "font-size": "14px"
  });

  data.forEach(function (d, i) {
      var text = paper.text(
          margin.left - wordSpacing, //x
          margin.top + barH * (i + 0.5), //y 
          d.name //test string
      ).attr({
          "text-anchor": "end",
          "fill": "black"
      });
      nameWord.push(text);
  })
  nameWord.attr({
      "font-family": "微软雅黑",
      "font-size": "12px"
  });
}
}());

