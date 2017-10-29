package cn.yt.utils.elasticsearch;

import java.util.HashMap;
import java.util.Map;

import org.elasticsearch.ElasticsearchException;
import org.elasticsearch.action.admin.indices.create.CreateIndexResponse;
import org.elasticsearch.action.admin.indices.mapping.put.PutMappingRequest;
import org.elasticsearch.action.admin.indices.mapping.put.PutMappingRequestBuilder;
import org.elasticsearch.action.admin.indices.mapping.put.PutMappingResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.Requests;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.cluster.node.DiscoveryNode;
import org.elasticsearch.common.settings.ImmutableSettings;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.common.xcontent.XContentBuilder;
import org.elasticsearch.common.xcontent.XContentFactory;
import org.elasticsearch.common.xcontent.json.JsonXContent;
import org.elasticsearch.index.query.QueryStringQueryBuilder;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.junit.Before;
import org.junit.Test;

import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

public class TestElasticSearch {

	private TransportClient client = null;
	
	@Before
	public void before(){
		Settings settings = ImmutableSettings.settingsBuilder()
				            .put("cluster.name", "elasticsearch_wenbronk")
				            .put("client.transport.ignore_cluster_name",true)
				            .build();
		
		client = new TransportClient(settings);
		InetSocketTransportAddress intSocket = new InetSocketTransportAddress("192.168.32.128", 9300);
		client.addTransportAddress(intSocket);
		System.out.println("success create");
	}
	
	@Test
	public void testInfo() throws Exception {
		org.elasticsearch.common.collect.ImmutableList<DiscoveryNode> nodes = client.connectedNodes();
		for (DiscoveryNode node : nodes) {
			System.out.println(node.getHostAddress());
			System.out.println(node.getHostName());
			System.out.println(node.getId());
		}
	}
	
	@Test
	public void testIndex(){
		try{
			Map<String,Object> json = new HashMap<String,Object>();
			json.put("ID","10");
			json.put("TRS_ID", "24");
			json.put("M_TM", "abc");
			json.put("M_CLASSROOTID", "丰富的反馈123456");
			json.put("M_CLASSID", "矿产34");
			json.put("M_CLASSNAME", "国土资源矿产12");
			json.put("M_AJNO", "zxcvbnm");
			json.put("M_KSSJ", "ILOVEYOU");
			json.put("M_WH", "344");
			
			IndexResponse response = client.prepareIndex("search","zhws").setSource(json).execute().actionGet();
			System.out.println(response.getId());
			System.out.println(response.getIndex());
			System.out.println(response.getType());
			System.out.println(response.getVersion());
			System.out.println(response.isCreated());
			
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	@Test
	public void testSearchByQj2bj(){
		SearchRequestBuilder request = client.prepareSearch();
		QueryStringQueryBuilder query = new QueryStringQueryBuilder("国土资源");
		SearchResponse response = request.setQuery(query).execute().actionGet();
		SearchHits searchHits = response.getHits();
		SearchHit[] hits = searchHits.hits();
		for (SearchHit searchHit : hits) {
			System.out.println(searchHit.getSourceAsString());
		}	
	}
	
	@Test
	public void testCreateMappin(){
        try {
			CreateIndexResponse createIndexResponse = client.admin().indices().prepareCreate("search").execute().actionGet();
			System.out.println(createIndexResponse.isAcknowledged());
			PutMappingRequestBuilder preparePutMapping = client.admin().indices().preparePutMapping("search");
			preparePutMapping.setType("zhws");
			XContentBuilder mapping = getMappin();
			preparePutMapping.setSource(mapping);
			PutMappingResponse response = preparePutMapping.execute().actionGet();
			System.out.println(response.isAcknowledged());
		} catch (ElasticsearchException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public XContentBuilder getMappin() throws Exception{
		XContentBuilder mapping = XContentFactory.jsonBuilder() 
		.startObject()
		.startObject("zhws")
		.startObject("properties")
		
		.startObject("ID").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject() 
		  
		.startObject("TIMESTAMPP").field("type", "date").field("store", "yes")
		.field("indexAnalyzer", "ik_max_word").field("searchAnalyzer", "ik_smart").endObject()
		  
		.startObject("TRS_ID").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject() 
		
		.startObject("M_TM").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject() 
		
		.startObject("M_CLASSROOTID").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_CLASSID").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_CLASSLIST").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_CLASSNAME").field("type", "string").field("store", "yes")
		.field("indexAnalyzer", "ik_max_word").field("searchAnalyzer", "ik_smart").endObject()
		
		.startObject("M_CLASSSHORTNAME").field("type", "string").field("store", "yes")
		.field("indexAnalyzer", "ik_max_word").field("searchAnalyzer", "ik_smart").endObject()
		
		.startObject("M_CREATEDATE").field("type", "date").field("store", "yes")
		.field("indexAnalyzer", "ik_max_word").field("searchAnalyzer", "ik_smart").endObject()
		
		.startObject("M_CREATEUSER").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject() 
		
		.startObject("M_CREATEUSERNAME").field("type", "string").field("store", "yes")
		.field("indexAnalyzer", "ik_max_word").field("searchAnalyzer", "ik_smart").endObject()
		
		.startObject("M_FNAME").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject() 
		
		.startObject("M_FNAME_MC").field("type", "string").field("store", "yes")
		.field("indexAnalyzer", "ik_max_word").field("searchAnalyzer", "ik_smart").endObject()
		
		.startObject("M_WH").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject() 
		
		.startObject("M_GDND").field("type", "string").field("store", "yes")
		.field("indexAnalyzer", "ik_max_word").field("searchAnalyzer", "ik_smart").endObject()
		
		.startObject("M_AJNO").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_AJJNO").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_AJJDH").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_WJJDH").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_GDSTATE").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_GDSTATE_MC").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_AUDITSTATE").field("type", "integer").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_AUDITSTATE_MC").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_STOREROOMID").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_STOREROOMID_MC").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
	/*	
		.startObject("M_STOREROOMID").field("type", "integer").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_STOREROOMID_MC").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()  */
		
		.startObject("M_STOREROOMSTATE").field("type", "integer").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_STOREROOMSTATE_MC").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_GDRQ").field("type", "date").field("store", "yes")
		.field("indexAnalyzer", "ik_max_word").field("searchAnalyzer", "ik_smart").endObject()
		
		.startObject("M_GDUSER").field("type", "string").field("store", "yes")
		.field("indexAnalyzer", "ik_max_word").field("searchAnalyzer", "ik_smart").endObject()
		
		.startObject("M_OCR_ATTACHMENTNAME").field("type", "string").field("store", "yes")
		.field("indexAnalyzer", "ik_max_word").field("searchAnalyzer", "ik_smart").endObject()
		
		.startObject("M_OCR_ATTACHMENTCONTENT").field("type", "string").field("store", "yes")
		.field("indexAnalyzer", "ik_max_word").field("searchAnalyzer", "ik_smart").endObject()
		
		.startObject("M_PDF_ATTACHMENTNAME").field("type", "string").field("store", "yes")
		.field("indexAnalyzer", "ik_max_word").field("searchAnalyzer", "ik_smart").endObject()
		 
		.startObject("M_QZH").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_ZRZ").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_BGQX").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_BGQX_MC").field("type", "string").field("store", "yes")
		.field("indexAnalyzer", "ik_max_word").field("searchAnalyzer", "ik_smart").endObject()
		
		.startObject("M_ZYS").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_ZFS").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_CFWZ").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_MJ").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_MJ_MC").field("type", "string").field("store", "yes")
		.field("indexAnalyzer", "ik_max_word").field("searchAnalyzer", "ik_smart").endObject()
		
		.startObject("M_KSSJ").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_JSSJ").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_MLH").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_HH").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_FLH").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_REFILE").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("TRS_OTHER_CONTEXT").field("type", "string").field("store", "yes")
		.field("indexAnalyzer", "ik_max_word").field("searchAnalyzer", "ik_smart").endObject()
		
		.startObject("TRS_CONTENT").field("type", "string").field("store", "yes")
		.field("indexAnalyzer", "ik_max_word").field("searchAnalyzer", "ik_smart").endObject()
		
		.startObject("TRS_KEY_CONTEXT").field("type", "string").field("store", "yes")
		.field("indexAnalyzer", "ik_max_word").field("searchAnalyzer", "ik_smart").endObject()
		
		.startObject("TRS_ENTITY_PLACE").field("type", "string").field("store", "yes")
		.field("indexAnalyzer", "ik_max_word").field("searchAnalyzer", "ik_smart").endObject()
		
		.startObject("TRS_KEYWORD").field("type", "string").field("store", "yes")
		.field("indexAnalyzer", "ik_max_word").field("searchAnalyzer", "ik_smart").endObject()
		
		.startObject("TRS_ABS").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_AJGUID").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_AJJGUID").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_PRJNAME").field("type", "string").field("store", "yes")
		.field("indexAnalyzer", "ik_max_word").field("searchAnalyzer", "ik_smart").endObject()
		
		.startObject("M_PRJNO").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("AJ_FLAG").field("type", "string").field("store", "yes")
		.field("indexAnalyzer", "ik_max_word").field("searchAnalyzer", "ik_smart").endObject()
		
		.startObject("M_BZ").field("type", "string").field("store", "yes")
		.field("indexAnalyzer", "ik_max_word").field("searchAnalyzer", "ik_smart").endObject()
		
		.startObject("TRS_RANK").field("type", "string").field("store", "yes")
		.field("indexAnalyzer", "ik_max_word").field("searchAnalyzer", "ik_smart").endObject()
		
		.startObject("M_JGDM").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_JGDM_MC").field("type", "string").field("store", "yes")
		.field("indexAnalyzer", "ik_max_word").field("searchAnalyzer", "ik_smart").endObject()
		
		.startObject("M_ZZBS").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_ZZBS_MC").field("type", "string").field("store", "yes")
		.field("indexAnalyzer", "ik_max_word").field("searchAnalyzer", "ik_smart").endObject()
		
		.startObject("M_ARCHIVESTYPE").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_ARCHIVESTYPENAME").field("type", "string").field("store", "yes")
		.field("indexAnalyzer", "ik_max_word").field("searchAnalyzer", "ik_smart").endObject()
		
		.startObject("M_YH").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.startObject("M_YFLH").field("type", "string").field("store", "yes")
		.field("index", "not_analyzed").endObject()
		
		.endObject()
		.endObject()
		.endObject();
	   return mapping;			           
	}
}
