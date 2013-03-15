//warning: not MIT liscense. This gadget depends on highcharts.js, highcharts has commercial and no-commercial license. moreInfo:  http://shop.highsoft.com/highcharts.html
(function () {
vg.chart.DynamicMasterDetailMultiLine = function (config) {
    this.intro = vg.chartIntro["DynamicMasterDetailMultiLine"];
    this.config = config;
    // params must set
    var container = typeof config.container === "string" ? document.getElementById(config.container) : config.container; // id or dom node
    var endTime = config.endTime || "2012-12-31";
    var pointInterval = config.pointInterval || 24 * 3600 * 1000; // 1000: 1s, 1000*60: 1m, 1000*3600: 1h, 1000*3600*24: 1d
    var masterPeriod = config.masterPeriod || 30;
    var detailPeriod = config.detailPeriod || 7;
    var data = config.data || [ { "name": "PV", "data": [null, null, 4547, 6941, 12833, 20823, 26809, 28402, 31548, 30700, 31156, 25939, 17725, 33680, 35936, 36483, 35246, 34795, 28052, 21050, 37460, 39018, 37965, 39070, 40819, 32862, 25078, 41771, 41145, 39912] }, { "name": "UV", "data": [null, null, 683, 922, 1658, 2337, 2908, 3206, 3354, 3430, 3418, 2884, 2056, 3607, 3794, 3782, 3776, 3710, 3184, 2508, 3973, 4032, 4097, 4196, 4383, 3527, 2934, 4326, 4339, 4369] } ];

    var title = config.title || '页面流量';
    var subtitle = config.subtitle || '在底下的图表上拖拽选择时间段';

    var width = config.width || "100%"; //800;
    var height = config.height || 600;

    var masterHeight = config.masterHeight || 80;
    var legendWidth = config.legendWidth || 200;
    var margin = config.margin || {
      top: 20,
      left: 50,
      right: 20,
      bottom: 20
    };

    var detailMarginBottom = margin.bottom + masterHeight + 20;
    var detailMarginRight = margin.right + legendWidth + 10;
    var masterTop = height - margin.bottom - masterHeight;

    var endUTC = new Date(endTime);
    var startUTC = new Date(endTime);
    startUTC.setTime(endUTC.getTime() - masterPeriod * pointInterval);
    var detailStartUTC = new Date(endTime);
    detailStartUTC.setTime(endUTC.getTime() - detailPeriod * pointInterval);
    var end = endUTC.getTime();
    var start = startUTC.getTime();
    var detailStartTime = detailStartUTC.getTime();

    var masterData = [];
    for (var i = 0, l = data.length; i < l; i++) {
        var d = data[i];
        var t = $.extend({
            /*type: "area",*/
            pointInterval: pointInterval,
            pointStart: start
          }, d);
        masterData.push(t);
    }
    
    var masterChart,
        detailChart;
    
    /* create the master chart */
    function createMaster() {
        masterChart = new Highcharts.Chart({
            chart: {
                renderTo: 'master-container',
                reflow: false,
                borderWidth: 0,
                backgroundColor: null,
                marginLeft: margin.left,
                marginRight: margin.right,
                zoomType: 'x',
                events: {

                    /*
                    listen to the selection event on the master chart to update the
                    extremes of the detail chart
                    */
                    selection: function(event) {
                        var extremesObject = event.xAxis[0],
                            min = extremesObject.min,
                            max = extremesObject.max,
                            detailData = [],
                            xAxis = this.xAxis[0];

                        /*
                        // move the plot bands to reflect the new detail span
                        */
                        xAxis.removePlotBand('mask-before');
                        xAxis.addPlotBand({
                            id: 'mask-before',
                            from: start,
                            to: min,
                            color: 'rgba(0, 0, 0, 0.2)'
                        });

                        xAxis.removePlotBand('mask-after');
                        xAxis.addPlotBand({
                            id: 'mask-after',
                            from: max,
                            to: end,
                            color: 'rgba(0, 0, 0, 0.2)'
                        });


                        jQuery.each(this.series, function(i, line) {
                            var lineNewData = [];
                            jQuery.each(line.data, function (i, point) {
                                if (point.x > min && point.x < max) {
                                    lineNewData.push({
                                        x: point.x,
                                        y: point.y
                                    });
                                }
                            });
                            detailChart.series[i].setData(lineNewData);
                        });

                        return false;
                    }
                }
            },
            title: {
                text: null
            },
            xAxis: {
                type: 'datetime',
                showLastTickLabel: true,
                maxZoom: masterPeriod * pointInterval, //14 * 24 * 3600000, 
                plotBands: [{
                    id: 'mask-before',
                    from: start,
                    to: detailStartTime,
                    color: 'rgba(0, 0, 0, 0.2)'
                }],
                title: {
                    text: null
                },
                dateTimeLabelFormats: {
                  	second: '%H:%M:%S',
                  	minute: '%H:%M',
                  	hour: '%H:%M',
                  	day: '%m-%d',
                  	week: '%m-%d',
                  	month: '%m-%d',
                  	year: '%Y'                        
                }
            },
            yAxis: {
                gridLineWidth: 0,
                labels: {
                    enabled: false
                },
                title: {
                    text: null
                },
                min: 0.6,
                showFirstLabel: false
            },
            tooltip: {
                formatter: function() {
                    return false;
                }
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    fillColor: {
                        linearGradient: [0, 0, 0, 70],
                        stops: [
                            [0, '#4572A7'],
                            [1, 'rgba(0,0,0,0)']
                        ]
                    },
                    lineWidth: 1,
                    marker: {
                        enabled: false
                    },
                    shadow: false,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    enableMouseTracking: false
                }
            },

            series: masterData,

            exporting: {
                enabled: false
            }

        }, function(masterChart) {
            createDetail(masterChart)
        });
    }

    /* create the detail chart */
    function createDetail(masterChart) {
        /* prepare the detail chart */
        var detailData = [],
            detailStart = detailStartTime;

        jQuery.each(masterChart.series, function(i, line) {
            var lineData = {
                name: line.name,
                pointStart: detailStart,
                pointInterval: pointInterval,
                data: []
            };
            detailData.push(lineData);
            jQuery.each(line.data, function (i, point) {
                if (point.x >= detailStart) {
                    lineData.data.push(point.y);
                }
            });
        });

        /* create a detail chart referenced by a global variable */
        detailChart = new Highcharts.Chart({
            chart: {
                marginBottom: detailMarginBottom,
                renderTo: 'detail-container',
                reflow: false,
                marginLeft: margin.left,
                marginRight: detailMarginRight,
                style: {
                    position: 'absolute'
                }
            },
            credits: {
                enabled: false
            },
            title: {
                text: title
            },
            subtitle: {
                text: subtitle
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                  	second: '%H:%M:%S',
                  	minute: '%H:%M',
                  	hour: '%H:%M',
                  	day: '%m-%d',
                  	week: '%m-%d',
                  	month: '%m-%d',
                  	year: '%Y'                        
                }
            },
            yAxis: {
                title: {
                    text: null
                },
                maxZoom: 0.1
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                    Highcharts.dateFormat('%Y-%m-%d', this.x) + ': <b>' + this.y + '</b><br/>';
                }
            },
            legend: {
                /*enabled: false*/
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -10,
                y: 10,
                borderWidth: 2
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: true,
                                radius: 5
                            }
                        }
                    }
                }
            },
            series: detailData,

            exporting: {
                enabled: false
            }

        });
    }

    /* make the container smaller and add a second container for the master chart */
    var $container = $(container)
        .html("")
        .css({
            'width': width,
            'height': height,
            'position': 'relative'
        });

    var $detailContainer = $('<div id="detail-container">').css({
          "height": "100%",
          "width": "100%"
        })
        .appendTo($container);

    var $masterContainer = $('<div id="master-container">')
        .css({ position: 'absolute', top: masterTop, height: masterHeight, width: '100%' })
        .appendTo($container);

    /* create master and in its callback, create the detail chart */
    createMaster();
};
}());
