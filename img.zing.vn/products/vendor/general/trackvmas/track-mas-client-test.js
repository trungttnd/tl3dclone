var masWrapperObj = masWrapperObj || {};
var grp = grp || $();
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

masWrapperObj.customTrack = function(idBanner, gameCode) {
  if(typeof MASHTTPSource != "undefined" && MASHTTPSource) {
    var obj = $( "a[href*='" + MASHTTPSource + "']" );
	grp = grp.add(obj);
    obj.each(function(index, el) {
      var obj = $(this);
      if(!obj.hasClass("DownloadHttp")) {
        obj.bind("click", function() { //http
          if(!obj.hasClass("DownloadBin")) {
            var uLink = obj.attr("href");
            var arrLink = uLink.split('../../index.html');

            var extensionType = arrLink[arrLink.length - 1];

            extensionTypeArray = extensionType.split('.');
            extensionName = extensionTypeArray[extensionTypeArray.length - 1];

			if(extensionName == "bin" || extensionName.match(/^[0-9]+$/)) {
              getFileNameBin(uLink, idBanner);

              var uName = getFileName(jQuery(this).attr("href"), idBanner);
              var urlMas = ((idBanner)?'idb=' + idBanner + '&':'') + 'gc=' + gameCode + '&file=' + uName + '&status=2';
              trackingMASClient(urlMas);
              return false;
            }
          }

          var uName = getFileName(jQuery(this).attr("href"), idBanner);
          var urlMas = ((idBanner)?'idb=' + idBanner + '&':'') + 'gc=' + gameCode + '&file=' + uName + '&status=2';
          trackingMASClient(urlMas);

          return false;
        });
      }
    });
  }
  if(typeof MASHTTPListCustomSource != "undefined" && MASHTTPListCustomSource) {
    for (var k in MASHTTPListCustomSource) {
      var obj = $( "a[href='" + MASHTTPListCustomSource[k]["url"] + "']" );
      if(!obj.hasClass("DownloadHttp")) {
        (function(obj, k) {
          obj.bind("click", function() { //http
            if(!obj.hasClass("DownloadBin")) {
              var uLink = obj.attr("href");
              var arrLink = uLink.split('../../index.html');

              var extensionType = arrLink[arrLink.length - 1];

              extensionTypeArray = extensionType.split('.');
              extensionName = extensionTypeArray[extensionTypeArray.length - 1];

              if(extensionName == "bin" || extensionName.match(/^[0-9]+$/)) {
                // getFileNameBin(uLink, idBanner);

                // var uName = getFileName(jQuery(this).attr("href"), idBanner);
                var uName = getFileNameBin(uLink, idBanner);
                var urlMas = ((idBanner)?'idb=' + idBanner + '&':'') + 'gc=' + (typeof MASHTTPListCustomSource[k]["gameCode"] != "undefined" ? MASHTTPListCustomSource[k]["gameCode"]: gameCode) + '&file=' + uName + '&status=' + MASHTTPListCustomSource[k]["status"];
                trackingMASClient(urlMas);
                return false;
              }
            }

            var uName = getFileName(jQuery(this).attr("href"), idBanner);
            var urlMas = ((idBanner)?'idb=' + idBanner + '&':'') + 'gc=' + (typeof MASHTTPListCustomSource[k]["gameCode"] != "undefined" ? MASHTTPListCustomSource[k]["gameCode"]: gameCode) + '&file=' + uName + '&status=' + MASHTTPListCustomSource[k]["status"];
            trackingMASClient(urlMas);

            return false;
          });
        })(obj, k);
      }
    }
  }
}

jQuery(document).ready(function() {
    var idBanner, gameCode = "";
    idBanner = getURLParameterClient("idb");
    gameCode = getURLParameterClient("utm_term");
    // addSaveParam();
    if (typeof productCode !== 'undefined') {
        gameCode = productCode;
    }

    if (idBanner != undefined && idBanner != "") {
        // tracking by url (like/match)
        masWrapperObj.customTrack(idBanner, gameCode);

        grp = grp.add(jQuery(".DownloadOpen").bind("click", function() {

            var urlMas = 'idb=' + idBanner + '&gc=' + gameCode + '&status=1';
            trackingMASClient(urlMas);

        }));

        grp = grp.add(jQuery(".DownloadHttp").bind("click", function() { //http
            var uName = getFileName(jQuery(this).attr("href"), idBanner);
            var urlMas = 'idb=' + idBanner + '&gc=' + gameCode + '&file=' + uName + '&status=2';
            trackingMASClient(urlMas);
            return false;

        }));
        grp = grp.add(jQuery(".DownloadVDownload").bind("click", function() { //Vdownload
            var uName = getFileName(jQuery(this).attr("href"), idBanner);

            var urlMas = 'idb=' + idBanner + '&gc=' + gameCode + '&file=' + uName + '&status=3';
            trackingMASClient(urlMas);
            return false;

        }));
        grp = grp.add(jQuery(".DownloadTorrent").bind("click", function() { //Torrent
            var uName = getFileName(jQuery(this).attr("href"), idBanner);

            var urlMas = 'idb=' + idBanner + '&gc=' + gameCode + '&file=' + uName + '&status=4';
            trackingMASClient(urlMas);
            return false;

        }));

        grp = grp.add(jQuery(".DownloadBin").bind("click", function() { //http
            var uName = getFileNameBin(jQuery(this).attr("href"), idBanner);                
            return false;

        }));

    } else {

        // tracking by url (like/match)
        masWrapperObj.customTrack(0, gameCode);
        // if(MASHTTPSource) {
        //   var obj = $( "a[href*='" + MASHTTPSource + "']" );
        //   obj.each(function(index, el) {
        //     var obj = $(this);
        //     if(!obj.hasClass("DownloadHttp")) {
        //       obj.bind("click", function() { //http
        //         if(!obj.hasClass("DownloadBin")) {
        //           var uLink = obj.attr("href");
        //           var arrLink = uLink.split('/');

        //           var extensionType = arrLink[arrLink.length - 1];

        //           extensionTypeArray = extensionType.split('.');
        //           extensionName = extensionTypeArray[extensionTypeArray.length - 1];
        //           if(extensionName == "bin") {
        //             getFileNameBin(uLink, 0);
        //             return false;
        //           }
        //         }
        //         var uName = getFileName(jQuery(this).attr("href"), 0);

        //         var urlMas = 'gc=' + gameCode + '&file=' + uName + '&status=2';
        //         trackingMASClient(urlMas);
        //         return false;
        //       });
        //     }
        //   });
        // }

        grp = grp.add(jQuery(".DownloadOpen").bind("click", function() {

            var urlMas = 'gc=' + gameCode + '&status=1';
            trackingMASClient(urlMas);

        }));

        grp = grp.add(jQuery(".DownloadHttp").bind("click", function() { //http
            var uName = getFileName(jQuery(this).attr("href"), 0);

            var urlMas = 'gc=' + gameCode + '&file=' + uName + '&status=2';
            trackingMASClient(urlMas);
            return false;

        }));
        grp = grp.add(jQuery(".DownloadVDownload").bind("click", function() { //Vdownload
            var uName = getFileName(jQuery(this).attr("href"), 0);

            var urlMas = 'gc=' + gameCode + '&file=' + uName + '&status=3';
            trackingMASClient(urlMas);
            return false;

        }));
        grp = grp.add(jQuery(".DownloadTorrent").bind("click", function() { //Torrent
            var uName = getFileName(jQuery(this).attr("href"), 0);

            var urlMas = 'gc=' + gameCode + '&file=' + uName + '&status=4';
            trackingMASClient(urlMas);
            return false;

        }));

        grp = grp.add(jQuery(".DownloadBin").bind("click", function() { //http
            var uName = getFileNameBin(jQuery(this).attr("href"), 0);           
            return false;

        }));
    }


    //   // gọi ngay vmas với status = 1 
    // var strStatus1 = getURLParameterClient("button_download");
    // if( strStatus1 == '1' ) {
    //     if (idBanner != undefined && idBanner != "") {
    //             var urlMasStatus = 'idb=' + idBanner + '&gc=' + gameCode + '&status=1';
    //     }
    //     else {
    //             var urlMasStatus = 'gc=' + gameCode + '&status=1';
    //     }
    //     jQuery("body").append('<div class="trackingMASClient" style="width:0px;height:0px;overflow:hidden"><img src="http://mas.zing.vn/client.php?' + urlMasStatus + '" width="0" height="0" alt="mas" /></div>');
    // }
    grp.bind("contextmenu", function(evt) {
		evt.preventDefault();
		return false;
	});
});




function trackingMASClient(pString) {
    jQuery("body").append('<div class="trackingMASClient" style="width:0px;height:0px;overflow:hidden"><img src="http://mas.zing.vn/client.php?' + pString + '" width="0" height="0" alt="mas" /></div>');
}

function pathProcess() {
  var currentPath = window.location.search.substring(1);
  if (currentPath != "" && currentPath.indexOf("idb") > -1 && currentPath.indexOf("utm_term")) {
    masWrapperObj.setCookie("MASClientParams", currentPath);
    return currentPath;
  }
  var path = masWrapperObj.getCookie("MASClientParams");
  // path = (path != currentPath) ? currentPath : path;
  if (path.indexOf("idb") > -1 && path.indexOf("utm_term")) {
    masWrapperObj.setCookie("MASClientParams", path);
    return path;
  }
  return "";
}
pathProcess();

function getURLParameterClient(sParam) {
    // var path = masWrapperObj.getCookie("MASClientParams");
    // var currentPath = window.location.search.substring(1);
    // path = (path != currentPath) ? currentPath : path;
    // if (path.indexOf("idb") > -1 && path.indexOf("utm_term")) {
    //   masWrapperObj.setCookie("MASClientParams", path);
    // }

    var sPageURL = pathProcess();//window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}


function getFileNameBin(uLink, idb) {

    var arrLink = uLink.split('../../index.html');

    var extensionType = arrLink[arrLink.length - 1];

    extensionTypeArray = extensionType.split('-');
    extensionName = extensionTypeArray[extensionTypeArray.length - 1];
    
    str = extensionType.substring(0, extensionType.length - extensionName.length-1);
    
    str += "." + idb + '-' + extensionName;
    
    window.location.href = uLink + '?filename=' + str;
    return str;
}

function getFileName(uLink, idb) {

    var arrLink = uLink.split('../../index.html');

    var extensionType = arrLink[arrLink.length - 1];

    extensionTypeArray = extensionType.split('.');
    extensionName = extensionTypeArray[extensionTypeArray.length - 1];

    str = extensionType.substring(0, extensionType.length - extensionName.length);
    str += (typeof idb != "undefined"?idb:"0" ) + '.' + extensionName;


    window.location.href = uLink + '?filename=' + str;


    return str;
}

function flashTrackingDownload(objLink) {
	if(!objLink) {
		objLink = MASHTTPSource;
		// return;
	}
	if(!objLink) {
		return;
	}
	idBanner = getURLParameterClient("idb");
	gameCode = getURLParameterClient("utm_term");
    if (typeof productCode !== 'undefined') {
        gameCode = productCode;
    }
	var uLink = objLink;
	var arrLink = uLink.split('../../index.html');

	var extensionType = arrLink[arrLink.length - 1];

	extensionTypeArray = extensionType.split('.');
	extensionName = extensionTypeArray[extensionTypeArray.length - 1];

	var uName = getFileName(objLink, idBanner);
	var urlMas = ((idBanner)?'idb=' + idBanner + '&':'') + 'gc=' + gameCode + '&file=' + uName + '&status=2';
	trackingMASClient(urlMas);
}

function flashTrackingVDownload(objLink) {
	if(!objLink) {
		objLink = MASHTTPSource;
		// return;
	}
	if(!objLink) {
		return;
	}
	idBanner = getURLParameterClient("idb");
	gameCode = getURLParameterClient("utm_term");
    if (typeof productCode !== 'undefined') {
        gameCode = productCode;
    }
	var uLink = objLink;
	var arrLink = uLink.split('../../index.html');

	var extensionType = arrLink[arrLink.length - 1];

	extensionTypeArray = extensionType.split('.');
	extensionName = extensionTypeArray[extensionTypeArray.length - 1];

	var uName = getFileName(objLink, idBanner);
	var urlMas = ((idBanner)?'idb=' + idBanner + '&':'') + 'gc=' + gameCode + '&file=' + uName + '&status=3';
	trackingMASClient(urlMas);
}


function addSaveParam() {
    var selfUrl = window.location.href;
    if (selfUrl.indexOf("utm_source") != -1) {
        var splitParam = selfUrl.split("?");
        var allParams = splitParam[1];
        $("a").each(function() {
            var $this = $(this);
            var href = ($this.attr("href"));
            if (href.indexOf("?") != -1) {
                $this.attr("href", href + "&" + allParams);
            } else {
                $this.attr("href", href + "?" + allParams);
            }
        });
    }
}