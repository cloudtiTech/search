package cn.yt.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.junit.Test;

public class TestNumberUtils {

	@Test
	public void testNumber2Str() {
		String numberStr = NumberUtil.getNumberStr(123456781);
		System.out.println(numberStr);
	}

	@Test
	public void number2ChineseUpper() {
		String numberStr = NumberUtil.number2ChineseUpper("0123456789104");
		System.out.println(numberStr);
	}

	@Test
	public void chineseUpper2Number() {
		String result = NumberUtil.chineseUpper2Number("零一二三四五六七八九一零四");
		System.out.println(result);
	}

	@Test
	public void regx() {
		String str = "45451一四五二三六";
		String regx = "[一-二-三-四-五-六-七-八-九]";
		// 1.将正在表达式封装成对象Patten 类来实现
		Pattern pattern = Pattern.compile(regx);
		// 2.将字符串和正则表达式相关联
		Matcher matcher = pattern.matcher(str);
		// 3.String 对象中的matches 方法就是通过这个Matcher和pattern来实现的。

		System.out.println(matcher.matches());
		// 查找符合规则的子串
		while (matcher.find()) {
			// 获取 字符串
			System.out.println(matcher.group());
			// 获取的字符串的首位置和末位置
			System.out.println(matcher.start() + "--" + matcher.end());
		}
	}
	
	@Test
	public void testToChineseUpper(){
		String text = "hdfds123450";
		String upper = NumberUtil.toChineseUpper(text);
		System.out.println(upper);
	}

	@Test
	public void testIsFanTi() {
	//	String str = "香港";
		//String encode = "GB2312";
		String str = "捱";
		String encode = "utf-8";
		// 話說
		try {
			if (!str.equals(new String(str.getBytes(encode), encode))) {
				System.out.println("是繁体");
			} else {
				System.out.println("是简体");
			}
		} catch (Exception exception3) {

		}
	}
	
	@Test
	public void testHasDigit(){
		String text = "你好久发的199000发电机房123";
		Pattern pattern = Pattern.compile("\\d+");
		Matcher m = pattern.matcher(text);
	//	System.out.println(m.matches());
	
		if(m.find(1)){
			//System.out.println(m.matches());
		  System.out.println(m.group());
		  System.out.println(m.start());
		  System.out.println(m.end());
		  
		}
	}
}
