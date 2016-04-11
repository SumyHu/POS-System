package team.lingjing.test;

import java.util.Iterator;
import java.util.List;

import team.lingjing.ooad.dao.ProductDao;
import team.lingjing.ooad.dao.ProductTypeDao;
import team.lingjing.ooad.dao.impl.ProductDaoImpl;
import team.lingjing.ooad.dao.impl.ProductTypeDaoImpl;
import team.lingjing.ooad.entity.ProductType;
import team.lingjing.ooad.entity.Products;

public class TestDao {
	public static void main(String[] args){
		TestDao testDao = new TestDao();
		testDao.productDaoTest();
		//testDao.productTypeDaoTest();
	}
	public void productTypeDaoTest(){
		ProductTypeDao productTypeDao = new ProductTypeDaoImpl();
		//int id = productTypeDao.selectIdByName("奶茶");
		//System.out.println(id);
	}
	public void productDaoTest(){
		ProductDao productDao = new ProductDaoImpl();
		Products product = productDao.selectProductByName("椰汁奶茶");
			System.out.println("产品ID:"+product.getId()+"产品名称:"+product.getProname()+"产品类别"+product.getType().getId());
		
		Iterator<Products> itor = productDao.selectProductsByKeyword("椰汁").iterator();
		while(itor.hasNext()){
			Products product1 = new Products();
			System.out.println("产品id:"+product1.getId()+"产品名称:"+product1.getProname());
		}
		//Products product1 = productDao.get(Products.class, 4);
		//System.out.println(product.getDayqty());
		//product1.setPrice(80);
		//productDao.update(product1);
		//productDao.delete(product1);
		//System.out.println("删除成功");
		//System.out.println(productDao.findCount(Products.class));
		
		
	}

}
