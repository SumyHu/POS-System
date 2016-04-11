$(document).ready(function() {
	$.ajax({url:"findAll", 
		type:"post",
		dataType:"json",
		// 指定回调函数
		success:function(data)
		{
			var obj =eval(data); 
			alert("aaaa");
			$.each(obj,function(index,product){
				
				$("#body").append("<tr><td>"+product.id+"</td><td>"+
						product.proname+"</td><td>$"+product.price+
						"</td><td>$"+product.dayqty+"</td><td>$"+product.monqty+"</td></tr>");
				});
				         			
		},
	error:function() {
		alert("error");
	}
}
		// 指定服务器响应为JSON数据
		);

});