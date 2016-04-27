package team.lingjing.ooad.action;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;

import team.lingjing.ooad.entity.Products;
import team.lingjing.ooad.service.ManageProductService;
import team.lingjing.ooad.service.impl.ManageProductServiceImpl;

import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class DeleteProductAction extends ActionSupport{
	Products product = null;
	ManageProductService manageProductService = new ManageProductServiceImpl();
	private String jsonStr;//定义jsonStr用于从前端接收json格式字符串
	public String getJsonStr() {
		return jsonStr;
	}
	public void setJsonStr(String jsonStr) {
		this.jsonStr = jsonStr;
	}
	public String execute() throws Exception{
		
		 HttpServletRequest request=ServletActionContext.getRequest();
	        jsonStr=request.getParameter("data");
	        JSONArray jsonArray = JSONArray.fromObject(jsonStr);
		for(int i=0;i<jsonArray.size(); i++){
			  //接收并解析json数组
			JSONObject jsonJ = jsonArray.getJSONObject(i);
			product = manageProductService.selectProductsByID(jsonJ.getInt("id"));
			manageProductService.deleteProducts(product);//删除product
		}
		return SUCCESS;
	}

}
