package cn.yt.po;

import java.util.Date;

public class SearchKeyWord {

	private String id;
	
	private Date timestampp;
	
	private String trs_id;
	
	private String userId;
	
	private String origina;
	
	private String keyword;
	
	private Date record_time;
	
	private String ip;
	
	private Date tmp_time;
	
	public SearchKeyWord(){
		
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Date getTimestampp() {
		return timestampp;
	}

	public void setTimestampp(Date timestampp) {
		this.timestampp = timestampp;
	}

	public String getTrs_id() {
		return trs_id;
	}

	public void setTrs_id(String trs_id) {
		this.trs_id = trs_id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getOrigina() {
		return origina;
	}

	public void setOrigina(String origina) {
		this.origina = origina;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}


	public Date getRecord_time() {
		return record_time;
	}

	public void setRecord_time(Date record_time) {
		this.record_time = record_time;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public Date getTmp_time() {
		return tmp_time;
	}

	public void setTmp_time(Date tmp_time) {
		this.tmp_time = tmp_time;
	}

	@Override
	public String toString() {
		return "SearchKeyWord [id=" + id + ", timestampp=" + timestampp + ", trs_id=" + trs_id + ", userId=" + userId
				+ ", origina=" + origina + ", keyword=" + keyword + ", record_time=" + record_time + ", ip=" + ip
				+ ", tmp_time=" + tmp_time + "]";
	}

	
}
