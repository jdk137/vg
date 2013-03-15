(function () {
//"TifCareer";
vg.chart["TifCareer"] = function (config) {
  this.intro = vg.chartIntro["TifCareer"];
  this.config = config;
  //  4 params must need
  var width = config.width || 320,
      height = config.height || 190;
  var container = typeof config.container === "string" ? document.getElementById(config.container) : config.container; // id or dom node
  var data = config.data || [{name: "18", value: 40}, {name: "25", value: 60}];
  data.sort(function (a, b) {
    return b.value - a.value; //descending
  });

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
  var wordSpacing = config.wordSpacing || 20; // distance between words and img
  var imgBox = config.imgBox || {w: 50, h: 30}; // img's width and height
  var imgCopies = config.imgCopies || [3, 2, 1, 1]; // how many times a img show

  var w = width - margin.left - margin.right;
  var h = height - margin.top - margin.bottom;

  // data process;
  var sum = d3.sum(data, function (d) { return d.value; });
  var max = d3.max(data, function (d) { return d.value; });
  var copySum = d3.sum(imgCopies);
  var imgGroupSpacing = (w - imgBox.w * copySum) / (data.length - 1);
  var wArr = this.wArr = data.map(function (d, i) {
        return imgBox.w * imgCopies[i];
      });
  var ratioArr = this.ratioArr = data.map(function (d) {
        return sum === 0 ? 0 : d.value / sum;
      });
  var s = margin.left;
  var leftArr = this.leftArr = data.map(function (d, i) {
        var l = s;
        s += wArr[i] + imgGroupSpacing;
        return l;
      });

  //draw img
  var paper = this.paper = new Raphael(container, width, height);
  var imgGroups = this.imgGroups = [];
  data.forEach(function (d, i) {
      var imgGroup = paper.set();
      d3.range(imgCopies[i]).forEach(function (d2, j) {
        var img = paper.image(d.img, leftArr[i] + imgBox.w * j, margin.top, imgBox.w, h);
        imgGroup.push(img);
      });
      imgGroups.push(imgGroup);
  });

  //draw words
  var words = this.words = [];
  data.forEach(function (d, i) {
    var v = Math.round(ratioArr[i] * 1000) / 10 + "%";
    var word = paper.set();
    words.push(word);
    word.push(
      paper.text(leftArr[i] + wArr[i] / 2, margin.top - wordSpacing - wordSpacing * 0.5, data[i].name).attr({
        "font-family": "微软雅黑",
        "font-size": "12px"
      }),
      paper.text(leftArr[i] + wArr[i] / 2, margin.top - wordSpacing * 2 - wordSpacing * 0.5, v).attr({
        "fill": color[i],
        "font-family": "微软雅黑",
        "font-size": "14px"
      })
    );
  });
  /*
  word1.attr({
      "transform": "translate(t" + (r * 1.3 * Math.cos(rotateAngle) + 0.2 * r) + "," + (-r * 1.3 * Math.sin(rotateAngle) - 0.1 * r) + ")"
  });
  */
}
}());
