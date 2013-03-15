(function () {
//"TifGender"
vg.chart.TifGender = function (config) {
  this.intro = vg.chartIntro["TifGender"];
  //  4 params must need
  var width = config.width || 320,
      height = config.height || 190;
  var container = typeof config.container === "string" ? document.getElementById(config.container) : config.container; // id or dom node
  var data = config.data || [{name: "男", value: 40}, {name: "女", value: 60}];

  //  other optional params 
  var margin = config.margin || {
        "top": 1,
        "left": 1,
        "bottom": 1,
        "right": 1
      };
  var color = this.color = typeof data[0].color !== 'undefined' ?
    data.map(function (d) { return d.color; }) :
    ["#3fa9f5", "#3fa9f5",  "#909dd0", "#909dd0", "#ff88a2", "#ff88a2", "#ff88a2"];

  var rotateAngle = Math.PI / 6;

  var w = width - margin.left - margin.right;
  var h = height - margin.top - margin.bottom;
  var r = Math.min(w, h) / 2;
  var center = [margin.left + w / 2, margin.top + h / 2];
  

  // data process;
  var sum = data[0].value + data[1].value;
  var ratio1 = sum === 0 ? 0 : data[0].value / sum;
  ratio1 = Math.max(0.000001, Math.min(0.999999, ratio1));//between 0.001 and 0.999 to ensure arc would always be drawn.
  var angle1 = Math.PI * 2 * ratio1;
  var angleStart = -angle1 / 2 - rotateAngle;
  var angleEnd = angleStart + angle1;
  var p1 = [center[0] + r * Math.cos(angleStart), center[1] + r * Math.sin(angleStart)];
  var p2 = [center[0] + r * Math.cos(angleEnd), center[1] + r * Math.sin(angleEnd)];
  
  //draw circle
  var paper = this.paper = new Raphael(container, width, height);
  var pie1 = this.pie1 = paper.path(
        "M" + center[0] + "," + center[1]
      + "L" + p1[0] + "," + p1[1]
      + "A" + r + "," + r + " 0, " + (ratio1 > 0.5 ? "1" : "0") + "," + "1 "
      + p2[0] + "," + p2[1] + "Z"
      );
  var pie2 = this.pie2 = paper.path(
        "M" + center[0] + "," + center[1]
      + "L" + p1[0] + "," + p1[1]
      + "A" + r + "," + r + " 0, " + (ratio1 > 0.5 ? "0" : "1") + "," + "0 " 
      + p2[0] + "," + p2[1] + "Z"
      );
  pie1.attr({
      "stroke-width": 2,
      "stroke": "#fff",
      "fill": color[0]
      });
  pie2.attr({
      "stroke-width": 2,
      "stroke": "#fff",
      "fill": color[1]
      });

  // draw words
  var word1 = this.word1 = paper.set();
  var word2 = this.word2 = paper.set();
  [word1, word2].forEach(function (d, i) {
      var v = i === 0 ? Math.round(ratio1 * 100) : 100 - Math.round(ratio1 * 100);
      var numberCount = v < 10 ?  1 : (v === 100 ?  3 : 2);
      d.push(
          paper.text(center[0] + 2, center[1] - 10, data[i].name).attr({
            "font-size": "14px",
            "text-anchor": "start"
          }),
          paper.text(center[0], center[1] + 10, v).attr({
            "fill": color[i],
            "font-size": "26px",
            "text-anchor": "start"
          }),
          paper.text(center[0] + 15 * numberCount, center[1] + 13, "%").attr({
            "fill": color[i],
            "font-size": "16px",
            "text-anchor": "start"
          })
      );
  })
  word1.attr({
      "transform": "translate(t" + (r * 1.3 * Math.cos(rotateAngle) + 0.2 * r) + "," + (-r * 1.3 * Math.sin(rotateAngle) - 0.1 * r) + ")"
  });
  word2.attr({
      "transform": "translate(t" + (-r * 1.3 * Math.cos(rotateAngle) - 0.8 * r) + "," + (r * 1.3 * Math.sin(rotateAngle) - 0.2 * r) + ")"
  });
}
}());
