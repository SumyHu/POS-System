package team.lingjing.ooad.entity;
import java.util.Date;
public class Products {
	private int id;//产品编号
	private String proname;//产品名
	private double price;//产品价格
	private Date udate;//产品推出时间
	private int dayqty;//产品日销量
	private int monqty;//产品月销量
	private ProductType type;//产品类别
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public String getProname() {
		return proname;
	}
	public void setProname(String proname) {
		this.proname = proname;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public Date getUdate() {
		return udate;
	}
	public void setUdate(Date udate) {
		this.udate = udate;
	}
	public int getDayqty() {
		return dayqty;
	}
	public void setDayqty(int dayqty) {
		this.dayqty = dayqty;
	}
	public int getMonqty() {
		return monqty;
	}
	public void setMonqty(int monqty) {
		this.monqty = monqty;
	}
	public ProductType getType(){
		return type;
	}
	public void setType(ProductType type){
		this.type=type;
	}

}
