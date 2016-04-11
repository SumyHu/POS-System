package team.lingjing.ooad.dao;

import java.util.List;

import team.lingjing.dao.BaseDao;
import team.lingjing.ooad.entity.Products;

public interface ProductDao extends BaseDao<Products>{
	 public Products selectProductByName(String name);//按产品名称进行查找
     public List<Products> selectProductByType(int typeID);//按产品类别进行查找
     public List<Products> selectProductsByKeyword(String keyword);//按关键字进行模糊查询

}
