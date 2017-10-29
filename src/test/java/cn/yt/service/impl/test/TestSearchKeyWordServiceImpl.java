package cn.yt.service.impl.test;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import cn.yt.po.SearchKeyWord;
import cn.yt.service.SearchKeyWordService;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:spring/applicationContext.xml")
public class TestSearchKeyWordServiceImpl {

	@Autowired
	private SearchKeyWordService searchKeyWordService;
	
	@Test
	public void test_listAll(){
		List<SearchKeyWord> listAll = searchKeyWordService.listAll();
		for (SearchKeyWord searchKeyWord : listAll) {
			System.out.println(searchKeyWord.toString());
		}
	}
}
