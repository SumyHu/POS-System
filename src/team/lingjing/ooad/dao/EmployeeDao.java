package team.lingjing.ooad.dao;

import team.lingjing.dao.BaseDao;
import team.lingjing.ooad.entity.Employee;

public interface EmployeeDao extends BaseDao<Employee>{
	public Employee validateEmployee(String username,String password);//登录验证
	public void saveEmployee(Employee employee);//注册会员

}
