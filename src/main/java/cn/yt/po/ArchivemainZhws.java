package cn.yt.po;

import java.util.Date;

@Deprecated
public class ArchivemainZhws {
//	@Field("ID")
	private String id;
//	@Field("TIMESTAMPP")
	private Date timestampp;
//	@Field("TRS_ID")
	private String trsId;
	private String mtm;
	private String mclassRootId;
	private String mclassId;
	private String mclassList;
	private String mclassName;
	private String mclassShortName;
	private Date mcreateDate;
	private String mcreateUser;
	private String mcreateUserName;
	private String mfname;
	private String mfnameMc;
	private String mwh;
	private String mgdnd;
	private String mgjno;
	private String majjno;
	private String majjdh;
	private String mwjjdh;
	private String mgdState;
	private String mgdstateMc;
	private String mauditstate;
	private String mauditstateMc;
	private String mstoreRoomId;
	private String mstoreRoomIdMc;
	private String mstoreRoomState;
	private String mstoreRoomStateMc;
	private String mgdrq;
	private String mgdUser;
	private String mocrAttachmentName;
	private String mocrAttachmentContent;
	private String mpdfAttachmentName;
	private String mqzh;
	private String mzrz;
	private String mbgqx;
	private String mbgqxMc;
	private String mzys;
	private String mzfs;
	private String mcfwz;
	private String mmj;
	private String mmjMc;
	private String mkssj;
	private String mjssj;
	private String mmlh;
	private String mhh;
	private String mflh;
	private String mrefile;
	private String trsOtherContext;
	private String trsContent;
	private String trsKeyContext;
	private String trsEntityPlace;
	private String trsKeyWord;
	private String trsAbs;
	private String majguId;
	private String majjguId;
	private String mprjName;
	private String mprjno;
//	@Field("AJ_FLAG")
	private String ajFlag;
	private String mbz;
	private String trsRank;
	private String mjgdm;
	private String mjgdmMc;
	private String mzzbs;
	private String mzzbsMc;
	private String marchivesType;
	private String marchivesTypeName;
	private String myh;
	private String myflh;
	
	
	//此处应该注意，当QueryResponse.getBeans(ArchivemainZhws.class);方式查询，并返回实体bean时，必须有一个空的构造方法
	public ArchivemainZhws() {}
	
	
	public String getId() {
		return id;
	}
	//@Field("ID")
	public void setId(String id) {
		this.id = id;
	}

	public Date getTimestampp() {
		return timestampp;
	}

	public void setTimestampp(Date timestampp) {
		this.timestampp = timestampp;
	}

	public String getTrsId() {
		return trsId;
	}
//	@Field("TRS_ID")
	public void setTrsId(String trsId) {
		this.trsId = trsId;
	}

	public String getMtm() {
		return mtm;
	}

	public void setMtm(String mtm) {
		this.mtm = mtm;
	}

	public String getMclassRootId() {
		return mclassRootId;
	}

	public void setMclassRootId(String mclassRootId) {
		this.mclassRootId = mclassRootId;
	}

	public String getMclassId() {
		return mclassId;
	}

	public void setMclassId(String mclassId) {
		this.mclassId = mclassId;
	}

	public String getMclassList() {
		return mclassList;
	}

	public void setMclassList(String mclassList) {
		this.mclassList = mclassList;
	}

	public String getMclassName() {
		return mclassName;
	}

	public void setMclassName(String mclassName) {
		this.mclassName = mclassName;
	}

	public String getMclassShortName() {
		return mclassShortName;
	}

	public void setMclassShortName(String mclassShortName) {
		this.mclassShortName = mclassShortName;
	}

	public Date getMcreateDate() {
		return mcreateDate;
	}

	public void setMcreateDate(Date mcreateDate) {
		this.mcreateDate = mcreateDate;
	}

	public String getMcreateUser() {
		return mcreateUser;
	}

	public void setMcreateUser(String mcreateUser) {
		this.mcreateUser = mcreateUser;
	}

	public String getMcreateUserName() {
		return mcreateUserName;
	}

	public void setMcreateUserName(String mcreateUserName) {
		this.mcreateUserName = mcreateUserName;
	}

	public String getMfname() {
		return mfname;
	}

	public void setMfname(String mfname) {
		this.mfname = mfname;
	}

	public String getMfnameMc() {
		return mfnameMc;
	}

	public void setMfnameMc(String mfnameMc) {
		this.mfnameMc = mfnameMc;
	}

	public String getMwh() {
		return mwh;
	}

	public void setMwh(String mwh) {
		this.mwh = mwh;
	}

	public String getMgdnd() {
		return mgdnd;
	}

	public void setMgdnd(String mgdnd) {
		this.mgdnd = mgdnd;
	}

	public String getMgjno() {
		return mgjno;
	}

	public void setMgjno(String mgjno) {
		this.mgjno = mgjno;
	}

	public String getMajjno() {
		return majjno;
	}

	public void setMajjno(String majjno) {
		this.majjno = majjno;
	}

	public String getMajjdh() {
		return majjdh;
	}

	public void setMajjdh(String majjdh) {
		this.majjdh = majjdh;
	}

	public String getMwjjdh() {
		return mwjjdh;
	}

	public void setMwjjdh(String mwjjdh) {
		this.mwjjdh = mwjjdh;
	}

	public String getMgdState() {
		return mgdState;
	}

	public void setMgdState(String mgdState) {
		this.mgdState = mgdState;
	}

	public String getMgdstateMc() {
		return mgdstateMc;
	}

	public void setMgdstateMc(String mgdstateMc) {
		this.mgdstateMc = mgdstateMc;
	}

	public String getMauditstate() {
		return mauditstate;
	}

	public void setMauditstate(String mauditstate) {
		this.mauditstate = mauditstate;
	}

	public String getMauditstateMc() {
		return mauditstateMc;
	}

	public void setMauditstateMc(String mauditstateMc) {
		this.mauditstateMc = mauditstateMc;
	}

	public String getMstoreRoomId() {
		return mstoreRoomId;
	}

	public void setMstoreRoomId(String mstoreRoomId) {
		this.mstoreRoomId = mstoreRoomId;
	}

	public String getMstoreRoomIdMc() {
		return mstoreRoomIdMc;
	}

	public void setMstoreRoomIdMc(String mstoreRoomIdMc) {
		this.mstoreRoomIdMc = mstoreRoomIdMc;
	}

	public String getMstoreRoomState() {
		return mstoreRoomState;
	}

	public void setMstoreRoomState(String mstoreRoomState) {
		this.mstoreRoomState = mstoreRoomState;
	}

	public String getMstoreRoomStateMc() {
		return mstoreRoomStateMc;
	}

	public void setMstoreRoomStateMc(String mstoreRoomStateMc) {
		this.mstoreRoomStateMc = mstoreRoomStateMc;
	}

	public String getMgdrq() {
		return mgdrq;
	}

	public void setMgdrq(String mgdrq) {
		this.mgdrq = mgdrq;
	}

	public String getMgdUser() {
		return mgdUser;
	}

	public void setMgdUser(String mgdUser) {
		this.mgdUser = mgdUser;
	}

	public String getMocrAttachmentName() {
		return mocrAttachmentName;
	}

	public void setMocrAttachmentName(String mocrAttachmentName) {
		this.mocrAttachmentName = mocrAttachmentName;
	}

	public String getMocrAttachmentContent() {
		return mocrAttachmentContent;
	}

	public void setMocrAttachmentContent(String mocrAttachmentContent) {
		this.mocrAttachmentContent = mocrAttachmentContent;
	}

	public String getMpdfAttachmentName() {
		return mpdfAttachmentName;
	}

	public void setMpdfAttachmentName(String mpdfAttachmentName) {
		this.mpdfAttachmentName = mpdfAttachmentName;
	}

	public String getMqzh() {
		return mqzh;
	}

	public void setMqzh(String mqzh) {
		this.mqzh = mqzh;
	}

	public String getMzrz() {
		return mzrz;
	}

	public void setMzrz(String mzrz) {
		this.mzrz = mzrz;
	}

	public String getMbgqx() {
		return mbgqx;
	}

	public void setMbgqx(String mbgqx) {
		this.mbgqx = mbgqx;
	}

	public String getMbgqxMc() {
		return mbgqxMc;
	}

	public void setMbgqxMc(String mbgqxMc) {
		this.mbgqxMc = mbgqxMc;
	}

	public String getMzys() {
		return mzys;
	}

	public void setMzys(String mzys) {
		this.mzys = mzys;
	}

	public String getMzfs() {
		return mzfs;
	}

	public void setMzfs(String mzfs) {
		this.mzfs = mzfs;
	}

	public String getMcfwz() {
		return mcfwz;
	}

	public void setMcfwz(String mcfwz) {
		this.mcfwz = mcfwz;
	}

	public String getMmj() {
		return mmj;
	}

	public void setMmj(String mmj) {
		this.mmj = mmj;
	}

	public String getMmjMc() {
		return mmjMc;
	}

	public void setMmjMc(String mmjMc) {
		this.mmjMc = mmjMc;
	}

	public String getMkssj() {
		return mkssj;
	}

	public void setMkssj(String mkssj) {
		this.mkssj = mkssj;
	}

	public String getMjssj() {
		return mjssj;
	}

	public void setMjssj(String mjssj) {
		this.mjssj = mjssj;
	}

	public String getMmlh() {
		return mmlh;
	}

	public void setMmlh(String mmlh) {
		this.mmlh = mmlh;
	}

	public String getMhh() {
		return mhh;
	}

	public void setMhh(String mhh) {
		this.mhh = mhh;
	}

	public String getMflh() {
		return mflh;
	}

	public void setMflh(String mflh) {
		this.mflh = mflh;
	}

	public String getMrefile() {
		return mrefile;
	}

	public void setMrefile(String mrefile) {
		this.mrefile = mrefile;
	}

	public String getTrsOtherContext() {
		return trsOtherContext;
	}

	public void setTrsOtherContext(String trsOtherContext) {
		this.trsOtherContext = trsOtherContext;
	}

	public String getTrsContent() {
		return trsContent;
	}

	public void setTrsContent(String trsContent) {
		this.trsContent = trsContent;
	}

	public String getTrsKeyContext() {
		return trsKeyContext;
	}

	public void setTrsKeyContext(String trsKeyContext) {
		this.trsKeyContext = trsKeyContext;
	}

	public String getTrsEntityPlace() {
		return trsEntityPlace;
	}

	public void setTrsEntityPlace(String trsEntityPlace) {
		this.trsEntityPlace = trsEntityPlace;
	}

	public String getTrsKeyWord() {
		return trsKeyWord;
	}

	public void setTrsKeyWord(String trsKeyWord) {
		this.trsKeyWord = trsKeyWord;
	}

	public String getTrsAbs() {
		return trsAbs;
	}

	public void setTrsAbs(String trsAbs) {
		this.trsAbs = trsAbs;
	}

	public String getMajguId() {
		return majguId;
	}

	public void setMajguId(String majguId) {
		this.majguId = majguId;
	}

	public String getMajjguId() {
		return majjguId;
	}

	public void setMajjguId(String majjguId) {
		this.majjguId = majjguId;
	}

	public String getMprjName() {
		return mprjName;
	}

	public void setMprjName(String mprjName) {
		this.mprjName = mprjName;
	}

	public String getMprjno() {
		return mprjno;
	}

	public void setMprjno(String mprjno) {
		this.mprjno = mprjno;
	}

	public String getAjFlag() {
		return ajFlag;
	}

	public void setAjFlag(String ajFlag) {
		this.ajFlag = ajFlag;
	}

	public String getMbz() {
		return mbz;
	}

	public void setMbz(String mbz) {
		this.mbz = mbz;
	}

	public String getTrsRank() {
		return trsRank;
	}

	public void setTrsRank(String trsRank) {
		this.trsRank = trsRank;
	}

	public String getMjgdm() {
		return mjgdm;
	}

	public void setMjgdm(String mjgdm) {
		this.mjgdm = mjgdm;
	}

	public String getMjgdmMc() {
		return mjgdmMc;
	}

	public void setMjgdmMc(String mjgdmMc) {
		this.mjgdmMc = mjgdmMc;
	}

	public String getMzzbs() {
		return mzzbs;
	}

	public void setMzzbs(String mzzbs) {
		this.mzzbs = mzzbs;
	}

	public String getMzzbsMc() {
		return mzzbsMc;
	}

	public void setMzzbsMc(String mzzbsMc) {
		this.mzzbsMc = mzzbsMc;
	}

	public String getMarchivesType() {
		return marchivesType;
	}

	public void setMarchivesType(String marchivesType) {
		this.marchivesType = marchivesType;
	}

	public String getMarchivesTypeName() {
		return marchivesTypeName;
	}

	public void setMarchivesTypeName(String marchivesTypeName) {
		this.marchivesTypeName = marchivesTypeName;
	}

	public String getMyh() {
		return myh;
	}

	public void setMyh(String myh) {
		this.myh = myh;
	}

	public String getMyflh() {
		return myflh;
	}

	public void setMyflh(String myflh) {
		this.myflh = myflh;
	}

	@Override
	public String toString() {
		return "ArchivemainZhws [id=" + id + ", timestampp=" + timestampp + ", trsId=" + trsId + ", mtm=" + mtm
				+ ", mclassRootId=" + mclassRootId + ", mclassId=" + mclassId + ", mclassList=" + mclassList
				+ ", mclassName=" + mclassName + ", mclassShortName=" + mclassShortName + ", mcreateDate=" + mcreateDate
				+ ", mcreateUser=" + mcreateUser + ", mcreateUserName=" + mcreateUserName + ", mfname=" + mfname
				+ ", mfnameMc=" + mfnameMc + ", mwh=" + mwh + ", mgdnd=" + mgdnd + ", mgjno=" + mgjno + ", majjno="
				+ majjno + ", majjdh=" + majjdh + ", mwjjdh=" + mwjjdh + ", mgdState=" + mgdState + ", mgdstateMc="
				+ mgdstateMc + ", mauditstate=" + mauditstate + ", mauditstateMc=" + mauditstateMc + ", mstoreRoomId="
				+ mstoreRoomId + ", mstoreRoomIdMc=" + mstoreRoomIdMc + ", mstoreRoomState=" + mstoreRoomState
				+ ", mstoreRoomStateMc=" + mstoreRoomStateMc + ", mgdrq=" + mgdrq + ", mgdUser=" + mgdUser
				+ ", mocrAttachmentName=" + mocrAttachmentName + ", mocrAttachmentContent=" + mocrAttachmentContent
				+ ", mpdfAttachmentName=" + mpdfAttachmentName + ", mqzh=" + mqzh + ", mzrz=" + mzrz + ", mbgqx="
				+ mbgqx + ", mbgqxMc=" + mbgqxMc + ", mzys=" + mzys + ", mzfs=" + mzfs + ", mcfwz=" + mcfwz + ", mmj="
				+ mmj + ", mmjMc=" + mmjMc + ", mkssj=" + mkssj + ", mjssj=" + mjssj + ", mmlh=" + mmlh + ", mhh=" + mhh
				+ ", mflh=" + mflh + ", mrefile=" + mrefile + ", trsOtherContext=" + trsOtherContext + ", trsContent="
				+ trsContent + ", trsKeyContext=" + trsKeyContext + ", trsEntityPlace=" + trsEntityPlace
				+ ", trsKeyWord=" + trsKeyWord + ", trsAbs=" + trsAbs + ", majguId=" + majguId + ", majjguId="
				+ majjguId + ", mprjName=" + mprjName + ", mprjno=" + mprjno + ", ajFlag=" + ajFlag + ", mbz=" + mbz
				+ ", trsRank=" + trsRank + ", mjgdm=" + mjgdm + ", mjgdmMc=" + mjgdmMc + ", mzzbs=" + mzzbs
				+ ", mzzbsMc=" + mzzbsMc + ", marchivesType=" + marchivesType + ", marchivesTypeName="
				+ marchivesTypeName + ", myh=" + myh + ", myflh=" + myflh + "]";
	}

	
	
}
