package team.lingjing.ooad.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Transaction;

import team.lingjing.dao.HibernateBaseDao;
import team.lingjing.dao.HibernateSessionFactory;
import team.lingjing.ooad.dao.SalesLineItemDao;
import team.lingjing.ooad.entity.SalesLineItem;

public class SalesLineItemDaoImpl extends HibernateBaseDao<SalesLineItem> implements SalesLineItemDao{

	@SuppressWarnings("unchecked")
	public List<SalesLineItem> findSalesLineItemBySaleId(int saleId) {
		List<SalesLineItem> salesLineItem = null;
		Transaction tran = null;
		tran = HibernateSessionFactory.getCurrentSession().beginTransaction();
		Query query = HibernateSessionFactory.getCurrentSession().createQuery("from SalesLineItem s where s.sale.saleId=?");
		query.setParameter(0, saleId);
		tran.commit();
		salesLineItem = query.list();
		return salesLineItem;
	}

}
