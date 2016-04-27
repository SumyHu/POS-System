package team.lingjing.ooad.action;

import java.util.List;

import team.lingjing.ooad.entity.Products;
import team.lingjing.ooad.service.ManageProductService;
import team.lingjing.ooad.service.impl.ManageProductServiceImpl;

import com.opensymphony.xwork2.ActionSupport;
@SuppressWarnings("serial")
public class FindAllProductsAction extends ActionSupport{
private List<Products> result;
	
	public List<Products> getResult() {
		return result;
	}
	public void setResult(List<Products> result) {
		this.result = result;
	}
	ManageProductService manageProductService = new ManageProductServiceImpl();
	
	public String execute() throws Exception{
		List<Products> list = manageProductService.selectAllProducts();
		result = list;
		return SUCCESS;
	}

}
