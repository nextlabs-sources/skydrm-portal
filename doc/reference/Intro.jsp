<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" isELIgnored="false" session="false" %>
<!DOCTYPE html>
<html>
    <head>
        <%@page import="com.nextlabs.common.shared.WebConfig" %>
        <%@page import="java.util.Calendar" %>
        <%@ page import="java.util.Map" %>
        <%@ page import="com.nextlabs.rms.hibernate.model.Tenant" %>
        <%@ page import="com.nextlabs.rms.json.RMDownloadUrls" %>
        <%@ page import="com.nextlabs.rms.config.Constants" %>
        <%@ page import="com.google.gson.JsonObject" %>
        <%@ page import="com.google.gson.JsonParser" %>
        <%
            String webContext=request.getContextPath();
            WebConfig webConfig = WebConfig.getInstance();
            String termsUrl = webConfig.getProperty(WebConfig.TERMS_URL, webContext + "/TermsAndConditions.html");
            String privacyUrl = webConfig.getProperty(WebConfig.PRIVACY_URL, webContext + "/PrivacyPolicy.html");
        %>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>SkyDRM</title>
        <link rel="icon" href="${pageContext.request.contextPath}/ui/img/favicon.ico" type="image/x-icon"/>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/ui/css/login.min.css?v=${applicationScope['version']}">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/ui/css/font/fira.css?v=${applicationScope['version']}">
        <link rel="preload" href="${pageContext.request.contextPath}/ui/css/font/woff2/FiraSans-Regular.woff2" as="font" type="font/woff2" crossorigin >
        <link rel="preload" href="${pageContext.request.contextPath}/ui/css/font/woff2/FiraSans-Medium.woff2" as="font" type="font/woff2" crossorigin >
        <script src="${pageContext.request.contextPath}/ui/lib/jquery/jquery-1.10.2.min.js"></script>
        <script src="${pageContext.request.contextPath}/ui/app/login.min.js?v=${applicationScope['version']}"></script>
        <script src="${pageContext.request.contextPath}/ui/lib/3rdParty/core-min.js"></script>
        <script src="${pageContext.request.contextPath}/ui/lib/3rdParty/md5-min.js"></script>
        <script src="${pageContext.request.contextPath}/ui/lib/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        <jsp:include page = 'TenantResolver.jsp' />
        <%
            Tenant tenant = (Tenant) request.getAttribute("tenant");
            String preference = tenant.getPreference();
            JsonParser parser = new JsonParser();
            JsonObject jsonObject = parser.parse(preference).getAsJsonObject();
        %>
    </head>
    <body>
        <div id="sign-up-header" class="col-xs-12 no-padding" style="background-image:url('ui/img/grayBackground.svg');background-repeat: no-repeat;background-position: right top; background-size: auto 100%;">
	        <div class="row-desktop" style="margin-top: 20px;">
                <div class="col-xs-12 col-md-6 margin-auto">
                    <div class="col-xs-12 col-md-12 col-lg-4 col-lg-offset-2 text-align-center margin-bottom-20">
                        <div class="inline-block header-logo">
                            <img src="ui/img/rms-logo-with-text.svg">
                        </div>
                    </div>
                    <% if(!request.getAttribute("defaultTenant").equals(request.getAttribute("resolvedTenantUI"))){ %>
                    <div class="col-xs-12 col-md-12 col-lg-4 col-lg-offset-1 text-align-center">
                       <div class="tenantLogo" style="float:none; margin:0px;"></div>
                    </div>
                    <% } %>
                </div>
	            <div class="col-xs-12 col-md-6 margin-auto padding-20">
	                <div class=" col-xs-12 col-md-8 col-md-offset-4" style="display: flex;">
	                    <div class="margin-auto">
	                        <a id="download-btn" class="margin-right-20" href="#sign-up-download">Download</a>
	                        <button type="button" class="btn btn-default rms-settings-button" onclick="goToLogin()">Login</button>
	                    </div>
	                </div>
	            </div>
	        </div>
	        <div id="sign-up-main" class="col-xs-12 row-desktop">
	            <div class="col-xs-12 col-md-6 padding-20 margin-auto">
	                <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2">
	                    <div class="margin-bottom-20 margin-top-20" style="font-size: x-large;">
	                        <span>Protect, share, and monitor your documents securely anywhere</span>
	                    </div>
	                    <button type="button" class="btn btn-default rms-settings-button-color rms-tile-gradient" onclick="goToRegister()">Sign up for free!</button>
	                    <hr/>
						
                        <% 
                        boolean idpFacebookEnabled = false;
                        boolean idpGoogleEnabled = false;
                        java.util.List<com.nextlabs.common.shared.JsonIdentityProvider> idps = com.nextlabs.rms.rs.IdpMgmt.getConfiguredIDPs((String)request.getAttribute("resolvedTenant"), null);
                        for(com.nextlabs.common.shared.JsonIdentityProvider jsonIdp: idps) {
                            if(jsonIdp.getType() == com.nextlabs.common.shared.Constants.LoginType.FACEBOOK.ordinal()) {
                                idpFacebookEnabled = true;
                            } else if(jsonIdp.getType() == com.nextlabs.common.shared.Constants.LoginType.GOOGLE.ordinal()) {
                                idpGoogleEnabled = true;
                            }
                        }
                        if(idpFacebookEnabled || idpGoogleEnabled) { 
                        %>

	                    <div class="margin-bottom-10 margin-top-10" style="font-size: medium;">
	                        <span>Sign up using a social media account.</span>
	                    </div>
	                    <div class="form-group">
                            <% if(idpGoogleEnabled) { %>
                            <a class="pointer-click" onclick="googleLogin()" tabindex="7">
                                <img src="ui/img/Google_login.svg" alt="Google" />
                            </a>
                            <% } %>
                            <% if(idpFacebookEnabled) { %>
                            <a class="pointer-click" onclick="facebookLogin()" tabindex="8">
                                <img src="ui/img/Facebook_login.svg" alt="Facebook"  />
                            </a>
                            <% } %>
	                    </div>
	                    
	                     <% } %>
	                     
	                    <div class="margin-bottom-10 margin-top-10" style="font-size: small;">
	                        <span>By signing up, you agree to our
                                <a href="<%=termsUrl%>" target="_blank"><u>terms</u></a> and
                                <a href="<%=privacyUrl%>" target="_blank"><u>privacy policy.</u></a>
                            </span>
	                    </div>
	                </div>
	            </div>
	            <div class="col-xs-12 col-md-6 margin-auto padding-20 hidden-xs hidden-sm">
                    <div class="margin-auto padding-20">
                        <img alt="" src="ui/img/sign-up-demo.svg" style="max-width: 100%;">
                    </div>
	            </div>
	        </div>
	    </div>
	    <div id="why-skydrm-section" class="col-xs-12 padding-20">
            <div id="why-skydrm-intro-section" class="text-align-center col-md-8 col-md-offset-2" style="margin-bottom:5%;">
                <div class="heading">Why SkyDRM</div>
                <div class="content">Protect and monitor your business critical document such as intellectual property and product design, wherever it lives or travels – across devices, apps, cloud services and on-premises.</div>
            </div>
            <div id="persistent-file-protection-section" class="col-xs-12 col-sm-11 col-sm-offset-1 col-md-8 col-md-offset-2" style="margin-bottom:5%;">
                <div class="row-desktop">
                    <div class="col-xs-offset-2 col-xs-10 col-sm-offset-0 col-sm-6 col-md-offset-0 col-md-6">
                        <img src="ui/img/WhyPersistentProtection.svg">
                    </div>
                    <div class="col-xs-12 col-sm-offset-1 col-sm-5 col-md-offset-1 col-md-5">
                        <div class="heading">Persistent protection for your files</div>
                        <div class="content">SkyDRM uses Digital Rights Management and Dynamic Authorization technology to protect file and enable secure sharing. Protection stays with the document, regardless of where it’s stored or who it’s shared with: inside or outside your network, on file servers, or in the cloud.</div>
                    </div>
                </div>
            </div>
            <div id="monitor-remediate-control-sharing-section" class="col-xs-12 col-sm-11 col-sm-offset-1 col-md-8 col-md-offset-2" style="margin-bottom:5%;">
                <div class="row-desktop flex-reverse-col">
                    <div class="col-xs-12 col-sm-5 col-md-8">
                        <div class="heading">Monitor, remediate, and control sharing</div>
                        <div class="content">Determine whether your file can be accessed, viewed, edited, printed, or shared. Apply flexible protection actions, such as encryption, access restrictions and visual markings. Grant permission to re-share on the file to prevent unauthorized forwarding or distribution.</div>
                    </div>
                    <div class="col-xs-offset-2 col-xs-10 col-sm-offset-1 col-sm-5 col-md-offset-1 col-md-5">
                        <img src="ui/img/WhyMonitorRemediate.svg">
                    </div>
                </div>
            </div>
            <div id="gain-visibility-control-section" class="col-xs-12 col-sm-11 col-sm-offset-1 col-md-8 col-md-offset-2" style="margin-bottom:5%;">
                <div class="row-desktop">
                    <div class="col-xs-offset-2 col-xs-10 col-sm-offset-0 col-sm-6 col-md-offset-0 col-md-6">
                        <img src="ui/img/WhyVisibility.svg">
                    </div>
                    <div class="col-xs-12 col-sm-offset-1 col-sm-5 col-md-offset-1 col-md-5">
                        <div class="heading">Gain visibility and control</div>
                        <div class="content">Apply centrally managed policy to gain more control over critical files, track them and revoke access if necessary. Learn what is happening with your files with activity log and monitor policy violations. SkyDRM records information such as file activity, device type and ID, location, time, user action, etc.</div>
                    </div>
                </div>
            </div>
        </div>
        <div id="skydrm-features" class="col-xs-12 padding-20" style="background-color:#F1F2F2;">
            <div id="skydrm-features-intro-section" class="text-align-center col-md-8 col-md-offset-2" style="margin-bottom:5%;">
                <div class="heading">Features</div>
                <div class="content">Like no other, SkyDRM is a complete digital rights management service today.</div>
            </div>
            <div class="col-xs-12 col-lg-8 col-lg-offset-2 col-md-12">
                <div class="tiles col-xs-12 col-md-5 padding-20" style="min-height:300px;margin-top:10px;">
                    <div class="col-xs-3">
                        <img src="ui/img/FeaturesSecuredFiles.svg">
                    </div>
                    <div class="heading col-xs-offset-2 col-xs-7" style="line-height:34px;">
                        Secure your critical files with next-gen technology
                    </div>
                    <div class="col-xs-12" style="margin-top:20px;line-height: 27px;">
                        SkyDRM’s dynamic authorization determines the access rights to documents in real-time. It leverages data classification and user and environment attributes to make those determinations.
                    </div>
                </div>
                <div class="tiles col-xs-12 col-md-offset-2 col-md-5 padding-20" style="min-height:300px;margin-top:10px;">
                    <div class="col-xs-3">
                        <img src="ui/img/FeaturesFilesFormat.svg">
                    </div>
                    <div class="heading col-xs-offset-2 col-xs-7" style="line-height:34px;">
                        Share any types of files
                    </div>
                    <br>
                    <div class="col-xs-12" style="margin-top:20px;line-height: 27px;">
                        Share information safely inside and outside the organization. SkyDRM supports hundreds of file types including Microsoft Office files, Adobe PDF, Source code (java, cpp, etc.), 2D and 3D CAD files (dwg, prt, stp, etc.)
                    </div>
                </div>
            </div>
        </div>
        <div id="sign-up-download" class="col-xs-12 no-padding">
            <div class="col-xs-12 row-desktop">
                <div class="col-xs-12 col-md-8 padding-20 margin-auto">
                    <div class="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2" style="min-height: 405px">
                        <div class="margin-bottom-20 margin-top-20" style="font-size: x-large;">
                            <span>Download </span>
                            <div class="inline-block" style="position: relative; bottom: 1px;">
                                <img height="29px" src="ui/img/img_logo_text_only.svg">
                            </div>
                        </div>
                        <div class="margin-bottom-10 margin-top-10" style="font-size: medium; color: darkgrey">
                            <span>SkyDRM enables you to apply digital rights to securely share files from various platforms. Download SkyDRM specific for your platform by clicking MOBILE (Android and iOS), WINDOWS (32-bit and 64-bit), or MAC.</span>
                        </div>
                        <br>
                        <div class="tab" style="font-size: large;">
                            <button id="mobile-btn" class="tablinks" onclick="changeTab(event, 'mobile')">MOBILE</button>
                            <button id="windows-btn" class="tablinks show-only-on-desktop" onclick="changeTab(event, 'windows')">WINDOWS</button>
                            <button id="mac-btn" class="tablinks show-only-on-desktop" onclick="changeTab(event, 'mac')">MAC</button>
                        </div>
                        <div style="padding-top: 40px;">
                            <div id="mobile" class="tabcontent" style="display: block">
                                <div id="android" class="col-xs-12 col-sm-3 no-padding" style="padding-bottom: 20px; min-width: 180px">
                                    <img class="pointer-click show-only-on-desktop" src="ui/img/img_google_play.png" onclick="download('android')">
                                    <img class="pointer-click mobile-tablet-display" src="ui/img/img_google_play_2x.png" style="width: 175px" onclick="download('android')">
                                </div>
                                <div id="ios" class="col-xs-12 col-sm-3 no-padding" style="padding-bottom: 20px">
                                    <img class="pointer-click show-only-on-desktop" src="ui/img/img_app_store.png" onclick="download('ios')">
                                    <img class="pointer-click mobile-tablet-display" src="ui/img/img_app_store_2x.png" style="width: 175px" onclick="download('ios')">
                                </div>
                            </div>
                            <div id="windows" class="tabcontent" style="font-size: small; color: darkgrey">
                                <div id="win-32" class="col-sm-3 no-padding" style="min-width: 120px">
                                    <img height="81" class="pointer-click" src="ui/img/img_win_32.svg" onclick="download('win32')"><br><br>
                                    <span>Windows 32 Bit</span>
                                </div>
                                <div id="win-64" class="col-sm-3 no-padding">
                                    <img class="pointer-click" src="ui/img/img_win_64.svg" onclick="download('win64')"><br><br>
                                    <span>Windows 64 Bit</span>
                                </div>
                            </div>
                            <div id="mac" class="tabcontent">
                                <div class="col-md-5 no-padding">
                                    <img height="100" class="pointer-click" src="ui/img/img_mac.svg" onclick="download('mac')">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-md-4 margin-auto padding-20 hidden-xs hidden-sm">
                    <div class="margin-auto padding-20">
                        <img alt="" src="ui/img/img_download_bg.svg" style="max-width: 100%;">
                    </div>
                </div>
            </div>
        </div>
	    <div id="sign-up-footer" class="col-xs-12 rms-tile-gradient row-desktop">
	        <div class="col-xs-12 col-md-6 padding-20 margin-auto row-desktop">
	            <div id="footer-logo" class="col-xs-12 col-md-4 margin-auto padding-20 text-align-center" >
	                <img class="inline-block" src="ui/img/SkyDRM Logo-White.svg" style="max-width: 100%;">
	            </div>
	            <div class="col-xs-12 col-md-8 margin-auto text-align-center mobile-no-padding">
	                <div class="inline-block">
	                    <div class="margin-top-20">
	                        <a class="margin-right-10 margin-left-10" href="<%=termsUrl%>" target="_blank">Terms And Conditions</a><br class="visible-xs visible-sm"/>
	                        <a class="margin-right-10 margin-left-10" href="<%=privacyUrl%>" target="_blank">Privacy Policy</a><br class="visible-xs visible-sm"/>
	                        <a class="margin-right-10 margin-left-10" href="mailto:support@skydrm.com">Contact Us</a>
	                    </div>
	                    <div class="margin-top-20">
	                        <p class="text-muted" style="color: white;">Copyright (C) 2018 <a href="http://www.nextlabs.com" target="_blank">NextLabs, Inc.</a> All rights reserved.</p>
	                    </div>
	                </div>
	            </div>
	        </div>
	        <div class="col-xs-12 col-md-3 padding-20 margin-auto text-align-center">
	            <div class="inline-block margin-auto padding-10">
	                <a target="_blank" href="https://www.linkedin.com/company/nextlabs"><img src="ui/img/Linkedin.svg"></a>
	            </div>
	            <div class="inline-block margin-auto padding-10">
	                <a target="_blank" href="https://twitter.com/nextlabs"><img src="ui/img/Twitter.svg"></a>
	            </div>
	            <div class="inline-block margin-auto padding-10">
	                <div class="margin-auto">
	                    <a href="https://www.nextlabs.com" target="_blank">Visit NextLabs</a>
	                    <img src="ui/img/rightArrow.svg">
	                </div>
	            </div>
	        </div>
	    </div>
        <script type="text/javascript">
            setCookie("adminApp", "false");
            var pageshow = {};

            <% if (jsonObject!=null ) { %>
                var tenantPref = <%=jsonObject.toString()%>;
                if (!tenantPref || (!tenantPref.RMD_WIN_32_DOWNLOAD_URL && !tenantPref.RMD_WIN_64_DOWNLOAD_URL &&
                        !tenantPref.RMC_IOS_DOWNLOAD_URL && !tenantPref.RMC_ANDROID_DOWNLOAD_URL &&
                        !tenantPref.RMD_MAC_DOWNLOAD_URL)) {
                    $("#download-btn").remove();
                    $("#sign-up-download").remove();
                } else {
                    if (!tenantPref.RMD_WIN_32_DOWNLOAD_URL && !tenantPref.RMD_WIN_64_DOWNLOAD_URL) {
                        $("#windows-btn").remove();
                        $("#windows").remove();
                    } else if (!tenantPref.RMD_WIN_32_DOWNLOAD_URL) {
                        $("#win-32").remove();
                    } else if (!tenantPref.RMD_WIN_64_DOWNLOAD_URL) {
                        $("#win-64").remove();
                    }
                    if (!tenantPref.RMD_MAC_DOWNLOAD_URL) {
                        $("#mac-btn").remove();
                        $("#mac").remove();
                    }
                    if (!tenantPref.RMC_IOS_DOWNLOAD_URL && !tenantPref.RMC_ANDROID_DOWNLOAD_URL) {
                        $("#mobile-btn").remove();
                        $("#mobile").remove();
                    } else if (!tenantPref.RMC_IOS_DOWNLOAD_URL) {
                        $("#ios").remove();
                    } else if (!tenantPref.RMC_ANDROID_DOWNLOAD_URL) {
                        $("#android").remove();
                    }
                }
                var activeTab = $("#mobile-btn").length ? "#mobile" : $("#windows-btn").length ? "#windows" : "#mac";
                $(activeTab).css("display", "block");
                $(activeTab + "-btn").addClass("active");
            <% } %>

            function googleLogin() {
                var search = window.location.search + ( window.location.search.match( /[\?]/g ) ? '&' : '?' ) + "tenant=${resolvedTenant}";
                window.location = '${pageContext.request.contextPath}/IdpManager/GoogleAuth/GoogleAuthStart' + search;
            }

            function facebookLogin() {
                var search = window.location.search + ( window.location.search.match( /[\?]/g ) ? '&' : '?' ) + "tenant=${resolvedTenant}";
                window.location = '${pageContext.request.contextPath}/IdpManager/FacebookAuth/FacebookAuthStart' + search;
            }

            function download(type) {
                var url;
                switch (type) {
                    case "win32":
                        url = tenantPref.RMD_WIN_32_DOWNLOAD_URL;
                        break;
                    case "win64":
                        url = tenantPref.RMD_WIN_64_DOWNLOAD_URL;
                        break;
                    case "mac":
                        url = tenantPref.RMD_MAC_DOWNLOAD_URL;
                        break;
                    case "ios":
                        url = tenantPref.RMC_IOS_DOWNLOAD_URL;
                        break;
                    case "android":
                        url = tenantPref.RMC_ANDROID_DOWNLOAD_URL;
                        break;
                }
                window.open(url, 'Downloading SkyDRM', '');
            }

            function changeTab(evt, tabName) {
                $(".tabcontent").each(function () {
                    $(this).css("display", "none");
                });
                $(".tablinks").each(function () {
                    $(this).removeClass("active");
                });
                $("#" + tabName).css("display", "block");
                $(evt.target).addClass("active");
            }

        <%--
            //Preventing browsers from caching this page in history since jquery is not invoked on clicking back button
            // http://stackoverflow.com/questions/2638292/after-travelling-back-in-firefox-history-javascript-wont-run
            // http://stackoverflow.com/questions/8788802/prevent-safari-loading-from-cache-when-back-button-is-clicked
        --%>
            $(window).bind("pageshow", function(event) {
                if (event.originalEvent.persisted) {
                    window.location.reload()
                }
            });
        </script>
    </body>
</html>
