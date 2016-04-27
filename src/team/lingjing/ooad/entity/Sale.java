package team.lingjing.ooad.entity;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class Sale {
	private int saleId;//销售单编号
	private Employee employee;//员工编号,与employee表的id字段关联
	private double total;//总额
	private Date date;//订单日期
	private String saleState;//订单状态，分为"未处理"、"已处理"
	@SuppressWarnings("rawtypes")
	private Set saleLineItem=new HashSet();
	public int getSaleId() {
		return saleId;
	}
	public void setSaleId(int saleId) {
		this.saleId = saleId;
	}
	
	public Employee getEmployee() {
		return employee;
	}
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	public double getTotal() {
		return total;
	}
	public void setTotal(double total) {
		this.total = total;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	@SuppressWarnings("rawtypes")
	public Set getSaleLineItem() {
		return saleLineItem;
	}
	@SuppressWarnings("rawtypes")
	public void setSaleLineItem(Set saleLineItem) {
		this.saleLineItem = saleLineItem;
	}
	public String getSaleState() {
		return saleState;
	}
	public void setSaleState(String saleState) {
		this.saleState = saleState;
	}
	
	
	
	

}
