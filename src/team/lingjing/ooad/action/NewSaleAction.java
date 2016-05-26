package team.lingjing.ooad.action;

import team.lingjing.ooad.entity.Sale;
import team.lingjing.ooad.service.ManageSaleService;
import team.lingjing.ooad.service.impl.ManageSaleServiceImpl;

import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class NewSaleAction extends ActionSupport{
	protected Sale sale;
	protected ManageSaleService manageSaleService = new ManageSaleServiceImpl();
	public String execute() throws Exception {
		sale = manageSaleService.beginSale();
		System.out.println("执行了NewSaleAction");
		return SUCCESS;
	}
	

}
