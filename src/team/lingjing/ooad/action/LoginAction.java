package team.lingjing.ooad.action;

import team.lingjing.ooad.dao.EmployeeDao;
import team.lingjing.ooad.dao.impl.EmployeeDaoImpl;
import team.lingjing.ooad.entity.Employee;
import team.lingjing.ooad.service.EmployeeService;
import team.lingjing.ooad.service.impl.EmployeeServiceImpl;

import com.opensymphony.xwork2.ActionSupport;

public class LoginAction extends ActionSupport{
	EmployeeDao employeeDao = new EmployeeDaoImpl();
	
	EmployeeService employeeService = new EmployeeServiceImpl();
	
	private Employee employee;

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	//用户注册，由Service层帮助完成
	public String register(){
		Employee e = new Employee(employee.getUsername(),employee.getPassword());
		if(employeeService.registerEmployee(e)!=null){
			return SUCCESS;
		}
		return ERROR;
	}
	//处理用户请求的execute方法
	public String execute() throws Exception{
		boolean validated = false;//验证成功标识
		Employee e = employeeService.validateEmployee(employee.getUsername(), employee.getPassword());
		if(e!=null){
			validated = true;//标识为true表示验证成功通过
		}
		if(validated){
			//验证成功返回字符串“success"
			return SUCCESS;
		}
		else{
			//验证失败返回字符串"error";
			return ERROR;
		}
	}


}
