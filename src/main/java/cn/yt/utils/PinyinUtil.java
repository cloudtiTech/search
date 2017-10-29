package cn.yt.utils;

import java.util.regex.Pattern;

/**
 * 拼音工具类
 */
public final class PinyinUtil {

	private static final String REGEX = "[“`~!@#$%^&*+=|{}':;',<>/?~！@#￥%……&*——+|{}【】‘；：”“’。，、？]";

	private PinyinUtil() {
	}

	/**
	 * 判断字符是否是中文
	 *
	 * @param ch
	 *
	 * @return
	 */
	public static boolean isChinese(char ch) {
		Character.UnicodeBlock unicodeBlock = Character.UnicodeBlock.of(ch);
		return unicodeBlock == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS
				|| unicodeBlock == Character.UnicodeBlock.CJK_COMPATIBILITY_IDEOGRAPHS
				|| unicodeBlock == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A
				|| unicodeBlock == Character.UnicodeBlock.GENERAL_PUNCTUATION
				|| unicodeBlock == Character.UnicodeBlock.CJK_SYMBOLS_AND_PUNCTUATION
				|| unicodeBlock == Character.UnicodeBlock.HALFWIDTH_AND_FULLWIDTH_FORMS;
	}

	/**
	 * 判断字符串是否是中文
	 *
	 * @param str
	 *
	 * @return
	 */
	public static boolean isChinese(String str) {
		boolean bool = true;
		for (char ch : str.toCharArray()) {
			if (!isChinese(ch)) {
				bool = false;
				break;
			}
		}
		return bool;
	}

	/**
	 * 判断字符串是否是中文（忽略空白符）
	 *
	 * @param str
	 *
	 * @return
	 */
	public static boolean isChineseIgnoreBlank(String str) {
		boolean bool = true;
		for (char ch : str.toCharArray()) {
			if (!isChinese(ch) && !Character.isWhitespace(ch)) {
				bool = false;
				break;
			}
		}
		return bool;
	}

	/**
	 * 判断字符串是否有中文
	 *
	 * @param str
	 *
	 * @return
	 */
	public static boolean hasChinese(String str) {
		for (char ch : str.toCharArray()) {
			if (isChinese(ch)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 判断字符串是否是简拼（根据声母来判断）
	 * 去掉开头的空白字符，如果字符串中间有空白字符，取空白字符左边的字符串作为匹配目标
	 *
	 * @param str
	 *
	 * @return
	 */
	public static boolean isJianpin(String str) {
		Pattern pattern = Pattern.compile("[bpmfdtnlgkhjqxzcsrzcsyw]+");
		return pattern.matcher(str.trim().split("\\s+")[0]).matches();
	}

	/**
	 * 去除字符串中的特殊字符
	 */
	public static String specialCharCleaner(String str) {
		str = str.replaceAll(REGEX, " ");
		return str.trim();
	}

	public static void main(String[] args) {
		String str = "gt09国";
		System.out.println(hasChinese(str));
	}
}
