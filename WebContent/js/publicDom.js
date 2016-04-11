//创建一些公共方法

//在表格中插入标题行，如产品类别行
var insertHeadRow = function(name) {
	var tbody = getData.tbody;

	var rownum = document.getElementsByTagName("tr").length;

	tbody.insertRow();
	var row = tbody.rows[rownum-1];
	row.insertCell();

	var content = document.createElement("center");
	var strong = document.createElement("strong");
	strong.appendChild(document.createTextNode(name));
	content.appendChild(strong);
	row.cells[0].appendChild(content);

	row.cells[0].colSpan = "8";
	row.className = "type";
	row.name = name;
	row.cells[0].disable = true;
}

//在表格指定位置插入行
var insertTr = function(tbody, name, index, colnum, tdValue, btnClickFlag) {
	tbody.insertRow(index);

	var row = tbody.rows[index];

	if (btnClickFlag) {
		row.className = "warning";
	}
	else {
		row.className = "content";
	}

	row.name = name;

	for (var i = 0; i <= colnum - 1; i++) {
		row.insertCell(i);
	}

	var firstTd = businessLogic.createEle("button", "span", "glyphicon glyphicon-minus");
	firstTd.className = "btn btn-danger btn-xs operation";
	row.cells[0].appendChild(firstTd);

	for (var j = colnum - 2; j >= 1; j--) {
		var text = document.createTextNode(tdValue[j-1]);
		row.cells[j].appendChild(text);
	};

	var lastTd = businessLogic.createEle("button", "span", "glyphicon glyphicon-plus");
	lastTd.className = "btn btn-danger btn-xs operation";
	row.cells[colnum-1].appendChild(lastTd);

	row.onmouseover = function() {
		if (btnClickFlag) {
			managerBusinessLogic.addOperationLogle(row, "warning");
		}
		else {
			managerBusinessLogic.defaultStyle(getData.tr, "content");
			managerBusinessLogic.addOperationLogle(this, "content success");
		}

		row.getElementsByClassName("operation")[0].onclick = function() {
			var flag;
			var value;
			if (row.style.textDecoration == "" || row.style.textDecoration == "none") {
				flag = true;
				value = "<span class='glyphicon glyphicon-repeat'></span>";
			}
			else {
				flag = false;
				value = "<span class='glyphicon glyphicon-minus'></span>";
			}
			managerBusinessLogic.toggleLineThrough(row, flag);
			managerBusinessLogic.modifyValue(this, value);
		}

		row.getElementsByClassName("operation")[1].onclick = function() {
			var name = row.name;
			var rowIndex = row.rowIndex;
			var colnum = getData.colnum;
			getData.maxId = dueWithData.getMaxId() + 1;
			var date = (new Date()).toLocaleDateString();
			var tdValue =  [getData.maxId, getData.defaultName, getData.defaultPrice, date, getData.defaultDaySaleNum, getData.defaultMonSaleNum];
			insertTr(document.getElementsByTagName("tbody")[0], name, rowIndex, colnum, tdValue, true);
		}
	}

	row.onmouseout = function() {
		if (btnClickFlag) {
			managerBusinessLogic.moveOperationLogle(row);
		}
		else {
			managerBusinessLogic.defaultStyle(getData.tr, "content");
		}
	}

	var td = row.getElementsByTagName("td");
	for (var tdLen = td.length-1, j = tdLen - 1; j >= 2; j--) {
		td[j].ondblclick = function() {							
			var index = $(this).index();				
			if (index == 2) {
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
	};
}

//各种常用的事件处理逻辑
var businessLogic = {
	//创建指定元素
	createEle: function(element, childEle, className) {
		var element = document.createElement(element);
		var child = document.createElement(childEle);
		child.className = className;
		element.appendChild(child);
		return element;
	},

	//将指定元素变为可编辑状态
	changeIntoEdit: function(target, valueType, defaultValue) {
		var input = document.createElement("input");
		input.style.width = "90px";
		input.type = "text";

		var init = target.innerHTML;
		//用单元格的值来填充文本框的值
		input.value = init;
		//当文本框丢失焦点时调用finalText
		input.onblur = function() {
			target.innerHTML = businessLogic.judgeValue(input.value, valueType, defaultValue);

			if (target.style.color == "") {
				if (init != input.value) {
					target.style.color = "red";
				}
			}
		}

		target.innerHTML = "";

		//把文本框加到当前单元格上
		target.appendChild(input);

		input.focus();
	},

	//判断输入值类型,如果输入的值不符合类型，则改为默认值
	judgeValue: function(inputValue, valueType, defaultValue) {
		if (valueType == "number") {
			inputValue = parseFloat(inputValue);
			if ((typeof inputValue) == valueType && !isNaN(inputValue))
				return inputValue;
		}
		else if(valueType == "string"){
			if ((typeof inputValue) == valueType && inputValue != "") {
				return inputValue;
			}
		}
		alert("输入的数值不符合要求！");
		return defaultValue;
	},

	//创建下拉列表
	createSpinner: function(defaultValue, listArray) {
		var select = document.createElement("select");
		select.style.display = "inline";

		for (var len = listArray.length, i = 0; i <= len-1; i++) {
			var option = document.createElement("option");
			option.appendChild(document.createTextNode(listArray[i]));
			select.appendChild(option);

			if (listArray[i] == defaultValue) {option.selected = true;}
		};

		return select;
	},

	//判断日期数
	judgeDayNum: function(year, month) {
		switch(month) {
			case 0:
			case 2:
			case 4:
			case 6:
			case 7:
			case 9:
			case 11: return 31;

			case 1:
				if ((year % 4 == 0 || year % 100 ==0) && (year % 400 != 0)) {
					return 28;
				}
				else {
					return 29;
				}
				break;

			default: return 30;
		}
	},

	//修改日期
	changeDate: function(target) {
		var splitDate = target.innerHTML.split("/");

		var defaultYear = splitDate[0];
		var yearArray = new Array();
		var initYear = 1990;
		for (var len = 50, y = len - 1; y >= 0; y--) {
			yearArray[y] = initYear + y;
		}
		var yearSpinner = businessLogic.createSpinner(defaultYear, yearArray);

		var defaultMonth = splitDate[1];
		var monthArray = new Array();
		for (var len = 12, m = len - 1 ; m >= 0; m--) {
			monthArray[m] = m + 1;
		}
		var monthSpinner = businessLogic.createSpinner(defaultMonth, monthArray);

		var defaultDay = splitDate[2];
		var dayArray = new Array();
		var dlen = businessLogic.judgeDayNum(parseInt(yearArray[yearSpinner.selectedIndex]), monthSpinner.selectedIndex);

		monthSpinner.onchange = function() {
			dlen = businessLogic.judgeDayNum(parseInt(yearArray[yearSpinner.selectedIndex]), monthSpinner.selectedIndex);
		}
		yearSpinner.onchange = function() {
			dlen = businessLogic.judgeDayNum(parseInt(yearArray[yearSpinner.selectedIndex]), monthSpinner.selectedIndex);
		}
		
		for (var len = dlen, d = len - 1; d >= 0; d--) {
			dayArray[d] = d + 1;
		}
		var daySpinner = businessLogic.createSpinner(defaultDay, dayArray);

		target.innerHTML = "";

		//把文本框加到当前单元格上
		target.appendChild(yearSpinner);
		target.appendChild(document.createTextNode("年"));

		target.appendChild(monthSpinner);
		target.appendChild(document.createTextNode("月"));

		target.appendChild(daySpinner);
		target.appendChild(document.createTextNode("日"));
	},

	//打开弹出框事件
	popUp: function(message, handlerFunc) {
		$(".Mongolia-laye").css("display","block");
		$(".popup").css("display", "block");
		document.getElementsByClassName("message")[0].innerHTML = message;

		var btn = document.getElementsByClassName("popup")[0].getElementsByTagName("button");
		btn[0].onclick = function() {
			businessLogic.closePopup();
			handlerFunc ? handlerFunc() : "";
		}
		btn[1].onclick = function() {
			businessLogic.closePopup();
		}
	},

	//关闭弹出框
	closePopup: function() {
		$(".Mongolia-laye").css("display","none");
		$(".popup").css("display", "none");
	}
}

//兼容各种浏览器事件
var compatibleDiffBrowserEvent = {
	//创建兼容不同浏览器的xmlHttpRequest方法
	createXMLHttpRequest: function() {
		if (window.ActiveXObject) {
			return new ActiveXObject("Microsoft.XMLHTTP");
		}
		else if (window.XMLHttpRequest) {
			return new XMLHttpRequest();
		}
	}
}

//公共的连接数据库的方法
var publicConnectDataBase = {

	//传送数据给后台
	pushData: function(url, method, data, successFunction, failureFunction) {
		var configObj = {
			"url": url,
			"method": method,
			"data": data,
			//dataType:"json",//我修改的地方
			success: function(jsondata) {
				alert("1");
				successFunction(jsondata);//执行到这里就不行了
				alert("2");
			},
			error: function(jsondata) {
				failureFunction(jsondata);
			}
		}
		$.ajax(configObj);
	},

	//错误提示
	errorHappaned: function(errorCode, message) {
		alert("error: " + "errorCode:" + errorCode + ",message:" + message);
	}
}