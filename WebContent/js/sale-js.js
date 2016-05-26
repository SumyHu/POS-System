//保存一些全局变量、通用方法
var flagValue = {
	productTypeId: "1",     //标签页选中的选项

	goodsNum: "<a><span class='glyphicon glyphicon-minus minusNum'></span></a><span class='goodsNum'>1</span>" +
		"<a><span class='glyphicon glyphicon-plus addNum'></span></a>",    //订单table表示数量的html
	removeBtnHtml: "<a><span class='glyphicon glyphicon-remove'></span></a>",     //订单table中删除按钮的html
	saveData: new Array(),    //存储订单中的点餐项
	judgeIfaNewOrderForGoods: true,    //判断该订单项是否为新添加的订单
	openOrderForGoodsIndex: 0,    //标记被点开的订单的下标
	currentOrderForGoodsId: 0,

	//menuTable为点餐表格，orderForGoodsTable为订单表格，payingTable为付款表格,receiptsTable为收据表格
	menuTableTbody: document.getElementsByClassName("menuTable")[0].getElementsByTagName("tbody")[0],
	orderForGoodsTableTbody: document.getElementById("orderForGoods").getElementsByTagName("tbody")[0],
	paymentTableTbody: document.getElementById("paying").getElementsByTagName("tbody")[0],
	receiptsTableTbody: document.getElementById("receipts").getElementsByTagName("tbody")[0],

	menuTableColnum: $(".menuTable th").length,
	orderForGoodsTableColnum: $("#orderForGoods th").length,
	paymentTableColnum: $("#paying th").length,
	receiptsTableColnun: $("#receipts th").length,
	
	//清理表格中的内容
	clearTable: function(tbody) {
		while(tbody.hasChildNodes()) {
			tbody.removeChild(tbody.childNodes[0]);
		}
	}
};

//点餐表格处理事件
var menuTableProcess = {
	//根据后台数据显示整个点餐表格
	showMenuTable: function(jsondata) {
		var data = eval(jsondata);
		$.each(data, function(index, rowTarget) {
			var tdValue = [rowTarget.proname, rowTarget.price, rowTarget.number];
			var typeId = rowTarget.type.id;
			menuTableProcess.addMenuTableRow(tdValue, typeId);
		});
	},

	//具体显示点餐表格的方法
	addMenuTableRow: function(tdValue, typeId) {
		var row;
		if (typeId) {
			row = commentTableProcess.addRow(flagValue.menuTableTbody, flagValue.menuTableColnum, tdValue, typeId);
		}
		else {
			row = commentTableProcess.addRow(flagValue.menuTableTbody, flagValue.menuTableColnum, tdValue);
		}
		menuTableProcess.bindMenuTableMouseEvent(row);
	},

	//点击添加行按钮
	clickAddBtn: function(rowTarget) {
		var tdValue = [rowTarget.cells[0].innerHTML, rowTarget.cells[1].innerHTML, rowTarget.cells[2].innerHTML, flagValue.goodsNum, flagValue.removeBtnHtml];

		if ($("#orderForGoods").css("display") === "none") {
			//publicConnected.pushData("newSaleAction", "post", "", orderForGoodsProcess.bindCurrentOrderForGoodsId, publicConnected.errorHappened);
			
			orderForGoodsProcess.showOrderForGoods();
			flagValue.judgeIfaNewOrderForGoods = true;

			if ($("#orderForms").css("display") === "block") {
				orderFormsProcess.closeOrderForms();
			}
		}
		var row = orderForGoodsProcess.addOrderForGoodsTableRow(tdValue);
		
		//根据后台返回的销售明细id将销售明细与id绑定（给该表格行的id赋值为销售明细表的id）
		var bindOrderForGoodsTableRowId =  function(id) {
			row.id = id;
		};
		
		var data = {
				"currentOrderForGoodsId": flagValue.currentOrderForGoodsId,
				"proId": tdValue[0],
				"saleNum": parseInt(tdValue[3])
		};
		//publicConnected.pushData("AddSalesLineItemAction", "post", data, bindOrderForGoodsTableRowId, publicConnected.errorHappened);
	},

	//点餐表格鼠标处理事件汇总
	bindMenuTableMouseEvent: function(rowTarget) {
		var addBtn = rowTarget.getElementsByClassName("add")[0];

		rowTarget.onmouseover = function() {
			$(this).addClass("success");
		};
		rowTarget.onmouseout = function() {
			$(this).removeClass("success");
		};
		
		addBtn.onclick = function() {
			menuTableProcess.clickAddBtn(rowTarget);
		};
	},
};

//订单处理事件
var orderForGoodsProcess = {
	//显示订单表格
	showOrderForGoods: function() {
		$("#orderForGoods").css("display", "block");
		$("button.waitingPay").attr("disabled", true);
	},
	
	//关闭订单
	closeOrderForGoods: function() {
		$("#orderForGoods").css("display", "none");
		$("button.waitingPay").attr("disabled", false);

		flagValue.clearTable(flagValue.orderForGoodsTableTbody);

		flagValue.judgeIfaNewOrderForGoods = true;
	},
	
	//用一个全局变量存储当前打开的订单Id
	bindCurrentOrderForGoodsId: function(id) {
		flagValue.currentOrderForGoodsId = id;
	},
	
	//在订单表格添加行的方法
	addOrderForGoodsTableRow: function(tdValue) {
		var row = commentTableProcess.addRow(flagValue.orderForGoodsTableTbody, flagValue.orderForGoodsTableColnum, tdValue);
		orderForGoodsProcess.bindOrderForGoodsTableMouseEvent(row);
		return row;
	},
	
	//保存某一订单中所有的点餐项到数组saveData中
	saveOrderForGoods: function(index) {
		var rows = $("#orderForGoods table tbody tr");
		var item = new Array();
		$.each(rows, function(index, rowTarget) {
			item[index] = {
				"proId": rowTarget.childNodes[0].innerHTML,
				"milkTeaName": rowTarget.childNodes[1].innerHTML,
				"price": rowTarget.childNodes[2].innerHTML,
				"num": rowTarget.childNodes[3].innerHTML
			}
		});
		flagValue.saveData[index] = {
			"orderForGoodsId": flagValue.currentOrderForGoodsId,
			"item": item
		};
	},

	//订单表格每一行鼠标处理事件汇总
	bindOrderForGoodsTableMouseEvent: function(rowTarget) {
		var minusNumBtn = rowTarget.getElementsByClassName("minusNum")[0];
		var addNumBtn = rowTarget.getElementsByClassName("addNum")[0];
		var removeBtn = rowTarget.getElementsByClassName("glyphicon-remove")[0];

		//点击数量的-按钮，数量减一
		minusNumBtn.onclick = function() {
			var goodsNum = $(this).parent().next();
			goodsNum.text(goodsNum.text()- 1);

			//如点餐项数量为0，则删除该项
			if (goodsNum.text() == 0) {
				rowTarget.remove();
				
				//publicConnected.pushData("removeSaleLineItem", "post", rowTarget.id, "", publicConnected.errorHappened);
			}
		};

		//点击数量的+按钮，数量加一
		addNumBtn.onclick = function() {
			var goodsNum = $(this).parent().prev();
				goodsNum.text(parseInt(goodsNum.text()) + 1);
		};

		//点击删除按钮
		removeBtn.onclick = function() {
			rowTarget.remove();
			
			//publicConnected.pushData("removeSaleLineItem", "post", rowTarget.id, "", publicConnected.errorHappened);
		};
	},

	//整个订单按钮事件
	orderForGoodsTableBtnEvent: function() {
		//点击订单中的付款按钮
		$("button.payNow").on("click", function() {
			paymentProcess.showPayment();
			$("#orderForGoods").css("display", "none");
			$("button.waitingPay").attr("disabled", true);
		});

		//点击订单中的保存按钮
		$("button.save").on("click", function() {
			if ($("#orderForGoods table tbody tr").length !== 0) {
				var index;
				if (flagValue.judgeIfaNewOrderForGoods) {
					index = orderFormsProcess.getMaxIndex() + 1;
					orderFormsProcess.addOrderForms();
				}
				else {
					index = flagValue.openOrderForGoodsIndex;
				}
				orderForGoodsProcess.saveOrderForGoods(index);
			}
			
			else {
				if (!flagValue.judgeIfaNewOrderForGoods) {
					var span;
					$.each($("span.index"), function(index, target) {
						if (target.innerHTML === flagValue.openOrderForGoodsIndex) {
							span = target;
							return;
						}
					});
					orderFormsProcess.deleteOrderList(span.parentNode.parentNode);
					flagValue.judgeIfaNewOrderForGoods = true;
				}
				//publicConnected.pushData("removeSaleAction", "post", flagValue.currentOrderForGoodsId, "", publicConnected.errorHappened);
			}
			orderForGoodsProcess.closeOrderForGoods();
		});

		//点击订单中的取消按钮
		$("button.cancleOrder").on("click", function() {
			//publicConnected.pushData("clearSaleAction", "post", flagValue.currentOrderForGoodsId, "", publicConnected.errorHappened);
			var dataArray = flagValue.saveData[flagValue.openOrderForGoodsIndex].item;
			if(!flagValue.judgeIfaNewOrderForGoods && dataArray.length !== 0) {
				for(var i=0; i<dataArray.length; i++) {
					var data = {
						"currentOrderForGoodsId": flagValue.openOrderForGoodsIndex,
						"proId": dataArray[i].proId,
						"saleNum": parseInt(dataArray[i].num)
					};
					//publicConnected.pushData("AddSalesLineItemAction", "post", data, bindOrderForGoodsTableRowId, publicConnected.errorHappened);
					
				}
			}
			orderForGoodsProcess.closeOrderForGoods();
		});
	}
};

//待付款界面处理事件
var orderFormsProcess = {
	//显示待付款界面
	showOrderForms: function() {
		$(".waitingPay span:nth-child(2)").attr("class", "glyphicon glyphicon-chevron-down");
		$("#orderForms").css("display", "block");
	},

	//关闭待付款项
	closeOrderForms: function() {
		$(".waitingPay span:nth-child(2)").attr("class", "glyphicon glyphicon-chevron-up");
		$("#orderForms").css("display", "none");
	},

	//增加一项待付款订单
	addOrderForms: function() {
		$("span.waitingPayNum").text(parseInt($("span.waitingPayNum").text())+1);

		var index = parseInt(orderFormsProcess.getMaxIndex()) + 1;
		$("#orderForms ul").append("<li><a class='btn btn-defalut order'>订单" +"<span class='index'>" + index
				+ "</span></a><a class='btn btn-defalut removeOrder'><span>X</span></a></li>");

		orderFormsProcess.bindOrderFormsEvent($("#orderForms ul li:last"));
	},

	//求待付款项最大的index
	getMaxIndex: function() {
		var maxindex = 0;
		$.each($("span.index"), function(i, compareTarget) {
			maxindex = Math.max(maxindex, compareTarget.innerHTML);
		});
		return maxindex;
	},

	//删除某一待付款项
	deleteOrderList: function(target) {
		target.remove();
		$("span.waitingPayNum").text($("span.waitingPayNum").text()-1);
		var index = parseInt($(target).find("a span.index").text());
		flagValue.saveData[index] = "";
		
		//publicConnected.pushData("removeSaleAction", "post", flagValue.currentOrderForGoodsId, "", publicConnected.errorHappened);
	},

	//点击某一具体待付款订单，打开相应的订单界面
	clickOrderForms: function(orderListTarget) {
		var i = $(orderListTarget).find(".index").text();

		flagValue.judgeIfaNewOrderForGoods = false;
		flagValue.openOrderForGoodsIndex = i;
		
		orderForGoodsProcess.bindCurrentOrderForGoodsId(flagValue.saveData[i].currentOrderForGoodsId);

		orderForGoodsProcess.showOrderForGoods();
		$.each(flagValue.saveData[i].item, function(index, array) {
			var tdValue = 
			[array.proId, array.milkTeaName, array.price, array.num, "<a><span class='glyphicon glyphicon-remove'></span></a>"];
			orderForGoodsProcess.addOrderForGoodsTableRow(tdValue);
		});
	},

	//绑定每一个待付款订单的事件
	bindOrderFormsEvent: function(target) {
		//点击具体的待付款项中的某一订单
		target.find("a.order").on("click", function() {
			orderFormsProcess.clickOrderForms(this);
			orderFormsProcess.closeOrderForms();
		});

		//点击删除按钮
		target.find("a.removeOrder").on("click", function() {
			orderFormsProcess.deleteOrderList($(this).parent("li"));
		});
	}
};

//付款界面处理事件
var paymentProcess = {
	//显示付款界面
	showPayment: function() {
		$("button.add").attr("disabled", true);
		$("button.waitingPay").attr("disabled", true);

		$("div#paying").css("display", "block");
		var row = $("#orderForGoods table tbody tr");
		var totalCost = 0;
		$.each(row, function(index, rowTarget) {
			var goodsNum = rowTarget.childNodes[3].getElementsByClassName("goodsNum")[0].innerHTML;
			var tdValue = 
			[rowTarget.childNodes[0].innerHTML, rowTarget.childNodes[1].innerHTML, rowTarget.childNodes[2].innerHTML, goodsNum];

			commentTableProcess.addRow(flagValue.paymentTableTbody, flagValue.paymentTableColnum, tdValue);

			totalCost = totalCost + rowTarget.childNodes[2].innerHTML*goodsNum;
		});

		$("span.totalCost").text(totalCost);
		$("button.goToPaying").attr("disabled", true);
		
		//当实际付款金额发生变化时
		$(".realPayNum").on("change", function() {
			var totalCost = paymentProcess.getRealPayment();
			paymentProcess.calculateChangeNum(totalCost);
		});

		flagValue.clearTable(flagValue.orderForGoodsTableTbody);
		$("div#orderForGoods").css("display", "none");
	},
	
	//关闭付款界面
	closePayment: function() {
		$("div#paying").css("display", "none");
		$("button.add").attr("disabled", false);
		$("button.waitingPay").attr("disabled", false);

		if (!flagValue.judgeIfaNewOrderForGoods) {
			paymentProcess.savePayment(flagValue.openOrderForGoodsIndex);
		}

		$("input.realPayNum").val("");
		$("span.change").text("");

		flagValue.clearTable(flagValue.paymentTableTbody);

		flagValue.judgeIfaNewOrderForGoods = true;
	},

	//保存付款界面的内容到数组saveData中，使得待付款订单中的内容得到动态更新
	savePayment: function(index) {
		var rows = $("#paying table tbody tr");
		var item = new Array();
		$.each(rows, function(index, rowTarget) {
			item[index] = {
				"proId": rowTarget.childNodes[0].innerHTML,
				"milkTeaName": rowTarget.childNodes[1].innerHTML,
				"price": rowTarget.childNodes[2].innerHTML,
				"num": "<a><span class='glyphicon glyphicon-minus minusNum'></span></a><span class='goodsNum'>" + 
					rowTarget.childNodes[3].innerHTML +"</span>" + "<a><span class='glyphicon glyphicon-plus addNum'></span></a>"
			}
		});
		flagValue.saveData[index].item = item;
	},

	//获取实际付款的值
	getRealPayment: function() {
		return $("span.totalCost").text();
	},

	//计算实际找零数
	calculateChangeNum: function(totalCost) {
		if ($("input.realPayNum").val() - totalCost >= 0) {
			$("span.change").text($("input.realPayNum").val() - totalCost);
			$("button.goToPaying").attr("disabled", false);
		}
		else {
			$("span.change").text("实际付款不足以支付！");
		}
	},

	//付款界面的绑定的事件处理
	bindPaymentEvent: function() {
		//点击付款按钮
		$("button.goToPaying").on("click", function() {
			receiptsProcess.showReceipts();
			paymentProcess.closePayment();
			
			//publicConnected.pushData("endSaleAction", "post", flagValue.currentOrderForGoodsId, "", publicConnected.errorHappened);
			//publicConnected.pushData("makePayment", "post", flagValue.currentOrderForGoodsId, "", publicConnected.errorHappened);
		});

		//点击取消按钮
		$("button.canclePayment").on("click", paymentProcess.closePayment);
	}
};

//收据界面处理事件
var receiptsProcess = {
	//打开收据界面
	showReceipts: function() {
		$("#receipts").css("display", "block");

		var row = $("#paying table tbody tr");
		var data = new Array();
		$.each(row, function(index, rowTarget) {
			var tdValue = 
			[rowTarget.childNodes[0].innerHTML, rowTarget.childNodes[1].innerHTML, rowTarget.childNodes[2].innerHTML, rowTarget.childNodes[3].innerHTML];

			commentTableProcess.addRow(flagValue.receiptsTableTbody, flagValue.receiptsTableColnun, tdValue);

			var temp = {
				"proname": tdValue[0],
				"price": tdValue[1],
				"number": tdValue[2]
			}
			data[index] = temp;
		});
		var jsondata = JSON.stringify(data);

		$("span.receiptsTotalCost").text($("span.totalCost").text());
		$("span.receiptsRealPayNum").text($("input.realPayNum").val());
		$("span.receiptsChange").text($("span.change").text());
		$("span.date").text(new Date().toLocaleString());
		
		if (!flagValue.judgeIfaNewOrderForGoods) {
			var li = $("div#orderForms ul li");
			$.each(li, function(index, liTarget) {
				if (liTarget.getElementsByClassName("index")[0].innerHTML == flagValue.openOrderForGoodsIndex) {
					orderFormsProcess.deleteOrderList(liTarget);
					return;
				}
			});
		}

		//publicConnectDataBase.pushData(url, "post", jsondata, "", publicConnected.errorHappened);
	},

	//关闭收据界面
	closeReceipts: function() {
		$("div#receipts").css("display", "none");
		flagValue.clearTable(flagValue.receiptsTableTbody);

		$("button.add").attr("disabled", false);
		$("button.waitingPay").attr("disabled", false);
		flagValue.judgeIfaNewOrderForGoods = true;
	}
};

//绑定整个界面的事件
var bindEvent = function() {
	//当点击了标签页里面的选项
	$.each($(".nav-tabs li"), function(index, liTarget) {
		liTarget.onclick = function() {
			flagValue.productTypeId = liTarget.childNodes[0].name;
			var data = {
				"productTypeId": flagValue.productTypeId
			};
			//publicConnected.pushData("search", "post", data, menuTableProcess.showMenuTable, publicConnected.errorHappened);
		};
	});

	//当点击搜索按钮时
	$("button.searchBtn").on("click", function() {
		var data = {
			"productTypeId": flagValue.productTypeId,
			"searchInputValue": searchValue.getSearchTypeValue()
		};
	    //publicConnected.pushData("search", "post", data, menuTableProcess.showMenuTable, publicConnected.errorHappened);
	});

	//点击待付款按钮
	$(".waitingPay").on("click", function() {
		if ($("#orderForms").css("display") == "none" ) {
			orderFormsProcess.showOrderForms();
		}
		else {
			orderFormsProcess.closeOrderForms();
		}
	});
	
	//实现各种界面的全局按钮事件
	orderForGoodsProcess.orderForGoodsTableBtnEvent();
	paymentProcess.bindPaymentEvent();
	$("button.takeOutReceipts").on("click", receiptsProcess.closeReceipts);
};

$(function() {
	//publicConnected.pushData("search", "post", "1", menuTableProcess.showMenuTable, publicConnected.errorHappened);

	bindEvent();

	var lastTdInnerHtml = "<button class='btn btn-info btn-xs add'><span class='glyphicon glyphicon-plus'></span></button>";
	var tdValue = ["01", "芝士奶盖", "15", lastTdInnerHtml];
	menuTableProcess.addMenuTableRow(tdValue);
	menuTableProcess.addMenuTableRow(tdValue);
	menuTableProcess.addMenuTableRow(tdValue);
	menuTableProcess.addMenuTableRow(tdValue);
});