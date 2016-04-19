package team.lingjing.ooad.entity;

public class Inventory {
	private int id;
	
	private int product_id;//产品编号
	
	private int count;//某类产品数量
	
	public Inventory(){
		//空的构造方法
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getProduct_id() {
		return product_id;
	}

	public void setProduct_id(int product_id) {
		this.product_id = product_id;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}
	
	

}
