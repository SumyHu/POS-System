package team.lingjing.ooad.dao;

import team.lingjing.ooad.entity.Employee;

public interface EmployeeDao {
	public Employee validateEmployee(String username,String password);//登录验证
	public void saveEmployee(Employee employee);//注册会员

}
