package cn.yt.po;

/**
 * 该类主要对kittle链接的数据源进行封装
 * @author Administrator
 *
 */
@Deprecated
public class DateSource {

	/**
	 * 连接名称
	 */
	private String connectionName;
	
	/**
	 * 连接类型
	 */
	private String connectionType;
	
	/**
	 * 连接方式
	 */
	private String driverType;
	
	/**
	 * 主机ip
	 */
	private String hostName;
	
	/**
	 * 数据库名称
	 */
	private String databaseName;
	
	/**
	 * 端口号
	 */
	private String port;
	
	/**
	 * 用户名
	 */
	private String userName;
	
	/**
	 * 用户密码
	 */
	private String password;
	
	/**
	 * 要操作的表，目前暂时只支持单表同步
	 */
	private String table;
	
	public DateSource(){
		
	}

	public String getConnectionName() {
		return connectionName;
	}

	public void setConnectionName(String connectionName) {
		this.connectionName = connectionName;
	}

	public String getConnectionType() {
		return connectionType;
	}

	public void setConnectionType(String connectionType) {
		this.connectionType = connectionType;
	}

	public String getDriverType() {
		return driverType;
	}

	public void setDriverType(String driverType) {
		this.driverType = driverType;
	}

	public String getHostName() {
		return hostName;
	}

	public void setHostName(String hostName) {
		this.hostName = hostName;
	}

	public String getDatabaseName() {
		return databaseName;
	}

	public void setDatabaseName(String databaseName) {
		this.databaseName = databaseName;
	}

	public String getPort() {
		return port;
	}

	public void setPort(String port) {
		this.port = port;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getTable() {
		return table;
	}

	public void setTable(String table) {
		this.table = table;
	}

	@Override
	public String toString() {
		return "DataSource [connectionName=" + connectionName + ", connectionType=" + connectionType + ", driverType="
				+ driverType + ", hostName=" + hostName + ", databaseName=" + databaseName + ", port=" + port
				+ ", userName=" + userName + ", password=" + password + "]";
	}
	
}
