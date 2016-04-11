<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="java.util.List" %>
<%@ page import="team.lingjing.ooad.entity.*" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
   
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>显示产品信息！</title>
</head>
<body>
 <center>
		
				
				<h2>产品信息列表</h2>
				<table border="1" width="80%">
					<tr>
						<td align="center">ID</td>
						<td align="center">PRONAME</td>
						<td align="center">PRICE</td>
						<td align="center">UDATE</td>
						<td align="center">DAYQTY</td>
						<td align="center">MONQTY</td>
						<td align="center">TYPE</td>
					</tr>
		<s:iterator value="result">
					<tr class="br_TR">
						<td align="center"><s:property value="id"/></td>
      				    <td align="center"><s:property value="proname"/></td>
      				    <td align="center"><s:property value="price"/></td>
      			        <td align="center"><s:property value="udate"/></td>
       					<td align="center"><s:property value="dayqty"/></td>
      				    <td align="center"><s:property value="monqty"/></td>
      				    <td align="center"><s:property value="type"/></td>
      				    </tr>
      				    </s:iterator>
		</table><br>
				<input type="button" value="继续" onclick="window.location='modify.jsp'"/> 
				<input type="button" value="退出" onclick="window.location='login.jsp'"/>
		
	</center>
	
</body>
</html>