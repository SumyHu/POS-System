package team.lingjing.ooad.service.impl;

import team.lingjing.ooad.dao.EmployeeDao;
import team.lingjing.ooad.dao.impl.EmployeeDaoImpl;
import team.lingjing.ooad.entity.Employee;
import team.lingjing.ooad.service.EmployeeService;

public class EmployeeServiceImpl implements EmployeeService{
	
	EmployeeDao employeeDao = new EmployeeDaoImpl();

	@Override
	public Employee validateEmployee(String username, String password) {
		return employeeDao.validateEmployee(username, password);
	}

	@Override
	public Employee registerEmployee(Employee employee) {
		employeeDao.saveEmployee(employee);
		return employeeDao.validateEmployee(employee.getUsername(), employee.getPassword());
	}

}
