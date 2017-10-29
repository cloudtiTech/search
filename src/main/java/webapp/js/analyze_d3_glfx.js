var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    beishu = 1,
    y = w.innerHeight || e.clientHeight || g.clientHeight;
var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = $("#keyword").width(),// (x - margin.right - margin.left),
    height = ($("#keyword").height());//(y - margin.top - margin.bottom);

var root;
var names;
var rows;
var valuemap = new Object();

var diameter = Math.max(Math.min(height, width), 100),
    format = d3.format("$,.0f");

var galaxy = d3.layout.galaxy()
    .size([width, height])
    .spread(4)
    //.initialAngle(100) // radians from down
    .value(function (d) {
        return d.size;
    });
/**
 *
 * @param file
 * @param type 0：文书；1：土地
 */
function main(file, type) {
    //alert($("#keyword").width());
    // alert($("#keyword").height());
    //数据如下：
    //{"m_TM":"数据存放在sqlite数据库里",
    //"relvanceDoc":[
    //              {"m_TM":"数据sqlite里","keywords":["数据库","sqlite","bbb"],"sim":0.987,"TRS_ID":"xe_daf_fad_2345363473462"},
    //              {"m_TM":"数据Oracle里","keywords":["数据库","ORACLE","bbb","ccc"],"sim":0.907,"TRS_ID":"0_daf_fad_2345363473462"},
    //              {"m_TM":"数据MYSQL里","keywords":["数据库","MYSQL","bbb"],"sim":0.867,"TRS_ID":"1_daf_fad_2345363473462"},
    //              {"m_TM":"数据MSSQL里","keywords":["数据库","MSSQL"],"sim":0.787,"TRS_ID":"2_daf_fad_2345363473462"},
    //              {"m_TM":"数据ES里","keywords":["数据库","Elastic Search","sss"],"sim":0.687,"TRS_ID":"3_daf_fad_2345363473462"},
    //              {"m_TM":"数据Solr里","keywords":["数据库","Solr","bbb"],"sim":0.567,"TRS_ID":"4_daf_fad_2345363473462"}
    //              ]
    //}
    d3.json(file, function (error, data) {
        var main_tm = data.center_word;
        var docs = data.relevance;
        if (docs.length > 0) {
            svg.selectAll('*').remove();
            var all_str = "level1,level2,level3,weight,doc_id\n";

            docs.forEach(function (d) {
                // if (_i > 5)return;
                var doc_tm = d.m_TM;
                var doc_sim = d.weight * 10;
                var doc_keywords = d.keyWords;
                var doc_keywords_length = doc_keywords.length;
                var all_sum = sumall(doc_keywords_length);
                var doc_id = d.trs_ID;
                valuemap[doc_tm] = doc_id;
                doc_keywords.forEach(function (d, i) {
                    //构建rows
                    //oo12,oo12-a,,0.322161589
                    //计算值
                    var value = doc_sim * (i + 1) / all_sum;
                    all_str += doc_tm + ',' + d + ',,' + value + ',' + doc_id + '\n';
                })

            });
            console.log(all_str);
            function sumall(datai) {
                if (datai == 1)return 1;
                return datai + sumall(datai - 1);
            }

            rows = d3.csv.parseRows(all_str, function (d, i) {
                    if (i == 0) {
                        names = d;
                        return null;
                    }
                    else {
                        d[d.length - 1] = +d[d.length - 1];
                        return d;
                    }
                });

            rows.forEach(function (r, i, a) {
                var rnames = {};
                for (var j = 0; j < r.length - 1; j++) {
                    if (rnames[r[j].toLowerCase()]) {
                        r[j] = '';
                    }
                    rnames[r[j].toLowerCase()] = true;
                }
            });

            root = unflatten(rows, main_tm);

            var lines = d3.svg.line(); // unused !
            var nodes = galaxy.nodes(root);
            var links = galaxy.links(nodes);

            var link = svg.selectAll(".link")
                .data(links)
                .enter().append("line")
                .attr("class", "link")
                .attr("stroke-opacity", 0.01)
                .style("stroke-width", function (d) {
                    return Math.sqrt(d.value);
                })
                .call(truncated_line)
                .transition()
                .delay(function (d, i) {
                    return 500 + (i * 100);
                })
                .duration(1500)
                .ease("linear")
                .attr("stroke-opacity", 1);


            function truncated_line(l) {
                function len(d) {
                    return Math.sqrt(Math.pow((d.target.y - d.source.y), 2) +
                        Math.pow((d.target.x - d.source.x), 2));
                }

                l.attr('x1', function (d) {
                    return d.source.x +
                        (d.target.x - d.source.x) * (d.source.r * beishu) / len(d);
                });
                l.attr('y1', function (d) {
                    return d.source.y +
                        (d.target.y - d.source.y) * (d.source.r * beishu) / len(d);
                });
                l.attr('x2', function (d) {
                    return d.target.x +
                        (d.source.x - d.target.x) * (d.target.r * beishu) / len(d);
                });
                l.attr('y2', function (d) {
                    return d.target.y +
                        (d.source.y - d.target.y) * (d.target.r * beishu) / len(d);
                });
            }

            var node = svg.datum(root).selectAll(".node")
                .data(nodes)
                .enter().append("g")
                .attr("class", function (d) {
                    return d.children ? "node" : "leaf node";
                })
                .attr("transform", function (d) {
                    return "translate(" + d.x + "," + d.y + ")";
                })
                .on("click", function (d) {
                    if (!d.parent)return;
                    if (d.children) {
                        var trs_id = valuemap[d.name];
                        console.log("doc:" + d.name);
                        // svg.selectAll('*').remove();
                        //文档的情况
                        if (type == 0) {
                            main("front/sa/ws/rd.jhtml?doc_flag=1&TRS_ID=" + trs_id, type);
                        } else if (type == 1) {
                            main("front/sa/td/rd.jhtml?doc_flag=1&TRS_ID=" + trs_id, type);
                        }

                    } else {
                        console.log("keyword:" + d.name);
                        // svg.selectAll('*').remove();
                        //关键词的情况
                        if (type == 0) {
                            main("front/sa/ws/rk.jhtml?doc_flag=0&keyword=" + d.name, type);
                        } else if (type == 1) {
                            main("front/sa/ws/rk.jhtml?doc_flag=0&keyword=" + d.name, type);
                        }
                    }

                });
            node.append("title").text(function (d) {
                    return d.name;
                });
            node.append("circle").transition().delay(function (d, i) {
                    return i * 100;
                }).duration(1500).each("start", function () {
                    d3.select(this).attr("r", 0);
                }).attr("r", function (d) {
                    return d.r * beishu;
                });
            node.append("text").attr("dy", ".3em").style("text-anchor", "middle").style("font-size", function (d) {
                    return (5 - d.depth) * 5 + "px";
                }).text(function (d) {
                    return d.name.substring(0, d.r / 8);
                });
        }
    });
}
//main

var svg = d3.select("#keyword .chart")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    ;


function unflatten(rows, rootName) {
//    console.log("foo:", rows);
    var root = {name: rootName, children: [], childmap: {}, value: 1, depth: 0};
    var allnodes = [];
    for (var i = 0; i < rows.length; i++) { // rows
        var row = rows[i];
        for (var c = 0, parent = root; c < names.length - 2; c++) { //cols
            var node, label = row[c];
            if (!parent.childmap[label]) {
                node = {
                    name: label, children: [],
                    childmap: {}, parent: parent,
                    value: 0, depth: parent.depth + 1, doc_id: row[names.length - 1]
                };
                allnodes.push(node);
                if (!!label) {
                    parent.childmap[label] = node;
                    parent.children.push(node);
                }
            }
            if (c == names.length - 3) { // last column of names
                node.value = row[row.length - 2];
                // add value to all parents value;
                for (var p = parent; p; p = p.parent) {
                    p.value += node.value;
                }
            }
            if (!!label) {
                parent = parent.childmap[label];
            }
        }
    }
    // remove the children of leaf nodes
    allnodes.forEach(function (n, i, a) {
        if (n.children.length === 0) {
            n.size = n.value;
            delete n.children;
        }
    });
    return root;
};