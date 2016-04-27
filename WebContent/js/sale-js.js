//各种判断标记及各种数据
var flag = {
	menuTbody: document.getElementsByClassName("menuTable")[0].getElementsByTagName("tbody")[0],    //菜单表格的tbody
	orderForGoodsTbody: document.getElementById("orderForGoods").getElementsByTagName("tbody")[0],  //订单表格的tbody
	payingTbody: document.getElementById("paying").getElementsByTagName("tbody")[0],   //付款表格的tbody
	receiptsTbody: document.getElementById("receipts").getElementsByTagName("tbody")[0],   //收据表格的tbody

	saveData: {},  //用来存储未付款的订单的数据

	judgeIfaNewOrderForGoods: true,   //判断是否是新创建的订单，true表示是

	flagIndex: 0   //记下被点开的订单的下标
}

//与数据库相关的操作
var connetDataBase = {
	//从后台数据库中获取产品类型为“typeName”的所有菜单内容
	getAllSaleMenu: function(typeName) {
		publicConnectDataBase.pushData("url", "post", typeName, connetDataBase.showSaleMenu, publicConnectDataBase.errorHappaned);
	},

	//根据后台返回的数据，渲染菜单表格
	showSaleMenu: function(jsondata) {
		var data = eval(jsondata);

		var lastTdInnerHtml = "<button class='btn btn-info btn-xs add'><span class='glyphicon glyphicon-plus'></span></button>";
		var colnum = $(".menuTable thead tr th").length;

		$.each(data, function(index, row) {
			var tdValue = [row.proname, row,price, row.totalNum, lastTdInnerHtml];

			commentProcess.insertTableRow(flag.menuTbody, colnum, tdValue, dealWithOrderForGoods.btnAddClick);
		})
	}
}

//公共处理方法
var commentProcess = {
	//清理表格中的内容
	clearTable: function(tbody) {
		while(tbody.hasChildNodes()) {
			tbody.removeChild(tbody.childNodes[0]);
		}
	},

	//在表格末尾添加指定的内容
	insertTableRow: function(tbody, colnum, tdValue, btnClickFunction) {
		var row = tbody.insertRow();

		for (var i = 0; i <= colnum - 1; i++) {
			row.insertCell(i);
			row.cells[i].innerHTML = tdValue[i];
		}

		row.onmouseover = function() {
			$(this).addClass("success");
		}
		row.onmouseout = function() {
			$(this).removeClass("success");
		}

		var lastTd = row.cells[colnum-1];
		
		if (btnClickFunction) {
			lastTd.onclick = function() {
				btnClickFunction(tbody, row);
			}
		}
	},

	//将tbody中每行的数据提取出来存进一个数组里面
	getTbodyData: function(row, bool) {
		var item = new Array();
		if (bool) {
			$.each(row, function(index, rowTarget) {
				item[index] = {
					"milkTeaName": rowTarget.childNodes[0].innerHTML,
					"price": rowTarget.childNodes[1].innerHTML,
					"num": rowTarget.childNodes[2].innerHTML
				}
			});
		}
		else {
			$.each(row, function(index, rowTarget) {
				item[index] = {
					"milkTeaName": rowTarget.childNodes[0].innerHTML,
					"price": rowTarget.childNodes[1].innerHTML,
					"num": "<a><span class='glyphicon glyphicon-minus minusNum'></span></a><span class='goodsNum'>" + 
					rowTarget.childNodes[2].innerHTML +"</span>" + "<a><span class='glyphicon glyphicon-plus addNum'></span></a>"
				}
			});
		}
		return item;
	},

	//获取订单中最大的下标值
	maxIndex: function() {
		var maxindex = 1;
		$.each($("span.index"), function(i, compareTarget) {
			maxindex = Math.max(maxindex, compareTarget.innerHTML) + 1;
		});
		return maxindex;
	}
}

//具体订单内容处理逻辑
dealWithOrderForGoods = {
	//点击菜单表格中的添加按钮，在销售订单中添加该点餐项
	btnAddClick: function(tbody, target) {
		var colnum = $("#orderForGoods table thead tr th").length;
		var goodsNum = "<a><span class='glyphicon glyphicon-minus minusNum'></span></a><span class='goodsNum'>1</span>" +
		"<a><span class='glyphicon glyphicon-plus addNum'></span></a>";
		var lastTdInnerHtml = "<a><span class='glyphicon glyphicon-remove'></span></a>";
		var tdValue = [target.cells[0].innerHTML, target.cells[1].innerHTML, goodsNum, lastTdInnerHtml];

		if ($("#orderForGoods").css("display") == "none") {
			dealWithOrderForGoods.showOrderForGoods(tdValue);
			if ($("#orderForms").css("display") == "block") {
				dealWithOrderForms.waitingPayClose();
			}
		}
		else if ($("#orderForGoods").css("display") == "block") {
			dealWithOrderForGoods.showOrderForGoods(tdValue);
		}
	},

	//点击删除按钮，删除该项点餐项
	btnRemoveClick: function(tbody, target) {
		tbody.removeChild(target);
	},

	//创建新的订单，并在新创建的订单中添加点餐项
	showOrderForGoods: function(tdValue) {
		var colnum = $("#orderForGoods table thead tr th").length;
		$("#orderForGoods").css("display", "block");
		$("button.waitingPay").attr("disabled", true);
		commentProcess.insertTableRow(flag.orderForGoodsTbody, colnum, tdValue, dealWithOrderForGoods.btnRemoveClick);

		//点击数量的-按钮，数量减一
        var minusNum = $("a span.minusNum");
        $.each(minusNum, function(index, minusTarget) {
        	minusTarget.onclick = function() {
        		var goodsNum = $(this).parent().next();
				if (goodsNum.text() > 0) {
					goodsNum.text(goodsNum.text()- 1);
					//如点餐项数量为0，则删除该项
					if (goodsNum.text() == 0) {
						dealWithOrderForGoods.btnRemoveClick(flag.orderForGoodsTbody, this.parentNode.parentNode.parentNode);
					}
				}
        	}
        });

        //点击数量的+按钮，数量加一
        var addNum = $("a span.addNum");
        $.each(addNum, function(index, addTarget) {
        	addTarget.onclick = function() {
        		var goodsNum = $(this).parent().prev();
				goodsNum.text(parseInt(goodsNum.text()) + 1);
        	}
        });
	},

	//保存某一订单中所有的点餐项到数组saveData中，并在待付款项中添加一项新的待付款订单
	saveOrderForGoods: function() {
		var row = $("#orderForGoods table tbody tr");
		var item = commentProcess.getTbodyData(row, true);

		if (flag.judgeIfaNewOrderForGoods) {   //判断是否是新添加的订单
			$("span.waitingPayNum").text(parseInt($("span.waitingPayNum").text())+1);
			var index = 1;
			if ($("span.index").text()) {
				index = commentProcess.maxIndex();
			}
			$("#orderForms ul").append("<li><a class='btn btn-defalut order'>订单" +"<span class='index'>" + index
				+ "</span></a><a class='btn btn-defalut removeOrder'><span>X</span></a></li>");

			flag.saveData[commentProcess.maxIndex()-1] = item;
		}
		else {
			flag.saveData[flag.flagIndex] = item;
		}

		var removeOrder = $("a.removeOrder");
		$.each(removeOrder, function(index, removeTarget) {
			removeTarget.onclick = function() {
				var target = $(this).parent("li");
				dealWithOrderForms.deleteOrderList(target);
			}
		});

		var orderFormsList = $("#orderForms ul li a.order");
		$.each(orderFormsList, function(index, orderFormsListTarget) {
			orderFormsListTarget.onclick = function() {
				var i = $(orderFormsListTarget).find(".index").text();

				dealWithOrderForms.waitingPayClose();

				flag.judgeIfaNewOrderForGoods = false;
				flag.flagIndex = i;

				$.each(flag.saveData[i], function(index, array) {
					var tdValue = 
					[array.milkTeaName, array.price, array.num, "<a><span class='glyphicon glyphicon-remove'></span></a>"];
					dealWithOrderForGoods.showOrderForGoods(tdValue);
				});
			}
			flag.judgeIfaNewOrderForGoods = true;
		});
	},

	//关闭某一具体订单
	closeOrderForGoods: function() {
		$("#orderForGoods").css("display", "none");
		$("button.waitingPay").attr("disabled", false);

		commentProcess.clearTable(flag.orderForGoodsTbody);

		flag.judgeIfaNewOrderForGoods = true;
	}
}

//待付款项处理逻辑
dealWithOrderForms = {
	//打开待付款里面的具体项
	waitingPayOpen: function() {
		$(".waitingPay span:nth-child(2)").attr("class", "glyphicon glyphicon-chevron-down");
		$("#orderForms").css("display", "block");
	},

	//关闭待付款项
	waitingPayClose: function() {
		$(".waitingPay span:nth-child(2)").attr("class", "glyphicon glyphicon-chevron-up");
		$("#orderForms").css("display", "none");
	},

	//删除某一待付款订单
	deleteOrderList: function(target) {
		target.remove();
		$("span.waitingPayNum").text($("span.waitingPayNum").text()-1);
		var index = parseInt($(target).find("a span.index").text());
		flag.saveData[index] = "";
	}
}

//付款界面处理逻辑
dealWithPayment = {
	//打开付款界面
	gotToPaying: function() {
		$("button.add").attr("disabled", true);

		$("div#paying").css("display", "block");
		var row = $("#orderForGoods table tbody tr");
		var totalCost = 0;
		$.each(row, function(index, rowTarget) {
			var colnum = $("div#paying table thead tr th").length;

			var goodsNum = rowTarget.childNodes[2].getElementsByClassName("goodsNum")[0].innerHTML;
			var tdValue = 
			[rowTarget.childNodes[0].innerHTML, rowTarget.childNodes[1].innerHTML, goodsNum];

			commentProcess.insertTableRow(flag.payingTbody, colnum, tdValue);

			totalCost = totalCost + rowTarget.childNodes[1].innerHTML*goodsNum;
		});

		$("span.totalCost").text(totalCost);
		$("button.goToPaying").attr("disabled", true);

		$("input.realPayNum").on("change", function() {
			if ($("input.realPayNum").val() >= totalCost) {
				$("span.change").text($("input.realPayNum").val() - totalCost);
				$("button.goToPaying").attr("disabled", false);
			}
			else {
				$("span.change").text("实际付款不足以支付！");
			}
		});

		$("div#orderForGoods").css("display", "none");
		commentProcess.clearTable(flag.orderForGoodsTbody);
	},

	//关闭某一付款订单
	stopPayment: function() {
		$("div#paying").css("display", "none");
		$("button.add").attr("disabled", false);
		$("button.waitingPay").attr("disabled", false);

		if (!flag.judgeIfaNewOrderForGoods) {
			var row = $("#paying table tbody tr");
			flag.saveData[flag.flagIndex] = commentProcess.getTbodyData(row, false);
		}

		$("input.realPayNum").val("");
		$("span.change").text("");

		commentProcess.clearTable(flag.payingTbody);

		flag.judgeIfaNewOrderForGoods = true;
	}
}

//收据界面处理逻辑
var dealWithReceipts = {
	//确认付款
	confirmPay: function() {
		$("#receipts").css("display", "block");

		var row = $("#paying table tbody tr");
		var data = new Array();
		$.each(row, function(index, rowTarget) {
			var colnum = $("div#receipts table thead tr th").length;

			var tdValue = 
			[rowTarget.childNodes[0].innerHTML, rowTarget.childNodes[1].innerHTML, rowTarget.childNodes[2].innerHTML];

			commentProcess.insertTableRow(flag.receiptsTbody, colnum, tdValue);

			var temp = {
				"proname": rowTarget.childNodes[0].innerHTML,
				"price": rowTarget.childNodes[1].innerHTML,
				"number": rowTarget.childNodes[2].innerHTML
			}
			data[index] = temp;
		});
		var jsondata = JSON.stringify(data);

		$("span.receiptsTotalCost").text($("span.totalCost").text());
		$("span.receiptsRealPayNum").text($("input.realPayNum").val());
		$("span.receiptsChange").text($("span.change").text());
		$("span.date").text(new Date().toLocaleString());

		if (!flag.judgeIfaNewOrderForGoods) {
			var li = $("div#orderForms ul li");
			$.each(li, function(index, liTarget) {
				if (liTarget.getElementsByClassName("index")[0].innerHTML == flag.flagIndex) {
					dealWithOrderForms.deleteOrderList(liTarget);
					return;
				}
			});
		}

		dealWithPayment.stopPayment();

		$("button.add").attr("disabled", true);
		$("button.waitingPay").attr("disabled", true);

		//publicConnectDataBase.pushData(url, "post", jsondata, "", publicConnectDataBase.errorHappaned);
	},


	//取走某一收据
	takeOutReceipts: function() {
		$("div#receipts").css("display", "none");
		commentProcess.clearTable(flag.receiptsTbody);

		$("button.add").attr("disabled", false);
		$("button.waitingPay").attr("disabled", false);
	}
}

//绑定事件
var bindEvent = function() {
	//将type选择栏固定
	$(".navDiv").scrollFix("top", "top");

	//将侧栏固定
	$(".saleOrder").scrollFix("top", "top");

	//实现type选项栏点击事件
	$(".tab").on("click", function()  {
		var typeName = $(this).innerHTML;
		connetDataBase.getAllSaleMenu(typeName);
	});

	//点击待付款按钮
	$(".waitingPay").on("click", function() {
		if ($("#orderForms").css("display") == "none" ) {
			dealWithOrderForms.waitingPayOpen();
		}
		else {
			dealWithOrderForms.waitingPayClose();
		}
	});

	//点击订单中的保存按钮
	$("button.save").on("click", function() {
		if ($("#orderForGoods table tbody tr").length != 0) {
			dealWithOrderForGoods.saveOrderForGoods();
		}
		else {
			if (!flag.judgeIfaNewOrderForGoods) {
				var span;
				$.each($("span.index"), function(index, target) {
					if (target.innerHTML == flag.flagIndex) {
						span = target;
						return;
					}
				})
				dealWithOrderForms.deleteOrderList(span.parentNode.parentNode);
				flag.judgeIfaNewOrderForGoods = true;
			}
		}
		dealWithOrderForGoods.closeOrderForGoods();
	});

	//点击订单中的取消按钮
	$("button.cancleOrder").on("click", dealWithOrderForGoods.closeOrderForGoods);

	//点击订单中的付款按钮
	$("button.payNow").on("click", dealWithPayment.gotToPaying);

	//点击付款订单中的付款按钮
	$("button.goToPaying").on("click", dealWithReceipts.confirmPay);

	//点击付款订单中的取消按钮
	$("button.canclePayment").on("click", dealWithPayment.stopPayment);

	//点击收据中的拿走收据按钮
	$("button.takeOutReceipts").on("click", dealWithReceipts.takeOutReceipts);
}

$(function() {
	//connetDataBase.getAllSaleMenu("奶盖类");

	bindEvent();

	var colnum = $(".menuTable thead tr th").length;
	var lastTdInnerHtml = "<button class='btn btn-info btn-xs add'><span class='glyphicon glyphicon-plus'></span></button>";
	commentProcess.insertTableRow(flag.menuTbody, colnum, ["芝士奶盖", "15", "350", lastTdInnerHtml], dealWithOrderForGoods.btnAddClick);
	commentProcess.insertTableRow(flag.menuTbody, colnum, ["芝士奶盖", "15", "350", lastTdInnerHtml], dealWithOrderForGoods.btnAddClick);
	commentProcess.insertTableRow(flag.menuTbody, colnum, ["芝士奶盖", "15", "350", lastTdInnerHtml], dealWithOrderForGoods.btnAddClick);
	commentProcess.insertTableRow(flag.menuTbody, colnum, ["芝士奶盖", "15", "350", lastTdInnerHtml], dealWithOrderForGoods.btnAddClick);
	commentProcess.insertTableRow(flag.menuTbody, colnum, ["芝士奶盖", "15", "350", lastTdInnerHtml], dealWithOrderForGoods.btnAddClick);
	commentProcess.insertTableRow(flag.menuTbody, colnum, ["芝士奶盖", "15", "350", lastTdInnerHtml], dealWithOrderForGoods.btnAddClick);
	commentProcess.insertTableRow(flag.menuTbody, colnum, ["芝士奶盖", "15", "350", lastTdInnerHtml], dealWithOrderForGoods.btnAddClick);
})