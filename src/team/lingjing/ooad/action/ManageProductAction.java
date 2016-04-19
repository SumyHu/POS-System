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
		manageProductService.addProducts(product);//执行添加产品操作
		return this.findAllProducts();
	}
	//修改产品
	public String updateProduct() throws Exception{
		manageProductService.updateProducts(product);//执行更新产品操作
		return this.findAllProducts();
	}
	//删除产品
	public String deleteProduct() throws Exception{
		manageProductService.deleteProducts(product);//执行删除产品操作
		return this.findAllProducts();
	}
	//查询产品
	public String findProductByName() throws Exception{
		manageProductService.selectProductsByName(name);//通过产品名字查找产品
		return this.findAllProducts();
	}
	//模糊查询
	public String findProductByKeyword() throws Exception{
		manageProductService.selectProductsByKeyword(keyword);
		return this.findAllProducts();
	}

}
