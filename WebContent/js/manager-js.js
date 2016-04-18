//向数据库传送的各种数据行统计
var pushData = {
	deleteRow: new Array(),
	addRow: new Array(),
	modifyRow: new Array(),

	deleteRowArray: new Array(),
	addRowArray: new Array(),
	modifyRowArray: new Array()
}

//获取各种数据
var getData = {
	tbody: document.getElementsByTagName("tbody")[0],
	tr: document.getElementsByClassName("content"),     //获取除了产品类型标题的行之外的其他行

	maxId: 0, 
	colnum: document.getElementsByClassName("content")[0].getElementsByTagName("td").length,
	defaultName: "奶茶",
	defaultPrice: 11,
	defaultDaySaleNum: 0,
	defaultMonSaleNum: 0,

	url: ""
}

//连接数据库
var connectDataBase = {
	//初始化，获取所有数据表格
	showTable: function(jsondata) {
		alert("c");
		var data = eval(jsondata);//执行到这里就不行了
		alert("d");
		$.each(data, function(index, row) {
			var tdValue = [row.id, row.proname, row.price, row.udate, row.dayqty, row.monqty];
			alert("e");
			dueWithData.showTableRow(getData.tbody, row.type.name, getData.colnum, tdValue, false);
			alert("f");
		});
	},

	//传送数据给后台
	//当排序列表的值发生变化时，将下拉列表的值传给后台
	pushSelectedValue: function(selectedValue) {
		publicConnectDataBase.pushData(getData.url, "post", selectedValue, connectDataBase.showTable, publicConnectDataBase.errorHappaned);
	},

	//当点击了搜索按钮之后或input的值发生变化时，将排序列表的值、搜索列表的值、搜索框的值传给后台
	/*pushSearchData: function(selectedValue, searchType, inputValue) {
		if (inputValue != "" && searchType != "全部") {
			var data = {
				selectedValue,
				searchType,
				inputValue
			};
			publicConnectDataBase.pushData(getData.url, "post", data, connectDataBase.showTable, publicConnectDataBase.errorHappaned);
		}
		else if (inputValue == "" && searchType == "全部") {
			var data = "*";
			publicConnectDataBase.pushData(getData.url, "post", data, connectDataBase.showTable, publicConnectDataBase.errorHappaned);
		}
	},*/

	//实现局部刷新表格
	refreshTable: function() {
		dueWithData.deleteRowFromTable();
		dueWithData.addRowToTable();
		dueWithData.modifyRowOnTable();
	},

	//当点击了save按钮后，将要删除的行的json、要添加的行的json、要修改的行的数组传给json
	pushAllData: function() {
		dueWithData.setDleteRow();
		dueWithData.setAddRow();
		dueWithData.setModifyRow();

		pushData.deleteRowArray = dueWithData.changQueueIntoJson(pushData.deleteRow);
		pushData.addRowArray = dueWithData.changQueueIntoJson(pushData.addRow);
		pushData.modifyRowArray = dueWithData.changQueueIntoJson(pushData.modifyRow);

		var data = {
			"dleteRow": pushData.deleteRowArray,
			"addRow": pushData.addRowArray,
			"modifyRow": pushData.modifyRowArray
		};

		publicConnectDataBase.pushData(getData.url, "post", data, refreshTable, publicConnectDataBase.errorHappaned);
	}
}

var dueWithData = {

	//将被删除的行存入队列中 (unshift存入、pop移除)
	setDleteRow: function() {
		var tr = getData.tr;

		for (var len = tr.length, i = len - 1; i >= 0; i--) {
			var index = tr[i].index;
			if (tr[index].style.textDecoration == "line-through") {
				pushData.deleteRow.push(tr[index]);
			}
		};
	},

	//将被添加的行存入队列中
	setAddRow: function() {
		var tr = getData.tr;
		var newRow = tr.getElementsByClassName("warning");
		for (var len = newRow.length, i = len - 1; i >= 0; i--) {
			pushData.addRow.push(newRow[i]);
		};
	},

	//将被修改的行存入队列中
	setModifyRow: function() {
		var tr = getData.tr;
		for (var i = tr.length - 1; i >= 0; i--) {
			var td = tr[i].getElementsByTagName("td");
			for (var len = td.length, j= len - 1; j >= 0; j--) {
				var index = td[j].index;
				if (index == 2 || index == 3) {
					if (td[index].style.color) {
						pushData.modifyRow.push(td[index].parentNode[0]);
						break;
					}
				}
				else if (index == 4) {
					if (td[index].getElementsByTagName("select")) {
						pushData.modifyRow.push(td[index].parentNode[0]);
						break;
					}
				}
				else if (index == 5 || index == 6) {
					if (td[index].style.color) {
						pushData.modifyRow.push(td[index].parentNode[0]);
						break;
					}
				}
			};
		};
	},

	getMaxId: function() {
		var tr = document.getElementsByTagName("tr");
		var maxId = 0;
		for (var i = tr.length - 1; i >= 0 && tr[i].className != "type"; i--) {
			var temp = tr[i].getElementsByTagName("td")[1].innerHTML;
			if (parseInt(maxId) < parseInt(temp)) {
				maxId = parseInt(temp);
			};
		};
		return maxId;
	},

	//将队列变成数组的形式
	changQueueIntoArray: function(rawQueue) {
		var data = rawQueue;
		var array = new Array();
		
		for (var i = data.length - 1; i >= 0; i--) {
			var index = array[i].index;
			array[index] = data.pop();

			array[index].milkTeaId = array[index][1];
			array[index].milkTeaName = array[index][2];
			array[index].price = array[index][3];
			array[index].addtime = array[index][4];
			array[index].daySaleNum = array[index][5];
			array[index].monthSaleNum = array[index][6];
		}
		var jsondata = JSON.stringify(array);

		return jsondata;
	},

	//实现界面局部刷新
	//实现删除行的界面刷新
	deleteRowFromTable: function() {
		var row;
		var tbody = getData.tbody;
		while(pushData.deleteRow.length != 0) {
			var row = pushData.deleteRow.pop();
			tbody.removeChild(row);
		}
	},

	//实现添加行的界面刷新
	addRowToTable: function() {
		while(pushData.addRow.length != 0) {
			var row = pushData.addRow.pop();
			var rowIndex = row.rowIndex;

			var tdValue = new Array();
			var td = row.getElementsByTagName("td");
			for (var i = td.length - 2; i >= 1; i--) {
				tdValue[i] = td[i];
			};
			
			insertTr(getData.tbody, rowIndex, getData.colnum, tdValue, false);

			tbody.removeChild(row);
		}
	},

	//实现修改行的界面刷新
	modifyRowOnTable: function() {
		while(pushData.modifyRow.length != 0) {
			var row = pushData.modifyRow.pop();

			var td = row.getElementsByTagName("td");
			for (var i = td.length - 1; i >= 0; i--) {
				var index = td[i].index;
				if (index == 4) {
					var innerHTMLString = new Array();
					var select = row.getElementsByTagName("select");
					for (var j = select.length - 1; j >= 0; j--) {
						innerHTMLString[j] = select[j].getElementsByTagName("option")[select[j].selectedIndex].firstChild.nodeValue;
					}
					td[index].innerHTML = innerHTMLString.join("/");
				}

				else {
					td[index].style.color = "";
				}
			};
		}
	},

	//实现界面重置刷新，即点击cancle
	resetTable: function() {
		var table = document.getElementsByTagName("table")[0];
		table.removeChild(getData.tbody);
		publicConnectDataBase.pushData(getData.url, "post", "*", connectDataBase.showTable, publicConnectDataBase.errorHappaned);

		getData.deleteRow = "";
		getData.addRow = "";
		getData.modifyRow = "";
	},

	//判断数据插入位置
	searchPosition: function(name) {
		//var tbody = getData.tbody;
		/*var type = tbody.getElementsByClassName("type");
		var index;
		
		for (var i = type.length - 1; i >= 0; i--) {
			if (type[i].name == name) {
				index = type[i+1].rowIndex - 1;
			}
		};*/
		
		var tr = getData.tr;
		var index;
		
		for (var i = tr.length - 1; i >= 0; i--) {
			if (tr[i].name == name && tr[i].className == "type") {
				index = tr[i+1].rowIndex - 1;
			}
		};
		
		return index;
	},

	//渲染数据库数据
	showTableRow: function(tbody, name, colnum, tdValue, btnClickFlag) {
		var type = document.getElementsByClassName("type");
		var flag = false;     //判断表格中是否存在该类别，false表示不存在

		var insertIndex = 0;
		
		for (var i = type.length - 1; i >= 0; i--) {
			if (type[i].name == name) {
				flag = true;
				break;
			}
		};

		if (!flag) {
			insertHeadRow(name);
			insertIndex = document.getElementsByTagName("tr").length-1;
		}
		else {
			insertIndex = dueWithData.searchPosition(name);
		}

		insertTr(tbody, name, insertIndex, colnum, tdValue, btnClickFlag);
	}
}

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
}

//事务处理
var eventHandling = function() {

	//鼠标移到到表格行的的事件处理
	var mouseOnTr = (function() {
		var tr = getData.tr;
		for (var i = tr.length - 1; i >= 0; i--) {
			tr[i].onmouseover = function() {
				managerBusinessLogic.defaultStyle(tr, "content");
				managerBusinessLogic.addOperationLogle(this, "content success");

				clickDeleteOrAdd(this);

				//双击单元格事件
				var td = this.getElementsByTagName("td");
				for (var tdLen = td.length-1, j = tdLen - 1; j >= 2; j--) {
					td[j].ondblclick = function() {	
						var index = $(this).index();				
						if (index == "2") {
							businessLogic.changeIntoEdit(td[index], "string", "奶茶");
						}
						else if (index == 3) {
							businessLogic.changeIntoEdit(td[index], "number", 11);
						}
						else if (index == 4) {
							businessLogic.changeDate(td[index]);
						}
						else if (index == 5 || index == 6) {
							businessLogic.changeIntoEdit(td[index], "number", 0)
						}
					}
				}
			}

			tr[i].onmouseout = function() {
				managerBusinessLogic.defaultStyle(tr, "content");
			}
		}
	}());

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
		}

		//点击插入行按钮
		btn[1].onclick = function() {
			var rowIndex = target.rowIndex;
			var colnum = getData.colnum;
			getData.maxId = dueWithData.getMaxId() + 1;
			var date = (new Date()).toLocaleDateString();
			var tdValue =  [getData.maxId, getData.defaultName, getData.defaultPrice, date, getData.defaultDaySaleNum, getData.defaultMonSaleNum];
			insertTr(document.getElementsByTagName("tbody")[0], target.name, rowIndex, colnum, tdValue, true);
		}
	

	//点击btn事件
	var btnOnClick = (function() {
		var saveBtn = document.getElementsByClassName("save")[0];
		saveBtn.onclick = function() {
			businessLogic.popUp("确定提交所以操作？", connectDataBase.pushAllData);
		}

		var cancelBtn = document.getElementsByClassName("cancel")[0];
		cancelBtn.onclick = function() {
			businessLogic.popUp("确定取消所有操作？", dueWithData.resetTable);
		}
	}());

	//当下拉列表的值发生变化时
	var selectedValueChange = (function() {
		var select = document.getElementsByClassName("order")[0];
		select.onchange = function() {
			var selectedValue = select.getElementsByTagName("option")[select.selectedIndex];
			//publicConnectDataBase.pushData(getData.url, "post", selectedValue, connectDataBase.showTable, publicConnectDataBase.errorHappaned);
		}
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
		}

		var searchBtn = document.getElementsByClassName("searchBtn")[0];
		searchBtn.onclick = function() {
			searchEventHandling();
		}

		var input = document.getElementsByClassName("search")[0];
		input.onchange = function() {
			searchEventHandling();
		}
	}());
}
}



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

	publicConnectDataBase.pushData("findAll", "post", "", connectDataBase.showTable, publicConnectDataBase.errorHappaned);
})