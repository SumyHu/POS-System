package team.lingjing.test;

import java.util.Date;

import team.lingjing.ooad.dao.EmployeeDao;
import team.lingjing.ooad.dao.impl.EmployeeDaoImpl;
import team.lingjing.ooad.entity.Employee;
import team.lingjing.ooad.entity.Products;
import team.lingjing.ooad.entity.Sale;
import team.lingjing.ooad.entity.SalesLineItem;
import team.lingjing.ooad.service.ManageProductService;
import team.lingjing.ooad.service.ManageSaleService;
import team.lingjing.ooad.service.impl.ManageProductServiceImpl;
import team.lingjing.ooad.service.impl.ManageSaleServiceImpl;

public class SaleTest {
	public static void main(String[] args){
		SaleTest test = new SaleTest();
		test.saleServcie1();
		
		
	}
	
	//此方法是用来测试manageSaleService的begin和endsale方法的
	ManageSaleService manageSaleService = new ManageSaleServiceImpl();
	public void saleServcie1(){
		Sale sale = manageSaleService.findSale(2);
		double total = manageSaleService.endSale(sale);
		System.out.println(total);
		double change = manageSaleService.makeSalePayment(sale, 100);
		System.out.println(change);
	}
	
	//此方法是用来测试ManageSaleService的
	public void SaleService(){
		ManageSaleService manageSaleService = new ManageSaleServiceImpl();
		EmployeeDao employeeDao = new EmployeeDaoImpl();
		ManageProductService manageProductService = new ManageProductServiceImpl();
		//Sale sale = new Sale();
		SalesLineItem salesLineItem = new SalesLineItem();
//		Employee employee = employeeDao.get(Employee.class, 1);
//		sale.setDate(new Date());
//		sale.setEmployee(employee);
//		sale.setSaleState(0);
//		sale.setTotal(200);
		//manageSaleService.saveSale(sale);
		//System.out.println(manageSaleService.findAllSale());
		Sale sale = manageSaleService.findSale(2);
		Products product = manageProductService.selectProductsByID(127);
		salesLineItem.setProduct(product);
		salesLineItem.setProductCount(15);
		salesLineItem.setSale(sale);
		salesLineItem.setSubtotal(15);
		manageSaleService.saveSalesLineItem(salesLineItem);
		System.out.println(manageSaleService.findAllSaleItem());
		
		
		
	}

}
