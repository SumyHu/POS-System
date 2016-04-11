package team.lingjing.ooad.dao.impl;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import team.lingjing.dao.HibernateBaseDao;
import team.lingjing.dao.HibernateSessionFactory;
import team.lingjing.ooad.dao.ProductTypeDao;
import team.lingjing.ooad.entity.ProductType;

public class ProductTypeDaoImpl extends HibernateBaseDao<ProductType> implements ProductTypeDao {

	
	@Override
	public ProductType selectProductTypeByName(String name) {
		
		Session session = HibernateSessionFactory.getSession();
		 Criteria c=session.createCriteria(ProductType.class);
		try {
		        c.add(Restrictions.eq("name", name));
		  
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			HibernateSessionFactory.closeSession();
		}
	        return (ProductType)c;
	}

}
