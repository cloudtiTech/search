package cn.yt.utils;

public class NumberUtil { 
	
	 private static String[] NUMBER1 = {"零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"}; 
	 private static String[] NUMBER2 = {"零", "拾", "佰", "仟", "万", "亿"}; 
	 
	 private static String[] Upper = {"零","一","二","三","四","五","六","七","八","九"};
	 private static String[] Number = {"0","1","2","3","4","5","6","7","8","9"};
	   
	 /** 
	  * @param num 
	  * @return 
	  * @Author:lulei 
	  * @Description:将数字转化为大写 
	  */
	 public static String getNumberStr(int num) { 
	  if (num < 0) { 
	   return ""; 
	  } 
	  if (num == 0) { 
	   return NUMBER1[0]; 
	  } 
	  int split = 10000; 
	  int y = num / (split * split); 
	  int w = (num / split) % split; 
	  int g = num % split; 
	  StringBuffer sb = new StringBuffer(); 
	  //亿 
	  if (y > 0) { 
	   sb.append(getNumberStr1000(y)); 
	   sb.append(NUMBER2[5]); 
	  } 
	  //万 
	  if (w > 999) { 
	   sb.append(getNumberStr1000(w)); 
	   sb.append(NUMBER2[4]); 
	  } else { 
	   if (w > 0) { 
	    if (y != 0) { 
	     sb.append(NUMBER2[0]); 
	    } 
	    sb.append(getNumberStr1000(w)); 
	    sb.append(NUMBER2[4]); 
	   } 
	  } 
	  //万以下 
	  if (g > 0) { 
	   if (w != 0) { 
	    if (g > 999) { 
	     sb.append(getNumberStr1000(g)); 
	    } else { 
	     sb.append(NUMBER2[0]); 
	     sb.append(getNumberStr1000(g)); 
	    } 
	      
	   } else { 
	    if (y != 0) { 
	     sb.append(NUMBER2[0]); 
	    } 
	    sb.append(getNumberStr1000(g)); 
	   } 
	  } 
	  return sb.toString(); 
	 } 
	   
	 /** 
	  * @param num 
	  * @return 
	  * @Description:对万以下的数字进行大小写转化 
	  */
	 private static String getNumberStr1000 (int num) { 
	  if (num > 9999 || num < 0) { 
	   return ""; 
	  } 
	  int q = num / 1000; 
	  int b = (num / 100) % 10; 
	  int s = (num / 10) % 10; 
	  int g = num % 10; 
	  StringBuffer sb = new StringBuffer(); 
	  //千 
	  if (q > 0) { 
	   sb.append(NUMBER1[q]); 
	   sb.append(NUMBER2[3]); 
	  } 
	  //百 
	  if (b > 0) { 
	   sb.append(NUMBER1[b]); 
	   sb.append(NUMBER2[2]); 
	  } else { 
	   if (q != 0) { 
	    sb.append(NUMBER2[0]); 
	   } 
	  } 
	  //十 
	  if (s > 0) { 
	   sb.append(NUMBER1[s]); 
	   sb.append(NUMBER2[1]); 
	  } else { 
	   if (b != 0) { 
	    sb.append(NUMBER2[0]); 
	   } 
	  } 
	  //个 
	  if (g > 0) { 
	   sb.append(NUMBER1[g]); 
	  } 
	  return sb.toString(); 
	 } 
	 
	 /**
	  * 将阿拉伯数字转换为中文数字
	  * @param number  阿拉伯数字字符串
	  * @return
	  */
     public static String number2ChineseUpper(String strNumber){
    	 StringBuilder sb = new StringBuilder();
    	 char[] charArray = strNumber.toCharArray();
    	 for (char c : charArray) {
		     int index = Integer.parseInt(c+"");
		     sb.append(Upper[index]);
		 }
    	 return sb.toString();
     }
     
     /**
      * 将中文
      * @param chinestUpper
      * @return
      */
     public static String chineseUpper2Number(String chinestUpper){
    	 char[] chars = chinestUpper.toCharArray();
    	 StringBuilder sb = new StringBuilder();
    	 for (char c : chars) {
			 for (int i = 0; i < Upper.length; i++) {
				if(String.valueOf(c).equals(Upper[i])){
					sb.append(i);
				}
			}
		 }
    	 
    	 return sb.toString();
     }
	 
     
     /**
      * 该方法将字符串中的所有数字都转化为中文数字
      * @param text
      * @return
      */
     public static String toChineseUpper(String text){
    	 StringBuffer sb = new StringBuffer();
    	 char[] charArray = text.toCharArray();
    	 for (char c : charArray) {
    		 boolean flag = false;
			 for (int i = 0; i < Number.length; i++) {
				if(String.valueOf(c).equals(Number[i])){
					sb.append(Upper[i]);
					flag = true;
					break;
				}
			}
			if(!flag){
				sb.append(c);
			}
		}
    	 return sb.toString();
     }
	  
	 public static void main(String[] args) { 
		  // TODO Auto-generated method stub 
		  int i = 1; 
		  System.out.println(i + "--" + NumberUtil.getNumberStr(i)); 
		  i = 1001; 
		  System.out.println(i + "--" + NumberUtil.getNumberStr(i)); 
		  i = 100101; 
		  System.out.println(i + "--" + NumberUtil.getNumberStr(i)); 
		  i = 10100101; 
		  System.out.println(i + "--" + NumberUtil.getNumberStr(i)); 
		  i = 1234567890; 
		  System.out.println(i + "--" + NumberUtil.getNumberStr(i)); 
	 } 
	  
}