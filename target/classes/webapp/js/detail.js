/**
 * Created by trs on 2016/9/8.
 */

//<!--
var pageNumber = 1;
//缓存结果列表中每条数据的ajjguId集
var ajjguIds = "";
//缓存结果分类
var aggregationsArrToUse = [];
//结果分类分页大小
var aggregationSize = 6;
//ajax超时时间
var timeout = 15000;
//用于跨域的消息传递对象
var messenger = new Messenger('trssearch', 'yth');
messenger.addTarget(window.parent, "parent");
//监听父页面消息
messenger.listen(function (msg) {
    // console.log("------------------iframe回调！------------------");
    // console.log("信息：" + msg);
});

/** ************************* 初始化 ********************************/
$(document).ready(function () {
    //调整检索框宽度
    function setInputWidth() {
        var divWidth = $(".form-box").width();
        var btnWidth = $(".btn").width();
        $(".sr").width(divWidth - btnWidth - 150 + "px");
    }

    setInputWidth();
    $(window).resize(function () {
        setInputWidth()
    });

    $("#keyword").focus(function () {
        var _this = $(this);
        if (_this.val() == "请输入关键词") {
            _this.val("");
        }
    });
    $("#keyword").blur(function () {
        var _this = $(this);
        if (_this.val() == "") {
            _this.val("请输入关键词").css({color: "#aaa"});
        }
    });
    $("#keyword").css("color", "#aaa");
    $("#keyword").keyup(function () {
        var _this = $(this);
        if (_this.val() == "请输入关键词") {
            _this.val("");
            $("#keyword").css("color", "#333");
        }
    });

    /**
     * 根据参数名获取url中的参数值
     */
    function getQueryParam(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        } else {
            return null;
        }
    }

    //如果是从首页跳转过来
    var preKeyword = getQueryParam("keyword");
    var preClassId = getQueryParam("classId");
    preClassId = $.trim(preClassId);
    var unit = getQueryParam("unit");
    var flag = getQueryParam("flag");
    if (null != preKeyword && null != preClassId) {
        $("#rela").hide();
        var preClassIdArr = preClassId.split(/_|%2C/);
        preKeyword = preKeyword.replace(/\+/g, " ");
        $("#keyword").val(preKeyword);
        $("#classId").val(preClassIdArr);
        $("#tmpClassId").val(preClassIdArr);
        if (0 == flag) {
            //选中中间大分类
            $(".top-a .cur").removeClass("cur");
            if (preClassId != "") {
                $("#" + preClassId).addClass("cur");
            } else {
                //“全部”分类
                $(".top-a").find("a").first().addClass("cur");
            }
        } else {
            //选中左侧分类
            //中间大分类取消选中
            $(".top-a .cur").removeClass("cur");
            var $_unit = $("#" + unit);
            //增加选中字体高亮
            //li下的span
            $_unit.find("span").first().addClass("selectedfontcolor");
            //父级元素span高亮
            $_unit.parentsUntil($("#main-menu"), "li").each(function () {
                $(this).find("span").first().addClass("selectedfontcolor");
            });
        }
        if (getQueryParam("show") == 1) {
            $(".search-a").find("a").toggleClass("cur");
            $(".search-box").toggle();
        } else {
            doSearch();
        }
    }

    //展开高级搜索
    $(".search-a").click(function () {
        $(this).find("a").toggleClass("cur");
        $(".search-box").slideToggle("fast");
    })

    //智能下拉提示
    var cacheKeyword = {};
    $('#keyword').autoComplete({
        minChars: 1,
        delay: 300,
        source: function (term, suggest) {
            var _keyword = $.trim(term);
            if (!_keyword || _keyword.length == 0) {
                return;
            }
            var _keywordSplit = _keyword.split(" ");
            if (_keywordSplit.length > 1) {
                _keyword = _keywordSplit[_keywordSplit.length - 1];
            }
            if (_keyword in cacheKeyword) {
                suggest(cacheKeyword[_keyword]);
                return;
            }
            $.ajax({
                url: "front/suggest/term.jhtml",
                data: {
                    "keyword": _keyword,
                    "size": 15
                },
                timeout: timeout,
                success: function (_data) {
                    cacheKeyword[_keyword] = _data;
                    //拼装下拉提示词
                    suggest(_data);
                }
            });
        },
        onSelect: function (e) {
            if (e.type === 'keydown' || e.type === 'mousedown') {
                search();
            }
        }
    });

    //动态绑定分类点击事件
    $(".list01").delegate("a", "click", function () {
        var classId = $(this).attr("data-value");
        $("#classId").val(classId);
        search();
    });

    //全部分类结果点击事件
    $(".r-box h3").on("click", function () {
        $("#classId").val($("#tmpClassId").val());
        // advancedSearch();
        search();
    });

    //改变分类事件
    $("#main-menu").delegate("li", "click", function (e) {
        //阻止冒泡
        e.stopPropagation();
        var unit = $(this).parents("#main-menu>li");
        //先删除再增加
        $(".selectedfontcolor").each(function () {
            $(this).removeClass("selectedfontcolor");
        });
        $("#main-menu .active").removeClass("active");

        //增加选中字体高亮
        var $_this = $(this);
        //li下的span
        $_this.find("span").first().addClass("selectedfontcolor");
        //父级元素span高亮
        $_this.parentsUntil($("#main-menu"), "li").each(function (i) {
            $(this).find("span").first().addClass("selectedfontcolor");
        });

        $(unit).addClass("active");
        //点击顶级分类时
        if (!$(this).parents("#nav-menu>li").html()) {
            $(this).addClass("active");
        }
        var _classIdArr = [];
        $(this).find("a").each(function (i, v) {
            _classIdArr.push($(v).attr("id"));
        });
        if (_classIdArr.length > 0) {
            $("#classId").val(_classIdArr);
            $("#tmpClassId").val(_classIdArr);
            //取消中间大分类选中
            $(".top-a .cur").removeClass("cur");
            advancedSearch();
            pageNumber = 1;
            search();
        }
    });

    //选择中间大分类
    $(".top-a a").on("click", function () {
        var _this = $(this);
        $(".top-a .cur").removeClass("cur");
        _this.addClass("cur");
        //左侧分类取消选中
        //先删除子分类样式
        $(".selectedfontcolor").each(function () {
            $(this).removeClass("selectedfontcolor");
        });
        $("#nav-menu .active").removeClass("active");
        $(".selectedfontcolor").each(function () {
            $(this).removeClass("selectedfontcolor");
        });
        var classIds = _this.attr("id");
        var classIdsArr = classIds != undefined ? classIds.split("_") : "";
        $("#classId").val(classIdsArr);
        $("#tmpClassId").val(classIdsArr);
        advancedSearch();
        pageNumber = 1;
        search();
    });

    //查阅
    $(".l-box").delegate(".a1", "click", function () {
        var _this = $(this);
        var params = _this.attr("data-value");
        //1：申请；3：取消申请
        var paramFuncNameValue = _this.hasClass("a1Hover") ? 3 : 1;
        params += ("&funcName=" + paramFuncNameValue + "&userId=" + $("#userId").val() + "&usertoken=" + $("#usertoken").val());
        var loadChayue = layer.load(0, {time: 15 * 1000});
        $.ajax({
            url: "/searchweb/ashx/TRSLuceneHandler.ashx",
            data: params,
            timeout: timeout,
            success: function (_data) {
                layer.close(loadChayue);
                var result = eval("(" + _data + ")");
                var resultdata = [];
                var chayue = {chayue: []};
                chayue.chayue.push(JSON.stringify(result));
                resultdata.push(chayue);
                resultdata.push({jieyue: null});
                resultdata.push({fuzhi: null});
                resultdata.push({dingwei: null});
                resultdata = JSON.stringify(resultdata);
                //通知父级iframe
                messenger.targets["parent"].send(resultdata);

                if (paramFuncNameValue == 1 && result.flag == "1") {
                    _this.addClass("a1Hover");
                    layer.msg(result.info, {time: 3000, icon: 6});
                } else if (paramFuncNameValue == 3 && result.flag == "1") {
                    _this.removeClass("a1Hover");
                    layer.msg(result.info, {time: 3000, icon: 6});
                } else {
                    layer.msg(result.info, {time: 3000, icon: 5});
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                layer.close(loadChayue);
                layer.msg("查阅失败！", {icon: 5});
            }
        });
    });

    //复制
    $(".l-box").delegate(".a7", "click", function () {
        var _this = $(this);
        var params = _this.attr("data-value");
        //2：申请；4：取消申请
        var paramFuncNameValue = _this.hasClass("a7Hover") ? 4 : 2;
        params += ("&funcName=" + paramFuncNameValue + "&userId=" + $("#userId").val() + "&usertoken=" + $("#usertoken").val());
        var loadFuzhi = layer.load(0, {time: 15 * 1000});
        $.ajax({
            url: "/searchweb/ashx/TRSLuceneHandler.ashx",
            data: params,
            timeout: timeout,
            success: function (_data) {
                layer.close(loadFuzhi);
                var result = eval("(" + _data + ")");
                var resultdata = [];
                resultdata.push({chayue: null});
                //！！！注：复制与借阅的传参是对调的
                var jieyue = {jieyue: []};
                jieyue.jieyue.push(JSON.stringify(result));
                resultdata.push(jieyue);
                resultdata.push({fuzhi: null});
                resultdata.push({dingwei: null});
                resultdata = JSON.stringify(resultdata);
                //通知父级iframe
                messenger.targets["parent"].send(resultdata);
                if (paramFuncNameValue == 2 && result.flag == "1") {
                    _this.addClass("a7Hover");
                    layer.msg(result.info, {time: 3000, icon: 6});
                } else if (paramFuncNameValue == 4 && result.flag == "1") {
                    _this.removeClass("a7Hover");
                    layer.msg(result.info, {time: 3000, icon: 6});
                } else {
                    layer.msg(result.info, {time: 3000, icon: 5});
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                layer.close(loadFuzhi);
                layer.msg("复制失败！", {icon: 5});
            }
        });
    });

    //借阅
    $(".l-box").delegate(".a2", "click", function () {
        var _this = $(this);
        var params = _this.attr("data-value");
        //6：申请；7：取消申请
        var paramFuncNameValue = _this.hasClass("a2Hover") ? 7 : 6;
        params += ("&funcName=" + paramFuncNameValue + "&userId=" + $("#userId").val() + "&usertoken=" + $("#usertoken").val());
        var loadJieyue = layer.load(0, {time: 15 * 1000});
        $.ajax({
            url: "/searchweb/ashx/TRSLuceneHandler.ashx",
            data: params,
            timeout: timeout,
            success: function (_data) {
                layer.close(loadJieyue);
                var result = eval("(" + _data + ")");
                var resultdata = [];
                resultdata.push({chayue: null});
                resultdata.push({jieyue: null});
                //！！！注：借阅与复制的传参是对调的
                var fuzhi = {fuzhi: []};
                fuzhi.fuzhi.push(JSON.stringify(result));
                resultdata.push(fuzhi);
                resultdata.push({dingwei: null});
                resultdata = JSON.stringify(resultdata);
                //通知父级iframe
                messenger.targets["parent"].send(resultdata);
                if (paramFuncNameValue == 6 && result.flag == "1") {
                    _this.addClass("a2Hover");
                    layer.msg(result.info, {time: 3000, icon: 6});
                } else if (paramFuncNameValue == 7 && result.flag == "1") {
                    _this.removeClass("a2Hover");
                    layer.msg(result.info, {time: 3000, icon: 6});
                } else {
                    layer.msg(result.info, {time: 3000, icon: 5});
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                layer.close(loadJieyue);
                layer.msg("借阅失败！", {icon: 5});
            }
        });
    });

    //收藏
    $(".l-box").delegate(".a3", "click", function () {
        var _this = $(this);
        var params = _this.attr("data-value");
        params += ("&option=collect&tbname=ext_day_wxtp_ajj&t=" + $.now() + "&userId=" + $("#userId").val() + "&usertoken=" + $("#usertoken").val());
        var loadShoucang = layer.load(0, {time: 15 * 1000});
        $.ajax({
            url: "/searchweb/ashx/handlerusers.ashx",
            data: params,
            timeout: timeout,
            success: function (_data) {
                layer.close(loadShoucang);
                if (_data == "true") {
                    _this.addClass("a3Hover");
                    layer.msg("收藏成功", {time: 800, icon: 6});
                } else if (_data == "false") {
                    _this.removeClass("a3Hover");
                    layer.msg("取消收藏", {time: 800, icon: 6});
                } else {
                    layer.msg("收藏失败！", {icon: 5});
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                layer.close(loadShoucang);
                layer.msg("收藏失败！", {icon: 5});
            }
        });
    });

    //定位点击事件
    $(".l-box").delegate('.a4', "click", function () {
        var ajguid = $(this).attr("data-value");
        if (ajguid) {
            var resultdata = [];
            resultdata.push({chayue: null});
            resultdata.push({jieyue: null});
            resultdata.push({fuzhi: null});
            //地质,土地
            var dingwei = {dingwei: ajguid};
            resultdata.push(dingwei);
            resultdata = JSON.stringify(resultdata);
            //通知父级iframe
            messenger.targets["parent"].send(resultdata);
        }
        return false;
    });

    //详细信息点击事件
    $(".l-box").delegate(".a6", "click", function () {
        //不能写死
        var param = "/SearchWeb/Pages/allDetails.aspx?" + $(this).attr("data-value");
        param += "&userId=" + $("#userId").val() + "&usertoken=" + $("#usertoken").val();
        layer.open({
            type: 2,
            title: '详细信息',
            fix: false,
            shadeClose: false,
            maxmin: false,
            area: ['800px', '560px'],
            offset: "t",
            scrollbar: false,
            shift: 0,
            offset: "auto",
            content: [param]
        });
    });

    //点击题名，改变颜色
    $(".l-box").delegate('.m-box h2 a', "click", function () {
        if ($(this).attr("target") != undefined) {
            $(this).css("color", "#0066cc");
        }
    });

    loadHotWords();
    advancedSearch();

});
/** ************************* 初始化结束********************************/

/**
 * 去除font高亮标签
 */
function htmlClean(str) {
    return str.replace(/<\/?font[^>]*>/gi, "");
}

/**
 * 格式化td里面d文字，保证不同字数的各个td对齐
 */
function tdFormate(str) {
    if (str.length == 2) {
        var str0 = str.charAt(0);
        var str1 = str.charAt(1);
        str = str0 + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + str1;
    } else if (str.length == 3) {
        var str0 = str.charAt(0);
        var str1 = str.charAt(1);
        var str2 = str.charAt(2);
        str = str0 + "&nbsp;&nbsp;" + str1 + "&nbsp;&nbsp;" + str2;
    }
    return str;
}

/**
 * 排序功能
 */
function sortByThis(obj) {
    var $this = $(obj);
    var sortField = $this.attr('data-value');
    var sorticon = $this.attr("class");
    if (sorticon == 'down') {
        //提交后台排序
        $("#orderBy").val('+' + sortField);
        search();
    } else {
        //提交后台排序
        $("#orderBy").val('-' + sortField);
        search();
    }
    $this.toggleClass("down");
}

/**
 * 高级检索枚举类型选择
 */
function clickAdvancedEnum() {
    $("#ss-table a").on("click", function () {
        $(this).toggleClass("cur");
        search();
    });
}

/**
 * 高级文本搜索回车事件
 */
function keydownEnter() {
    $("#ss-table input").on("keydown", function (e) {
        if (e.key == "Enter") {
            search();
        }
    });
}

/**
 * 高级搜索点击事件
 */
function clickAdvanced() {
    $("#ss-table .btn").on("click", function () {
        search();
    });
}

/**
 * 获取高级检索条件
 */
function advancedSearch() {
    $("#ss-table").empty();
    $.ajax({
        url: "front/advance_fields/text_enum.jhtml",
        data: {
            "classIds": $("#classId").val()
        },
        timeout: timeout,
        success: function (_d) {
            var _enumAdvanceFields = _d.enumAdvanceFields;
            var _textAdvanceFields = _d.textAdvanceFields;
            //拼装枚举字段
            //！！！类型为案卷或案件暂时写死
            // var $_tr_type = $("<tr></tr>");
            // var $_td_type = $("<td class='td-tit'>类型：</td>");
            // var $_td2_type = $("<td colspan='3' id='e_AJ_FLAG'></td>");
            // var $_a1_type = $("<a data-value='0'>案卷</a>");
            // var $_a2_type = $("<a data-value='1'>案件</a>");
            // $_td2_type.append($_a1_type);
            // $_td2_type.append($_a2_type);
            // $_tr_type.append($_td_type);
            // $_tr_type.append($_td2_type);
            // $("#ss-table").append($_tr_type);
            for (var i = 0; i < _enumAdvanceFields.length; i++) {
                var fieldValue = _enumAdvanceFields[i]['fieldValue'];
                var $_tr = $("<tr></tr>");
                var $_td = $("<td class='td-tit'>" + _enumAdvanceFields[i]['filedName'] + "：</td>");
                var $_td2 = $("<td colspan='3' id='e_" + _enumAdvanceFields[i]['field'] + "'></td>");
                for (var j = 0; j < fieldValue.length; j++) {
                    var $_a = $("<a data-value='" + fieldValue[j] + "'>" + fieldValue[j] + "</a>");
                    $_td2.append($_a);
                }
                $_tr.append($_td);
                $_tr.append($_td2);
                $("#ss-table").append($_tr);
            }
            //拼装文本字段
            for (var k = 0; k < _textAdvanceFields.length; k += 2) {
                //每行2个字段
                //如果是题名则独占一行
                var fieldName = _textAdvanceFields[k]['filedName'];
                fieldName = tdFormate(fieldName);
                if (_textAdvanceFields[k]['field'] == "M_TM") {
                    var $_t_tr_TM = $("<tr></tr>");
                    var $_t_td_TM = $("<td class='td-tit'>" + fieldName + "：</td>");
                    var $_t_td2_TM = $("<td colspan='3'></td>");
                    var $_input_TM = $("<input type='text' class='sr02' value='' id='t_" + _textAdvanceFields[k]['field'] + "'/>");
                    $_t_td2_TM.append($_input_TM);
                    $_t_tr_TM.append($_t_td_TM).append($_t_td2_TM);
                    $("#ss-table").append($_t_tr_TM);
                    k = k - 1;
                } else {
                    var $_t_tr = $("<tr></tr>");
                    var $_t_td = $("<td class='td-tit'>" + fieldName + "：</td>");
                    var $_t_td2 = $("<td></td>");
                    var $_input = $("<input type='text' class='sr01' id='t_" + _textAdvanceFields[k]['field'] + "' value=''/>");
                    $_t_td2.append($_input);
                    $_t_tr.append($_t_td).append($_t_td2);

                    //每行第二个字段
                    if (k + 1 < _textAdvanceFields.length) {
                        var fieldName2 = _textAdvanceFields[k + 1]['filedName'];
                        fieldName2 = tdFormate(fieldName2);
                        var $_t_td_1 = $("<td class='td-tit'>" + fieldName2 + "：</td>");
                        var $_t_td_2 = $("<td></td>");
                        var $_input2 = $("<input type='text' class='sr01'  id='t_" + _textAdvanceFields[k + 1]['field'] + "' value=''/>");
                        $_t_td_2.append($_input2);
                        $_t_tr.append($_t_td_1).append($_t_td_2);
                    }

                    $("#ss-table").append($_t_tr);
                }
            }
            //最后一个搜索按钮
            var tmp = $("#ss-table").find("tr:last").children("td");
            if (tmp.length == 2) {
                //如果最后一行只有一个字段，按钮就在当前行右边
                var $_t_td_btn = $("<td colspan='2' style='text-align: right'><input class='btn' style='margin-right: 2%;' type='submit' value=''></td>");
                $("#ss-table").find("tr:last").append($_t_td_btn);
            } else {
                //如果最后一行俩个字段，按钮在下一行的右下角
                var $_tr_btn = $("<tr><td colspan='4' style='text-align: right'><input class='btn' style='margin-right: 1%'; type='submit' value=''></td></tr>");
                $("#ss-table").append($_tr_btn);
            }
            clickAdvancedEnum();
            keydownEnter();
            clickAdvanced();
        }
    });
}

/**
 * 获取高级检索枚举类型参数
 */
function getEnumAdvancedParams() {
    var enumAdvancedParams = "";
    $("#ss-table").find("td").each(function (i, v) {
        var paramValueArr = [];
        if ($(v).find("a").length > 0) {
            $(v).find("a").each(function (_i, _e) {
                if ($(_e).hasClass("cur")) {
                    var paramValue = $(_e).attr("data-value");
                    paramValueArr.push(paramValue);
                }
            });
            if (paramValueArr != "") {
                var paramName = $(v).attr("id");
                paramName = paramName.replace("e_", "");
                enumAdvancedParams += (paramName + ":" + paramValueArr) + ";";
            }
        }
    });
    return enumAdvancedParams;
}

/**
 * 获取高级检索文本类型参数
 */
function getTextAdvancedParams() {
    var textAdvancedParams = "";
    $("#ss-table").find("input").each(function (i, v) {
        var textParamValue = $(v).val();
        textParamValue = $.trim(textParamValue);
        if (textParamValue != "") {
            var paramName = $(v).attr("id");
            paramName = paramName.replace("t_", "");
            textAdvancedParams += (paramName + ":" + textParamValue + ";");
        }
    });
    return textAdvancedParams;
}

/**
 * 加载热词
 */
function loadHotWords() {
    $.ajax({
        url: "front/search/hotword.jhtml",
        timeout: timeout,
        success: function (_data) {
            if (_data) {
                $(".list02").empty();
                $.each(_data, function (index, value) {
                    var $li = $("<li></li>");
                    var $span = $("<span class='" + (index <= 2 ? "top" : "") + "'>" + (index + 1) + "</span>");
                    var $a = $("<a href='#' onclick='hotWord2search(this.innerText)'>" + value + "</a>");
                    $("#hotwordsDiv").append($span);
                    $li.append($span);
                    $li.append($a);
                    $(".list02").append($li);
                });
            }
        }
    });
}

/**
 * 加载相关搜索
 */
function loadRela() {
    $("#rela").hide();
    $.ajax({
        url: "front/suggest/term.jhtml",
        data: {
            "keyword": $.trim($("#keyword").val()),
            "size": 10
        },
        timeout: timeout,
        success: function (_data) {
            if (_data) {
                $("#rela a").remove();
                $.each(_data, function (index, value) {
                    var $a = $("<a href='javascript:;' onclick='rela2Search(this.innerText)'>" + value + "</a>");
                    $("#rela").append($a);
                });
                $("#rela").show();
            }
        }
    });
}

/**
 * 回显查阅、复制、借阅、收藏状态；
 * 返回值：标示符typenum：typenum为1为查阅，3为复制，5为收藏，4为查阅和复制，6为查阅和收藏，8为复制和收藏，9为查阅、复制、收藏，
 * 10为借阅，11为查阅和借阅，13为复制和借阅，15为收藏和借阅，14为查阅和复制和借阅，16为查阅和收藏和借阅，18为复制和收藏和借阅，19为查阅、复制、收藏、借阅
 */
function dealInfo() {
    $.ajax({
        url: "/searchweb/ashx/archivesUtilize.ashx",
        data: {userId: $("#userId").val(), userToken: $("#usertoken").val(), ajjguIds: ajjguIds, t: $.now()},
        timeout: timeout,
        success: function (_data) {
            if (!_data || _data.length == 0)return;
            var result = eval("(" + _data + ")");
            if (result.length > 0) {
                for (var i = 0; i < result.length; i++) {
                    var ajjguid = result[i].ajjguid;
                    var typenum = parseInt(result[i].typenum);
                    switch (typenum) {
                        case 1:
                            //1为查阅
                            $("#" + ajjguid + " .a1").addClass("a1Hover");
                            break;
                        case 3:
                            //3为复制
                            $("#" + ajjguid + " .a7").addClass("a7Hover");
                            break;
                        case 4:
                            //4为查阅和复制
                            $("#" + ajjguid + " .a1").addClass("a1Hover");
                            $("#" + ajjguid + " .a7").addClass("a7Hover");
                            break;
                        case 5:
                            //5为收藏
                            $("#" + ajjguid + " .a3").addClass("a3Hover");
                            break;
                        case 6:
                            //6为查阅和收藏
                            $("#" + ajjguid + " .a1").addClass("a1Hover");
                            $("#" + ajjguid + " .a3").addClass("a3Hover");
                            break;
                        case 8:
                            //8为复制和收藏
                            $("#" + ajjguid + " .a7").addClass("a7Hover");
                            $("#" + ajjguid + " .a3").addClass("a3Hover");
                            break;
                        case 9:
                            //9为查阅、复制、收藏
                            $("#" + ajjguid + " .a1").addClass("a1Hover");
                            $("#" + ajjguid + " .a7").addClass("a7Hover");
                            $("#" + ajjguid + " .a3").addClass("a3Hover");
                            break;
                        case 10:
                            //10为借阅
                            $("#" + ajjguid + " .a2").addClass("a2Hover");
                            break;
                        case 11:
                            //11为查阅和借阅
                            $("#" + ajjguid + " .a1").addClass("a1Hover");
                            $("#" + ajjguid + " .a2").addClass("a2Hover");
                            break;
                        case 13:
                            //13为复制和借阅
                            $("#" + ajjguid + " .a7").addClass("a7Hover");
                            $("#" + ajjguid + " .a2").addClass("a2Hover");
                            break;
                        case 14:
                            //14为查阅和复制和借阅
                            $("#" + ajjguid + " .a1").addClass("a1Hover");
                            $("#" + ajjguid + " .a7").addClass("a7Hover");
                            $("#" + ajjguid + " .a2").addClass("a2Hover");
                            break;
                        case 15:
                            //15为收藏和借阅
                            $("#" + ajjguid + " .a3").addClass("a3Hover");
                            $("#" + ajjguid + " .a2").addClass("a2Hover");
                            break;
                        case 16:
                            //16为查阅和收藏和借阅
                            $("#" + ajjguid + " .a1").addClass("a1Hover");
                            $("#" + ajjguid + " .a3").addClass("a3Hover");
                            $("#" + ajjguid + " .a2").addClass("a2Hover");
                            break;
                        case 18:
                            //18为复制和收藏和借阅
                            $("#" + ajjguid + " .a7").addClass("a7Hover");
                            $("#" + ajjguid + " .a3").addClass("a3Hover");
                            $("#" + ajjguid + " .a2").addClass("a2Hover");
                            break;
                        case 19:
                            //19为查阅、复制、收藏、借阅
                            $("#" + ajjguid + " .a1").addClass("a1Hover");
                            $("#" + ajjguid + " .a7").addClass("a7Hover");
                            $("#" + ajjguid + " .a3").addClass("a3Hover");
                            $("#" + ajjguid + " .a2").addClass("a2Hover");
                            break;
                    }
                }
            }
        }
    });
}

/**
 *清空检索结果
 */
function clear() {
    $("#rela").hide();
    aggregationsArrToUse = [];
    ajjguIds = "";
    $(".m-box").remove();
    $("#total").text(0);
    $("#spendTime").text(0);
    $("#all-num").text(0);
    $("#page").empty();
    $("#aggregationPage").empty();
    $(".list01").empty();
    $("#tip").html("");
}

/**
 * 检索无结果时
 */
function noResult() {
    $(".m-box").remove();
    var $div = $("<div class='m-box'></div>");
    var _keyWord = $.trim($("#keyword").val());
    _keyWord = (_keyWord != "请输入关键词" ? _keyWord : "");
    if (_keyWord != "") {
        var $h2 = $("<h2 class='font-nor'>很抱歉，没有找到与“<span class='c_red'>" + _keyWord + "</span>”相关的档案。</h2>");
        $div.append($h2);
    } else {
        var $h2 = $("<h2 class='font-nor'>很抱歉，没有找到相关的档案。</h2>");
        $div.append($h2);
    }
    $("#page").before($div);
}

/**
 * 分页截取结果分类数据
 */
function myPagination(pageNo) {
    var offset = (pageNo - 1) * aggregationSize;
    return (offset + aggregationSize >= aggregationsArrToUse.length) ? aggregationsArrToUse.slice(offset, aggregationsArrToUse.length) : aggregationsArrToUse.slice(offset, offset + aggregationSize);
}

/**
 * 动态构建结果分类table
 */
function createAggregations(_index) {
    $(".list01").empty();
    if (aggregationsArrToUse.length > 0) {
        var tmp_aggregationsArr = myPagination(_index);
        if (tmp_aggregationsArr.length > 0) {
            for (var _i = 0; _i < tmp_aggregationsArr.length; _i++) {
                var aggregationName = tmp_aggregationsArr[_i][1];

                var $aggregation_li = "<li><a class='ellipsis'  title='" + tmp_aggregationsArr[_i][1] + "' data-value='" + tmp_aggregationsArr[_i][0] + "'>"
                    + aggregationName + "</a>"
                    + tmp_aggregationsArr[_i][2] + "</li>";
                $(".list01").append($aggregation_li);

            }
            //结果分类分页
            laypage({
                cont: 'aggregationPage',
                curr: _index,
                pages: aggregationsArrToUse.length / aggregationSize + 1,
                skin: "molv",
                first: false,
                last: false,
                prev: "<",
                next: ">",
                groups: 4,
                jump: function (obj, first) {
                    if (!first) {
                        _index = obj.curr;
                        createAggregations(_index);
                    }
                }
            });
        }
    }
}

/**
 *热词搜索
 */
function hotWord2search(val) {
    $("#keyword").val($.trim(val));
    search();
}

/**
 * 检索点击事件
 */
function search() {
    pageNumber = 1;
    doSearch();
}

/**
 * 相关搜索点击
 */
function rela2Search(val) {
    $("#keyword").val($.trim(val));
    search();
}

/**
 * 检索
 */
function doSearch() {
    clear();
    var keyword = $.trim($("#keyword").val());
    keyword = (keyword == "请输入关键词" ) ? "" : keyword;
    //允许无关键词直接高级检索
    if (keyword != "" || ( getEnumAdvancedParams() != "" || getTextAdvancedParams() != "")) {
        var loadPage = layer.load(0, {time: 15 * 1000});
        $.ajax({
            url: "front/search.jhtml",
            data: {
                "keyword": keyword,
                "pageNumber": pageNumber,
                "orderBy": $("#orderBy").val(),
                "classId": $("#classId").val(),
                "userId": $("#userId").val(),
                "usertoken": $("#usertoken").val(),
                "enumAdvancedParams": getEnumAdvancedParams(),
                "textAdvancedParams": getTextAdvancedParams()
            },
            timeout: timeout,
            success: function (_data) {
                layer.close(loadPage);
                if (!_data || _data.total <= 0) {
                    noResult();
                    return;
                }

                $("#total").text(_data.total);
                $("#spendTime").text(_data.spendTime > 0 ? (_data.spendTime / 1000) : 0);
                //如果是通过猜测获取搜索
                if (_data.guessKeywords.length > 0) {
                    var $_guess_span = $("<span class='px-box'>以下为您显示：“<strong class='c_black'>" + _data.guessKeywords + "</strong>”的搜索结果。</span>");
                    $("#tip").append($_guess_span);
                }
                //列表数据
                var _content = _data.content;
                $.each(_content, function (index, value) {
                    var classid = value.M_CLASSID;
                    var otherFields = value.other;
                    var ajguid = value.M_AJGUID;
                    var ajjguid = value.M_AJJGUID;
                    var ajflag = value.AJ_FLAG;
                    var trs_id = value.TRS_ID;
                    //区分案卷与案件
                    var fj_guid = (ajflag == 1) ? ajguid : ajjguid;

                    if (classid == 40) {    //地质类
                        ajjguIds += (htmlClean(otherFields[0]['档号']) + ",");
                    } else {
                        ajjguIds += (ajguid + ",");
                    }
                    //构建列表
                    var $m_box_div = $("<div class='m-box'></div>");
                    //题名
                    var $TM_h2 = $("<h2><a target='_blank' href='fjy.html?ajflag=" + ajflag + "&classid=" + classid + "&guid=" + fj_guid + "&tm=" + htmlClean(value.M_TM) + "'>" + value.M_TM + "</a></h2>");
                    var $AJ_TM = $("<div style='display:none' id='aj_tm_" + ajjguid + "'></div>");
                    $m_box_div.append($TM_h2);
                    $m_box_div.append($AJ_TM);
                    //所属案卷题名
                    if (ajflag == 0) {
                        $.ajax({
                            url: "front/search/queryRecord.jhtml?type=1&ajjguid=" + ajguid,
                            asyn: false,
                            timeout: timeout,
                            success: function (_ssaj) {
                                if (_ssaj && _ssaj.M_TM != null) {
                                    $("#aj_tm_" + ajjguid).html("<span style='background-color: #d8f2fd;'>所属案卷：" + _ssaj.M_TM + "</span>");
                                    $("#aj_tm_" + ajjguid).show();
                                }
                            },
                            error: function (e) {
                                layer.msg("查询所属案卷失败！", {icon: 5});
                            }
                        })
                    }
                    //OCR文件 字段
                    if (value.M_OCR_ATTACHMENTCONTENT && value.M_OCR_ATTACHMENTCONTENT.length > 0) {
                        var $Ocr_div = $("<div><span class='ocr_span'>" + value.M_OCR_ATTACHMENTCONTENT + "</span></div>");
                        $m_box_div.append($Ocr_div);
                    }
                    var $INFO_dl = $("<dl></dl>");
                    var $TM_img = $("<dt><img  src='images/jsjg_pic_wj_" + ajflag + ".jpg'/></dt>");
                    $INFO_dl.append($TM_img);

                    //其他字段
                    var $INFO_dd = $("<dd></dd>");
                    var $table = $("<table></table>");
                    //每行显示两个字段
                    for (var i = 0; i < otherFields.length; i += 2) {
                        var $_tr = $("<tr></tr>");
                        if ((i + 1 ) == otherFields.length) {
                            //字段奇数个时最后一个占两个td
                            for (var key in otherFields[i]) {
                                var $_td = $("<td colspan='2'><strong>" + key + "：</strong>" + otherFields[i][key] + "</td>");
                                $_tr.append($_td);
                            }
                        } else {
                            for (var key in otherFields[i]) {
                                var $_td = $("<td class='ellipsis' title='" + htmlClean(otherFields[i][key]) + "'><strong>" + key + "：</strong>" + otherFields[i][key] + "</td>");
                                $_tr.append($_td);
                            }
                        }
                        //每行第二个td
                        if (i + 1 < otherFields.length) {
                            for (var key in otherFields[i + 1]) {
                                var $_td = $("<td class='ellipsis' title='" + htmlClean(otherFields[i + 1][key]) + "'><strong>" + key + "</strong>：" + otherFields[i + 1][key] + "</td>");
                                $_tr.append($_td);
                            }
                        }

                        $table.append($_tr);
                    }
                    //操作栏
                    var $_tr2 = $("<tr></tr>");
                    var $_tr2_td = $("<td colspan='2' id='" + ajguid + "'></td>");
                    var $CY_a = $("<a class='a1' data-value='classid=" + classid + "&ajjguid=" + ajguid + "'>查阅</a>");
                    var $FZ_a = $("<a class='a7' data-value='classid=" + classid + "&ajjguid=" + ajguid + "'>复制</a>");
                    var $JY_a = $("<a class='a2' data-value='classid=" + classid + "&ajjguid=" + ajguid + "'>借阅</a>");
                    var $SC_a = $("<a class='a3' data-value='classid=" + classid + "&ajjguid=" + ajguid + "'>收藏</a>");
                    var $DW_a = $("<a class='a4' data-value='" + classid + "&" + ajguid + "'>定位</a>");
                    if (classid == 40) {    //地质类
                        $_tr2_td = $("<td colspan='2' id='" + htmlClean(otherFields[0]['档号']) + "'></td>");
                        $CY_a = $("<a class='a1' data-value='classid=" + classid + "&ajjguid=" + htmlClean(otherFields[0]['档号']) + "'>查阅</a>");
                        $FZ_a = $("<a class='a7' data-value='classid=" + classid + "&ajjguid=" + htmlClean(otherFields[0]['档号']) + "'>复制</a>");
                        $JY_a = $("<a class='a2' data-value='classid=" + classid + "&ajjguid=" + htmlClean(otherFields[0]['档号']) + "'>借阅</a>");
                        $DW_a = $("<a class='a4' data-value='" + classid + "&" + htmlClean(otherFields[0]['档号']) + "'>定位</a>");
                    }

                    var $FJ_a = $("<a class='a5' target='_blank' data-value='classid=" + classid + "&guid=" + ajguid
                        + "' href='fjy.html?ajflag=" + ajflag + "&classid=" + classid + "&guid=" + fj_guid + "&tm=" + htmlClean(value.M_TM) + "'>附件</a>");
                    var $XXXX_a = $("<a class='a6' data-value='classid=" + classid + "&ajguid=" + ajguid + "'>详细信息</a>");
                    var $gl_kc_a = $("<a class='a8' data-value='ajguid=" + ajguid + "' target='_blank' href='history.html?ajguid=" + ajguid + "'>关联</a>");
                    var $gl_td_a = $("<a class='a8' data-value='ajguid=" + ajguid + "' target='_blank' href='analyze_td.html?doc_flag=1&TRS_ID=" + trs_id + "'>关联</a>");
                    var $gl_ws_a = $("<a class='a8' data-value='ajguid=" + ajguid + "' target='_blank' href='analyze_ws.html?doc_flag=1&TRS_ID=" + trs_id + "'>关联</a>");
                    $_tr2_td.append($CY_a);
                    $_tr2_td.append($FZ_a);
                    $_tr2_td.append($JY_a);
                    $_tr2_td.append($SC_a);
                    if (classid == 40 || classid == 98) {
                        $_tr2_td.append($DW_a);
                    }
                    $_tr2_td.append($FJ_a);
                    $_tr2_td.append($XXXX_a);
                    //矿产资源生命周期关联可视化分析
                    if (classid == 48 || classid == 24 || classid == 25 || classid == 26 || classid == 27 || classid == 28 || classid == 45 || classid == 48 || classid == 50 || classid == 52 || classid == 54) {
                        $_tr2_td.append($gl_kc_a);
                    }
                    //文书档案类的关联可视化
                    if (classid == 211 || classid == 228 || classid == 231 || classid == 229) {
                        $_tr2_td.append($gl_ws_a);
                    }
                    //土地类的档案关联可视化
                    if (classid == 98) {
                        $_tr2_td.append($gl_td_a);
                    }

                    $_tr2.append($_tr2_td);

                    $table.append($_tr2);
                    $INFO_dd.append($table);
                    $INFO_dl.append($INFO_dd);
                    $m_box_div.append($INFO_dl);
                    $("#rela").before($m_box_div);
                });

                //分页条
                laypage({
                    cont: 'page',
                    curr: pageNumber,
                    pages: _data.totalPages,
                    skin: "yahei",
                    last: false,
                    groups: 5,
                    jump: function (obj, first) {
                        if (!first) {
                            pageNumber = obj.curr;
                            doSearch();
                        }
                    }
                });
                // 自动返回顶部
                $("body,html").animate({scrollTop: 0}, 200);

                //分类统计数据
                var _aggregations = _data.aggregations;
                var aggregationsCount = 0;
                for (var i in _aggregations) {
                    aggregationsCount++;
                    for (var j in _aggregations[i]) {
                        aggregationsArrToUse.push([j, aggregationsArr[j], _aggregations[i][j]]);
                    }
                }
                $("#all-num").text(aggregationsCount);
                createAggregations(1);

                // dealAttachment();
                dealInfo();
                loadRela();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                layer.close(loadPage);
                layer.msg("检索失败！", {icon: 5}, function () {
                    window.location = "index.html?userId=" + $("#userId").val() + "&usertoken=" + $("#usertoken").val();
                });
            }
        });
    }
}
//-->
