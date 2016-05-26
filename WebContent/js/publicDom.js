//筛选、搜索部分
var searchValue = {
	//传入下拉列表的className作为参数，获得指定下拉列表的值
	getSelectedValue: function(selectClassName) {
		return $("." + selectClassName + ">option:selected").text();
	},

	//获取排序条件
	getOrderValue: function() {
		return searchValue.getSelectedValue("order");
	},

	//获取搜索类型
	getSearchTypeValue: function() {
		return searchValue.getSelectedValue("searchType");
	},

	//获取搜索框的值
	getSearchInputValue: function() {
		return $("input.search").value();
	}
};

//表格处理事件
var commentTableProcess = {
	//在表格中插入标题行，如产品类别行
	insertHeadRow: function(tbody, colnum, typeId, typeName) {
		tbody.insertRow();

		var rownum = tbody.getElementsByTagName("tr").length;
		var row = tbody.rows[rownum-1];
		row.insertCell();

		var content = document.createElement("center");
		var strong = document.createElement("strong");
		strong.appendChild(document.createTextNode(typeName));
		content.appendChild(strong);
		row.cells[0].appendChild(content);

		row.cells[0].colSpan = colnum;
		row.className = "type";
		row.name = typeId;
	},

	//在表格指定位置插入行
	insertTr: function(tbody, index, colnum, tdValue, name) {
		var row;
		if (typeof index === "number" && index >= 0) {
			row = tbody.insertRow(index-1);
		}
		else {
			row = tbody.insertRow();
		}

		for (var i = 0; i <= colnum - 1; i++) {
			row.insertCell(i);
			row.cells[i].innerHTML = tdValue[i];
		}

		row.name = (name ?  name : "");

		return row;
	},

	//在表格中添加行
	addRow: function(tbody, colnum, tdValue, name) {
		return commentTableProcess.insertTr(tbody, -1, colnum, tdValue, name);
	},

	//删除表格中指定的行
	deleteRow: function(tbody, index) {
		tbody.removeChild(tbody.getElementsByTagName("tr")[index]);
	}
};

//在线编辑的几种方式
var modifyMethod = {
	//将指定元素变为可编辑状态，target为变为可编辑状态的元素，valueType为规定输入的类型，defaultValue为默认值
	changeIntoEdit: function(target, valueType, defaultValue) {
		var input = document.createElement("input");
		input.style.width = "90px";
		input.type = "text";

		var init = target.innerHTML;
		//用单元格的值来填充文本框的值
		input.value = init;

		//当文本框丢失焦点时调用finalText
		input.onblur = function() {
			target.innerHTML = modifyMethod.judgeValue(input.value, valueType, defaultValue);

			//当当前元素的值发生改变时，字体颜色变为红色
			if (target.style.color == "") {
				if (init != input.value) {
					target.style.color = "red";
				}
			}
		}

		target.innerHTML = "";

		//把文本框加到当前目标元素上
		target.appendChild(input);

		input.focus();
	},

	//判断输入值类型,如果输入的值不符合类型，则改为默认值
	judgeValue: function(inputValue, valueType, defaultValue) {
		if (valueType === "number") {
			inputValue = parseFloat(inputValue);
			if (typeof inputValue === valueType && !isNaN(inputValue))
				return inputValue;
		}
		else if(valueType === "string"){
			if (typeof inputValue === valueType && inputValue !== "") {
				return inputValue;
			}
		}
		alert("输入的数值不符合要求！");
		return defaultValue;
	},

	//改变下拉列表的值
	changeOptionValue: function(select, defaultValue, start, length) {
		select.innerHTML = "";

		var listArray = new Array();
		for (var i = 0; i < length; i++) {
			listArray[i] = parseInt(start) + i;
		};

		for (var len = listArray.length, i = 0; i <= len-1; i++) {
			var option = document.createElement("option");
			option.appendChild(document.createTextNode(listArray[i]));
			select.appendChild(option);

			if (listArray[i] == defaultValue) {option.selected = true;}
		};
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

			default: return 30;
		}
	},

	//修改日期
	changeDate: function(targetDate) {
		var splitDate = targetDate.innerHTML.split("/");

		var defaultYear = splitDate[0];
		var yearSelect = document.createElement("select");
		modifyMethod.changeOptionValue(yearSelect, defaultYear, 1990, 50);

		var defaultMonth = splitDate[1];
		var monthSelect = document.createElement("select");
		 modifyMethod.changeOptionValue(monthSelect, defaultMonth, 1, 12);

		var defaultDay = splitDate[2];
		var dlen = modifyMethod.judgeDayNum(parseInt(yearSelect.selectedIndex)+1990, monthSelect.selectedIndex);
		var daySelect = document.createElement("select");
		modifyMethod.changeOptionValue(daySelect, defaultDay, 1, dlen);

		targetDate.innerHTML = "";

		//把文本框加到当前单元格上
		targetDate.appendChild(yearSelect);
		targetDate.appendChild(document.createTextNode("年"));

		targetDate.appendChild(monthSelect);
		targetDate.appendChild(document.createTextNode("月"));

		targetDate.appendChild(daySelect);
		targetDate.appendChild(document.createTextNode("日"));

		monthSelect.onchange = function() {
			dlen = modifyMethod.judgeDayNum(parseInt(yearSelect.selectedIndex)+1990, monthSelect.selectedIndex);
			defaultDay = parseInt(daySelect.selectedIndex)+1;
			modifyMethod.changeOptionValue(daySelect, defaultDay, 1, dlen);
		}
		yearSelect.onchange = function() {
			dlen = modifyMethod.judgeDayNum(parseInt(yearSelect.selectedIndex)+1990, monthSelect.selectedIndex);
			defaultDay = parseInt(daySelect.selectedIndex)+1;
			modifyMethod.changeOptionValue(daySelect, defaultDay, 1, dlen);
		}
	}
};

//与后台连接
var publicConnected = {
	//传送数据给后台
	pushData: function(url, method, data, successFunction, failureFunction) {
		
		var configObj = {
			"url": url,
			"method": method,
			"data": data,
			
			success: function(jsondata) {
				successFunction ? successFunction(jsondata) : publicConnected.connetedSuccess();
			},

			error: function(jsondata) {
				failureFunction ? failureFunction(jsondata) : publicConnected.errorHappened(jsondata);
			}
		};
		$.ajax(configObj);
	},

	connetedSuccess: function() {
		console.log("conneted success!");
	},

	//通用错误提示
	errorHappened: function(jsondata) {
		var errorString = eval(jsondata);
		alert("errorCode:" + errorString.code + ",message:" + errorString.message);
	}
}