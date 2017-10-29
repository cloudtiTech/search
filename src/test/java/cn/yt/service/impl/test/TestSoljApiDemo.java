package cn.yt.service.impl.test;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import cn.yt.po.ArchivemainZhws;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:spring/applicationContext.xml")
public class TestSoljApiDemo {
/*	//private final static String URL = "http://192.168.1.107:8081/solr/ARCHIVEMAIN_ZHWS";  
	// HttpSolrServer server = new HttpSolrServer(URL); 
	    
	
	@Autowired  
    private HttpSolrServer server; 
	
	
	//利用SolrJ完成单个 Document的添加操作
	@Test
	public void addDoc(){
		//创建doc文档
		SolrInputDocument doc = new SolrInputDocument();
		doc.addField("ID", "130440");
		doc.addField("M_CREATEDATE", "2017-07-12");
		doc.addField("TRS_ID","10");
		doc.addField("M_CFWZ", "啦啦啦啦");
		try {	
			 //添加一个doc文档
			server.add(doc);
			//commit后才保存到索引库
			server.commit();
		} catch (SolrServerException e) {
			
			e.printStackTrace();
		} catch (IOException e) {
			
			e.printStackTrace();
		}		
	 }
	
	//利用SolrJ添加多个Document，即添加文档集合 
	@Test
	public void addDocs(){
		List<SolrInputDocument> docs = new ArrayList<SolrInputDocument>();
		SolrInputDocument doc = new SolrInputDocument();
		doc.addField("ID", "130441");
		doc.addField("M_CREATEDATE", new Date());
		doc.addField("TRS_ID","11");
		doc.addField("M_CFWZ", "我是第11个被添加加solrd");
		
		docs.add(doc);
		
		doc = new SolrInputDocument();
		doc.addField("ID", "130442");
		doc.addField("M_CREATEDATE", new Date());
		doc.addField("TRS_ID","12");
		doc.addField("M_CFWZ", "我是第12个被添加加solrd");
		
		docs.add(doc);
		
		try {
			//add docs
			server.add(docs);
			 //commit后才保存到索引库
			server.commit();
		} catch (SolrServerException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
		
	//基于JavaEntity Bean 完成doc添加操作
	@Test
	public void addBean(){
		//ArchivemainZhws中需要添加到solr索引库相关的的属性，需要在其上面添加@Field注解，便于告诉solr哪些属性参与到index中
		ArchivemainZhws az = new ArchivemainZhws();
		az.setId("12");
		az.setTrsId("5");
		az.setTimestampp(new Date());
		az.setAjFlag("扛大旗，打前阵");
		
		try {
			//添加ArchivemainZhws Bean到索引库
			server.addBean(az);
			//commit后才保存到索引库
			server.commit();
		} catch (IOException e) {
			
			e.printStackTrace();
		} catch (SolrServerException e) {
			
			e.printStackTrace();
		}
	}
		
	//添加Entity Bean集合到索引库
	@Test
	public void addBeans(){
		List<ArchivemainZhws> azs = new ArrayList<ArchivemainZhws>();
		ArchivemainZhws az = new ArchivemainZhws();
		az.setId("12");
		az.setTrsId("13");
		az.setTimestampp(new Date());
		az.setAjFlag("13扛大旗，打前阵");
		
		azs.add(az);
		
		az = new ArchivemainZhws();
		az.setId("12");
		az.setTrsId("14");
		az.setTimestampp(new Date());
		az.setAjFlag("14扛大旗，打前阵");

		azs.add(az);
		
		try {
			//把list集合中bean添加到索引库
			server.addBeans(azs);
			//commit后才保存到索引库
			server.commit();
		} catch (SolrServerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	//根据uniquekey来查询solr中的记录
		@Test
		public void selectByUniquekey(){
			ArchivemainZhws az = new ArchivemainZhws();
			az.setTrsId("2");

			//创建solr查询对象
			SolrQuery query = new SolrQuery();
			query.setQuery("TRS_ID:" + az.getTrsId());
			//查询并返回结果
			try {
				 QueryResponse  queryResponse = server.query(query);
				 SolrDocumentList results = queryResponse.getResults();
				 System.out.println("列表集合的大小为："+results.size());
				 for(SolrDocument sd : results){
					 
					 System.out.println(sd.get("TRS_ID")+"--"+sd.get("M_CREATEDATE")+"--"+sd.get("M_CFWZ"));
				 }
			} catch (SolrServerException e) {
				
				e.printStackTrace();
			}
			
		}
				
	
	//根据uniquekey即TRS_ID来删除 索引
	@Test
	public void deleteSolr(){
		try {
			ArchivemainZhws az = new ArchivemainZhws();
			az.setTrsId("12");
			
			server.deleteById(az.getTrsId());
			server.commit();
					
		} catch (SolrServerException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
	
	
	//修改 SolrUpdate (修改实际上还是增加索引，只不过指定id，把相同id的filed覆盖掉)
	@Test
	public void updateSolr(){
	    SolrInputDocument doc = new SolrInputDocument();
	    doc.addField("TRS_ID", "12");
	    doc.addField("ID", "456456");
		doc.addField("M_CREATEDATE", "2017-07-10");
		doc.addField("M_CFWZ", "说是搜搜黑风洞哈佛I");
		
		try {
			server.add(doc);
			server.commit();
		} catch (SolrServerException e) {
			
			e.printStackTrace();
		} catch (IOException e) {
			
			e.printStackTrace();
		}
	}
	*/
	
}



