package team.lingjing.test;

import java.util.Iterator;

import team.lingjing.ooad.entity.ProductType;
import team.lingjing.ooad.entity.Products;
import team.lingjing.ooad.service.ManageProductService;
import team.lingjing.ooad.service.impl.ManageProductServiceImpl;

public class TestService {
	public static void main(String[] args){
		TestService test = new TestService();
		
		test.productService();
	}
	
	
	public void productService(){
		ManageProductService productService = new ManageProductServiceImpl();
		
		/*ProductType productType = new ProductType();
		productType = (ProductType) productService.selectProductTypeByID(3);
		Products products = new Products();
		products.setProname("椰汁奶茶");
		products.setPrice(10);
		products.setDayqty(60);
		products.setMonqty(300);
		products.setUdate("2015");
		products.setType(productType);
		productService.addProducts(products);**/
		
		Iterator<Products> itor = productService.selectAllProducts().iterator();
		while(itor.hasNext()){
			Products product = new Products();
			product = (Products)itor.next();
			System.out.println("产品ID:"+product.getId()+"产品名称:"+product.getProname()+"产品类别"+product.getType().getId());
		}
		
	}

}
