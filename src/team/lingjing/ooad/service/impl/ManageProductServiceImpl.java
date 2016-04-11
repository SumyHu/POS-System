package team.lingjing.ooad.service.impl;

import java.util.List;

import team.lingjing.ooad.dao.ProductDao;
import team.lingjing.ooad.dao.ProductTypeDao;
import team.lingjing.ooad.dao.impl.ProductDaoImpl;
import team.lingjing.ooad.dao.impl.ProductTypeDaoImpl;
import team.lingjing.ooad.entity.ProductType;
import team.lingjing.ooad.entity.Products;
import team.lingjing.ooad.service.ManageProductService;

public class ManageProductServiceImpl implements ManageProductService{
	ProductDao productDao = new ProductDaoImpl();
	ProductTypeDao productTypeDao = new ProductTypeDaoImpl();

	@Override
	public int addProducts(Products product) {
		productDao.save(product);
		return CRUD_SUCCESS;
	}

	@Override
	public Products selectProductsByName(String name) {
		return productDao.selectProductByName(name);
	}

	@Override
	public Products selectProductsByID(int id) {
		return productDao.get(Products.class, id);
	}

	@Override
	public int deleteProducts(Products product) {
		productDao.delete(product);
		return CRUD_SUCCESS;
	}

	@Override
	public int updateProducts(Products product) {
		productDao.update(product);
		return CRUD_SUCCESS;
	}

	@Override
	public List<Products> selectAllProducts() {
		return productDao.findAll(Products.class);
	}

	
	
	@Override
	public int addProductType(ProductType productType) {
		productTypeDao.save(productType);
		return CRUD_SUCCESS;
	}

	@Override
	public int deleteProductType(ProductType productType) {
		productTypeDao.delete(productType);
		return CRUD_SUCCESS;
	}

	@Override
	public int updateProductType(ProductType productType) {
		productTypeDao.update(productType);
		return CRUD_SUCCESS;
	}

	@Override
	public List<ProductType> selectAllProductType() {
		return productTypeDao.findAll(ProductType.class);
	}

	@Override
	public ProductType selectProductTypeByID(int id) {
		return productTypeDao.get(ProductType.class, id);
	}
	
	public ProductType selectProductTypeByName(String name){
		return productTypeDao.selectProductTypeByName(name);
	}

}
