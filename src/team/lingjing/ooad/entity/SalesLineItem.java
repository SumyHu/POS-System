package team.lingjing.ooad.entity;

public class SalesLineItem {
	private int salesLineItemId;//销售明细表编号
	private Sale sale;//销售
	private Products product;//产品
	private int productCount;//产品数量
	private double subtotal;//小计
	public int getSalesLineItemId() {
		return salesLineItemId;
	}
	public void setSalesLineItemId(int salesLineItemId) {
		this.salesLineItemId = salesLineItemId;
	}
	public Sale getSale() {
		return sale;
	}
	public void setSale(Sale sale) {
		this.sale = sale;
	}
	public Products getProduct() {
		return product;
	}
	public void setProduct(Products product) {
		this.product = product;
	}

	public int getProductCount() {
		return productCount;
	}
	public void setProductCount(int productCount) {
		this.productCount = productCount;
	}
	public double getSubtotal() {
		return subtotal;
	}
	public void setSubtotal(double subtotal) {
		this.subtotal = subtotal;
	}
	
	
}
