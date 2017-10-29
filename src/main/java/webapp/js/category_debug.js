//一体化首页
var sysIndexPage = "http://172.16.3.184:8765/index.aspx";
//缓存分类结果的分类数据
window.aggregationsArr = [];

$(document).ready(function () {

    /*排序函数*/
    var compare = function (prop) {
        return function (obj1, obj2) {
            var val1 = obj1[prop];
            var val2 = obj2[prop];
            if (val1 < val2) {
                return -1;
            } else if (val1 > val2) {
                return 1;
            } else {
                return obj1["id"] - obj2["id"];
            }
        }
    }

    createNav(compare);

    //处理样式异常
    //让左边树能铺满屏幕高度
    var allHeight = document.documentElement.clientHeight || document.body.clientHeight;
    $(".left").css({
        minHeight: allHeight + "px",
        height: allHeight + "px"
    });
    //保证底部的菜单在超出当前屏幕高度时往上展开
    $("#main-menu").delegate("li", "mouseover", function () {
        var _this = $(this);
        var _ul = _this.find(">ul");
        var winHeight = $(window).height(),
            _ulHei = _ul.height(),
            _liTop = _this.offset().top - $(document).scrollTop();
        if (winHeight < (_liTop + _ulHei)) {
            _this.find(">ul").css("margin-top", "-" + (_ulHei - 41) + "px");
        }
    });
});

function createNav(compare) {
    //var userId = getQueryParam("userId");
    //var usertoken = getQueryParam("usertoken");
    // console.log("getQueryParam(\"userId\")=" + userId);
    // console.log("getQueryParam(\"usertoken\")=" + usertoken);
    var userId = 50;
    var usertoken = "8F331BA3D216625A";
    $("#userId").val(userId);
    $("#usertoken").val(usertoken);
//     var userId = 93;
//     var usertoken = "59E0CB8F5A6A5E13";

    // var userId = null;
    // var usertoken = null;
    //从一体化获取当前用户分类
    /*
    if (userId != null && usertoken != null) {
        $("#userId").val(userId);
        $("#usertoken").val(usertoken);
        $.ajax({
            url: "/searchweb/ashx/classtreehandler.ashx",
            async: false,
            data: {userId: userId, usertoken: usertoken},
            timeout: 10000,
            success: function (_d) {
                if (_d) {
                */
                    var _data = {
                        "category": tmpData
                    };

                    $("#main-menu").empty();
                    /*  拼接分类列表*/
                    var html = '';
                    /*对数据对象按pid进行排序*/
                    _data.category.sort(compare("pId"));
                    /*  遍历分类*/
                    for (var i = 0, len = _data.category.length; i < len; i++) {
                        //此处顺便初始化分类结果的分类数据
                        var _id = _data.category[i].id;
                        var _name = _data.category[i].name;
                        aggregationsArr[_id] = _name;

                        if (_data.category[i].pId == 0) {
                            /*拼接顶级分类*/
                            html += '<li class="current"><a href="#"    id=' + _data.category[i].id + ' ><span>' + _data.category[i].name + '</span></a>';
                            var id = _data.category[i].id;
                            var towlayer = 0;

                            for (var j = 0, len = _data.category.length; j < len; j++) {
                                /*判断是否有下一级并且除去自己本身*/
                                if (_data.category[j].pId == id && _data.category[j].id != id) {
                                    var towid = _data.category[j].id;
                                    //用于判断有下一级时增加ul只增加一次
                                    towlayer += 1;
                                    /*下一级需要添加ul，只添加一次*/
                                    if (towlayer == 1) {
                                        html += ' <ul >';
                                    }
                                    /*拼接二级分类*/
                                    html += '<li ><a href="#"  id=' + _data.category[j].id + ' ><span>' + _data.category[j].name + '</span></a>';

                                    var threelayer = 0;
                                    for (var k = 0, len = _data.category.length; k < len; k++) {
                                        if (_data.category[k].pId == towid && _data.category[k].id != towid) {
                                            var threeid = _data.category[k].id;
                                            threelayer += 1;
                                            /*拼接三级分类*/
                                            if (threelayer == 1) {
                                                html += '<ul>';
                                            }
                                            html += '<li><a href="#"   id=' + _data.category[k].id + '  ><span>' + _data.category[k].name + '</span></a>';
                                            var fourlayer = 0;
                                            for (var l = 0, len = _data.category.length; l < len; l++) {
                                                if (_data.category[l].pId == threeid && _data.category[l].id != threeid) {
                                                    var fourid = _data.category[l].id;
                                                    fourlayer += 1;
                                                    /*拼接四级分类*/
                                                    if (fourlayer == 1) {
                                                        html += '<ul >';
                                                    }
                                                    html += '<li><a href="#"   id=' + _data.category[l].id + ' ><span>' + _data.category[l].name + '</span></a>';
                                                    var fivelayer = 0;
                                                    for (var m = 0, len = _data.category.length; m < len; m++) {
                                                        if (_data.category[m].pId == fourid && _data.category[m].id != fourid) {
                                                            fivelayer += 1;
                                                            /*拼接五级级分类*/
                                                            if (fivelayer == 1) {
                                                                html += '<ul >';
                                                            }
                                                            html += '<li><a href="#"    id=' + _data.category[m].id + '  ><span>' + _data.category[m].name + '</span></a></li>';
                                                        }
                                                    }
                                                    /*五级ul*/
                                                    if (fivelayer > 0) {
                                                        html += '</ul>';
                                                    }
                                                    html += '</li>';
                                                }
                                            }
                                            /*四级ul*/
                                            if (fourlayer > 0) {
                                                html += '</ul>';
                                            }
                                            html += '</li>';
                                        }
                                    }
                                    /*三级ul*/
                                    if (threelayer > 0) {
                                        html += '</ul>';
                                    }
                                    html += '</li>';
                                }
                            }
                            /*二级ul*/
                            if (towlayer > 0) {
                                html += '</ul>';
                            }
                        }
                    }
                    html += '</li>';

                    var navHtml = $("#main-menu").html();
                    navHtml += html;
                    $("#main-menu").html(navHtml);
                    //初始化分类树容器
                    $('#main-menu').superfish({
                        //add options here if required
                        animation: {opacity: 'show', height: 'show'},	// slide-down effect without fade-in
                        animationOut: {opacity: 'hide'},
                        speed: "fast",
                        speedOut: "fast",
                        delay: 0			// 1.2 second delay on mouseout
                    });
}

/**
 * 根据参数名获取url中的参数值
 */
function getQueryParam(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null && r[2] != null && r[2] != "") {
        return decodeURI(r[2]);
    } else {
        return null;
    }
}


var tmpData = [{id: 1, open: true, pId: 0, name: '综合类'}, {id: 22, pId: 1, name: '群众来信来访文件材料'}, {id: 211, pId: 1, name: '综合文书（≥2003）'}, {
    id: 212,
    pId: 1,
    name: '馆内收发文'
}, {id: 152, pId: 212, name: '收文'}, {id: 153, pId: 212, name: '发文'}, {id: 228, pId: 1, name: '已移交省档案局文书'}, {id: 230, pId: 1, name: '前置文书'}, {
    id: 231,
    pId: 230,
    name: '五五普法文件'
}, {id: 232, pId: 230, name: '前置收发文'}, {id: 235, pId: 1, name: '综合文书（<2003年）'}, {id: 229, pId: 235, name: '综合文书（<2003年）'}, {
    id: 13,
    open: true,
    pId: 0,
    name: '地籍管理类'
}, {id: 14, pId: 13, name: '土地利用现状调查'}, {id: 23, pId: 14, name: '土地资源详查'}, {id: 46, pId: 14, name: '土地利用变更调查'}, {
    id: 225,
    pId: 46,
    name: '变更报告'
}, {
    id: 226,
    pId: 46,
    name: '变更图（1-1万）'
}, {id: 227, pId: 46, name: '变更图（1-2000）'}, {id: 57, open: true, pId: 0, name: '矿产开发管理类'}, {id: 58, pId: 57, name: '采矿权管理'}, {
    id: 59,
    pId: 58,
    name: '采矿权评估结果备案'
}, {id: 60, pId: 58, name: '矿产开发利用方案备案'}, {id: 224, pId: 57, name: '矿管（2000前）'}, {id: 61, open: true, pId: 0, name: '地质勘查管理类'}, {
    id: 62,
    pId: 61,
    name: '探矿权管理'
}, {id: 63, pId: 62, name: '矿产资源实施方案评审档案'}, {id: 64, pId: 61, name: '地质调查勘查计划管理'}, {id: 65, pId: 64, name: '海外风险探矿项目档案'}, {
    id: 66,
    pId: 64,
    name: '广东省地勘基金管理档案'
}, {id: 67, pId: 61, name: '其他材料'}, {id: 221, pId: 61, name: '地勘（2000前）'}, {id: 243, pId: 61, name: '以往地质工作程度核查'}, {
    id: 68,
    open: true,
    pId: 0,
    name: '地质环境管理类'
}, {id: 69, pId: 68, name: '地质灾害防治'}, {id: 70, pId: 69, name: '地质灾害防治专项评审'}, {id: 71, pId: 69, name: '地质灾害危险性评估结果备案'}, {
    id: 72,
    pId: 69,
    name: '地质灾害防治资质管理'
}, {id: 247, pId: 69, name: '地灾专项资金'}, {id: 73, pId: 68, name: '矿泉水管理'}, {id: 74, pId: 73, name: '地热与天然饮用矿泉水管理'}, {
    id: 75,
    pId: 68,
    name: '地质遗迹保护'
}, {id: 76, pId: 75, name: '地质遗迹保护'}, {id: 77, pId: 68, name: '矿山地质环境'}, {id: 78, pId: 77, name: '矿山地质环境影响评价'}, {
    id: 79,
    pId: 77,
    name: '矿山地质环境保护'
}, {id: 220, pId: 68, name: '地环（2000前）'}, {id: 80, open: true, pId: 0, name: '土地规划与耕地保护类'}, {id: 81, pId: 80, name: '土地利用规划'}, {
    id: 82,
    pId: 81,
    name: '市县镇规划'
}, {id: 84, pId: 81, name: '规划调整'}, {id: 85, pId: 81, name: '专项规划'}, {id: 86, pId: 81, name: '规划图件'}, {id: 238, pId: 86, name: '规划图件_调整前'}, {
    id: 239,
    pId: 86,
    name: '规划图件_调整后'
}, {id: 240, pId: 81, name: '土地利用规划（新）'}, {id: 241, pId: 81, name: '土地利用总体规划'}, {id: 87, pId: 80, name: '基本农田保护规划'}, {
    id: 88,
    pId: 87,
    name: '基本农田'
}, {id: 89, pId: 80, name: '土地开发整理'}, {id: 90, pId: 89, name: '土地整治及相关专项规划审核'}, {id: 91, pId: 89, name: '土地开发整理复垦项目立项审批'}, {
    id: 92,
    pId: 89,
    name: '补充耕地验收确认'
}, {id: 93, pId: 89, name: '易补项目'}, {id: 94, pId: 80, name: '用地预审'}, {id: 95, pId: 94, name: '省管权限建设项目用地预审核准'}, {
    id: 233,
    pId: 80,
    name: '土地开发整理（新）'
}, {id: 96, open: true, pId: 0, name: '土地利用（建设用地）类'}, {id: 97, pId: 96, name: '建设用地审批材料'}, {id: 98, pId: 97, name: '建设用地审批（一书四方案）'}, {
    id: 99,
    pId: 97,
    name: '三旧改造用地审批'
}, {id: 100, pId: 96, name: '土地使用权有偿出让材料'}, {id: 101, pId: 100, name: '征地补偿裁决审核'}, {id: 242, pId: 96, name: '土地利用档案'}, {
    id: 102,
    open: true,
    pId: 0,
    name: '地产市场类'
}, {id: 103, pId: 102, name: '企业改革土地资产处置管理'}, {id: 104, pId: 103, name: '省属资产经营公司和授权经营企业集团改革土地处置方案审批'}, {
    id: 105,
    pId: 102,
    name: '土地分等定级、估价'
}, {
    id: 106,
    pId: 105,
    name: '农用地分等定级'
}, {id: 107, open: true, pId: 0, name: '测绘管理类'}, {id: 108, pId: 107, name: '测绘行政管理'}, {id: 109, pId: 108, name: '乙丙级测绘资质证核准'}, {
    id: 110,
    pId: 108,
    name: '国家秘密基础测绘成果利用审批'
}, {id: 111, pId: 108, name: '地图审核'}, {id: 112, pId: 108, name: '测量标志拆迁审批'}, {id: 113, pId: 108, name: '测绘技术设计书'}, {
    id: 114,
    pId: 108,
    name: '用于测绘的航空摄影'
}, {id: 115, pId: 107, name: '测绘生成管理'}, {id: 236, pId: 115, name: '测绘项目管理系统'}, {id: 237, pId: 115, name: '三旧改造'}, {
    id: 154,
    pId: 107,
    name: '测绘档案'
}, {id: 155, pId: 154, name: '大地成果'}, {id: 158, pId: 155, name: '56水准点'}, {id: 170, pId: 158, name: '56高程Ⅱ等水准点'}, {
    id: 171,
    pId: 158,
    name: '56高程Ⅲ等水准点'
}, {id: 172, pId: 158, name: '56高程Ⅳ等水准点'}, {id: 159, pId: 155, name: '85水准点'}, {id: 173, pId: 159, name: '85高程Ⅰ等水准点'}, {
    id: 174,
    pId: 159,
    name: '85高程Ⅱ等水准点'
}, {id: 175, pId: 159, name: '85高程Ⅲ等水准点'}, {id: 160, pId: 155, name: 'GPS点'}, {id: 176, pId: 160, name: 'A级GPS点'}, {
    id: 177,
    pId: 160,
    name: 'B级GPS点'
}, {id: 178, pId: 160, name: 'C级GPS点'}, {id: 179, pId: 160, name: 'D级GPS点'}, {id: 180, pId: 160, name: 'E级GPS点'}, {
    id: 161,
    pId: 155,
    name: '三角点'
}, {id: 181, pId: 161, name: 'CGCS2000Ⅰ等三角点'}, {id: 182, pId: 161, name: 'CGCS2000Ⅱ等三角点'}, {id: 207, pId: 161, name: 'Ⅰ等三角点'}, {
    id: 208,
    pId: 161,
    name: 'Ⅱ等三角点'
}, {id: 209, pId: 161, name: 'Ⅲ等三角点'}, {id: 210, pId: 161, name: 'Ⅳ等三角点'}, {id: 162, pId: 155, name: '军控点'}, {
    id: 183,
    pId: 162,
    name: 'Ⅰ等军控点'
}, {
    id: 184,
    pId: 162,
    name: 'Ⅱ等军控点'
}, {id: 163, pId: 155, name: '改正量'}, {id: 185, pId: 163, name: '54系向80系转换'}, {id: 186, pId: 163, name: '80系向2000系转换'}, {
    id: 156,
    pId: 154,
    name: '基础地理信息数据'
}, {id: 164, pId: 156, name: 'DLG'}, {id: 187, pId: 164, name: '1:100万DLG'}, {id: 188, pId: 164, name: '1:25万DLG'}, {
    id: 189,
    pId: 164,
    name: '1:5万DLG'
}, {id: 190, pId: 164, name: '1:1万DLG'}, {id: 165, pId: 156, name: 'DEM'}, {id: 191, pId: 165, name: '1:100万DEM'}, {
    id: 192,
    pId: 165,
    name: '1:25万DEM'
}, {id: 193, pId: 165, name: '1:5万DEM'}, {id: 194, pId: 165, name: '1:1万DEM'}, {id: 166, pId: 156, name: 'DOM'}, {
    id: 195,
    pId: 166,
    name: '1:5万DOM'
}, {id: 196, pId: 166, name: '1:1万DOM'}, {id: 167, pId: 156, name: 'DRG'}, {id: 197, pId: 167, name: '1:5万DRG'}, {
    id: 198,
    pId: 167,
    name: '1:1万DRG'
}, {id: 157, pId: 154, name: '纸质印刷图'}, {id: 168, pId: 157, name: '地形图'}, {id: 199, pId: 168, name: '1:100万地形图'}, {
    id: 200,
    pId: 168,
    name: '1:50万地形图'
}, {id: 201, pId: 168, name: '1:20万地形图'}, {id: 202, pId: 168, name: '1:10万地形图'}, {id: 203, pId: 168, name: '1:5万地形图'}, {
    id: 204,
    pId: 168,
    name: '1:1万地形图'
}, {id: 169, pId: 157, name: '影像图'}, {id: 205, pId: 169, name: '1:5万影像图'}, {id: 206, pId: 169, name: '1:1万影像图'}, {
    id: 116,
    open: true,
    pId: 0,
    name: '会计类'
}, {id: 117, pId: 116, name: '会计报表'}, {id: 118, pId: 116, name: '会计账簿'}, {id: 119, pId: 116, name: '会计凭证'}, {id: 120, pId: 116, name: '其他'}, {
    id: 126,
    open: true,
    pId: 0,
    name: '国土资源执法监察类'
}, {id: 133, pId: 126, name: '监察档案'}, {id: 134, pId: 126, name: '土地违法案件'}, {id: 135, pId: 126, name: '矿产资源违法案件'}, {
    id: 136,
    pId: 126,
    name: '执法检查专题'
}, {id: 137, pId: 126, name: '卫星图片'}, {id: 127, open: true, pId: 0, name: '特殊载体类'}, {id: 128, pId: 127, name: '照片'}, {
    id: 129,
    pId: 127,
    name: '录像'
}, {id: 130, pId: 127, name: '录音'}, {id: 131, pId: 127, name: '计算机磁盘、光盘'}, {id: 217, pId: 131, name: '计算机磁盘、光盘'}, {
    id: 218,
    pId: 131,
    name: '地环光盘'
}, {id: 219, pId: 131, name: '国土光盘'}, {id: 132, pId: 127, name: '其他'}, {id: 138, open: true, pId: 0, name: '不动产登记'}, {
    id: 139,
    pId: 138,
    name: '土地登记'
}, {id: 140, pId: 138, name: '房屋登记'}, {id: 141, pId: 138, name: '林地登记'}, {id: 142, pId: 138, name: '海域登记'}, {
    id: 143,
    pId: 138,
    name: '不动产审批'
}, {
    id: 144,
    pId: 138,
    name: '不动产交易'
}, {id: 145, pId: 138, name: '其他'}, {id: 146, open: true, pId: 0, name: '基建设备类'}, {id: 147, pId: 146, name: '基建类'}, {
    id: 148,
    pId: 146,
    name: '设备类'
}, {id: 149, open: true, pId: 0, name: '科研类'}, {id: 150, pId: 149, name: '科研项目材料'}, {id: 151, pId: 149, name: '其他'}, {
    id: 213,
    open: true,
    pId: 0,
    name: '土壤资料'
}, {id: 214, pId: 213, name: '土壤报告'}, {id: 215, pId: 213, name: '土壤图件'}, {id: 244, open: true, pId: 0, name: '矿业权管理'}, {
    id: 15,
    pId: 244,
    name: '探矿权管理类'
}, {id: 16, pId: 15, name: '探-新'}, {id: 24, pId: 16, name: '探矿权新立登记审批'}, {id: 17, pId: 15, name: '探-变'}, {id: 25, pId: 17, name: '探矿权变更登记审批'}, {
    id: 18,
    pId: 15,
    name: '探-延'
}, {id: 26, pId: 18, name: '探矿权延续登记审批'}, {id: 19, pId: 15, name: '探-销'}, {id: 28, pId: 19, name: '探矿权注销登记审批'}, {id: 20, pId: 15, name: '探-留'}, {
    id: 27,
    pId: 20,
    name: '探矿权保留登记审批'
}, {id: 29, pId: 244, name: '矿产资源储量管理类'}, {id: 30, pId: 29, name: '储-评'}, {id: 31, pId: 30, name: '矿产资源储量评审备案'}, {
    id: 32,
    pId: 29,
    name: '储-登'
}, {
    id: 33,
    pId: 32,
    name: '矿产资源储量登记'
}, {id: 42, pId: 244, name: '采矿权管理类'}, {id: 43, pId: 42, name: '采-新'}, {id: 44, pId: 43, name: '划定矿区范围审批'}, {
    id: 45,
    pId: 43,
    name: '采矿权新立登记审批'
}, {
    id: 47,
    pId: 42,
    name: '采-变'
}, {id: 48, pId: 47, name: '采矿权变更登记审批'}, {id: 49, pId: 42, name: '采-延'}, {id: 50, pId: 49, name: '采矿权延续登记审批'}, {id: 51, pId: 42, name: '采-销'}, {
    id: 52,
    pId: 51,
    name: '采矿权注销登记审批'
}, {id: 53, pId: 42, name: '采-转'}, {id: 54, pId: 53, name: '采矿权转让审批'}, {id: 55, pId: 42, name: '采-租'}, {id: 56, pId: 55, name: '采矿权出租备案'}, {
    id: 248,
    open: true,
    pId: 0,
    name: '矿产资源储量管理'
}, {id: 34, pId: 248, name: '矿产资源储量套改'}, {id: 35, pId: 34, name: '矿产资源规划审批'}, {id: 36, pId: 248, name: '建设项目压覆矿产资源管理'}, {
    id: 37,
    pId: 36,
    name: '建设项目压覆矿产分析档案'
}, {id: 38, pId: 248, name: '地质资料汇交管理'}, {id: 39, pId: 38, name: '原始地质资料'}, {id: 40, pId: 38, name: '成果地质资料'}, {
    id: 41,
    pId: 38,
    name: '实物地质资料'
}, {
    id: 222,
    pId: 248,
    name: '矿储（2000前）'
}];