package cn.yt.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.elasticsearch.action.admin.indices.analyze.AnalyzeRequestBuilder;
import org.elasticsearch.action.admin.indices.analyze.AnalyzeResponse.AnalyzeToken;
import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.Client;
import org.elasticsearch.client.IndicesAdminClient;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.index.query.QueryStringQueryBuilder;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import cn.yt.mapper.SearchKeyWordMapper;
import cn.yt.po.ArchivemainZhwsDT;
import cn.yt.po.SearchKeyWord;
import cn.yt.service.SearchKeyWordService;
import cn.yt.utils.NumberUtil;

@Service("searchKeyWordService")
public class SearchKeyWordServiceImpl implements SearchKeyWordService {

	@Autowired
	private SearchKeyWordMapper searchKeyWordMapper;

	@Autowired
	private Client esClient;

	/**
	 * 通过关键字在oracle进行查询
	 */
	@Override
	public List<SearchKeyWord> listAll() {
		List<SearchKeyWord> listAll = searchKeyWordMapper.listAll();
		if (listAll != null && listAll.size() > 0) {
			return listAll;
		}
		return null;
	}

	/**
	 * 通过关键字在elasticsearch进行查询
	 */
	@Override
	public Set<ArchivemainZhwsDT> findByKeyWord(String keyWord) throws Exception {

		Set<ArchivemainZhwsDT> archivemainZhwsDTs = new HashSet<ArchivemainZhwsDT>();
		SearchRequestBuilder builder = esClient.prepareSearch();
	
		//将关键字优先进行查询，并将结果存入到archivemainZhwsDTs集合中
		Set<ArchivemainZhwsDT> set = findKeyWordByEs(builder,keyWord);
		if(set != null && set.size() > 0){
			archivemainZhwsDTs.addAll(set);
		}
		
		/*将字符串中的阿拉伯数字与中文数字替换，如果原字符串与转化后的字符串相同，表示原
	         字符串中不包含阿拉伯数字，否则，将转换后的字符串在进行查询
	     */ 
		String upper = NumberUtil.toChineseUpper(keyWord);
		if(!upper.equals(keyWord)){
			Set<ArchivemainZhwsDT> set2 = findKeyWordByEs(builder,upper);
			if(set2 != null && set2.size() > 0){
				archivemainZhwsDTs.addAll(set2);
			}
		}
		
		//然后将关键字进行分词，然后用得到的分词再次进行查询
	/*	Set<String> ikTerms = this.getIkTerms(keyWord);
		for (String term : ikTerms) {
			Set<ArchivemainZhwsDT> set2 = findKeyWordByEs(builder,term);
			if(set2 != null && set2.size() > 0){
				archivemainZhwsDTs.addAll(set2);
			}
		}  */

		if(archivemainZhwsDTs != null && archivemainZhwsDTs.size() > 0){
			return archivemainZhwsDTs;
		}
		
		return null;
	}

	/**
	 * 获得ik的分词集合
	 * 
	 * @param keyWord
	 *            查询关键字
	 * @return
	 */
	public Set<String> getIkTerms(String keyWord) {
		Set<String> set = new HashSet<String>();
		IndicesAdminClient indicesAdminClient = esClient.admin().indices();
		AnalyzeRequestBuilder request = new AnalyzeRequestBuilder(indicesAdminClient, "search", keyWord);
		request.setAnalyzer("ik");
		List<AnalyzeToken> listAnalysis = request.execute().actionGet().getTokens();
		for (AnalyzeToken analyzeToken : listAnalysis) {
			set.add(analyzeToken.getTerm());
		}
		return set;
	}

	/**
	 * 通过关键字进行查询
	 * @param builder
	 * @param keyWord
	 * @return
	 * @throws Exception
	 */
	public Set<ArchivemainZhwsDT> findKeyWordByEs(SearchRequestBuilder builder, String keyWord) throws Exception {
		ObjectMapper mapper = new ObjectMapper();
		Set<ArchivemainZhwsDT> archivemainZhwsDTs = new HashSet<ArchivemainZhwsDT>();
		// 先对关键字进行查询，如果有匹配关键字，将结果查询出来并添加到set集合中
		QueryStringQueryBuilder queryString = new QueryStringQueryBuilder(keyWord);
		SearchResponse searchResponse = builder.setQuery(queryString).execute().actionGet();
		SearchHits searchHits = searchResponse.getHits();
		SearchHit[] hit = searchHits.hits();
		// 判断查询到的结果为不为空
		if (hit != null && hit.length > 0)
			// 当查询到的结果不为空时，将结果存入set集合
			for (SearchHit searchHit : hit) {
			ArchivemainZhwsDT zhws = new ArchivemainZhwsDT();
			String json = searchHit.getSourceAsString();
			zhws = mapper.readValue(json.toLowerCase(), ArchivemainZhwsDT.class);
			archivemainZhwsDTs.add(zhws);
			}
		else {
			//当查询到的结果为空时，返回null
			return null;
		}
		return archivemainZhwsDTs;
	}

	/**
	 * 根据id在Elasticsearch进行查询
	 */
	@Override
	public ArchivemainZhwsDT getDetailById(String id) throws Exception{
		SearchRequestBuilder builder = esClient.prepareSearch().setIndices().setTypes();
		SearchResponse searchResponse = builder.setQuery(QueryBuilders.termsQuery("ID", id)).execute().actionGet();
		SearchHits searchHits = searchResponse.getHits();
		SearchHit[] hits = searchHits.hits();
		ObjectMapper mapper = new ObjectMapper();
		ArchivemainZhwsDT zhws = new ArchivemainZhwsDT();
		for (SearchHit searchHit : hits) {
			String json = searchHit.getSourceAsString();
			zhws = mapper.readValue(json.toLowerCase(), ArchivemainZhwsDT.class);
			break;
		}
		if(zhws != null){
			return zhws;
		}
		 return null;
	}

}
