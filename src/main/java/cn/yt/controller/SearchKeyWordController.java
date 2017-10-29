package cn.yt.controller;

import java.util.Set;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;



import cn.yt.po.ArchivemainZhwsDT;
import cn.yt.service.SearchKeyWordService;

@Controller
public class SearchKeyWordController {
	
	@Autowired
	private SearchKeyWordService searchKeyWordService;
	
    /**
     * 根据关键字进行查询
     * @param keyword
     * @param model
     * @return
     */
	@RequestMapping("/index")
	public String search(String keyword, Model model) {
		try {
			Set<ArchivemainZhwsDT> set = searchKeyWordService.findByKeyWord(keyword);
			model.addAttribute("zhwses",set);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return "indexList";
	}

	/**
	 * 根据获得的id进行查询
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping("/get/{id}")
	public String getDetails(@PathVariable String id,Model model){
		try{
			ArchivemainZhwsDT zhws = searchKeyWordService.getDetailById(id);
			model.addAttribute("zhws", zhws);
		}catch(Exception e){
			e.printStackTrace();
		}
		return "details";
	}

}
