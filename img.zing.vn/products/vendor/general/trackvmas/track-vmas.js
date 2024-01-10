var masWrapperObj = masWrapperObj || {};
masWrapperObj.setCookie = masWrapperObj.setCookie || function(cname, cvalue) {
  var exdate = new Date();
  var minutes = 30;
  var currentTime = exdate.getTime();
  var host = window.location.host;
  exdate.setTime(currentTime + (minutes * 60 * 1000));
  var c_value = escape(cvalue) + ((minutes == null) ? "" : ";domain=." + host + ";path=/;expires=" + exdate.toUTCString());
  document.cookie = cname + "=" + c_value;
};

masWrapperObj.getCookie = masWrapperObj.getCookie || function(cname) {
  var i, x, y, aCookies = document.cookie.split(";");
  for (i = 0; i < aCookies.length; i++) {
    x = aCookies[i].substr(0, aCookies[i].indexOf("="));
    y = aCookies[i].substr(aCookies[i].indexOf("=") + 1);
    x = x.replace(/^\s+|\s+$/g, "");
    if (x == cname) {
      return unescape(y);
    }
  }
  return "";
}

jQuery(document).ready(function() {
    addScriptVMAS();
    // TrackingMAS();
});

// var TrackingMAS = function() {
    // var path = window.location.search.substring(1);
    // if (path.indexOf("utm_source") > -1 && path.indexOf("utm_medium") > -1 && path.indexOf("utm_term") > -1 && path.indexOf("utm_content") > -1 && path.indexOf("utm_campaign") > -1) {
        // masWrapperObj.setCookie("MASParams", path);
        // if (jQuery("#trackingMAS img").length > 0) {
            // jQuery("#trackingMAS img").attr("src", "http://mas.zing.vn/m.php?" + path);
        // } else {
            // jQuery("body").append('<div id="trackingMAS" style="width:0px;height:0px;overflow:hidden"><img src="http://mas.zing.vn/m.php?' + path + '" width="0" height="0" alt="mas" /></div>');
        // }
        // return;
    // }
    // path = masWrapperObj.getCookie("MASParams");
    /* path = (path != currentPath) ? currentPath : path; */

    // if (path.indexOf("utm_source") > -1 && path.indexOf("utm_medium") > -1 && path.indexOf("utm_term") > -1 && path.indexOf("utm_content") > -1 && path.indexOf("utm_campaign") > -1) {
        // masWrapperObj.setCookie("MASParams", path);
        // if (jQuery("#trackingMAS img").length > 0) {
            // jQuery("#trackingMAS img").attr("src", "http://mas.zing.vn/m.php?" + path);
        // } else {
            // jQuery("body").append('<div id="trackingMAS" style="width:0px;height:0px;overflow:hidden"><img src="http://mas.zing.vn/m.php?' + path + '" width="0" height="0" alt="mas" /></div>');
        // }
    // }
// };

var addScriptVMAS = function() {

    var _scrpt = "<script type='text/javascript' src='../../../mas.zing.vn/js/vmas.js'></script>";
    jQuery('body').append(_scrpt);

    linkdirect = location.href.match(/:\/\/(.[^/]+)/)[1].split(".");
    typeDomain = 'mainsite';
    if (linkdirect[1] === '360game') {
        typeDomain = 'mainsite360';
    }
    if (typeof productCode != 'undefined') {
        var callVMas = function() {
            if (typeof vmas_click == "function") {
                var _code = '<script type="text/javascript">vmas_click("' + productCode + '","' + typeDomain + '","");</script>';
                jQuery('body').append(_code);
                return;
            }
            setTimeout(function() {
                callVMas();
            }, 100);
        };
        callVMas();
        //var _code = '<script type="text/javascript">vmas_click("' + productCode + '","' + typeDomain + '","");</script>';
    }
}