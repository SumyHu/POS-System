package team.lingjing.ooad.service;
import java.util.List;
import team.lingjing.ooad.entity.Sale;
import team.lingjing.ooad.entity.SalesLineItem;
public interface ManageSaleService {
	/*
	 * 对sale表的增删改查操作
	 */
	public void saveSale(Sale sale);//添加销售
	public void deleteSale(Sale sale);//删除销售
	public void deleteSaleById(int id);//通过销售单号删除销售
	public Sale findSale(int id);//通过销售单号查找销售订单
	public void update(Sale sale);//更新销售
	public List<Sale> findAllSale();//查找所有销售订单
	/*
	 * 对sale表的逻辑操作
	 */
	public Sale beginSale();//开始销售，初始化
	public double endSale(Sale sale);//结束销售，写入数据库
	public List<Sale> showAllHanging();//显示所有挂账销售订单
	public void hang();//挂账
	public double makeSalePayment(Sale sale,double cash);//付款
	/*
	 * 对saleLineItem表的增删改查操作
	 */
	public void saveSalesLineItem(SalesLineItem salesLineItem);//添加销售明细表
	public void deleteSalesLineItemById(int id);//通过id删除销售明细表
	public void deleteSalesLineItem(SalesLineItem slaesLineItem);//删除销售明细表
	public SalesLineItem findSalesLineItemById(int id);//通过id查找销售明细表
	public List<SalesLineItem> findAllSaleItem(); //查找所有的销售明细表
	public List<SalesLineItem> findSalesLineItemBySale(Sale sale);//通过销售单号查找销售明细表

}
