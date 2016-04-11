package team.lingjing.test;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import team.lingjing.ooad.entity.ProductType;
import team.lingjing.ooad.entity.Products;

public class HibernateTest {
	public static void main(String[] args) {
		Configuration config = new Configuration().configure();
        SessionFactory sessionFactory = config.buildSessionFactory(); 

		org.hibernate.Session session = null;
		try {
			session = sessionFactory.openSession();

			 session.beginTransaction();

			ProductType producttype=new ProductType();
			producttype.setName("贡茶");
			session.save(producttype);

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





