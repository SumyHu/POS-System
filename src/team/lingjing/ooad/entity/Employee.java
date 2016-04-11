package team.lingjing.ooad.entity;

public class Employee {
	private int id;//雇员编号，即雇员登录账户
	private String name;//雇员名字
	private int age;//雇员年龄
	private String password;//雇员登录pos密码
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

}
