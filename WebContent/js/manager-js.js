//向数据库传送的各种数据行统计
var pushData = {
	deleteRow: new Array(),
	addRow: new Array(),
	modifyRow: new Array(),

	deleteRowJson: new Array(),
	addRowJson: new Array(),
	modifyRowJosn: new Array(),
};

//获取各种数据
var getData = {
	tbody: document.getElementsByTagName("tbody")[0],
	tr: document.getElementsByClassName("content"),     //获取除了产品类型标题的行之外的其他行

	maxId: 0, 
	
	colnum: document.getElementsByTagName("thead")[0].getElementsByTagName("th").length,
	defaultName: "奶茶",
	defaultPrice: 11,
	defaultDaySaleNum: 0,
	defaultMonSaleNum: 0,

	url: ""
};

//连接数据库
var connectDataBase = {
	//初始化，获取所有数据表格
	showTable: function(jsondata) {
		var data = eval(jsondata);
		$.each(data, function(index, row) {
			var date = row.udate.substring(0,4) + "/" + parseInt(row.udate.substring(5,7)) + 
			"/" + parseInt(row.udate.substring(8,10));
			var tdValue = 
				[row.id, row.proname, row.price, date, row.dayqty, row.monqty];
			dueWithData.showTableRow(getData.tbody, row.type.id, row.type.name, getData.colnum, tdValue, false);
		});
	},

	//传送数据给后台
	//当排序列表的值发生变化时，将下拉列表的值传给后台
	pushSelectedValue: function(selectedValue) {
		publicConnectDataBase.pushData(getData.url, "post", selectedValue, connectDataBase.showTable, publicConnectDataBase.errorHappaned);
	},

	//当点击了搜索按钮之后或input的值发生变化时，将排序列表的值、搜索列表的值、搜索框的值传给后台
	pushSearchData: function(selectedValue, searchType, inputValue) {
		if (inputValue != "" && searchType != "全部") {
			var data = {
				"selectedValue": selectedValue,
				"searchType": searchType,
				"inputValue": inputValue
			};
			publicConnectDataBase.pushData(getData.url, "post", data, connectDataBase.showTable, publicConnectDataBase.errorHappaned);
		}
		else if (inputValue == "" && searchType == "全部") {
			var data = "*";
			publicConnectDataBase.pushData(getData.url, "post", data, connectDataBase.showTable, publicConnectDataBase.errorHappaned);
		}
	},

	//实现局部刷新表格
	refreshDeleteOperation: function() {
		dueWithData.deleteRowFromTable();
	},
	
	refreshAddOperation: function() {
		dueWithData.addRowToTable();
	},
	
	refreshModifyOperation: function() {
		dueWithData.modifyRowOnTable();
	},

	//当点击了save按钮后，将要删除的行的json、要添加的行的json、要修改的行的数组传给json
	pushAllData: function() {
		
		dueWithData.setAddRow();
		pushData.addRowJson = dueWithData.changQueueIntoJson(pushData.addRow);
		publicConnectDataBase.pushData("addProduct", "post", pushData.addRowJson, connectDataBase.refreshAddOperation, publicConnectDataBase.errorHappaned);
		
		dueWithData.setModifyRow();
		pushData.modifyRowJson = dueWithData.changQueueIntoJson(pushData.modifyRow);
		publicConnectDataBase.pushData("updateProduct", "post", pushData.modifyRowJson, connectDataBase.refreshModifyOperation, publicConnectDataBase.errorHappaned);
		
		dueWithData.setDeleteRow();
		pushData.deleteRowJson = dueWithData.changQueueIntoJson(pushData.deleteRow);
		publicConnectDataBase.pushData("deleteProduct", "post", pushData.deleteRowJson, connectDataBase.refreshDeleteOperation, publicConnectDataBase.errorHappaned);
		
	}
};

var dueWithData = {

	//将被删除的行存入队列中 (unshift存入、pop移除)
	setDeleteRow: function() {
		var tr = $("tbody tr");

		for (var len = tr.length, i = len - 1; i >= 0; i--) {
			if (tr[i].style.textDecoration == "line-through") {
				pushData.deleteRow.push(tr[i]);
			}
		};
	},

	//将被添加的行存入队列中
	setAddRow: function() {
		var newRow = document.getElementsByClassName("warning");
		for (var len = newRow.length, i = len - 1; i >= 0; i--) {
			pushData.addRow.push(newRow[i]);
		};
	},

	//将被修改的行存入队列中
	setModifyRow: function() {
		var tr = getData.tr;
		for (var i = tr.length - 1; i >= 0; i--) {
			var td = tr[i].getElementsByTagName("td");
			for (var len = td.length, j= len - 2; j >= 1; j--) {
				var index = j;
				if (index == 2 || index == 3 || index == 5 || index == 6) {
					if (td[index].style.color == "red") {
						pushData.modifyRow.push(td[index].parentNode);
						break;
					}
				}
				else if (index == 4) {
					if (td[index].getElementsByTagName("select").length != 0) {
						pushData.modifyRow.push(td[index].parentNode);
						break;
					}
				}
			};
		};
	},

	getMaxId: function() {
		var tr = document.getElementsByTagName("tr");
		var maxId = 0;
		for (var i = tr.length - 1; i >= 0; i--) {
			if(tr[i].className != "type") {
				var temp = tr[i].cells[1].innerHTML;
				if (parseInt(maxId) < parseInt(temp)) {
					maxId = parseInt(temp);
				};
			}
		};
		return maxId;
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
		var jsonData = JSON.stringify(array);
		//alert(jsonData);
		$.each(eval(jsonData), function(index, jsonTarget) {
			//alert(jsonTarget.type);
		});
		
		return jsonData;  //
	},

	//实现界面局部刷新
	//实现删除行的界面刷新
	deleteRowFromTable: function() {
		var row;
		var tbody = getData.tbody;
		while(pushData.deleteRow.length != 0) {
			var row = pushData.deleteRow.pop();
			var name = row.name;
			row.remove();
		}
		var tr = $("tbody tr");
		$.each(tr, function(index, rowTarget) {
			if(rowTarget.className == "type") {
				if(index == tr.length-1 || tr[index+1].className == "type") {
					rowTarget.remove();
				}
			}
		});
	},

	//实现添加行的界面刷新
	addRowToTable: function() {
		while(pushData.addRow.length > 0) {
			var row = pushData.addRow.pop();
			var rowIndex = row.rowIndex;

			var tdValue = new Array();
			var td = row.getElementsByTagName("td");
			for (var i = td.length - 2; i >= 1; i--) {
				tdValue[i-1] = td[i].innerHTML;
			};
			
			if (row.style.textDecoration != "line-through") {
				insertTr(getData.tbody, row.name, rowIndex, getData.colnum, tdValue, false);
				row.remove();
			}
		}
	},

	//实现修改行的界面刷新
	modifyRowOnTable: function() {
		while(pushData.modifyRow.length != 0) {
			var row = pushData.modifyRow.pop();

			var td = row.getElementsByTagName("td");
			for (var i = td.length - 1; i >= 0; i--) {
				var index = i;
				if (index == 4) {
					var innerHTMLString = new Array();
					var select = row.getElementsByTagName("select");
					if (select.length > 0) {
						for (var j = select.length - 1; j >= 0; j--) {
							innerHTMLString[j] = select[j].getElementsByTagName("option")[select[j].selectedIndex].firstChild.nodeValue;
						}
						td[index].innerHTML = innerHTMLString.join("/");
					}
				}

				else {
					td[index].style.color = "#000";
				}
			};
		}
	},

	//实现界面重置刷新，即点击cancle
	resetTable: function() {
		var table = document.getElementsByTagName("table")[0];
		table.removeChild(getData.tbody);
		publicConnectDataBase.pushData("findAll", "post", "*", connectDataBase.showTable, publicConnectDataBase.errorHappaned);

		getData.deleteRow = "";
		getData.addRow = "";
		getData.modifyRow = "";
	},

	//判断数据插入位置
	searchPosition: function(name) {
		var tbody = getData.tbody;
		var index;
		var type = new Array();
		var tr = document.getElementsByTagName("tr");
		$.each(tr, function(i, rowTarget) {
			if (rowTarget.className == "type") {
				type[type.length] = rowTarget;
			}
		});
		
		for(var i=0; i<type.length; i++) {
			if (type[i].name == name) {
				if (type[i+1]) {
					index = type[i+1].rowIndex - 1;
				}
				else {
					index = document.getElementsByTagName("tr").length-1;
				}
				break;
			}
		}
		
		return index;
	},

	//渲染数据库数据
	showTableRow: function(tbody, typeId, typeName, colnum, tdValue, btnClickFlag) {
		var type = document.getElementsByClassName("type");
		var flag = false;     //判断表格中是否存在该类别，false表示不存在

		var insertIndex = 0;
		
		for (var i = type.length - 1; i >= 0; i--) {
			if (type[i].name == typeId) {
				flag = true;
				break;
			}
		};

		if (!flag) {
			insertHeadRow(typeId, typeName);
			insertIndex = document.getElementsByTagName("tr").length-1;
		}
		else {
			insertIndex = dueWithData.searchPosition(typeId);
		}
		
		insertTr(tbody, typeId, insertIndex, colnum, tdValue, btnClickFlag);
	}
};

//事务逻辑处理
var managerBusinessLogic =  {

	//添加操作按钮：删除行 &  插入行
	addOperationLogle: function(target, className) {
		target.className = className;
		var child = target.getElementsByClassName("operation");
		child[0].style.visibility = "visible";
		child[1].style.visibility = "visible";
	},

	//删除操作按钮
	moveOperationLogle: function(target) {
		var child = target.getElementsByClassName("operation");
		child[0].style.visibility = "hidden";
		child[1].style.visibility = "hidden";
	},

	//表格行默认样式
	defaultStyle: function(tr, className) {
		for (var i = tr.length -1; i >= 0; i--) {
			tr[i].className = className;
			this.moveOperationLogle(tr[i]);
		};
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

	//修改target的innerHTML为value
	modifyValue: function(target, value) {
		target.innerHTML = value;
	}
};

//事务处理
var eventHandling = function() {

	//点击删除行按钮或者插入行按钮事件处理
	var clickDeleteOrAdd = function(target) {
		
		//点击删除行按钮
		var btn = target.getElementsByClassName("operation");
		btn[0].onclick = function() {
			var flag;
			var value;
			if (target.style.textDecoration == "" || target.style.textDecoration == "none") {
				flag = true;
				value = "<span class='glyphicon glyphicon-repeat'></span>";
			}
			else {
				flag = false;
				value = "<span class='glyphicon glyphicon-minus'></span>";
			}
			managerBusinessLogic.toggleLineThrough(target, flag);
			managerBusinessLogic.modifyValue(this, value);
		};

		//点击插入行按钮
		btn[1].onclick = function() {
			var rowIndex = target.rowIndex;
			var colnum = getData.colnum;
			getData.maxId = dueWithData.getMaxId() + 1;
			var date = new Date();
			var dateString = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();
			var tdValue =  [getData.maxId, getData.defaultName, getData.defaultPrice, dateString, getData.defaultDaySaleNum, getData.defaultMonSaleNum];
			insertTr(document.getElementsByTagName("tbody")[0], target.name, rowIndex, colnum, tdValue, true);
		};
	};

	//点击btn事件
	var btnOnClick = (function() {
		var saveBtn = document.getElementsByClassName("save")[0];
		saveBtn.onclick = function() {
			businessLogic.popUp("确定提交所以操作？", connectDataBase.pushAllData);
		}

		var cancelBtn = document.getElementsByClassName("cancel")[0];
		cancelBtn.onclick = function() {
			businessLogic.popUp("确定取消所有操作？", dueWithData.resetTable);
		};
	}());

	//当下拉列表的值发生变化时
	var selectedValueChange = (function() {
		var select = document.getElementsByClassName("order")[0];
		select.onchange = function() {
			var selectedValue = select.getElementsByTagName("option")[select.selectedIndex];
			//publicConnectDataBase.pushData(getData.url, "post", selectedValue, connectDataBase.showTable, publicConnectDataBase.errorHappaned);
		};
	}());

	//当点击搜索按钮的时候或者input的值发生变化时
	var searchHappend = (function() {
		var searchEventHandling = function() {
			var select = document.getElementsByClassName("order")[0];
			var selectedValue = select.getElementsByTagName("option")[select.selectedIndex];

			var search = document.getElementsByClassName("searchType")[0];
			var searchType = search.getElementsByTagName("option")[search.selectedIndex];

			var inputValue = document.getElementsByClassName("search")[0].value;

			connectDataBase.pushSearchData(selectedValue, searchType, inputValue);
		};

		var searchBtn = document.getElementsByClassName("searchBtn")[0];
		searchBtn.onclick = function() {
			searchEventHandling();
		};

		var input = document.getElementsByClassName("search")[0];
		input.onchange = function() {
			searchEventHandling();
		};
	}());
};



$(document).ready(function() {

	var data = (function() {

		var init = function() {
			eventHandling();
		};

		return {
			init: init
		};
		
	}());

	data.init();

	alert("双击表格可以直接在界面上修改表格");

	publicConnectDataBase.pushData("findAll", "post", "", 
		connectDataBase.showTable, publicConnectDataBase.errorHappaned);
});