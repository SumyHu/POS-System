package team.lingjing.ooad.dao.impl;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import antlr.collections.List;
import team.lingjing.dao.HibernateSessionFactory;
import team.lingjing.ooad.dao.EmployeeDao;
import team.lingjing.ooad.entity.Employee;

public class EmployeeDaoImpl implements EmployeeDao{

	@Override
	public Employee validateEmployee(String username, String password) {
		String hql = "from Employee e where e.username=? and e.password=?";
		Session session = HibernateSessionFactory.getSession();
		Query query = session.createQuery(hql);
		query.setParameter(0, username);
		query.setParameter(1, password);
		Employee employee = (Employee) query.uniqueResult();
		if(employee!=null){
			return employee;
		}
		HibernateSessionFactory.closeSession();
		return null;
	}

	@Override
	public void saveEmployee(Employee employee) {
		//boolean flag = false;
		Session session = HibernateSessionFactory.getSession();
		Transaction tran = session.beginTransaction();
		session.save(employee);
		tran.commit();
		HibernateSessionFactory.closeSession();
		
	}

}
