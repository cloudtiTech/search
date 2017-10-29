package cn.yt.service.impl.test;


import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:spring/applicationContext.xml")
public class TestSolr {

/*	@Autowired  
    private HttpSolrServer httpSolrServer; */
	
	@Test
	public void test_ConnectionSolr(){
		/*System.out.println(httpSolrServer.toString());*/
	}
	
	@Test
	public void test_SolrInfo(){
/*		 //创建查询条件  
        SolrQuery query = new SolrQuery();  
        query.setQuery("TRS_ID:"+1+"*");  
          
        //查询并返回结果  
        try {
			QueryResponse queryResponse = this.httpSolrServer.query(query);
			SolrDocumentList results = queryResponse.getResults();
			for (SolrDocument solrDocument : results) {
			    System.out.println(solrDocument.get("TRS_ID").toString());	
			}
		} catch (SolrServerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  */
        
	}
	
	@Test
	public void test_queryAll(){
/*		 ModifiableSolrParams params = new ModifiableSolrParams();
		    // 查询关键词，*:*代表所有属性、所有值，即所有index
		    params.set("q", "M_TM:1* or TRS_ID:1* or M_CFWZ:说*");
		    // 分页，start=0就是从0开始，，rows=5当前返回5条记录，第二页就是变化start这个值为5就可以了。
		    params.set("start", 0);
		    params.set("rows", Integer.MAX_VALUE);
		    
		    // 排序，，如果按照id 排序，，那么将score desc 改成 id desc(or asc)
		    params.set("sort", "score desc");
		 
		    // 返回信息 * 为全部 这里是全部加上score，如果不加下面就不能使用score
		    params.set("fl", "*,score");
		    
		    try {
		        QueryResponse response = httpSolrServer.query(params);
		        
		        SolrDocumentList list = response.getResults();
		        for (int i = 0; i < list.size(); i++) {
		           System.out.println(list.get(i).toString());
		        }
		    } catch (SolrServerException e) {
		        e.printStackTrace();
		    }*/
		
		
	}
	
	@Test
	public void test_findByTerms(){
/*        //实例化SolrServer，以获取与solrServer的通信  
     //   SolrServer solrServer = new HttpSolrServer("http://localhost:8081/solr");  
          
        //创建查询参数以及设定的查询参数  
        SolrQuery params = new SolrQuery();  
        params.set("q", "*:*");  
        params.set("qt", "terms");  
          
        //parameters settings for terms requestHandler   
        // 参考（refer to）http://wiki.apache.org/solr/TermsComponent  
        params.set("terms", "true");  
        params.set("terms.fl", "INDUSTRY"); 
          
        params.set("terms.lower", ""); //term lower bounder开始的字符  
        params.set("terms.lower.incl", "true");  
        params.set("terms.mincount", "1");  
        params.set("terms.maxcount", "100");  
          
        //http://localhost:8983/solr/terms?terms.fl=text&terms.prefix=学 // using for auto-completing  
       // params.set("terms.prefix", "13");   
        params.set("terms.regex", "13+.*");  
        params.set("terms.regex.flag", "case_insensitive");  
          
        params.set("terms.limit", "20");  
        params.set("terms.upper", ""); //结束的字符  
        params.set("terms.upper.incl", "false");  
          
        params.set("terms.raw", "true");  
        params.set("terms.sort", "count");
	    try {
	        QueryResponse response = httpSolrServer.query(params);
	        
	        SolrDocumentList list = response.getResults();
	        for (int i = 0; i < list.size(); i++) {
	           System.out.println(list.get(i).toString());
	        }
	    } catch (SolrServerException e) {
	        e.printStackTrace();
	    }*/
	}
}
