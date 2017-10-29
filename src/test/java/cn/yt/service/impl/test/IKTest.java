package cn.yt.service.impl.test;

import java.io.IOException;
import java.io.StringReader;

import org.wltea.analyzer.core.IKSegmenter;
import org.wltea.analyzer.core.Lexeme;

public class IKTest {

	public static void main(String[] args) throws IOException {
		String text="实际上从去年开始，智能化、无人化的零售店面设计已经被全球众多互联网巨头提上日程，中国的智能零售店正逐步从概念走向现实。那么，智能无人零售目前发展到了什么阶段？未来前景又将如何呢？";  
        StringReader sr=new StringReader(text);  
        IKSegmenter ik=new IKSegmenter(sr, true);  
        Lexeme lex=null;  
        while((lex=ik.next())!=null){  
            System.out.print(lex.getLexemeText()+"|");  
        }  
        
        
        System.out.println();
        // 单独的使用IKAnalyzer，可以直接使用IK分词器的核心类，真正分词的实现类IKSegmenter分词器进行分词  
        StringReader reader = new StringReader("已经被全球众多互联网巨头提上日程");  
        ik = new IKSegmenter(reader, false);// 当为true时，分词器进行最大词长切分  
        Lexeme lexeme = null;  
        try {  
        while ((lexeme = ik.next()) != null)  
        System.out.print(lexeme.getLexemeText()+"|");  
        } catch (IOException e) {  
         e.printStackTrace();  
         } finally {  
         reader.close();  
        }

	}

}
