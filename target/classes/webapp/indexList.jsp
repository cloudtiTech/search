<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta http-equiv="Expires" content="0">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Cache-Control" content="no-cache">
    <meta http-equiv="Cache" content="no-cache">
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
    <script src="plugin/laypage-v1.3/laypage/laypage.js"></script>
    <script src="plugin/layer-v2.4/layer/layer.js"></script>
    <script src="plugin/jquery.auto-complete/jquery.auto-complete.js"></script>
    <script type="text/javascript" src="js/message.js"></script>
    <script type="text/javascript" src="js/category_debug.js"></script>
    <script type="text/javascript" src="js/detail.js"></script>
    <title>检索结果</title>
</head>
<body>
<!--主体开始-->
<div id="content">
    <!--左边开始-->
    <div class="left">
        <h2>全部分类</h2>
        <ul id="main-menu" class="sf-menu sf-vertical sf-js-enabled sf-arrows" style="touch-action: pan-y; ">
        </ul>
    </div>
    <!--左边结束-->
    <!--右边开始-->
    <div class="right">
        <div class="jsjg-right">
            <!--左边开始-->
            <div class="l-box">
                <p class="top-a">
                    <a href="javascript:;" class="cur">全部</a>
                    <a href="javascript:;" id="211_228_231_229">文书档案</a>
                    <a href="javascript:;"
                       id="225_226_227_63_65_66_221_243_70_71_72_247_74_76_78_79_220_84_238_239_240_88_90_91_92_93_95_98_99_101_104_106_109_110_111_112_113_114_236_117_118_119_120_133_134_135_136_137_128_129_130_131_132_24_25_26_28_27_31_33_44_45_48_50_52_54_56_35_37">业务档案</a>
                    <a href="javascript:;" id="39_40_41">地质资料</a>
                    <a href="javascript:;"
                       id="154_155_158_158_158_155_159_159_159_155_160_160_160_160_160_155_161_161_161_161_161_161_155_162_162_155_163_163_154_156_164_164_164_164_156_165_165_165_165_156_166_166_156_167_167_154_157_168_168_168_168_168_168_157_169_169">测绘成果</a>
                </p>
                <div class="form-box form-wrapper">
                    <form action="">
                        <input id="keyword" class="sr" type="text" value="请输入关键词"/>
                        <input class="btn" type="submit" value="" onclick="search();return false;"/>
                    </form>
                    <span class="search-a">
                        <a href="javascript:;"><i></i></a>
                    </span>
                </div>
                <div class="search-box">
                    <table id="ss-table"></table>
                </div>
                <div class="px-box">
                    全部结果共计&nbsp;<em id="total">0</em>&nbsp;条，耗时&nbsp;<em id="spendTime">0</em>&nbsp;秒
                    <span>排序：
                        <label data-value="RELEVANCE" onclick="sortByThis(this); return false;">相关度</label>
                        <label data-value="M_GDND" onclick="sortByThis(this); return false;">归档年度</label>
                        <label data-value="M_WH" onclick="sortByThis(this); return false;">文号</label>
                        <label data-value="M_AJJDH" onclick="sortByThis(this); return false;">档号</label></span>
                </div>
                <p id='tip'></p>
                <!-- 分页列表 -->
                <div id="rela" class="rela">
                    <span>相关搜索：</span>
                </div>
                <!-- 结果列表 -->
                <div id="list" class="rela">
                    <c:forEach items="${ zhwses}" var="zhws">
                       <table>
	                      <tr>
	                       <th><a><label>${zhws.trs_id }</label></a></th>
	                      </tr> 
	                      <tr>
	                       <td>${zhws.m_cfwz }</td>
	                      </tr>
	                   </table>
	                  <br/>
                    </c:forEach>                
                <!--  
                    <table>
                      <tr>
                       <th><a><label>Spring 系列: Spring 框架简介</label></a></th>
                      </tr> 
                      <tr>
                       <td>在这由三部分组成的介绍 Spring 框架的系列文章的第一期中,将开始学习如何用 Spring 技术构建轻量级的、强壮的 J2EE 应用程序。</td>
                      </tr>
                    </table>
                    <br/>
                   <table>
                    
                      <tr>
                       <th><a><label>spring框架学习(一) - 李双喆 - CSDN博客</label></a></th>
                      </tr> 
                      <tr>
                       <td>1,什么是spring框架spring是J2EE应用程序框架,是轻量级的IoC和AOP的容器框架,主要是针对javaBean的生命周期进行管理的轻量级容器,可以单独使用,也可以和Struts框架,...</td>
                      </tr>
                    </table>
                    <br/>
                    <table>
                    
                      <tr>
                       <th><a><label>Spring 系列: Spring 框架简介</label></a></th>
                      </tr> 
                      <tr>
                       <td>在这由三部分组成的介绍 Spring 框架的系列文章的第一期中,将开始学习如何用 Spring 技术构建轻量级的、强壮的 J2EE 应用程序。</td>
                      </tr>
                    </table>
                    -->
                </div>
                
                <!--分页导航开始-->
                <div id="page" class="mt10 text-center"></div>
                <!--分页导航结束-->
            </div>
            <!--左边结束-->
            <!--右边开始-->
            <div class="r-box">
                <h2><strong class="tit01">结果分类</strong></h2>
                <h3 class="cursor-p">类别<span id="all-num">0</span></h3>
                <ul class="list01"></ul>
                <!--分页导航开始-->
                <div id="aggregationPage" class="mt10 text-center"></div>
                <!--分页导航结束-->
                <h2 class="mt20"><strong class="tit02">热词搜索</strong></h2>
                <ul class="list02"></ul>
            </div>
            <!--右边结束-->
        </div>
    </div>
    <!--右边结束-->
    <!--<a class="index-ssyq" href="#"></a>-->
</div>
<!--主体结束-->
<!-- 隐藏域 -->
<input type="hidden" id="classId" value="">
<input type="hidden" id="tmpClassId" value="">
<input type="hidden" id="orderBy" value="">
<input type="hidden" id="userId" value="">
<input type="hidden" id="usertoken" value="">
</body>
</html>