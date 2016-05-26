package team.lingjing.ooad.dao;

import java.util.List;

import team.lingjing.dao.BaseDao;
import team.lingjing.ooad.entity.Sale;
import team.lingjing.ooad.entity.SalesLineItem;

public interface SalesLineItemDao extends BaseDao<SalesLineItem>{
//	public void saveSalesLineItem(SalesLineItem salesLineItem);//添加销售明细表
//	public void deleteSalesLineItemById(int id);//通过id删除销售明细表
//	public void deleteSalesLineItem(SalesLineItem slaesLineItem);//删除销售明细表
//	public SalesLineItem findSalesLineItemById(int id);//通过id查找销售明细表
//	public List<SalesLineItem> findAllSaleItem(); //查找所有的销售明细表
	public List<SalesLineItem> findSalesLineItemBySaleId(int saleId);//通过销售单号查找销售明细表

}
