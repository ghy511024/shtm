var runConf = [
    "shtm_c",
    "shtm",
    "art-template",
    "doT",
    "ejs",
    "Jade",
    "swig"
]

var T = {
    init: function () {
        this.chart = this.initChar ();
        this.initEvent ();
    },
    runlist: [],
    go_run: function (option) {
        var _this = this;
        var ctype = this.runlist.shift ();
        _this.run (ctype, option, function () {
            setTimeout (function () {
                if (_this.runlist.length > 0) {
                    _this.go_run (option);
                }
            }, 500)

        })
    }
    ,
    run: function (type, option, callback) {
        var stime = +new Date ();
        var test = this.getTestFn (type, option)
        test ();
        var etime = +new Date () - stime;

        console.log (type, "==耗时:", etime, " ");
        var colors = Highcharts.getOptions ().colors;
        this.chart.series[0].addPoint ({
            color: colors.shift (),
            y: etime
        });
        callback ();
    }
    ,
    initEvent: function () {
        var _this = this;
        document.getElementById ('button-start').onclick = function () {
            this.disabled = true;
            var elem = this;
            var m = 0;
            _this.runlist = Object.assign ([], runConf);

            var obj = _this.getObj ();
            var tmp_obj = Object.assign ({}, window.option, obj);
            var hash = Tool.objTourl (tmp_obj);
            window.location.hash = hash;
            _this.go_run (tmp_obj);

        };
        document.getElementById ('button-restart').onclick = function () {
            var obj = _this.getObj ();
            var tmp_obj = Object.assign ({}, window.option, obj);
            var hash = Tool.objTourl (tmp_obj);
            window.location.hash=hash;
            window.location.reload ();
        };
        document.getElementById ('button-reset').onclick = function () {
            window.location.hash = null;
            window.location.reload ();
        };
    }
    ,
    layout: function () {
        document.getElementById ('app').innerHTML = fn (option);
    }
    ,
    initChar: function () {
        var chart = new Highcharts.Chart ({
            chart: {
                animation: {
                    duration: 150
                },
                renderTo: 'container',
                height: runConf.length * 50,
                type: 'bar'
            },
            title: false,
            xAxis: {
                categories: runConf,
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
    }
    ,
    getObj: function () {
        var obj = {}
        obj["data_length"] = Number (document.getElementById ("data_length").value) || 1;
        obj["calls"] = Number (document.getElementById ("calls").value) || 1;
        obj["node_repeat"] = Number (document.getElementById ("node_repeat").value) || 1;
        obj["str_repeat"] = Number (document.getElementById ("str_repeat").value) || 1;
        obj["data_length"] = Number (document.getElementById ("data_length").value) || 1;
        obj["cache"] = document.getElementById ("cache").checked?true:false;
        return obj;
    },
    getTestFn (type, option)
    {
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
            // console.log(type,"=== 输出:\n",html)
            return html;
        }
    }
    ,

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
    }
    ,
    getFn: function (type, source) {
        var fn;
        switch (type) {
            case "shtm":
                fn = fn = shtm.compile (source)
                break;
            case "shtm_c":
                fn = fn = shtm_c.compile (source)
                // fn = fn = shtm.compile (source)
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
    }

}
T.init ();