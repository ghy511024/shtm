/**
 * Created by ghy on 2018/1/18.
 */
var option = {
    // 列表条数
    data_length: 1,
    // 渲染次数
    calls: 1,
    // 是否编码
    escape: true,
    // 是否缓存
    cache: false,
    // 填充字符串
    // full_str: "    abcdefghijklmnopqrstuvwxyz,./`1234567890~!@#$%^&*()-+",
    full_str: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    // 字符串重复数量
    str_repeat: 100,
    // 节点重复数量
    node_repeat: 1,
}

var Timer = function () {
    this.startTime = +new Date;
};

Timer.prototype.stop = function () {
    return +new Date - this.startTime;
};

var T = {
    init: function () {
        this.chart = this.initChar ();
        this.initEvent ();

    },
    run: function (type) {
        var time = new Timer ();
        var test = this.getTestFn (type, option)
        test ();
        var etime = time.stop ();
        console.log (type, "==耗时:", etime, " ");
        var colors = Highcharts.getOptions ().colors;
        this.chart.series[0].addPoint ({
            color: colors.shift (),
            y: etime
        });

    },
    initEvent: function () {
        var _this = this;
        document.getElementById ('button-start').onclick = function () {
            var elem = this;
            _this.run ("shtm");
            // runTest (function () {
            //     elem.style.display = 'none';
            //     document.getElementById ('button-restart').style.display = '';
            // });
        };
    },
    layout: function () {
        document.getElementById ('app').innerHTML = fn (option);
    },
    initChar: function () {

        var chart = new Highcharts.Chart ({
            chart: {
                animation: {
                    duration: 150
                },
                renderTo: 'container',
                height: 5 * 32,
                type: 'bar'
            },
            title: false,
            xAxis: {
                categories: ["sdfsdf","ssssssssdf","shtm"],
                labels: {}
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Time'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                        this.y + 'ms';
                }
            },

            credits: {
                enabled: false
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return this.y + 'ms';
                        }
                    }
                },
            },
            series: [{
                data: []
            }]
        });
        return chart;
    },
    getTestFn(type, option){
        var _this = this;
        return function () {
            var str = document.getElementById (type).innerHTML;
            var source = str;
            var data = _this.getData (option);
            for (var i = 0; i < option.node_repeat; i++) {
                source += str;
            }
            for (var i = 0; i < option.str_repeat; i++) {
                source += option.full_str;
            }
            var fn, html = type + "####:";
            if (option.cache !== false) {
                fn = _this.getFn (type, source);
            }
            for (var i = 0; i < option.calls; i++) {
                if (option.cache === false) {
                    fn = _this.getFn (type, source);
                }
                html = fn (data);
            }
            // console.log("最终输出",html)
            return html;
        }
    },

    getData: function (option) {
        var data = {
            list: []
        };
        for (var i = 0; i < option.data_length; i++) {
            data.list.push ({
                index: i,
                user: '<strong style="color:red">老王' + i + '</strong>',
            });
        }
        return data;
    },
    getFn: function (type, source) {
        var fn;
        switch (type) {
            case "shtm":
                fn = fn = shtm.compile (source)
                break;
            case "art-template":
                fn = template.compile (source);
                break;
            case "doT":
                fn = doT.template (source);
                break;
            case "ejs":
                fn = fn = ejs.compile (source)
                break;
            case "Jade":
                var pug = require ('pug');
                fn = pug.compile (source);
                break;
            case "swig":
                fn = swig.compile (source);
                break;

            default:
                fn = function () {
                };
                break;

        }
        return fn;
    },
    getsource: function () {

    }
}
T.init ();