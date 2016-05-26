package team.lingjing.ooad.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import team.lingjing.ooad.dao.SaleDao;
import team.lingjing.ooad.dao.SalesLineItemDao;
import team.lingjing.ooad.dao.impl.SaleDaoImpl;
import team.lingjing.ooad.dao.impl.SalesLineItemDaoImpl;
import team.lingjing.ooad.entity.Sale;
import team.lingjing.ooad.entity.SalesLineItem;
import team.lingjing.ooad.service.ManageSaleService;

public class ManageSaleServiceImpl implements ManageSaleService{
	
	private SaleDao saleDao = new SaleDaoImpl();
	private SalesLineItemDao saleLineItemDao = new SalesLineItemDaoImpl();
	/*
	 * 对sale表的增删改查操作
	 */
	public void saveSale(Sale sale) {
		saleDao.save(sale);
	}
	
	public void update(Sale sale){
		saleDao.update(sale);
	}

	public void deleteSale(Sale sale) {
		saleDao.delete(sale);
	}
	
	public void deleteSaleById(int id) {
		saleDao.delete(Sale.class, id);
	}

	
	public Sale findSale(int id) {
	   return saleDao.get(Sale.class, id);
	}

	public List<Sale> findAllSale() {
		
		return saleDao.findAll(Sale.class);
	}

	/*
	 * 处理sale的service
	 */
	public Sale beginSale() {
		Sale sale = new Sale();
		sale.setSaleState(0);
		sale.setTotal(0);
		saveSale(sale);
		return sale;
	}
	
	public double endSale(Sale sale) {
		//Sale sale2 = findSale(sale.getSaleId());
		Sale sale2 = sale;//换成这样可不可以
		List<SalesLineItem> salesLineItems=findSalesLineItemBySale(sale);
		double total = 0;
		for (SalesLineItem salesLineItem : salesLineItems) {
			total+=salesLineItem.getSubtotal();
			//total+=salesLineItem.getProductCount()*salesLineItem.getProduct().getPrice();
		}
		sale2.setTotal(total);
		sale2.setDate(new Date());
		update(sale2);
		return total;
	}
	
	public List<Sale> showAllHanging() {
		List<Sale> sales = findAllSale();
		List<Sale> sales_result = new ArrayList<Sale>();
		for (Sale sale : sales) {
			if (sale.getSaleState()==1) {
				sales_result.add(sale);
			} 
		}
		return sales_result;
	}
	
	public void hang() {
		List<Sale> sales = findAllSale();
		for (Sale sale : sales) {
			if (sale.getSaleState()==0) {
				sale.setSaleState(1);
				update(sale);
			} 
		}
	}

	public double makeSalePayment(Sale sale, double cash) {
		//sale =findSale(sale.getSaleId());
		Sale sale1 =sale;
		sale1.setSaleState(2);
		update(sale1);
		return cash-sale.getTotal();
	}
	
	/*
	 * saleLineItem表的增删改查
	 */
	
	public void saveSalesLineItem(SalesLineItem salesLineItem) {
		saleLineItemDao.save(salesLineItem);
	}

	public void deleteSalesLineItemById(int id) {
		saleLineItemDao.delete(SalesLineItem.class, id);
	}

	public void deleteSalesLineItem(SalesLineItem slaesLineItem) {
		saleLineItemDao.delete(slaesLineItem);
	}

	public SalesLineItem findSalesLineItemById(int id) {
		return saleLineItemDao.get(SalesLineItem.class, id);
	}

	public List<SalesLineItem> findAllSaleItem() {
		return saleLineItemDao.findAll(SalesLineItem.class);
	}

	public List<SalesLineItem> findSalesLineItemBySale(Sale sale) {
		return saleLineItemDao.findSalesLineItemBySaleId(sale.getSaleId());
	}
	
	
	
	
	

	
}
