package team.lingjing.ooad.entity;

public class Customer {
	private int id;
	private String name;
	private String sex;
	private int age;
	private String telephoneNumber;
	private double balance;
	private double sumOfConsumption;
	
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
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
	public String getTelephoneNumber() {
		return telephoneNumber;
	}
	public void setTelephoneNumber(String telephoneNumber) {
		this.telephoneNumber = telephoneNumber;
	}
	public double getBalance() {
		return balance;
	}
	public void setBalance(double balance) {
		this.balance = balance;
	}
	public double getSumOfConsumption() {
		return sumOfConsumption;
	}
	public void setSumOfConsumption(double sumOfConsumption) {
		this.sumOfConsumption = sumOfConsumption;
	}
	

}
