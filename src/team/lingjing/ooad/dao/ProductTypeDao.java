package team.lingjing.ooad.dao;

import team.lingjing.dao.BaseDao;
import team.lingjing.ooad.entity.ProductType;

public interface ProductTypeDao extends BaseDao<ProductType> {
	 public ProductType selectProductTypeByName(String name);//通过产品名称查找产品类别编号

}
