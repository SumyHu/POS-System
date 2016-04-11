package team.lingjing.test;

import java.util.Iterator;

import team.lingjing.dao.HibernateBaseDao;
import team.lingjing.ooad.entity.ProductType;
import team.lingjing.ooad.entity.Products;

public class TestM2OAndO2M{
	public static void main(String[] args) throws Exception{
		TestM2OAndO2M test = new TestM2OAndO2M();
		
		test.testadd();
	}
	private void testadd() throws Exception{
		
		HibernateBaseDao<ProductType> hibernatedao = new HibernateBaseDao<ProductType>();
		ProductType productType = hibernatedao.get(ProductType.class, 3);
		System.out.println(productType.getId()+productType.getName());
		//hibernatedao.delete(product);
		//System.out.println(product.getDayqty());
		//product.setProname("苹果奶茶");
		//hibernatedao.update(product);
		//ProductType producttype = new ProductType();
		//producttype.setName("奶盖");
		//Products product1 = new Products();
		//product1.setProname("芒果奶盖");
		//product1.setPrice(6);
		//product1.setUdate("2015");
		//product1.setDayqty(10);
		//product1.setMonqty(300);
		//product1.setType(producttype);
		//HibernateBaseDao<Products> hibernatedao = new HibernateBaseDao<Products>();
		//Iterator<Products> itor = hibernatedao.findAll(Products.class).iterator();
		//while(itor.hasNext()){
			//Products products = new Products();
			//products = (Products)itor.next();
			//System.out.println("产品ID:"+products.getId()+"产品名称:"+products.getProname()+"产品类别"+products.getType().getId());
		//}
		//System.out.println(product1.getDayqty());
		//hibernatedao.save(product1);
		
	}

}
