package team.lingjing.dao;

import java.io.Serializable;
import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class HibernateBaseDao<T> implements BaseDao<T> {

	
	@SuppressWarnings("unchecked")
	public T get(Class<T> entityClazz, Serializable id) {
		T t = null;
		Session session = HibernateSessionFactory.getSession();
		try {
			t = (T) session.get(entityClazz, id);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			HibernateSessionFactory.closeSession();
		}
		return t;
		
	}

	
	public void save(T entity) {
		Transaction tran = null;
		// 获取Session
		Session session = HibernateSessionFactory.getSession();
		try {
			// 开始事务
			tran = session.beginTransaction();
			// 持久化操作
			session.save(entity);
			tran.commit();
		} catch (Exception e) {
			if (tran != null) {
				// 事务回滚
				tran.rollback();
			}
			e.printStackTrace();
		} finally {
			// 关闭Session
			HibernateSessionFactory.closeSession();
		}
		
	}


	public void update(T entity) {
		Transaction tran = null;
		Session session = HibernateSessionFactory.getSession();
		try {
			tran = session.beginTransaction();
			session.update(entity);
			tran.commit();
		} catch (Exception e) {
			if (tran != null) {
				tran.rollback();
			}
			e.printStackTrace();
		} finally {
			HibernateSessionFactory.closeSession();
		}
		
	}


	public void delete(T entity) {
		Transaction tran = null;
		Session session = HibernateSessionFactory.getSession();
		try {
			tran = session.beginTransaction();
			session.delete(entity);
			tran.commit();
		} catch (Exception e) {
			if (tran != null) {
				tran.rollback();
			}
			e.printStackTrace();
		} finally {
			HibernateSessionFactory.closeSession();
		}
	}

	
	@SuppressWarnings("unchecked")
	public void delete(Class<T> entityClazz, Serializable id) {
		T t = null;
		Session session = HibernateSessionFactory.getSession();
		try {
			t = (T) session.get(entityClazz, id);
			session.delete(t);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			HibernateSessionFactory.closeSession();
		}
		
	}



	public List<T> findAll(Class<T> entityClazz) {
		  return find("select en from "
		            + entityClazz.getSimpleName() + " en");
	}

	
	public long findCount(Class<T> entityClazz) {
		 List<T> l = find("select count(*) from "
		            + entityClazz.getSimpleName());
		        // 返回查询得到的实体总数
		        if (l != null && l.size() == 1 )
		        {
		            return (Long)l.get(0);
		        }
		        return 0;
	}


	@SuppressWarnings("unchecked")
	public List<T> find(String hql) {
		List<T> list = null;
		Session session = null;
		try{
			session = HibernateSessionFactory.getSession();
			Query query = session.createQuery(hql);
						list = query.list();
					} catch (Exception e) {
					} finally {
						if (session != null) {
							session.close();
						}
					}
					return list;
	}

}
