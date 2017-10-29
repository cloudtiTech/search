package cn.yt.service;

import java.util.List;
import java.util.Set;

import cn.yt.po.ArchivemainZhwsDT;
import cn.yt.po.SearchKeyWord;

public interface SearchKeyWordService {

	/**
	 * 在oracle中查询出所有的关键字，该方法暂时用不到
	 * @return
	 */
	List<SearchKeyWord> listAll();
	
	/**
	 * 根据关键字在Elasticsearch进行查询
	 */
	Set<ArchivemainZhwsDT> findByKeyWord(String keyWord) throws Exception;
	
	/**
	 * 根据id查询得到唯一的ArchivemainZhwsDT对象
	 * @param id
	 * @return
	 */
	ArchivemainZhwsDT getDetailById(String id) throws Exception;
}
