/**
 * Created by trs on 2016/9/8.
 */

//<!--

/** ************************* 初始化 ********************************/
$(document).ready(function () {

    //调整检索框宽度
    //调整检索框宽度
    function setInputWidth() {
        var formWidth = $(".index-right form").width();
        var btnWidth = $(".btn01").width();
        $(".sr").width(formWidth - btnWidth - 12 + "px");
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

    //智能下拉提示
    var cacheKeyword = {};
    $('#keyword').autoComplete({
        minChars: 1,
        delay: 0,
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
                timeout: 15000,
                success: function (_data) {
                    cacheKeyword[_keyword] = _data;
                    //拼装下拉提示词
                    suggest(_data);
                }
            });
        },
        onSelect: function (e) {
            if (e.type === 'keydown' || e.type === 'mousedown') {
                submitForm();
            }
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
        $("#unit").val();
        var classIds = _this.attr("id");
        $("#flag").val(0);
        $("#classId").val(classIds);
        submitForm();
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

        //增加选中字体变红色
        var $_this = $(this);
        //li下的span
        $_this.find("span").first().addClass("selectedfontcolor");
        //父级元素span标红
        $_this.parentsUntil($("#main-menu"), "li").each(function (i) {
            $(this).find("span").first().addClass("selectedfontcolor");
        });

        $(unit).addClass("active");
        //点击顶级分类时
        if (!$(this).parents("#nav-menu>li").html()) {
            unit = $(this);
            $(this).addClass("active");
        }
        var unitId = $(unit).find("a").attr("id");

        $("#unit").val(unitId);
        var _classIdArr = [];
        $(this).find("a").each(function (i, v) {
            _classIdArr.push($(v).attr("id"));
        });
        if (_classIdArr.length > 0) {
            $("#classId").val(_classIdArr);
            //取消中间大分类选中
            $(".top-a .cur").removeClass("cur");
            $("#flag").val(1);
            submitForm();
        }
    });

    // 加载首页热词
    $.ajax({
        url: "front/search/hotword.jhtml",
        data: {"count": 6},
        timeout: 15000,
        success: function (_data) {
            if (_data) {
                $(".b-p").find("a").remove();
                $.each(_data, function (index, value) {
                    var $a = $("<a href='#' onclick='hotWord2submit(this.innerText)'>" + value + "</a>");
                    $(".b-p").append($a);
                });
            }
        }
    });
});
/** ************************* 初始化结束 ********************************/

/**
 * 首页提交表单
 */
function submitForm() {
    var keyword = $.trim($("#keyword").val());
    if (keyword && keyword != "请输入关键词") {
        $("form").attr("action", "result.html");
        $("form").submit();
    } else {
        window.refresh();
    }
}

/**
 * 直接高级搜索
 */
function toAdvanced() {
    $("#show").val("1");
    $("form").attr("action", "result.html");
    $("form").submit();
}

/**
 * 热词点击
 */
function hotWord2submit(val) {
    $("#keyword").val($.trim(val));
    submitForm();
}
//-->
