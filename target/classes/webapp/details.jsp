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
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<link rel="icon" href="images/favicon.ico">
<link rel="stylesheet"
	href="plugin/jquery.auto-complete/jquery.auto-complete.css"
	type="text/css">
<link rel="stylesheet" href="plugin/superfish/css/superfish.css"
	media="screen">
<link rel="stylesheet"
	href="plugin/superfish/css/superfish-vertical.css" media="screen">
<link rel="stylesheet" href="css/gtt_style.css" />
<link rel="stylesheet" href="css/modified.css" />
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
<title>详情页面</title>
</head>
<body>
	<!--主体开始-->
	<div id="content">
		<table>
			<tr>
				<td>案卷题名</td>
				<td><input type="text" value="案卷题名" /></td>
				<td>分类根ID</td>
				<td><input type="text" value="分类根ID" /></td>
			</tr>
			<tr>
				<td>分类id,当前分类ID</td>
				<td><input type="text" value="分类id,当前分类ID" /></td>
				<td>分类列表</td>
				<td><input type="text" value="分类列表" /></td>
			</tr>
			<tr>
				<td>分类名称</td>
				<td><input type="text" value="分类名称" /></td>
				<td>分类简称</td>
				<td><input type="text" value="分类简称" /></td>
			</tr>
			<tr>
				<td>创建日期</td>
				<td><input type="text" value="创建日期" /></td>
				<td>创建人ID</td>
				<td><input type="text" value="创建人ID" /></td>
			</tr>
			<tr>
				<td>创建人名</td>
				<td><input type="text" value="创建人名" /></td>
				<td>表中文名</td>
				<td><input type="text" value="表中文名" /></td>
			</tr>
			<tr>
				<td>文号</td>
				<td><input type="text" value="文号" /></td>
				<td>归档年度</td>
				<td><input type="text" value="归档年度" /></td>
			</tr>
			<tr>
				<td>案卷号</td>
				<td><input type="text" value="案卷号" /></td>
				<td>案件号</td>
				<td><input type="text" value="案件号" /></td>
			</tr>
			<tr>
				<td>案卷级档号</td>
				<td><input type="text" value="案卷级档号" /></td>
				<td>文件级档号</td>
				<td><input type="text" value="文件级档号" /></td>
			</tr>
			<tr>
				<td>归档状态</td>
				<td><input type="text" value="归档状态" /></td>
				<td>审核状态</td>
				<td><input type="text" value="审核状态" /></td>
			</tr>
			<tr>
				<td>库房名称</td>
				<td><input type="text" value="库房名称" /></td>
				<td>借出状态</td>
				<td><input type="text" value="借出状态" /></td>
			</tr>
			<tr>
				<td>归档日期</td>
				<td><input type="text" value="归档日期" /></td>
				<td>归档用户</td>
				<td><input type="text" value="归档用户" /></td>
			</tr>
			<tr>
				<td>OCR名字</td>
				<td><input type="text" value="OCR名字" /></td>
				<td>OCR文本内容</td>
				<td><input type="text" value="OCR文本内容" /></td>
			</tr>
			<tr>
				<td>PDF名字</td>
				<td><input type="text" value="PDF名字" /></td>
				<td>全宗号</td>
				<td><input type="text" value="全宗号" /></td>
			</tr>
			<tr>
				<td>责任者</td>
				<td><input type="text" value="责任者" /></td>
				<td>保管年限</td>
				<td><input type="text" value="保管年限" /></td>
			</tr>
			<tr>
				<td>保管年限中文名称</td>
				<td><input type="text" value="保管年限中文名称" /></td>
				<td>总页数</td>
				<td><input type="text" value="总页数" /></td>
			</tr>
			<tr>
				<td>总份数</td>
				<td><input type="text" value="总份数" /></td>
				<td>存放位置</td>
				<td><input type="text" value="存放位置" /></td>
			</tr>			
			<tr>
				<td>密级</td>
				<td><input type="text" value="密级" /></td>
				<td>开始时间</td>
				<td><input type="text" value="开始时间" /></td>
			</tr>
			<tr>
				<td>结束时间</td>
				<td><input type="text" value="结束时间" /></td>
				<td>目录号</td>
				<td><input type="text" value="目录号" /></td>
			</tr>
			<tr>
				<td>盒号</td>
				<td><input type="text" value="盒号" /></td>
				<td>分类号</td>
				<td><input type="text" value="分类号" /></td>
			</tr>
			<tr>
				<td>关联文件</td>
				<td><input type="text" value="关联文件" /></td>
				<td>其余业务表字段内容</td>
				<td><input type="text" value="其余业务表字段内容" /></td>
			</tr>
			<tr>
				<td>全文合并内容</td>
				<td><input type="text" value="全文合并内容" /></td>
				<td>全文合并关键内容</td>
				<td><input type="text" value="全文合并关键内容" /></td>
			</tr>																					
			<tr>
				<td>CKM实体抽取地址</td>
				<td><input type="text" value="CKM实体抽取地址" /></td>
				<td>案卷号</td>
				<td><input type="text" value="案卷号" /></td>
			</tr>	
			<tr>
				<td>案件号</td>
				<td><input type="text" value="案件号" /></td>
				<td>项目名称</td>
				<td><input type="text" value="项目名称" /></td>
			</tr>	
			<tr>
				<td>是否案卷</td>
				<td><input type="text" value="是否案卷" /></td>
				<td>备注</td>
				<td><input type="text" value="备注" /></td>
			</tr>
			<tr>
				<td>机构代码</td>
				<td><input type="text" value="机构代码" /></td>
				<td>机构名称</td>
				<td><input type="text" value="机构名称" /></td>
			</tr>	
			<tr>
				<td>组卷标识</td>
				<td><input type="text" value="组卷标识" /></td>
				<td>组卷标识</td>
				<td><input type="text" value="组卷标识" /></td>
			</tr>	
			<tr>
				<td>档案分类</td>
				<td><input type="text" value="档案分类" /></td>
				<td>页号</td>
				<td><input type="text" value="页号" /></td>
			</tr>																	
		</table>
	</div>
	<!--主体结束-->
</body>
</html>