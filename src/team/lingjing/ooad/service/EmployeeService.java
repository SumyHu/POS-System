package team.lingjing.ooad.service;

import team.lingjing.ooad.entity.Employee;

public interface EmployeeService {
	public Employee validateEmployee(String username,String password);//验证登录操作的业务逻辑
	public Employee registerEmployee(Employee employee);//实现（注册+登录）的service

}
