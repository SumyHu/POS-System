package team.lingjing.ooad.action;

import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;

import team.lingjing.ooad.entity.ProductType;
import team.lingjing.ooad.entity.Products;
import team.lingjing.ooad.service.ManageProductService;
import team.lingjing.ooad.service.impl.ManageProductServiceImpl;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.opensymphony.xwork2.ActionSupport;

@SuppressWarnings("serial")
public class AddProductAction extends ActionSupport{
	
	
	private String jsonStr;
	Products product = new Products();//创建product对象用来接收前端传来经过整理的属性值
	ManageProductService productService = new ManageProductServiceImpl();//创建productService对象用来添加product对象
	ProductType productType = new ProductType();//创建productType对象
	public String execute() throws Exception{
		
		 HttpServletRequest request=ServletActionContext.getRequest();
	        jsonStr=request.getParameter("data");
	        JSONArray jsonArray = JSONArray.fromObject(jsonStr);
		for(int i=0;i<jsonArray.size(); i++){
            //接收并解析json数组
			JSONObject jsonJ = jsonArray.getJSONObject(i);
			//System.out.println(jsonJ);
			int id =jsonJ.getInt("id");
			String proname = jsonJ.getString("proname");
			int price = jsonJ.getInt("price");
			int dayqty = jsonJ.getInt("dayqty");
			int monqty = jsonJ.getInt("monqty");
			int typeId = jsonJ.getInt("type");
//			String jsondate = jsonJ.getString("date");
//			SimpleDateFormat formatter = new SimpleDateFormat( "yyyy-MM-dd ");
//			Date date = (Date)formatter.parse(jsondate.toString());
//			System.out.println(date);
			Date date =  new Date();//先随便试一下，之后要改的，得从前端取数据
			//Format sdf = new SimpleDateFormat("yyyy-MM-dd");
			//Date date = (Date) sdf.parseObject("date");//这里可能出问题
			
			
			productType = productService.selectProductTypeByID(typeId);
			//为product设置属性值
			product.setProname(proname);
			product.setPrice(price);
			product.setDayqty(dayqty);
			product.setMonqty(monqty);
			product.setType(productType);
			product.setUdate(date);
			//将product对象添加入数据库
			productService.addProducts(product);//将product对象添加去products数据库表中
			}
		
		return SUCCESS;
	}
	public String getJsonStr() {
		return jsonStr;
	}
	public void setJsonStr(String jsonStr) {
		this.jsonStr = jsonStr;
	}
}
