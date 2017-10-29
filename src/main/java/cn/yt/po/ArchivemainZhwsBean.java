package cn.yt.po;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonAutoDetect;

@JsonAutoDetect(fieldVisibility=JsonAutoDetect.Visibility.ANY, getterVisibility=JsonAutoDetect.Visibility.NONE) 
@Deprecated
public class ArchivemainZhwsBean {
	
	
    private String ID;
	
    private Date TIMESTAMPP;

    private String TRS_ID;

    private String M_TM;

    private String M_CLASSROOTID;

    private String M_CLASSID;

    private String M_CLASSLIST;

    private String M_CLASSNAME;

    private String M_CLASSSHORTNAME;

    private Date M_CREATEDATE;

    private String M_CREATEUSER;

    private String M_CREATEUSERNAME;

    private String M_FNAME;

    private String M_FNAME_MC;

    private String M_WH;

    private String M_GDND;

    private String M_AJNO;

    private String M_AJJNO;

    private String M_AJJDH;

    private String M_WJJDH;

    private String M_GDSTATE;

    private String M_GDSTATE_MC;

    private String M_AUDITSTATE;

    private String M_AUDITSTATE_MC;

    private String M_STOREROOMID;

    private String M_STOREROOMID_MC;

    private String M_STOREROOMSTATE;

    private String M_STOREROOMSTATE_MC;

    private String M_GDRQ;

    private String M_GDUSER;

    private String M_OCR_ATTACHMENTNAME;

    private String M_OCR_ATTACHMENTCONTENT;

    private String M_PDF_ATTACHMENTNAME;

    private String M_QZH;

    private String M_ZRZ;

    private String M_BGQX;

    private String M_BGQX_MC;

    private String M_ZYS;

    private String M_ZFS;

    private String M_CFWZ;

    private String M_MJ;

    private String M_MJ_MC;

    private String M_KSSJ;

    private String M_JSSJ;

    private String M_MLH;

    private String M_HH;

    private String M_FLH;

    private String M_REFILE;

    private String TRS_OTHER_CONTEXT;

    private String TRS_CONTENT;

    private String TRS_KEY_CONTEXT;

    private String TRS_ENTITY_PLACE;

    private String TRS_KEYWORD;

    private String TRS_ABS;

    private String M_AJGUID;

    private String M_AJJGUID;

    private String M_PRJNAME;

    private String M_PRJNO;

    private String AJ_FLAG;

    private String M_BZ;

    private String TRS_RANK;

    private String M_JGDM;

    private String M_JGDM_MC;

    private String M_ZZBS;

    private String M_ZZBS_MC;

    private String M_ARCHIVESTYPE;

    private String M_ARCHIVESTYPENAME;

    private String M_YH;

    private String M_YFLH;
    
    private String trsId;
    
    private String mcfwz;

	public String getID() {
		return ID;
	}

	public void setID(String iD) {
		ID = iD;
		this.trsId = iD;
	}

	public Date getTIMESTAMPP() {
		return TIMESTAMPP;
	}

	public void setTIMESTAMPP(Date tIMESTAMPP) {
		TIMESTAMPP = tIMESTAMPP;
	}

	public String getTRS_ID() {
		return TRS_ID;
	}

	public void setTRS_ID(String tRS_ID) {
		TRS_ID = tRS_ID;
	}

	public String getM_TM() {
		return M_TM;
	}

	public void setM_TM(String m_TM) {
		M_TM = m_TM;
	}

	public String getM_CLASSROOTID() {
		return M_CLASSROOTID;
	}

	public void setM_CLASSROOTID(String m_CLASSROOTID) {
		M_CLASSROOTID = m_CLASSROOTID;
	}

	public String getM_CLASSID() {
		return M_CLASSID;
	}

	public void setM_CLASSID(String m_CLASSID) {
		M_CLASSID = m_CLASSID;
	}

	public String getM_CLASSLIST() {
		return M_CLASSLIST;
	}

	public void setM_CLASSLIST(String m_CLASSLIST) {
		M_CLASSLIST = m_CLASSLIST;
	}

	public String getM_CLASSNAME() {
		return M_CLASSNAME;
	}

	public void setM_CLASSNAME(String m_CLASSNAME) {
		M_CLASSNAME = m_CLASSNAME;
	}

	public String getM_CLASSSHORTNAME() {
		return M_CLASSSHORTNAME;
	}

	public void setM_CLASSSHORTNAME(String m_CLASSSHORTNAME) {
		M_CLASSSHORTNAME = m_CLASSSHORTNAME;
	}

	public Date getM_CREATEDATE() {
		return M_CREATEDATE;
	}

	public void setM_CREATEDATE(Date m_CREATEDATE) {
		M_CREATEDATE = m_CREATEDATE;
	}

	public String getM_CREATEUSER() {
		return M_CREATEUSER;
	}

	public void setM_CREATEUSER(String m_CREATEUSER) {
		M_CREATEUSER = m_CREATEUSER;
	}

	public String getM_CREATEUSERNAME() {
		return M_CREATEUSERNAME;
	}

	public void setM_CREATEUSERNAME(String m_CREATEUSERNAME) {
		M_CREATEUSERNAME = m_CREATEUSERNAME;
	}

	public String getM_FNAME() {
		return M_FNAME;
	}

	public void setM_FNAME(String m_FNAME) {
		M_FNAME = m_FNAME;
	}

	public String getM_FNAME_MC() {
		return M_FNAME_MC;
	}

	public void setM_FNAME_MC(String m_FNAME_MC) {
		M_FNAME_MC = m_FNAME_MC;
	}

	public String getM_WH() {
		return M_WH;
	}

	public void setM_WH(String m_WH) {
		M_WH = m_WH;
	}

	public String getM_GDND() {
		return M_GDND;
	}

	public void setM_GDND(String m_GDND) {
		M_GDND = m_GDND;
	}

	public String getM_AJNO() {
		return M_AJNO;
	}

	public void setM_AJNO(String m_AJNO) {
		M_AJNO = m_AJNO;
	}

	public String getM_AJJNO() {
		return M_AJJNO;
	}

	public void setM_AJJNO(String m_AJJNO) {
		M_AJJNO = m_AJJNO;
	}

	public String getM_AJJDH() {
		return M_AJJDH;
	}

	public void setM_AJJDH(String m_AJJDH) {
		M_AJJDH = m_AJJDH;
	}

	public String getM_WJJDH() {
		return M_WJJDH;
	}

	public void setM_WJJDH(String m_WJJDH) {
		M_WJJDH = m_WJJDH;
	}

	public String getM_GDSTATE() {
		return M_GDSTATE;
	}

	public void setM_GDSTATE(String m_GDSTATE) {
		M_GDSTATE = m_GDSTATE;
	}

	public String getM_GDSTATE_MC() {
		return M_GDSTATE_MC;
	}

	public void setM_GDSTATE_MC(String m_GDSTATE_MC) {
		M_GDSTATE_MC = m_GDSTATE_MC;
	}

	public String getM_AUDITSTATE() {
		return M_AUDITSTATE;
	}

	public void setM_AUDITSTATE(String m_AUDITSTATE) {
		M_AUDITSTATE = m_AUDITSTATE;
	}

	public String getM_AUDITSTATE_MC() {
		return M_AUDITSTATE_MC;
	}

	public void setM_AUDITSTATE_MC(String m_AUDITSTATE_MC) {
		M_AUDITSTATE_MC = m_AUDITSTATE_MC;
	}

	public String getM_STOREROOMID() {
		return M_STOREROOMID;
	}

	public void setM_STOREROOMID(String m_STOREROOMID) {
		M_STOREROOMID = m_STOREROOMID;
	}

	public String getM_STOREROOMID_MC() {
		return M_STOREROOMID_MC;
	}

	public void setM_STOREROOMID_MC(String m_STOREROOMID_MC) {
		M_STOREROOMID_MC = m_STOREROOMID_MC;
	}

	public String getM_STOREROOMSTATE() {
		return M_STOREROOMSTATE;
	}

	public void setM_STOREROOMSTATE(String m_STOREROOMSTATE) {
		M_STOREROOMSTATE = m_STOREROOMSTATE;
	}

	public String getM_STOREROOMSTATE_MC() {
		return M_STOREROOMSTATE_MC;
	}

	public void setM_STOREROOMSTATE_MC(String m_STOREROOMSTATE_MC) {
		M_STOREROOMSTATE_MC = m_STOREROOMSTATE_MC;
	}

	public String getM_GDRQ() {
		return M_GDRQ;
	}

	public void setM_GDRQ(String m_GDRQ) {
		M_GDRQ = m_GDRQ;
	}

	public String getM_GDUSER() {
		return M_GDUSER;
	}

	public void setM_GDUSER(String m_GDUSER) {
		M_GDUSER = m_GDUSER;
	}

	public String getM_OCR_ATTACHMENTNAME() {
		return M_OCR_ATTACHMENTNAME;
	}

	public void setM_OCR_ATTACHMENTNAME(String m_OCR_ATTACHMENTNAME) {
		M_OCR_ATTACHMENTNAME = m_OCR_ATTACHMENTNAME;
	}

	public String getM_OCR_ATTACHMENTCONTENT() {
		return M_OCR_ATTACHMENTCONTENT;
	}

	public void setM_OCR_ATTACHMENTCONTENT(String m_OCR_ATTACHMENTCONTENT) {
		M_OCR_ATTACHMENTCONTENT = m_OCR_ATTACHMENTCONTENT;
	}

	public String getM_PDF_ATTACHMENTNAME() {
		return M_PDF_ATTACHMENTNAME;
	}

	public void setM_PDF_ATTACHMENTNAME(String m_PDF_ATTACHMENTNAME) {
		M_PDF_ATTACHMENTNAME = m_PDF_ATTACHMENTNAME;
	}

	public String getM_QZH() {
		return M_QZH;
	}

	public void setM_QZH(String m_QZH) {
		M_QZH = m_QZH;
	}

	public String getM_ZRZ() {
		return M_ZRZ;
	}

	public void setM_ZRZ(String m_ZRZ) {
		M_ZRZ = m_ZRZ;
	}

	public String getM_BGQX() {
		return M_BGQX;
	}

	public void setM_BGQX(String m_BGQX) {
		M_BGQX = m_BGQX;
	}

	public String getM_BGQX_MC() {
		return M_BGQX_MC;
	}

	public void setM_BGQX_MC(String m_BGQX_MC) {
		M_BGQX_MC = m_BGQX_MC;
	}

	public String getM_ZYS() {
		return M_ZYS;
	}

	public void setM_ZYS(String m_ZYS) {
		M_ZYS = m_ZYS;
	}

	public String getM_ZFS() {
		return M_ZFS;
	}

	public void setM_ZFS(String m_ZFS) {
		M_ZFS = m_ZFS;
	}

	public String getM_CFWZ() {
		return M_CFWZ;
	}

	public void setM_CFWZ(String m_CFWZ) {
		M_CFWZ = m_CFWZ;
		this.mcfwz = m_CFWZ;
	}

	public String getM_MJ() {
		return M_MJ;
	}

	public void setM_MJ(String m_MJ) {
		M_MJ = m_MJ;
	}

	public String getM_MJ_MC() {
		return M_MJ_MC;
	}

	public void setM_MJ_MC(String m_MJ_MC) {
		M_MJ_MC = m_MJ_MC;
	}

	public String getM_KSSJ() {
		return M_KSSJ;
	}

	public void setM_KSSJ(String m_KSSJ) {
		M_KSSJ = m_KSSJ;
	}

	public String getM_JSSJ() {
		return M_JSSJ;
	}

	public void setM_JSSJ(String m_JSSJ) {
		M_JSSJ = m_JSSJ;
	}

	public String getM_MLH() {
		return M_MLH;
	}

	public void setM_MLH(String m_MLH) {
		M_MLH = m_MLH;
	}

	public String getM_HH() {
		return M_HH;
	}

	public void setM_HH(String m_HH) {
		M_HH = m_HH;
	}

	public String getM_FLH() {
		return M_FLH;
	}

	public void setM_FLH(String m_FLH) {
		M_FLH = m_FLH;
	}

	public String getM_REFILE() {
		return M_REFILE;
	}

	public void setM_REFILE(String m_REFILE) {
		M_REFILE = m_REFILE;
	}

	public String getTRS_OTHER_CONTEXT() {
		return TRS_OTHER_CONTEXT;
	}

	public void setTRS_OTHER_CONTEXT(String tRS_OTHER_CONTEXT) {
		TRS_OTHER_CONTEXT = tRS_OTHER_CONTEXT;
	}

	public String getTRS_CONTENT() {
		return TRS_CONTENT;
	}

	public void setTRS_CONTENT(String tRS_CONTENT) {
		TRS_CONTENT = tRS_CONTENT;
	}

	public String getTRS_KEY_CONTEXT() {
		return TRS_KEY_CONTEXT;
	}

	public void setTRS_KEY_CONTEXT(String tRS_KEY_CONTEXT) {
		TRS_KEY_CONTEXT = tRS_KEY_CONTEXT;
	}

	public String getTRS_ENTITY_PLACE() {
		return TRS_ENTITY_PLACE;
	}

	public void setTRS_ENTITY_PLACE(String tRS_ENTITY_PLACE) {
		TRS_ENTITY_PLACE = tRS_ENTITY_PLACE;
	}

	public String getTRS_KEYWORD() {
		return TRS_KEYWORD;
	}

	public void setTRS_KEYWORD(String tRS_KEYWORD) {
		TRS_KEYWORD = tRS_KEYWORD;
	}

	public String getTRS_ABS() {
		return TRS_ABS;
	}

	public void setTRS_ABS(String tRS_ABS) {
		TRS_ABS = tRS_ABS;
	}

	public String getM_AJGUID() {
		return M_AJGUID;
	}

	public void setM_AJGUID(String m_AJGUID) {
		M_AJGUID = m_AJGUID;
	}

	public String getM_AJJGUID() {
		return M_AJJGUID;
	}

	public void setM_AJJGUID(String m_AJJGUID) {
		M_AJJGUID = m_AJJGUID;
	}

	public String getM_PRJNAME() {
		return M_PRJNAME;
	}

	public void setM_PRJNAME(String m_PRJNAME) {
		M_PRJNAME = m_PRJNAME;
	}

	public String getM_PRJNO() {
		return M_PRJNO;
	}

	public void setM_PRJNO(String m_PRJNO) {
		M_PRJNO = m_PRJNO;
	}

	public String getAJ_FLAG() {
		return AJ_FLAG;
	}

	public void setAJ_FLAG(String aJ_FLAG) {
		AJ_FLAG = aJ_FLAG;
	}

	public String getM_BZ() {
		return M_BZ;
	}

	public void setM_BZ(String m_BZ) {
		M_BZ = m_BZ;
	}

	public String getTRS_RANK() {
		return TRS_RANK;
	}

	public void setTRS_RANK(String tRS_RANK) {
		TRS_RANK = tRS_RANK;
	}

	public String getM_JGDM() {
		return M_JGDM;
	}

	public void setM_JGDM(String m_JGDM) {
		M_JGDM = m_JGDM;
	}

	public String getM_JGDM_MC() {
		return M_JGDM_MC;
	}

	public void setM_JGDM_MC(String m_JGDM_MC) {
		M_JGDM_MC = m_JGDM_MC;
	}

	public String getM_ZZBS() {
		return M_ZZBS;
	}

	public void setM_ZZBS(String m_ZZBS) {
		M_ZZBS = m_ZZBS;
	}

	public String getM_ZZBS_MC() {
		return M_ZZBS_MC;
	}

	public void setM_ZZBS_MC(String m_ZZBS_MC) {
		M_ZZBS_MC = m_ZZBS_MC;
	}

	public String getM_ARCHIVESTYPE() {
		return M_ARCHIVESTYPE;
	}

	public void setM_ARCHIVESTYPE(String m_ARCHIVESTYPE) {
		M_ARCHIVESTYPE = m_ARCHIVESTYPE;
	}

	public String getM_ARCHIVESTYPENAME() {
		return M_ARCHIVESTYPENAME;
	}

	public void setM_ARCHIVESTYPENAME(String m_ARCHIVESTYPENAME) {
		M_ARCHIVESTYPENAME = m_ARCHIVESTYPENAME;
	}

	public String getM_YH() {
		return M_YH;
	}

	public void setM_YH(String m_YH) {
		M_YH = m_YH;
	}

	public String getM_YFLH() {
		return M_YFLH;
	}

	public void setM_YFLH(String m_YFLH) {
		M_YFLH = m_YFLH;
	}

	public String getTrsId() {
		return trsId;
	}


	public String getMcfwz() {
		return mcfwz;
	}

	public void setTrsId(String trsId) {
		this.trsId = trsId;
	}

	public void setMcfwz(String mcfwz) {
		this.mcfwz = mcfwz;
	}

	@Override
	public String toString() {
		return "ArchivemainZhwsBean [ID=" + ID + ", TIMESTAMPP=" + TIMESTAMPP + ", TRS_ID=" + TRS_ID + ", M_TM=" + M_TM
				+ ", M_CLASSROOTID=" + M_CLASSROOTID + ", M_CLASSID=" + M_CLASSID + ", M_CLASSLIST=" + M_CLASSLIST
				+ ", M_CLASSNAME=" + M_CLASSNAME + ", M_CLASSSHORTNAME=" + M_CLASSSHORTNAME + ", M_CREATEDATE="
				+ M_CREATEDATE + ", M_CREATEUSER=" + M_CREATEUSER + ", M_CREATEUSERNAME=" + M_CREATEUSERNAME
				+ ", M_FNAME=" + M_FNAME + ", M_FNAME_MC=" + M_FNAME_MC + ", M_WH=" + M_WH + ", M_GDND=" + M_GDND
				+ ", M_AJNO=" + M_AJNO + ", M_AJJNO=" + M_AJJNO + ", M_AJJDH=" + M_AJJDH + ", M_WJJDH=" + M_WJJDH
				+ ", M_GDSTATE=" + M_GDSTATE + ", M_GDSTATE_MC=" + M_GDSTATE_MC + ", M_AUDITSTATE=" + M_AUDITSTATE
				+ ", M_AUDITSTATE_MC=" + M_AUDITSTATE_MC + ", M_STOREROOMID=" + M_STOREROOMID + ", M_STOREROOMID_MC="
				+ M_STOREROOMID_MC + ", M_STOREROOMSTATE=" + M_STOREROOMSTATE + ", M_STOREROOMSTATE_MC="
				+ M_STOREROOMSTATE_MC + ", M_GDRQ=" + M_GDRQ + ", M_GDUSER=" + M_GDUSER + ", M_OCR_ATTACHMENTNAME="
				+ M_OCR_ATTACHMENTNAME + ", M_OCR_ATTACHMENTCONTENT=" + M_OCR_ATTACHMENTCONTENT
				+ ", M_PDF_ATTACHMENTNAME=" + M_PDF_ATTACHMENTNAME + ", M_QZH=" + M_QZH + ", M_ZRZ=" + M_ZRZ
				+ ", M_BGQX=" + M_BGQX + ", M_BGQX_MC=" + M_BGQX_MC + ", M_ZYS=" + M_ZYS + ", M_ZFS=" + M_ZFS
				+ ", M_CFWZ=" + M_CFWZ + ", M_MJ=" + M_MJ + ", M_MJ_MC=" + M_MJ_MC + ", M_KSSJ=" + M_KSSJ + ", M_JSSJ="
				+ M_JSSJ + ", M_MLH=" + M_MLH + ", M_HH=" + M_HH + ", M_FLH=" + M_FLH + ", M_REFILE=" + M_REFILE
				+ ", TRS_OTHER_CONTEXT=" + TRS_OTHER_CONTEXT + ", TRS_CONTENT=" + TRS_CONTENT + ", TRS_KEY_CONTEXT="
				+ TRS_KEY_CONTEXT + ", TRS_ENTITY_PLACE=" + TRS_ENTITY_PLACE + ", TRS_KEYWORD=" + TRS_KEYWORD
				+ ", TRS_ABS=" + TRS_ABS + ", M_AJGUID=" + M_AJGUID + ", M_AJJGUID=" + M_AJJGUID + ", M_PRJNAME="
				+ M_PRJNAME + ", M_PRJNO=" + M_PRJNO + ", AJ_FLAG=" + AJ_FLAG + ", M_BZ=" + M_BZ + ", TRS_RANK="
				+ TRS_RANK + ", M_JGDM=" + M_JGDM + ", M_JGDM_MC=" + M_JGDM_MC + ", M_ZZBS=" + M_ZZBS + ", M_ZZBS_MC="
				+ M_ZZBS_MC + ", M_ARCHIVESTYPE=" + M_ARCHIVESTYPE + ", M_ARCHIVESTYPENAME=" + M_ARCHIVESTYPENAME
				+ ", M_YH=" + M_YH + ", M_YFLH=" + M_YFLH + ", trsId=" + trsId + ", mcfwz=" + mcfwz + "]";
	}
	
}