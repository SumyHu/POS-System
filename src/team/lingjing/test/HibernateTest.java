package team.lingjing.test;
import java.util.Date;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import team.lingjing.dao.HibernateBaseDao;
import team.lingjing.ooad.dao.EmployeeDao;
import team.lingjing.ooad.dao.ProductDao;
import team.lingjing.ooad.dao.SaleDao;
import team.lingjing.ooad.dao.impl.EmployeeDaoImpl;
import team.lingjing.ooad.dao.impl.ProductDaoImpl;
import team.lingjing.ooad.dao.impl.SaleDaoImpl;
import team.lingjing.ooad.entity.Employee;
import team.lingjing.ooad.entity.ProductType;
import team.lingjing.ooad.entity.Products;
import team.lingjing.ooad.entity.Sale;
import team.lingjing.ooad.entity.SalesLineItem;

public class HibernateTest{
	public static void main(String[] args) {
		Configuration config = new Configuration().configure();
        SessionFactory sessionFactory = config.buildSessionFactory(); 

		org.hibernate.Session session = null;
		try {
			session = sessionFactory.openSession();

			 session.beginTransaction();

			//ProductType producttype=new ProductType();
			//producttype.setName("贡茶");
			//session.save(producttype);
			/* Employee employee = new Employee();
			 employee.setAge(20);
			 employee.setName("凌净");
			 employee.setUsername("lingjing");
			 employee.setPassword("640015");
			 session.save(employee);**/
			 //Sale sale = new Sale();
			//SalesLineItem saleslineitem  = new SalesLineItem();
			/*Employee employee;
			EmployeeDao employeeDao = new EmployeeDaoImpl();
			employee = employeeDao.get(Employee.class, 1);
			sale.setDate(new Date());
			sale.setEmployee(employee);
			sale.setSaleState("未处理");
			sale.setTotal(200);
			session.save(sale);
			**/
			 SaleDao saleDao = new SaleDaoImpl();
			 ProductDao productDao = new ProductDaoImpl();
			 Sale sale = saleDao.get(Sale.class, 1);
			 Products product = productDao.get(Products.class, 10);
			 SalesLineItem salesLineItem = new SalesLineItem();
			 salesLineItem.setProduct(product);
			 salesLineItem.setProductCount(2);
			 salesLineItem.setSale(sale);
			 salesLineItem.setSubtotal(20);
			 session.save(salesLineItem);
			
			

			session.getTransaction().commit();

		} catch (Exception e) {
			e.printStackTrace();
			session.getTransaction().rollback();
		} finally {
			if (session != null) {
				if (session.isOpen()) {
					session.close(); 

				}
			}
		}
	}

}





