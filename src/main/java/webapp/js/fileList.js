var firstFilePath = "";
/********************************************* 初始化 *************************************************/
$(document).ready(function () {
    //样式动态调整
    function setWidth() {
        var allHeight = document.documentElement.clientHeight || document.body.clientHeight;
        $(".left").css({
            minHeight: allHeight - 150 - 40 + "px",
            height: allHeight - 150 - 40 + "px"
        });
        $(".right").css({
            minHeight: allHeight - 100 - 40 + "px",
            height: allHeight - 100 - 40 + "px"
        });
    }

    setWidth();
    $(window).resize(function () {
        setWidth()
    });


    var classid = getQueryParam("classid");
    var ajflag = getQueryParam("ajflag");
    var guid = getQueryParam("guid");
    var tm = getQueryParam("tm");
    //如果是案卷，则不显示左边树
    // if (ajflag == 0) {
    //     // $(".left").hide();
    //     // $(".right").width("100%");
    // }

    $("#header a").text(tm);
    getAttachment(classid, guid, ajflag);

    //首次进入时默认查看第一个附件
    changeFile(firstFilePath);

    //点击左侧文件列表
    $("#filelist").delegate("a", "click", function () {
        var path = $(this).attr("data-value");
        changeFile(path);

        $("#filelist .a-click").removeClass("a-click");
        $(this).addClass("a-click");
    });

    //详情点击事件
    $(".left").delegate("li span", "click", function () {
        var param = "/SearchWeb/Pages/allDetails.aspx?" + $(this).attr("data-value");
        window.open(param);
    });
});
/********************************************* 初始化结束 *************************************************/

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

/**
 * 获取附件
 */
function getAttachment(classid, guid, ajflag) {
    $.ajax({
        url: "front/attachment.jhtml",
        async: false,
        data: {classid: classid, guid: guid, ajflag: ajflag},
        success: function (_d) {
            fileList(_d);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            layer.msg("获取附件失败！", {icon: 5});
        }
    });
}

/**
 * 构造左侧文件列表
 */
function fileList(_d) {
    if (_d.length <= 0) {
        // $(".left").hide();
        // $(".right").width("100%");
        return false;
    }
    var data = _d;
    var html = "";
    if (data[0].ATTACHMENTADDRES != null) {
        firstFilePath = data[0].ATTACHMENTADDRES + data[0].ATTACHMENTSWFNAME;
    }
    for (var i = 0, len = data.length; i < len; i++) {
        html += '<li><a ';
        if (data[i].ATTACHMENTOLDNAME != null && data[i].ATTACHMENTOLDNAME.replace(/^.+\./, '') == "doc") {
            html += 'class="w a-normal" ';
        } else if (data[i].ATTACHMENTOLDNAME != null && data[i].ATTACHMENTOLDNAME.replace(/^.+\./, '') == "pdf") {
            html += ' class="pdf a-normal" ';
        } else if (data[i].ATTACHMENTOLDNAME != null && data[i].ATTACHMENTOLDNAME.replace(/^.+\./, '') == "png") {
            html += ' class="pic a-normal" ';
        } else {
            html += ' class="t a-normal" ';
        }

        html += '  href="javascript:;" ';

        if (data[i].ATTACHMENTADDRES != null) {
            html += 'data-value="' + data[i].ATTACHMENTADDRES + data[i].ATTACHMENTSWFNAME + '" ';
        }
        var tm = data[i].M_TM;
        html += ' title="' + tm + '">' + tm + '</a><span data-value="classid=' + data[i].M_CLASSID + '&ajguid=' + data[i].M_AJGUID + '">详情</span></li>';

    }

    $("#filelist").empty();

    $("#filelist").append(html);
}

/**
 * 初始化附件查看容器
 */
function _init(subpath) {
    $("#FlexPaperViewer").remove();
    $(".right").append("<div id='flashContent'></div>");

    //前缀对应nginx的定义
    var prefix = "/file/";
    var path = prefix + subpath;

    var swfVersionStr = "10.0.0";
    /*-- To use express install, set to playerProductInstall.swf, otherwise the empty string. */
    var xiSwfUrlStr = "plugin/playerProductInstall.swf";
    var flashvars = {
        SwfFile: path,
        Scale: 0.6,
        ZoomTransition: "easeOut",
        ZoomTime: 0.5,
        ZoomInterval: 0.1,
        FitPageOnLoad: true,
        // FitPageOnLoad: false,
        FitWidthOnLoad: true,
        PrintEnabled: true,
        FullScreenAsMaxWindow: false,
        ProgressiveLoading: true,
        PrintToolsVisible: true,
        ViewModeToolsVisible: true,
        ZoomToolsVisible: true,
        FullScreenVisible: true,
        NavToolsVisible: true,
        CursorToolsVisible: true,
        SearchToolsVisible: true,
        localeChain: "en_US"
    };
    var params = {};
    params.quality = "high";
    params.bgcolor = "#ffffff";
    params.allowscriptaccess = "sameDomain";
    params.allowfullscreen = "true";
    params.wmode = "opaque";
    var attributes = {};
    attributes.id = "FlexPaperViewer";
    attributes.name = "FlexPaperViewer";
    swfobject.embedSWF(
        "plugin/PdfReader.swf", "flashContent",
        "100%", "100%",
        swfVersionStr, xiSwfUrlStr,
        flashvars, params, attributes);
    swfobject.createCSS("#flashContent", "float: right;");
}

/**
 * 点击查看附件
 */
function changeFile(subpath) {
    if (subpath != undefined && subpath != "") {
        //判断是否有资源
        $.ajax({
            url: "/file/" + subpath, type: "get", processData: false, timeout: 5000, complete: function (data) {
                if (data.status == 200) {
                    _init(subpath);
                } else {
                    $("#FlexPaperViewer").remove();
                    $("#flashContent").remove();
                    $(".right").append("<div id='flashContent'><h1>电子档案未上线</h1></div>");
                }
            }
        })
    } else {
        $("#FlexPaperViewer").remove();
        $("#flashContent").remove();
        $(".right").append("<div id='flashContent'><h1>电子档案未上线</h1></div>");
    }
}