var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;
var margin = {top: 10, right: 10, bottom: 10, left: 10};
//width =$("#zrz").width()- margin.right - margin.left,// (x - margin.right - margin.left),
//height = ($("#zrz").height())- margin.top - margin.bottom;//(y - margin.top - margin.bottom);
//画布大小
var width = 0.55 * x;
var height = 700;
//画布周边的空白
var padding = {left: 30, right: 30, top: 20, bottom: 20};
//定义一个数组
//var dataset 1= [10, 20, 30, 40, 33, 24, 12, 5];
// var years2=[2010,2011,2012,2013,2014,2015,2016,2017];
var dataset = [];
var years = [];
var zrz_data_analyze = '左图是责任机构';
var zrz_data = '具体的每年统计数据如下：';
//在 body 里添加一个 SVG 画布
var svg_zrz = d3.select("#zrz")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("padding", "100px");
function statisticZrz(url, classname) {
    d3.json(url, function (error, data) {
        //data
        //{"SAWSVo":{"groupName":"M_GDND","groupResults":{"2015":"21342","2016":"25345","2014":"65345"},"zrz":"广东省国土资源厅","trs_ID":"M_aex_fasf_45235fasf"}}
        var results = data.SAWSVo.groupResults;
        var zrz = data.SAWSVo.zrz;
        //添加到标题中
        $("#zrz_name").text(zrz);
        zrz_data_analyze += "（" + zrz + "）近几年来有记录的" + classname + "档案的分布情况：";
        //没有数据的情况
        if (results == null || results.length === 0) return;
        $.each(results, function (key, value) {
            dataset.push(parseInt(value));
            years.push(parseInt(key));
            zrz_data += "<br>" + key + "年：" + value + "宗";
            console.log("key:" + key + ";value:" + value);
        });
        analyzeData();
        //处理年份不连续的情况
        dealYears();
        //x轴的比例
        var xScale = d3.scale.ordinal()
            .domain(years)
            .rangeRoundBands([0, width - padding.left - padding.right]);

        //y轴的比例尺
        var yScale = d3.scale.linear()
            .domain([0, d3.max(dataset)])
            .range([height - padding.top - padding.bottom, 0]);

        //定义x轴
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom");

        //定义y轴
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");

        //矩形之间的空白
        var rectPadding = 4;

        //添加矩形元素
        var rects = svg_zrz.selectAll(".MyRect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("class", "MyRect")
            .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
            .attr("x", function (d, i) {
                return xScale(d3.min(years) + i) + rectPadding / 2;
            })
            .attr("width", xScale.rangeBand() - rectPadding)
            .attr("y", function (d) {
                var min = yScale.domain()[0];
                return yScale(min);
            })
            .attr("height", function (d) {
                return 0;
            })
            .transition()
            .delay(function (d, i) {
                return i * 200;
            })
            .duration(2000)
            .ease("bounce")
            .attr("y", function (d) {
                return yScale(d);
            })
            .attr("height", function (d) {
                return height - padding.top - padding.bottom - yScale(d);
            });

        //添加文字元素
        var texts = svg_zrz.selectAll(".MyText")
            .data(dataset)
            .enter()
            .append("text")
            .attr("class", "MyText")
            .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
            .attr("x", function (d, i) {
                return xScale(d3.min(years) + i) + rectPadding / 2;
            })
            .attr("dx", function () {
                return (xScale.rangeBand() - rectPadding) / 2;
            })
            .attr("dy", function (d) {
                return 20;
            })
            .text(function (d) {
                return d;
            })
            .attr("y", function (d) {
                var min = yScale.domain()[0];
                return yScale(min);
            })
            .transition()
            .delay(function (d, i) {
                return i * 200;
            })
            .duration(2000)
            .ease("bounce")
            .attr("y", function (d) {
                return yScale(d);
            });

        //添加x轴
        svg_zrz.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")")
            .call(xAxis)
            .append("text")
            .text("归档年度")
            .attr("transform", "translate(" + width + ",0)");

        //添加y轴
        svg_zrz.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
            .call(yAxis)
            .append("text")
            .text("数量(件)")
            .attr("transform", "rotate(-90)")
            .attr("dy", "1em")
            .attr("text-anchor", "end");
    });
}
function analyzeData() {
    //基本统计
    var sumData = d3.sum(dataset);
    var meanData = Math.ceil(d3.mean(dataset));
    //中位数
    var mediumData = d3.median(dataset);
    //标准差
    var deviationData = d3.deviation(dataset);
    //方差
    var varianceData = d3.variance(dataset);
    var minData = d3.min(dataset);
    var minDataOfYear = years[$.inArray(minData, dataset)];
    var maxData = d3.max(dataset);
    var maxDataOfYear = years[$.inArray(maxData, dataset)];
    zrz_data_analyze += "总计" + sumData + "宗，其中在" + minDataOfYear + "年档案量最少为" + minData + "宗，在" + maxDataOfYear + "年档案量最多，达到" + maxData + "宗，平均每年文档归档量为" + meanData + "宗（不包含没有数据量的年份）。";
    //趋势分析
    //计算一下比例3%
    var scalaData = meanData * 0.03;
    //计算前后差量
    var dataSubstract = [];
    $.each(dataset, function (i, d) {
        if (i != 0)dataSubstract[i - 1] = d - dataset[i - 1];
    });
    var add_all_flag = true;
    var sub_all_flag = true;
    $.each(dataSubstract, function (i, d) {
        //如果是每年都增加
        if (Math.abs(d) < scalaData || d > 0) {
            add_all_flag = add_all_flag && true;
        } else {
            add_all_flag = false;
        }
        //如果是每年都下降
        if (Math.abs(d) < scalaData || d < 0) {
            sub_all_flag = sub_all_flag && true;
        } else {
            sub_all_flag = false;
        }
    });
    //如果是V型
    //如果是每年都比较平均
    var ava_all_flag = (maxData - minData) < meanData * 0.1;

    //最后生成结论：
    if (add_all_flag) {
        zrz_data_analyze += "从左图可以看出，责任机构每年处理的档案量呈现递增的趋势。";
    }
    if (sub_all_flag) {
        zrz_data_analyze += "从左图可以看出，责任机构每年处理的档案量呈现递减的趋势。";
    }
    if (ava_all_flag) {
        zrz_data_analyze += "从左图可以看出，责任机构每年处理的档案量呈现平稳的趋势。";
    }
    //事实性的
    $("#zrz_data_analyze").append(zrz_data_analyze);
    $("#zrz_data").append(zrz_data);
}
function dealYears() {
    var minYears = d3.min(years);
    // if (minYears>2003)minYears=2003;
    var maxYears = d3.max(years);
    var dealedYears = [];
    var dealedData = [];
    for (var i = minYears; i < maxYears + 1; i++) {
        var index = $.inArray(i, years);
        dealedYears.push(i);
        if (index == -1) {
            dealedData.push(0);
        } else {
            dealedData.push(dataset[index]);
        }
    }
    years = dealedYears;
    dataset = dealedData;
}







