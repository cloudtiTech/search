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
    };

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

/**
 * 构建左侧分类树
 */
function createNav(compare) {
    var userId = getQueryParam("userId");
    var usertoken = getQueryParam("usertoken");
    //从一体化获取当前用户分类
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
                    var _data = {
                        "category": eval(_d)
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
                } else {
                    notLogin("无法解析分类信息！请稍后再试。");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                notLogin("获取分类信息错误！请稍后再试。");
            }
        });
    } else {
        notLogin("未登陆用户！");
    }
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

/**
 * 校验登陆失败跳转
 */
function notLogin(str) {
    layer.msg(str, {icon: 5}, function () {
        window.top.location = "/index.aspx";
    });
}