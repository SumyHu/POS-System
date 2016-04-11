package team.lingjing.ooad.action;

import java.util.List;

import team.lingjing.ooad.entity.Products;
import team.lingjing.ooad.service.ManageProductService;
import team.lingjing.ooad.service.impl.ManageProductServiceImpl;
import net.sf.json.JSONObject;

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
		System.out.println("成功执行findAll()方法");
		List<Products> list = manageProductService.selectAllProducts();
		System.out.println("成功返回result0");
		//JSONObject json = JSONObject.fromObject(list);
		//System.out.println("成功返回result1");
		result = list;
		
		System.out.println("成功返回result2");
		return SUCCESS;
	}

}
