package team.lingjing.ooad.entity;

import java.util.HashSet;
import java.util.Set;

public class ProductType {
	private int id;
	private String name;
	@SuppressWarnings("rawtypes")
	private Set pros = new HashSet();
	
	@SuppressWarnings("rawtypes")
	public Set getPros() {
		return pros;
	}
	@SuppressWarnings("rawtypes")
	public void setPros(Set pros) {
		this.pros = pros;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

}
