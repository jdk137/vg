(function () {
//"TifBuyerLevel";
vg.chart["TifBuyerLevel"] = function (config) {
  this.intro = vg.chartIntro["TifBuyerLevel"];
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
  var levelSpacing = config.levelSpacing || 20; // distance between first level words and bar, distance between first level word and second level word
  var wordBox = config.wordBox || {w: 50, h: 30}; // bar word (includs name and ratio) box's width
  var level2Shift = config.level2Shift || -10;
  var showBox = config.showBox || false;

  var w = width - margin.left - margin.right;
  var h = height - margin.top - margin.bottom;

  // data process;
  var sum = d3.sum(data, function (d) { return d.value; }); 
  var max = d3.max(data, function (d) { return d.value; }); 
  var wArr = this.wArr = data.map(function (d) {
        return max === 0 ? 0 : (w - data.length + 1) * d.value / sum;
      });
  var ratioArr = this.ratioArr = data.map(function (d) {
        return sum === 0 ? 0 : d.value / sum;
      });
  var s = margin.left;
  var leftArr = this.leftArr = wArr.map(function (d, i) {
        s += wArr[i] + 1; // 1 is spacing between different bars;
        return s - wArr[i] - 1;
      });

  //compute linkLine and word box left position
  var shakeLevel = function (boundL, boundR, initArr, boxWidth) {
    var wordBoxLeft = [];
    var right = boundL;
    var left = boundR;
    //left to right
    initArr.forEach(function (d, i) {
      if (d >=  right) {
        wordBoxLeft[i] = d;
      } else {
        wordBoxLeft[i] = right;
      }
      right = wordBoxLeft[i] + boxWidth;
    });
    if (right < boundR) {
      return wordBoxLeft;
    }
    wordBoxLeft.reverse();
    wordBoxLeft.forEach(function (d, i) {
      if (d + boxWidth <  left) {
        wordBoxLeft[i] = d;
      } else {
        wordBoxLeft[i] = left - boxWidth;
      }
      left = wordBoxLeft[i];
    });

    wordBoxLeft.reverse();
    return wordBoxLeft;
  };
  var oddBoxLeft = leftArr.filter(function (d, i) {
    return i % 2 === 0;
  });
  var evenBoxLeft = leftArr.filter(function (d, i) {
    return i % 2 === 1;
  });
  var linePos = [];
  var boxPos = [];
  // get first level box left position
  oddBoxLeft = shakeLevel(margin.left, margin.left + w, oddBoxLeft, wordBox.w);
  // get second level line position
  evenBoxLeft.forEach(function (d, i) {
    // last item and total data number is even;
    if (i === evenBoxLeft.length - 1 && (leftArr.length % 2 === 0)) {
      if (oddBoxLeft[i] + wordBox.w < d) {
      } else {
        evenBoxLeft[i] = oddBoxLeft[i] + wordBox.w + level2Shift;
      }
      return;
    }
    if (oddBoxLeft[i] + wordBox.w < d && oddBoxLeft[i + 1] >= d + wordBox.w) {
    } else {
      evenBoxLeft[i] = (oddBoxLeft[i] + wordBox.w + oddBoxLeft[i + 1]) / 2 + level2Shift;
    }
  });
  // get linePos
  oddBoxLeft.forEach(function (d, i) {
      linePos.push(d);
      if (typeof evenBoxLeft[i] !== 'undefined') {
        linePos.push(evenBoxLeft[i]);
      }
  });
  // get second level box left position
  evenBoxLeft = shakeLevel(margin.left, margin.left + w, evenBoxLeft, wordBox.w);
  // get boxPos
  oddBoxLeft.forEach(function (d, i) {
      boxPos.push(d);
      if (typeof evenBoxLeft[i] !== 'undefined') {
        boxPos.push(evenBoxLeft[i]);
      }
  });  

  //draw bar
  var paper = this.paper = new Raphael(container, width, height);
  var rects = this.rects = paper.set();
  data.forEach(function (d, i) {
      var rect = paper.rect(leftArr[i], margin.top, wArr[i], h)
        .attr({
          "r": 3,
          "fill": color[i],
          "stroke": "none"
        });
      rects.push(rect);
  });

  //draw test box and line
  //line
  var linkLines = this.linkLines = paper.set();
  var words = this.words = [];
  linePos.forEach(function (d, i) {
    var path = "M" + leftArr[i] + "," + (margin.top + h)
      + " C" + leftArr[i] + "," + (margin.top + h + levelSpacing / 2)
      + " " + d + "," + (margin.top + h + levelSpacing / 2)
      + " " + d + "," + (margin.top + h + levelSpacing);
    if (i % 2 === 1) {
      path += "v" + (wordBox.h + levelSpacing / 2);
    }
    var line = paper.path(path).attr({
      "stroke-dasharray": ". "
    });
    linkLines.push(line);
  });
  // draw box
  if (showBox) {
    boxPos.forEach(function (d, i) {
      var box = paper.rect(
        d, //x
        margin.top + h + levelSpacing + (i % 2 === 0 ? 0 : wordBox.h + levelSpacing / 2), //y
        wordBox.w, //w
        wordBox.h  //h
      );
    });
  }

  data.forEach(function (d, i) {
    var wordSet = paper.set();
    words.push(wordSet);
    wordSet.push(
      paper.text(0, wordBox.h / 4, d.name).attr({
        "text-anchor": "start"
      })
    );
    wordSet.push(
      paper.text(
        0,
        wordBox.h * 3 / 4,
        Math.round(ratioArr[i] * 1000) / 10 + "%" //text string
      ).attr({
        "fill": color[i],
        "text-anchor": "start"
      })
    );
    wordSet.attr({
      "font-size": "12px",
      "font-family": "微软雅黑",
      "transform":  "translate(t" + boxPos[i] + "," + (margin.top + h + levelSpacing + (i % 2 === 0 ? 0 : wordBox.h + levelSpacing / 2)) + ")"
    });
  });
}
}());
