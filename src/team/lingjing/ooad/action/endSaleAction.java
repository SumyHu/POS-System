package team.lingjing.ooad.action;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import team.lingjing.ooad.entity.Employee;
import team.lingjing.ooad.entity.Sale;
import team.lingjing.ooad.service.EmployeeService;
import team.lingjing.ooad.service.ManageSaleService;
import team.lingjing.ooad.service.impl.EmployeeServiceImpl;
import team.lingjing.ooad.service.impl.ManageSaleServiceImpl;

import com.opensymphony.xwork2.ActionSupport;

public class endSaleAction extends ActionSupport{
	private ManageSaleService manageSaleService = new ManageSaleServiceImpl();
	private EmployeeService employeeService = new EmployeeServiceImpl();
	private Employee employee;
	private double total=0;
	private String jsonStr; 
	
	public String getJsonStr() {
		return jsonStr;
	}
	public void setJsonStr(String jsonStr) {
		this.jsonStr = jsonStr;
	}
	public double getTotal() {
		return total;
	}
	public void setTotal(double total) {
		this.total = total;
	}
	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();
		jsonStr = request.getParameter("data");
		JSONObject jsonO = JSONObject.fromObject(jsonStr);
		Sale sale = manageSaleService.findSale(jsonO.getInt("saleID"));
		//employee = employeeService
		sale.setEmployee(employee);
		total = manageSaleService.endSale(sale);
		return SUCCESS;
	}

}
