//表格默认值
var tableDefaultValue = {
	defaultName: "奶茶",
	defaultPrice: 11,
	defaultDaySaleNum: 0,
	defaultMonSaleNum: 0,
	
	maxId: 0,

	removeOperation: "<button class='btn btn-danger btn-xs operation'><span class='glyphicon glyphicon-minus'></span></button>",
	addOperation: "<button class='btn btn-danger btn-xs operation'><span class='glyphicon glyphicon-plus'></span></button>",

	colnum: $("th").length,
	tbody: document.getElementsByTagName("tbody")[0]
};

//存储的修改过后的表格的数据
var array = {
	deleteRow: new Array(),
	addRow: new Array(),
	modifyRow: new Array(),

	deleteRowJson: new Array(),
	addRowJson: new Array(),
	modifyRowJson:new Array()
};

//manager的表格处理事件
var managerTableProcess = {
	//具体显示表格的方法
	showTableRow: function(tbody, colnum, tdValue, typeId, typeName) {
		var type = $(".type");
		var flag = false;     //判断表格中是否存在该类别，false表示不存在

		var insertIndex = 0;
		
		for (var i = type.length - 1; i >= 0; i--) {
			if (type[i].name === typeId) {
				flag = true;
				break;
			}
		};

		if (!flag) {
			commentTableProcess.insertHeadRow(tbody, colnum, typeId, typeName);
			insertIndex = -1;
		}
		else {
			insertIndex = managerTableProcess.searchPosition(tbody, typeId);
		}
		
		var row = commentTableProcess.insertTr(tbody, insertIndex, colnum, tdValue, typeId);
		row.className = "content";
		managerTableProcess.bindTotalMouseEvent(row);
	},

	//判断数据插入的表格位置
	searchPosition: function(tbody, name) {
		var index;
		var type = new Array();
		var tr = tbody.getElementsByTagName("tr");
		$.each(tr, function(i, rowTarget) {
			if (rowTarget.className === "type") {
				type[type.length] = rowTarget;
			}
		});
		
		for(var i=0; i<type.length; i++) {
			if (type[i].name === name) {
				if (type[i+1]) {
					index = type[i+1].rowIndex;
				}
				else {
					index = -1;
				}
				break;
			}
		}
		
		return index;
	},

	//显示操作按钮：删除行 &  插入行
	showOperationLogle: function(operation) {
		operation[0].style.visibility = "visible";
		operation[1].style.visibility = "visible";
	},

	//隐藏操作按钮
	hideOperationLogle: function(operation) {
		operation[0].style.visibility = "hidden";
		operation[1].style.visibility = "hidden";
	},

	//改变lineThrough样式
	toggleLineThrough: function(target, flag) {
		if (flag) {
			target.style.textDecoration = "line-through";
		}
		else {
			target.style.textDecoration = "none";
		}
	},

	//鼠标经过表格行的样式处理
	mouseoverRowEvent: function(rowTarget, operation) {
		if (rowTarget.className === "content") {
			rowTarget.className = "content success";
		};
		
		managerTableProcess.showOperationLogle(operation);
	},

	//鼠标离开表格行的样式处理
	mouseoutRowEvent: function(rowTarget, operation) {
		if (rowTarget.className === "content success") {
			rowTarget.className = "content";
		};
		
		managerTableProcess.hideOperationLogle(operation);
	},

	//点击删除行按钮
	clickRemoveOperation: function(rowTarget, btn) {
		var flag;
		var value;
		if (rowTarget.style.textDecoration == "" || rowTarget.style.textDecoration == "none") {
			flag = true;
			btn.innerHTML = "<span class='glyphicon glyphicon-repeat'></span>";
		}
		else {
			flag = false;
			btn.innerHTML = "<span class='glyphicon glyphicon-minus'></span>";
		}
		managerTableProcess.toggleLineThrough(rowTarget, flag);
	},

	//点击添加行按钮
	clickAddOperation: function(rowTarget) {
		var name = rowTarget.name;
		var insertIndex = rowTarget.rowIndex + 1;
		tableDefaultValue.maxId = managerTableProcess.getMaxId() + 1;
		var date = (new Date()).toLocaleDateString();
		var tdValue =  [tableDefaultValue.removeOperation, tableDefaultValue.maxId, tableDefaultValue.defaultName, tableDefaultValue.defaultPrice, date, 
		tableDefaultValue.defaultDaySaleNum, tableDefaultValue.defaultMonSaleNum, tableDefaultValue.addOperation];

		var row = commentTableProcess.insertTr(tableDefaultValue.tbody, insertIndex, tableDefaultValue.colnum, tdValue, name);
		row.className = "warning";
		managerTableProcess.bindTotalMouseEvent(row);
	},

	//双击单元格的样式处理
	dblclickCellsEvent: function(rowTarget) {
		$.each(rowTarget.getElementsByTagName("td"), function(index, cellTarget) {
			cellTarget.ondblclick = function() {
				if (index == 2) {
					modifyMethod.changeIntoEdit(cellTarget, "string", "奶茶");
				}
				else if (index == 3) {
					modifyMethod.changeIntoEdit(cellTarget, "number", 11);
				}
				else if (index == 4) {
					modifyMethod.changeDate(cellTarget);
				}
				else if (index == 5 || index == 6) {
					modifyMethod.changeIntoEdit(cellTarget, "number", 0)
				}
			}
		});
	},

	//表格鼠标处理事件汇总
	bindTotalMouseEvent: function(rowTarget) {
		var operation = rowTarget.getElementsByClassName("operation");
		var removeBtn = operation[0];
		var addBtn = operation[1];

		rowTarget.onmouseover = function() {
			managerTableProcess.mouseoverRowEvent(rowTarget, operation);
		};
		rowTarget.onmouseout = function() {
			managerTableProcess.mouseoutRowEvent(rowTarget, operation);
		};
		removeBtn.onclick = function() {
			managerTableProcess.clickRemoveOperation(rowTarget, removeBtn);
		};
		addBtn.onclick = function() {
			managerTableProcess.clickAddOperation(rowTarget);
		};
		managerTableProcess.dblclickCellsEvent(rowTarget);
	},

	//获得表格中的最大的id
	getMaxId: function() {
		var tr = $("tbody > tr");
		var maxId = tableDefaultValue.maxId;
		for (var i = tr.length - 1; i >= 0; i--) {
			if(tr[i].className !== "type") {
				var temp = tr[i].cells[1].innerHTML;
				if (parseInt(maxId) < parseInt(temp)) {
					maxId = parseInt(temp);
				};
			};
		};
		return maxId;
	}
};

//保存处理过后的表格数据
var saveData = {
	//将被删除的行存入队列中
	setDeleteRow: function() {
		var row = $("tbody tr");
		for (var len = row.length, i = len - 1; i >= 0; i--) {
			if (row[i].style.textDecoration == "line-through" && row[i].className != "warning") {
				array.deleteRow.push(row[i]);
			}
		};
	},

	//将被添加的行存入队列中
	setAddRow: function() {
		var row = $(".warning");
		for (var len = row.length, i = len - 1; i >= 0; i--) {
			if(row[i].style.textDecoration != "line-through") {
				array.addRow.push(row[i]);
			}
		};
	},

	//将被修改的行存入队列中
	setModifyRow: function() {
		var row = $(".content");
		for (var i = row.length - 1; i >= 0; i--) {
			if(row[i].style.textDecoration != "line-through") {
				var td = row[i].getElementsByTagName("td");
				for (var len = td.length, j= len - 2; j >= 1; j--) {
					var index = j;
					if (index == 2 || index == 3 || index == 5 || index == 6) {
						if (td[index].style.color == "red") {
							array.modifyRow.push(td[index].parentNode);
							break;
						}
					}
					else if (index == 4) {
						if (td[index].getElementsByTagName("select").length != 0) {
							array.modifyRow.push(td[index].parentNode);
							break;
						}
					}
				};
			}
		};
	},

	//将队列变成数组的形式
	changQueueIntoJson: function(rawQueue) {
		var array = new Array();
		for (var i = rawQueue.length - 1; i >= 0; i--) {
			var temp = {"id": rawQueue[i].cells[1].innerHTML, 
					    "proname": rawQueue[i].cells[2].innerHTML, 
			            "price": rawQueue[i].cells[3].innerHTML, 
			            "date": rawQueue[i].cells[4].innerHTML, 
			            "dayqty": rawQueue[i].cells[5].innerHTML, 
			            "monqty": rawQueue[i].cells[6].innerHTML,
			            "type": rawQueue[i].name};
			array[i] = temp;
		}
	
		//将数组array转换成json对象
		var jsonData = {
			"data": JSON.stringify(array)
		};
		/*var data = eval(jsonData.data);
		$.each(data, function(index, jsonTarget) {
			alert(jsonTarget.price);
		});*/
		
		return jsonData;
	}
};

//刷新表格事件
var refreshTable = {
	//根据后台返回的数据渲染整个表格
	showTable: function(jsondata) {
		$("tbody").html("");
		array.deleteRow = [];
		array.addRow = [];
		array.modifyRow = [];
		
		var data = eval(jsondata);
		$.each(data, function(index, row) {
			var date = row.udate.substring(0,4) + "/" + parseInt(row.udate.substring(5,7)) + 
			"/" + parseInt(row.udate.substring(8,10));
			var tdValue = 
				[tableDefaultValue.removeOperation, row.id, row.proname, row.price, date, row.dayqty, row.monqty, tableDefaultValue.addOperation];
			managerTableProcess.showTableRow(tableDefaultValue.tbody, tableDefaultValue.colnum, tdValue, row.type.id, row.type.name);
		});
	},

	//提交所以修改后刷新整个表格
	refreshTotalTable: function() {
		saveData.setAddRow();
		array.addRowJson = saveData.changQueueIntoJson(array.addRow);
		publicConnected.pushData("addProduct", "post", array.addRowJson, refreshTable.showTable, publicConnected.errorHappened);
		var data = eval(array.addRowJson.data);
		$.each(data, function(index, jsonTarget) {
			alert("addRow:" + jsonTarget.id);
		});
		
		saveData.setModifyRow();
		array.modifyRowJson = saveData.changQueueIntoJson(array.modifyRow);
		publicConnected.pushData("updateProduct", "post", array.modifyRowJson, refreshTable.showTable, publicConnected.errorHappened);
		var data = eval(array.modifyRowJson.data);
		$.each(data, function(index, jsonTarget) {
			alert("modifyRow:" + jsonTarget.id);
		});
		
		saveData.setDeleteRow();
		array.deleteRowJson = saveData.changQueueIntoJson(array.deleteRow);
		publicConnected.pushData("deleteProduct", "post", array.deleteRowJson, refreshTable.showTable, publicConnected.errorHappened);
		var data = eval(array.deleteRowJson.data);
		$.each(data, function(index, jsonTarget) {
			alert("deleteRow:" + jsonTarget.id);
		});
	},

	//实现界面重置刷新，即点击cancle
	resetTable: function() {
		publicConnected.pushData("findAll", "post", "", refreshTable.showTable, publicConnected.errorHappaned);
	}
};

//蒙层弹出提示处理方式
var showTips = {
	//打开弹出框事件
	popUp: function(message, handlerFunc) {
		$(".Mongolia-laye").css("display","block");
		$(".popup").css("display", "block");
		$(".message").text(message);

		var btn = $(".popup button");
		btn[0].onclick = function() {
			showTips.closePopup();
			handlerFunc ? handlerFunc() : "";
		};
		btn[1].onclick = function() {
			showTips.closePopup();
		};
	},

	//关闭弹出框
	closePopup: function() {
		$(".Mongolia-laye").css("display","none");
		$(".popup").css("display", "none");
	}
};

var bindEvent = function() {

	//绑定筛选、搜索部分的事件
	//当排序条件发生变化时
	$("select.order").on("change", function() {
		var data = {
			"orderValue": searchValue.getOrderValue()
		};

		//publicConnected.pushData("orderby", "post", data, refreshTable.showTable, publicConnected.errorHappened);
	});

	//当点击搜索按钮时
	$("button.searchBtn").on("click", function() {
		var data = {
			"orderValue": searchValue.getOrderValue(),
			"searchTypeValue": searchValue.getSearchTypeValue(),
			"searchInputValue": searchValue.getSearchTypeValue()
		};
	    //publicConnected.pushData("search", "post", data, refreshTable.showTable, publicConnected.errorHappened);
	});

    //点击save按钮
    $(".save").on("click", function() {
    	showTips.popUp("确定提交所以操作？", refreshTable.refreshTotalTable);
    });

    //点击cancel按钮
    $(".cancel").on("click", function() {
    	showTips.popUp("确定取消所有操作？", refreshTable.resetTable);
    });
};

$(document).ready(function() {
	bindEvent();

	alert("双击表格可以直接在界面上修改表格");

	publicConnected.pushData("findAll", "post", "", 
		refreshTable.showTable, publicConnected.errorHappened);
});