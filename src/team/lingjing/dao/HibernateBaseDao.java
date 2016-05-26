package team.lingjing.dao;
import java.io.Serializable;
import java.util.List;

import org.hibernate.LockMode;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import team.lingjing.ooad.entity.Products;
public class HibernateBaseDao<T> implements BaseDao<T> {
    
    @SuppressWarnings("unchecked")
    public T get(Class<T> entityClazz, Serializable id) {
        T t = null;
        Transaction tran = null;
        //开启事务
        tran = HibernateSessionFactory.getCurrentSession().beginTransaction();
        t = (T) HibernateSessionFactory.getCurrentSession().get(entityClazz, id);
        tran.commit();
        return t;
    }
    
    public void save(T entity) {
        Transaction tran = null;
        //开启事务
        tran = HibernateSessionFactory.getCurrentSession().beginTransaction();
        // 持久化操作
        HibernateSessionFactory.getCurrentSession().save(entity);
        HibernateSessionFactory.getCurrentSession().flush();
        tran.commit();
        HibernateSessionFactory.getCurrentSession().clear();
        
    }
    public void update(T entity) {
        Transaction tran = null;
       //开启事务
        tran = HibernateSessionFactory.getCurrentSession().beginTransaction();
        HibernateSessionFactory.getCurrentSession().update(entity);
        tran.commit();
        
    }
    public void delete(T entity) {
        Transaction tran = null;
      //开启事务
        tran = HibernateSessionFactory.getCurrentSession().beginTransaction();
        HibernateSessionFactory.getCurrentSession().delete(entity);
        tran.commit();
      
    }
    
	@SuppressWarnings("unchecked")
    public void delete(Class<T> entityClazz, Serializable id) {
		 T t = null;
		 Transaction tran = null;
	        //开启事务
	        tran = HibernateSessionFactory.getCurrentSession().beginTransaction();
	        HibernateSessionFactory.getCurrentSession().get(entityClazz, id);
	        HibernateSessionFactory.getCurrentSession().delete(t);
	        tran.commit();
	        
        
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
        Transaction tran = null;
        //开启事务
        tran = HibernateSessionFactory.getCurrentSession().beginTransaction();
        Query query = HibernateSessionFactory.getCurrentSession().createQuery(hql);
                     list = query.list();
                     tran.commit();
                     return list;        
    }
}