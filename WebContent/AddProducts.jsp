<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>添加产品信息</title>
</head>
<body>
<div align="center">
<h3>添加产品信息</h3>
<s:form action="addProduct" method="post">
<table width="300" border="1">
<s:textfield name="product.proname" label="产品名称"/> 
<s:textfield name="product.price" label="产品价格"/>
<s:textfield name="product.udate" label="产品推出日期"/>
<s:textfield name="product.dayqty" label="产品日销量"/>
<s:textfield name="product.monqty" label="产品月销量"/>
<s:textfield name="product.type" label="产品类型"/>



</table>

</s:form>


</div>
</body>
</html>