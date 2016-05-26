package team.lingjing.ooad.action;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import team.lingjing.ooad.entity.Products;
import team.lingjing.ooad.entity.Sale;
import team.lingjing.ooad.entity.SalesLineItem;
import team.lingjing.ooad.service.ManageProductService;
import team.lingjing.ooad.service.ManageSaleService;
import team.lingjing.ooad.service.impl.ManageProductServiceImpl;
import team.lingjing.ooad.service.impl.ManageSaleServiceImpl;

import com.opensymphony.xwork2.ActionSupport;

public class AddSalesLineItemAction extends ActionSupport {
	protected ManageProductService manageProductService = new ManageProductServiceImpl();
	protected ManageSaleService manageSaleService = new ManageSaleServiceImpl();
	private String jsonStr;

	public String execute() throws Exception {
		HttpServletRequest request = ServletActionContext.getRequest();
		jsonStr = request.getParameter("data");
		JSONObject jsonO = JSONObject.fromObject(jsonStr);

		Products product = manageProductService.selectProductsByID(jsonO.getInt("productID"));// id为从前端传来的
		Sale sale = manageSaleService.findSale(jsonO.getInt("saleID"));// id为从前端传来的
		SalesLineItem salesLineItem =  new SalesLineItem();
		// 调用salesLineItem的set方法设置属性值
		salesLineItem.setProduct(product);
		salesLineItem.setSale(sale);
		salesLineItem.setProductCount(jsonO.getInt("quantity"));
		double subtotal=product.getPrice()*jsonO.getInt("quantity");
		salesLineItem.setSubtotal(subtotal);
		manageSaleService.saveSalesLineItem(salesLineItem);
		return SUCCESS;
	}

	public String getJsonStr() {
		return jsonStr;
	}

	public void setJsonStr(String jsonStr) {
		this.jsonStr = jsonStr;
	}

}
