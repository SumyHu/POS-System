package team.lingjing.ooad.dao.impl;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

import team.lingjing.dao.HibernateBaseDao;
import team.lingjing.dao.HibernateSessionFactory;
import team.lingjing.ooad.dao.ProductDao;
import team.lingjing.ooad.entity.Products;

public class ProductDaoImpl extends HibernateBaseDao<Products> implements ProductDao {

	
	
	
	@Override
	//通过产品名称查找
	public Products selectProductByName(String name) {
		Products product = null;
		Session session = HibernateSessionFactory.getSession();
		String hql = "from Products p where p.proname = ?";
		Query query = session.createQuery(hql);
		
		try {
		       query.setParameter(0, name);
		      product = (Products) query.uniqueResult();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			HibernateSessionFactory.closeSession();
		}
		  return product; 
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Products> selectProductByType(int typeID) {
		List<Products> list = null;
		Session session = HibernateSessionFactory.getSession();
		 Criteria c=session.createCriteria(Products.class);
		try {
		        c.add(Restrictions.eq("type.id", typeID));
		        list = c.list();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			HibernateSessionFactory.closeSession();
		}
	        return list;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Products> selectProductsByKeyword(String keyword) {
		List<Products> list = null;
		Session session = HibernateSessionFactory.getSession();
		String hql = "from Products p where p.proname like :proname";
		try {
		        Query query = session.createQuery(hql);
		        query.setString("proname", "%"+keyword+"%");
		        list = query.list();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			HibernateSessionFactory.closeSession();
		}
	        return list;
		
	}

}
