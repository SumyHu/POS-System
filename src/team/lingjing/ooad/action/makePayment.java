package team.lingjing.ooad.action;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import team.lingjing.ooad.entity.Sale;
import team.lingjing.ooad.service.ManageSaleService;
import team.lingjing.ooad.service.impl.ManageSaleServiceImpl;

import com.opensymphony.xwork2.ActionSupport;
@SuppressWarnings("serial")
public class makePayment extends ActionSupport{
	private ManageSaleService manageSaleService = new ManageSaleServiceImpl();
	private double change =0;
	private String jsonData;
	public double getChange() {
		return change;
	}
	public void setChange(double change) {
		this.change = change;
	}
	public String getJsonData() {
		return jsonData;
	}
	public void setJsonData(String jsonData) {
		this.jsonData = jsonData;
	}
	public String execute() throws Exception{
		HttpServletRequest request = ServletActionContext.getRequest();
		jsonData = request.getParameter("data");
		JSONObject jsonO = JSONObject.fromObject(jsonData);
		Sale sale = manageSaleService.findSale(jsonO.getInt("saleID"));
		change = manageSaleService.makeSalePayment(sale, jsonO.getDouble("cash"));
		return SUCCESS;
	}

}
