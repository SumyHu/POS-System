package team.lingjing.ooad.action;

import java.util.List;

import team.lingjing.ooad.entity.Products;
import team.lingjing.ooad.service.ManageProductService;
import team.lingjing.ooad.service.impl.ManageProductServiceImpl;

import com.opensymphony.xwork2.ActionSupport;

public class ManageProductAction extends ActionSupport{
	private Products product;//定义增删查改的Products对象
	private List<Products> result;//定义查询所有的List<Products>对象
	private String name;//定义按产品名字查询产品
	private String keyword;//定义按关键字进行模糊查询

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Products getProducts() {
		return product;
	}

	public void setProducts(Products product) {
		this.product = product;
	}
	
    
	public List<Products> getResult() {
		return result;
	}
	public void setResult(List<Products> result) {
		this.result = result;
	}
	ManageProductService manageProductService = new ManageProductServiceImpl();
	
	public String findAllProducts() throws Exception{
		System.out.println("成功执行findAll()方法");
		List<Products> list = manageProductService.selectAllProducts();
		System.out.println("成功返回result0");
		//JSONObject json = JSONObject.fromObject(list);
		//System.out.println("成功返回result1");
		result = list;
		
		System.out.println("成功返回result2");
		return SUCCESS;
	}
	//添加产品
	public String addProduct() throws Exception{
		
		if(manageProductService.addProducts(product)==1)
			 addActionMessage("添加成功");
		else
			 addActionMessage("添加失败");
		
		return SUCCESS;
	}
	//修改产品
	public String updateProduct() throws Exception{
		if(manageProductService.updateProducts(product)==1)
			 addActionMessage("更新成功");
		else
			 addActionMessage("更新失败");
		return SUCCESS;
	}
	//删除产品
	public String deleteProduct() throws Exception{
		if(manageProductService.deleteProducts(product)==1)
			 addActionMessage("删除成功");
		else
			 addActionMessage("删除失败");
		return SUCCESS;
	}
	//查询产品
	public String findProductByName() throws Exception{
		manageProductService.selectProductsByName(name);//通过产品名字查找产品
		return SUCCESS;
	}
	//模糊查询
	public String findProductByKeyword() throws Exception{
		manageProductService.selectProductsByKeyword(keyword);
		return SUCCESS;
	}

}
