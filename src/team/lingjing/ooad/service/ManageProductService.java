package team.lingjing.ooad.service;

import java.util.List;

import team.lingjing.ooad.entity.ProductType;
import team.lingjing.ooad.entity.Products;

public interface ManageProductService {
	 // 增删改查失败
    public static final int CRUD_FAIL = 0;
    // 增删该查成功
    public static final int CRUD_SUCCESS= 1;
    
    //Products表
    public int addProducts(Products product);
    public Products selectProductsByName(String name);
    public List<Products> selectProductsByKeyword(String keyword);
    public Products selectProductsByID(int ID);
 //   public List<Products> selectProductsByProductType(int ProductType);
    public int deleteProducts(Products product);
    public int updateProducts(Products product);
    public List<Products> selectAllProducts();
    
    
    //ProductType表
    public int addProductType(ProductType productType);
    public int deleteProductType(ProductType productType);
    public int updateProductType(ProductType productType);
    public List<ProductType> selectAllProductType();
    public ProductType selectProductTypeByID(int ID);
    


}
