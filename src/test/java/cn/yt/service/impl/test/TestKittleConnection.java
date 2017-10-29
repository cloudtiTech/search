package cn.yt.service.impl.test;

import org.junit.Before;
import org.junit.Test;
import org.pentaho.di.core.KettleEnvironment;
import org.pentaho.di.core.database.DatabaseMeta;
import org.pentaho.di.core.exception.KettleException;
import org.pentaho.di.trans.Trans;
import org.pentaho.di.trans.TransMeta;
import org.pentaho.di.trans.step.StepIOMetaInterface;
import org.pentaho.di.trans.step.StepMeta;
import org.pentaho.di.trans.steps.mergerows.MergeRowsMeta;
import org.pentaho.di.trans.steps.tableinput.TableInputMeta;

import cn.yt.po.DateSource;

public class TestKittleConnection {

	private DateSource dateSource = new DateSource();
	private String dateSourceXML = new String();
	
	@Before
	public void init(){
		dateSource.setConnectionName("zmdh");
		dateSource.setConnectionType("MYSQL");
		dateSource.setDriverType("Native(JDBC)");
		dateSource.setDatabaseName("zmdh");
		dateSource.setHostName("127.0.0.1");
		dateSource.setUserName("root");
		dateSource.setPassword("root");
		dateSource.setPort("3306");
		dateSource.setTable("t_user");
		
		dateSourceXML = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +  
		          "<connection>" +  
		            "<name>"+dateSource.getConnectionName()+"</name>" +  
		            "<server>"+dateSource.getHostName()+"</server>" +  
		            "<type>"+dateSource.getConnectionType()+"</type>" +  
		            "<access>"+dateSource.getDriverType()+"</access>" +   
		            "<database>"+dateSource.getDatabaseName()+"</database>" +  
		            "<port>"+dateSource.getPort()+"</port>" +  
		            "<username>"+dateSource.getUserName()+"</username>" +  
		            "<password>"+dateSource.getPassword()+"</password>" +  
		          "</connection>"; 
	}
	
	@Test
	public void test_sync(){
		try {
			KettleEnvironment.init();
			System.setProperty("javax.xml.parsers.DocumentBuilderFactory","com.sun.org.apache.xerces.internal.jaxp.DocumentBuilderFactoryImpl");
		    TransMeta transMeta = new TransMeta();  
		         //设置转化的名称   
		    transMeta.setName(dateSource.getConnectionName());
		    DatabaseMeta databaseMeta = new DatabaseMeta(dateSourceXML);
		    transMeta.addDatabase(databaseMeta);
		    
		    TableInputMeta oldTableInput = new TableInputMeta();
		    DatabaseMeta database_zmdh = transMeta.findDatabase(dateSource.getConnectionName());
		    oldTableInput.setDatabaseMeta(database_zmdh);
		    String sql = "SELECT * from t_user";
		    oldTableInput.setSQL(sql);
		    StepMeta oldTableInputMetaStep = new StepMeta("INPUTTABLE_"+dateSource.getTable(),oldTableInput);
		    transMeta.addStep(oldTableInputMetaStep);

	         Trans trans = new Trans(transMeta);  
	  	   
	         trans.execute(null);
		    
		} catch (KettleException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
