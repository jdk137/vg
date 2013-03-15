(function () {
vg = {"version": "0.01"};
vg.chart = {};
vg.chartIntro = {
  "TifGender": {
    name: "TifGender",
    description: "男女比例饼图， 可修改用来描述两个数据的占比关系。",
    tags: ["IE compatible", "IE兼容", "pie chart", "饼图", "gender", "性别"],
    depends: ["datav.js"],
    imgUrl: "TifGender.jpg",
    demoUrl: "http://jsfiddle.net/jdk137/puVHU/",
    gitUrl: "https://raw.github.com/jdk137/vg/master/examples/TifGender/js/vg.chart.TifGender.js"
  },
  "TifAge": {
    name: "TifAge",
    description: "年龄段人群比例柱状图， 可修改用来绘制各种简易的柱状图，描述数值或占比关系。",
    tags: ["IE6-8 compatible", "IE6-8兼容", "column chart", "柱状图", "age", "年龄"],
    depends: ["datav.js"],
    imgUrl: "TifAge.jpg",
    demoUrl: "",
    gitUrl: ""
  },
  "TifCareer": {
    name: "TifCareer",
    description: "职业比例可视化，用图片数量来描述数值或占比关系，可修改用来描述比例。",
    tags: ["IE6-8 compatible", "IE6-8兼容", "image insert", "图片嵌入", "career", "职业"],
    depends: ["datav.js"],
    imgUrl: "TifCareer.jpg",
    demoUrl: "",
    gitUrl: ""
  },
  "TifBuyerLevel": {
    name: "TifBuyerLevel",
    description: "买家等级横向比例图，并有优化过的图例标注。可修改用来绘制各种简易的横向比例图，描述数值或占比关系。",
    tags: ["IE6-8 compatible", "IE6-8兼容", "bar chart", "横向比例图", "buyerLevel", "买家等级"],
    depends: ["datav.js"],
    imgUrl: "TifBuyerLevel.jpg",
    demoUrl: "",
    gitUrl: ""
  },
  "TifConsumLevel": {
    name: "TifConsumLevel",
    description: "消费能力横向柱状图，可修改用来绘制各种简易的横向柱状图，描述数值或占比关系。",
    tags: ["IE6-8 compatible", "IE6-8兼容", "bar chart", "横向柱状图", "consumLevel", "消费层级"],
    depends: ["datav.js"],
    imgUrl: "TifConsumLevel.jpg",
    deomUrl: "",
    gitUrl: ""
  },
  "PredictLine": {
    name: "PredictLine",
    description: "绘制前几天的历史数据和最后一天的预测数据， 纵轴坐标经过优化，3等分，只能显示正数，基线为0。可修改用来绘制各种简易的面积图和线图， 或者纵轴坐标需要等分的图形。",
    tags: ["IE6-8 uncompatible", "IE6-8不兼容", "line chart", "线图", "predictLine", "趋势预测图"],
    depends: ["d3.js"],
    imgUrl: "PredictLine.jpg",
    deomUrl: "",
    gitUrl: ""
  },
  "SparkLine": {
    name: "SparkLine",
    description: "绘制火花线，在极小的空间内呈现变化趋势，可修改用来绘制各种时序变化趋势。",
    tags: ["IE6-8 uncompatible", "IE6-8不兼容", "line chart", "线图", "火花线", "sparkLine"],
    depends: ["d3.js"],
    imgUrl: "SparkLine.jpg",
    deomUrl: "",
    gitUrl: ""
  },
  "DynamicMasterDetailMultiLine": {
    name: "DynamicMasterDetailMultiLine",
    description: "绘制多条曲线，呈现多个数据在长时间段内的变化趋势，并可拖拽选择查看任意短时间内的数据。可修改用来绘制各种时序变化趋势。",
    tags: ["IE6-8 uncompatible", "IE6-8不兼容", "line chart", "线图", "DynamicMasterDetailMultiLine", "交互多曲线趋势图"],
    depends: ["highcharts.js", "jquery.js"],
    imgUrl: "DynamicMasterDetailMultiLine.jpg",
    deomUrl: "",
    gitUrl: ""
  }
};
}());
