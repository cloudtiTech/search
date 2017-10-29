<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <link rel="icon" href="images/favicon.ico">
    <link rel="stylesheet" href="plugin/jquery.auto-complete/jquery.auto-complete.css" type="text/css">
    <link rel="stylesheet" href="plugin/superfish/css/superfish.css" media="screen">
    <link rel="stylesheet" href="plugin/superfish/css/superfish-vertical.css" media="screen">
    <link rel="stylesheet" href="css/gtt_style.css"/>
    <link rel="stylesheet" href="css/modified.css"/>
    <!--[if lt IE 9]>
    <script src="js/html5shiv.js"></script>
    <script src="js/respond.js"></script>
    <![endif]-->
    <script src="js/jquery-1.7.2.min.js"></script>
    <script src="plugin/superfish/js/hoverIntent.js"></script>
    <script src="plugin/superfish/js/superfish.js"></script>
    <script src="plugin/layer-v2.4/layer/layer.js"></script>
    <script src="plugin/jquery.auto-complete/jquery.auto-complete.js"></script>
    <script type="text/javascript" src="js/category_debug.js"></script>
    <script type="text/javascript" src="js/common.js"></script>
    <title>首页</title>
</head>
<body>
<!--主体开始-->
<div id="content">
    <!--左边开始-->
    <div class="left">
        <h2>全部分类</h2>
        <ul id="main-menu" class="sf-menu sf-vertical sf-js-enabled sf-arrows" style="touch-action: pan-y; "></ul>
    </div>
    <!--左边结束-->
    <!--右边开始-->
    <div class="right">
        <img src="images/js_logo.png" class="logo">
        <div class="gjjs">
            <a href="javascript:;" onclick="toAdvanced()">高级检索</a>
        </div>
        <div class="index-right">
            <p class="top-a">
                <a href="javascript:;" class="cur">全部</a>
                <a href="javascript:;" id="211_228_231_229">全宗号</a>
                <a href="javascript:;"
                   id="225_226_227_63_65_66_221_243_70_71_72_247_74_76_78_79_220_84_238_239_240_88_90_91_92_93_95_98_99_101_104_106_109_110_111_112_113_114_236_117_118_119_120_133_134_135_136_137_128_129_130_131_132_24_25_26_28_27_31_33_44_45_48_50_52_54_56_35_37">PDF文件</a>
                <a href="javascript:;" id="39_40_41">图片</a>
            <!--   <a href="javascript:;"
                   id="154_155_158_158_158_155_159_159_159_155_160_160_160_160_160_155_161_161_161_161_161_161_155_162_162_155_163_163_154_156_164_164_164_164_156_165_165_165_165_156_166_166_156_167_167_154_157_168_168_168_168_168_168_157_169_169">测绘成果</a>  -->
            </p>
            <div class="clearfix mt20 form-wrapper">
                <form action="${pageContext.request.contextPath }/index" method="post">
                    <input class="sr" type="text" id="keyword" name="keyword" value="请输入关键词"/>
                    <input class="btn01" type="submit" value=""/>
                    <input type="hidden" id="classId" name="classId" value="">
                    <input type="hidden" id="flag" name="flag" value="0">
                    <input type="hidden" id="unit" name="unit" value="">
                    <input type="hidden" id="show" name="show" value="">
                    <input type="hidden" id="userId" name="userId" value="">
                    <input type="hidden" id="usertoken" name="usertoken" value="">
                </form>
                <!--<a class="search-a" href="javascript:;" onclick="toAdvanced()">高级检索</a>-->
            </div>
            <p class="b-p">热门搜索：</p>
        </div>
    </div>
    <!--右边结束-->
    <!--<a class="index-ssyq" href="#"></a>-->
</div>
<!--主体结束-->
</body>
</html>