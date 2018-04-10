<%@ page import="com.hbc.common.browser.BrowserType" %>
<%@ page import="com.hbc.common.browser.BrowserUtils" %>
<%
    String ctx = request.getContextPath();
    BrowserType browserType = BrowserUtils.getBrowserType(request);
%>
<%
    if (browserType != null
            && (browserType.equals(BrowserType.IE11))) {
%>
<meta http-equiv="X-UA-Compatible" content="IE=9" />
<%
    } else{
%>
<meta http-equiv="X-UA-Compatible" content="IE=EDGE;chrome=1" />
<%
    }
%>

<meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
<meta http-equiv="Cache-Control" content="no-store"/>
<meta http-equiv="Pragma" content="no-cache"/>
<meta http-equiv="Expires" content="0"/>

<link rel="shortcut icon" href="${ctx}/img/favicon.ico" />
<script type="text/javascript" charset="utf-8">
    var ctx = "${ctx}";
</script>
<link rel="stylesheet" type="text/css" href="${ctx}/css/default.css" />
<%-- 引入jQuery --%>
<%
    if (browserType != null
            && (browserType.equals(BrowserType.IE11) || browserType.equals(BrowserType.IE10) || browserType.equals(BrowserType.IE9)
            || browserType.equals(BrowserType.Chrome) || browserType.equals(BrowserType.Firefox)
            || browserType.equals(BrowserType.Safari))) {
        out.println("<script type='text/javascript' src='" + ctx + "/js/jquery/jquery-2.1.0.min.js' charset='utf-8'></script>");
    } else {
        out.println("<script type='text/javascript' src='" + ctx + "/js/jquery/jquery-1.10.2.min.js' charset='utf-8'></script>");
        out.println("<script type='text/javascript' src='" + ctx + "/js/jquery/jquery-migrate-1.2.1.min.js' charset='utf-8'></script>");
    }
%>
<%-- jQuery Cookie插件 --%>

<script type="text/javascript" src="${ctx}/js/jquery/jquery.cookie.js" charset="utf-8"></script>

<link id="easyuiTheme" rel="stylesheet" type="text/css" href="${ctx}/js/jquery/easyui-${ev}/themes/<c:out value="${cookie.easyuiThemeName.value}" default="default"/>/easyui.css" />
<%-- <link rel="stylesheet" type="text/css" href="${ctx}/js/jquery/easyui-${ev}/themes/default/my97.css" /> --%>

<link rel="stylesheet" type="text/css" href="${ctx}/js/jquery/easyui-${ev}/themes/icon.css" />
<link rel="stylesheet" type="text/css" href="${ctx}/js/jquery/easyui-${ev}/portal/portal.css">
<script type="text/javascript" src="${ctx}/js/My97DatePicker/WdatePicker.js" charset="utf-8"></script>
<script type="text/javascript" src="${ctx}/js/jquery/easyui-${ev}/jquery.easyui.min.js" charset="utf-8"></script>

<script type="text/javascript" src="${ctx}/js/jquery/easyui-${ev}/locale/easyui-lang-zh_CN.js" charset="utf-8"></script>
<script type="text/javascript" src="${ctx}/js/jquery/easyui-${ev}/jquery.easyui.my97.js" charset="utf-8"></script>

<script type="text/javascript" src="${ctx}/js/jquery/jquery.json.min.js" charset="utf-8"></script>

<script type="text/javascript" src="${ctx}/js/jquery/easyui-${ev}/portal/jquery.portal.js" charset="utf-8"></script>
<script type="text/javascript" src="${ctx}/js/jquery/jquery.form.js" charset="utf-8"></script>

<script type="text/javascript" src="${ctx}/js/jquery/uploadify/scripts/jquery.uploadify.js" charset="utf-8"></script>
<link rel="stylesheet" type="text/css" href="${ctx}/js/jquery/uploadify/css/uploadify.css"/>

<%-- jQuery方法扩展 --%>
<script type="text/javascript" src="${ctx}/js/jquery/jquery-extend.js" charset="utf-8"></script>
<%-- easyui扩展 --%>
<script type="text/javascript" src="${ctx}/js/easyui-extend.js" charset="utf-8"></script>
<%-- <script type="text/javascript" src="${ctx}/js/jquery.toolbar.js" charset="utf-8"></script> --%>
<!-- 屏蔽键盘等事件
<script type="text/javascript" src="${ctx}/js/prohibit.js" charset="utf-8"></script>  -->

<%-- easyui自定义表单校验扩展 --%>
<script type="text/javascript" src="${ctx}/js/validatebox-extend.js" charset="utf-8"></script>
<%-- easyui后台异步校验 --%>
<script type="text/javascript" src="${ctx}/js/validatebox-ajax.js" charset="utf-8"></script>

<script type="text/javascript" src="${ctx}/js/zTree/jquery.ztree.all-3.5.js" charset="utf-8"></script>

<link rel="stylesheet" type="text/css" href="${ctx}/js/zTree/style/zTreeStyle.css"/>

<script type="text/javascript" src="${ctx}/js/common.js" charset="utf-8"></script>

<script type="text/javascript" src="${ctx}/js/commonDialog.js" charset="utf-8"></script>

<link rel="stylesheet" type="text/css" href="${ctx}/css/style.css"/>
<link rel="stylesheet" type="text/css" href="${ctx}/css/template.css"/>

<script type="text/javascript" src="${ctx}/js/public.js" charset="utf-8"></script>

<script type="text/javascript" src="${ctx}/js/auditFormUpdate.js" charset="utf-8"></script>

<script type="text/javascript" src="${ctx}/js/popup/commonPopup.js" charset="utf-8"></script>

<script type="text/javascript" src="${ctx}/js/LodopFuncs.js" charset="utf-8"></script>

<script type="text/javascript" src="${ctx}/js/cropper/cropper.min.js"></script>
<script type="text/javascript" src="${ctx}/js/cropper/uploadPreview.min.js"></script>
<link rel="stylesheet" type="text/css" href="${ctx}/js/cropper/cropper.css"/>
