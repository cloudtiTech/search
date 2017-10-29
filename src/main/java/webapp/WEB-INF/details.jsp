<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/bootstrap.min.css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/bootstrap-theme.min.css" />
<link rel="icon" href="${pageContext.request.contextPath}/images/favicon.ico">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/plugin/jquery.auto-complete/jquery.auto-complete.css"
	type="text/css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/plugin/superfish/css/superfish.css"
	media="screen">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/plugin/superfish/css/superfish-vertical.css" media="screen">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/gtt_style.css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/modified.css" />
<!--[if lt IE 9]>
    <script src="js/html5shiv.js"></script>
    <script src="js/respond.js"></script>
    <![endif]-->
<script src="${pageContext.request.contextPath}/js/jquery-1.7.2.min.js"></script>
<script src="${pageContext.request.contextPath}/js/bootstrap.min.js"></script>
<script src="${pageContext.request.contextPath}/plugin/superfish/js/hoverIntent.js"></script>
<script src="${pageContext.request.contextPath}/plugin/superfish/js/superfish.js"></script>
<script src="${pageContext.request.contextPath}/plugin/layer-v2.4/layer/layer.js"></script>
<script src="${pageContext.request.contextPath}/plugin/jquery.auto-complete/jquery.auto-complete.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/category_debug.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/common.js"></script>
<title>详情页面</title>
</head>
<body>
	<!--主体开始-->
	<div id="content">
	  
		<table class="table table-striped">
			<tr>
				<td>案卷题名</td>
				<td>${zhws.m_tm }</td>
				<td>分类根ID</td>
				<td>${zhws.m_classrootid }</td>
			</tr>
			<tr>
				<td>分类id,当前分类ID</td>
				<td>${zhws.m_classid }</td>
				<td>分类列表</td>
				<td>${zhws.m_classlist }</td>
			</tr>
			<tr>
				<td>分类名称</td>
				<td>${zhws.m_classname }</td>
				<td>分类简称</td>
				<td>${zhws.m_classshortname }</td>
			</tr>
			<tr>
				<td>创建日期</td>
				<td>${zhws.m_createdate }</td>
				<td>创建人ID</td>
				<td>${zhws.m_createuser }</td>
			</tr>
			<tr>
				<td>创建人名</td>
				<td>${zhws.m_createusername }</td>
				<td>表中文名</td>
				<td>${zhws.m_fname }</td>
			</tr>
			<tr>
				<td>文号</td>
				<td>${zhws.m_wh }</td>
				<td>归档年度</td>
				<td>${zhws.m_gdnd }</td>
			</tr>
			<tr>
				<td>案卷号</td>
				<td>${zhws.m_ajno }</td>
				<td>案件号</td>
				<td>${zhws.m_ajjno }</td>
			</tr>
			<tr>
				<td>案卷级档号</td>
				<td>${zhws.m_ajjdh }</td>
				<td>文件级档号</td>
				<td>${zhws.m_wjjdh }</td>
			</tr>
			<tr>
				<td>归档状态</td>
				<td>${zhws.m_gdstate }</td>
				<td>审核状态</td>
				<td>${zhws.m_gdstate_mc }</td>
			</tr>
			<tr>
				<td>库房名称</td>
				<td>${zhws.m_auditstate }</td>
				<td>借出状态</td>
				<td>${zhws.m_auditstate_mc }</td>
			</tr>
			<tr>
				<td>归档日期</td>
				<td>${zhws.m_gdrq }</td>
				<td>归档用户</td>
				<td>${zhws.m_gduser }</td>
			</tr>
			<tr>
				<td>OCR名字</td>
				<td>${zhws.m_ocr_attachmentname }</td>
				<td>OCR文本内容</td>
				<td>${zhws.m_ocr_attachmentcontent }</td>
			</tr>
			<tr>
				<td>PDF名字</td>
				<td>${zhws.m_pdf_attachmentname }</td>
				<td>全宗号</td>
				<td>${zhws.m_qzh }</td>
			</tr>
			<tr>
				<td>责任者</td>
				<td>${zhws.m_zrz }</td>
				<td>保管年限</td>
				<td>${zhws.m_bgqx }</td>
			</tr>
			<tr>
				<td>保管年限中文名称</td>
				<td>${zhws.m_bgqx_mc }</td>
				<td>总页数</td>
				<td>${zhws.m_zys }</td>
			</tr>
			<tr>
				<td>总份数</td>
				<td>${zhws.m_zfs }</td>
				<td>存放位置</td>
				<td>${zhws.m_cfwz }</td>
			</tr>			
			<tr>
				<td>密级</td>
				<td>${zhws.m_mj }</td>
				<td>开始时间</td>
				<td>${zhws.m_mj_mc }</td>
			</tr>
			<tr>
				<td>结束时间</td>
				<td>${zhws.m_kssj }</td>
				<td>目录号</td>
				<td>${zhws.m_flh }</td>
			</tr>
			<tr>
				<td>盒号</td>
				<td>${zhws.m_hh }</td>
				<td>分类号</td>
				<td>${zhws.m_flh }</td>
			</tr>
			<tr>
				<td>关联文件</td>
				<td>${zhws.m_refile }</td>
				<td>其余业务表字段内容</td>
				<td>${zhws.trs_other_context }</td>
			</tr>
			<tr>
				<td>全文合并内容</td>
				<td>${zhws.trs_content }</td>
				<td>全文合并关键内容</td>
				<td>${zhws.trs_key_context }</td>
			</tr>																					
			<tr>
				<td>CKM实体抽取地址</td>
				<td>${zhws.trs_entity_place }</td>
				<td>案卷号</td>
				<td>${zhws.m_ajguid }</td>
			</tr>	
			<tr>
				<td>案件号</td>
				<td>${zhws.m_ajjguid }</td>
				<td>项目名称</td>
				<td>${zhws.m_prjname }</td>
			</tr>	
			<tr>
				<td>是否案卷</td>
				<td>${zhws.aj_flag }</td>
				<td>备注</td>
				<td>${zhws.m_bz }</td>
			</tr>
			<tr>
				<td>机构代码</td>
				<td>${zhws.m_jgdm }</td>
				<td>机构名称</td>
				<td>${zhws.m_jgdm_mc }</td>
			</tr>	
			<tr>
				<td>组卷标识</td>
				<td>${zhws.m_zzbs }</td>
				<td>组卷标识</td>
				<td>${zhws.m_zzbs_mc }</td>
			</tr>	
			<tr>
				<td>档案分类</td>
				<td>${zhws.m_yflh }</td>
				<td>页号</td>
				<td>${zhws.m_yh }</td>
			</tr>																	
		</table>
	</div>
	<!--主体结束-->
</body>
</html>