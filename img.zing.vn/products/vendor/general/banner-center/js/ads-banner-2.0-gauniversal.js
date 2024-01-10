// JavaScript Document
var isIE6 = false;
var xmlObjAds;
var CookieBottomProductIdlogin = '';
jQuery(window).load(function() {
    var cookiesTime = jQuery("#cookiesTime").length > 0 && jQuery("#cookiesTime").val() != "" && !isNaN(jQuery("#cookiesTime").val()) ? parseFloat(jQuery("#cookiesTime").val()) : 120;
    var cookiesTimeBottom = jQuery("#cookiesTimeBottom").length > 0 && jQuery("#cookiesTimeBottom").val() != "" && !isNaN(jQuery("#cookiesTimeBottom").val()) ? parseFloat(jQuery("#cookiesTimeBottom").val()) : 120;

    var checkBanner = initAdsBanner(CodeProduct, CookieProduct, cookiesTime);
    if (!checkBanner) {
        initAdsBannerBottom(CodeProduct, CookieBottomProduct, cookiesTimeBottom);
        initAdsBannerBottomIL(CodeProduct, CookieBottomProductIdlogin, cookiesTimeBottom);
    }

});

/*
 *  name : initAdsBanner
 *  arguments:	string  adslistDirectory : path to ads_banner_list.xml
 *				string	cookieTimeMain : time to clear popup main cookie by minutes*
 *  return: void
 *  description: setup AdsBanner
 */
function initAdsBanner(CodeProduct, CookieProduct, time) {
    var classCookieTime = new CookieTime();
    //Banner Popup Center

    if (classCookieTime.MethodGetCookie(CookieProduct) == null || classCookieTime.MethodGetCookie(CookieProduct) == "") { // kiểm tra có tồn tại cookie hay không
        var exptime = 60000 * time;

        var classBannerPopup = new BannerPopup();
        return classBannerPopup.MethodBannerPopup(CodeProduct, exptime);
    }

    return false;
};

function initAdsBannerBottom(CodeProduct, CookieBottomProduct, time) {
    var classCookieTimeBottom = new CookieTime();
    //Banner Popup Center

    if (classCookieTimeBottom.MethodGetCookie(CookieBottomProduct) == null || classCookieTimeBottom.MethodGetCookie(CookieBottomProduct) == "") { // kiểm tra có tồn tại cookie hay không
        var exptime = 60000 * time;
        var classBannerPopupBottom = new BannerPopupBottom();
        classBannerPopupBottom.MethodBannerPopupBottom(CodeProduct, exptime);
    }

};

function initAdsBannerBottomIL(CodeProduct, CookieBottomProductIdlogin, time) {
    var classCookieTimeBottomIL = new CookieTime();

    if (classCookieTimeBottomIL.MethodGetCookie(CookieBottomProductIdlogin) == null || classCookieTimeBottomIL.MethodGetCookie(CookieBottomProductIdlogin) == "") { // kiểm tra có tồn tại cookie hay không
        var exptime = 60000 * time;
        var classBannerPopupBottomIL = new BannerPopupBottomIdLogin();
        classBannerPopupBottomIL.MethodBannerPopupBottom(CodeProduct, exptime);
    }

};


BannerPopup = function() {
    /* Field */

    /* Method */

    this.MethodOverlay = function() {
        var offsetTop = jQuery(window).scrollTop();
        var h = jQuery(window).height();
        var w = jQuery(window).width();
        var hdoc = jQuery(document).height();
        var hpopup = jQuery('#bannerPopup').height();
        var wpopup = jQuery('#bannerPopup').width();
        jQuery("#thewindowbackground").css({
            "height": hdoc,
            "width": w
        });
        if (offsetTop > 0) {
            if (isIE6) {
                jQuery('#bannerPopup').stop().animate({
                    top: offsetTop + (h - hpopup > 0 ? (h - hpopup) / 2 : 0)
                }, 400);
            } else {
                jQuery('#bannerPopup').addClass("fixedBanner")
            }
        }
        jQuery('#bannerPopup').css({
            top: h - hpopup > 0 ? (h - hpopup) / 2 : 0,
            left: (w - wpopup) / 2
        });
        jQuery(window).resize(function() {
            offsetTop = jQuery(window).scrollTop();
            h = jQuery(window).height();
            w = jQuery(window).width();
            jQuery("#thewindowbackground").css({
                "height": hdoc,
                "width": w
            });
            if (isIE6) {
                jQuery('#bannerPopup').css({
                    top: offsetTop + (h - hpopup > 0 ? (h - hpopup) / 2 : 0),
                    left: (w - wpopup) / 2
                });
            } else {
                jQuery('#bannerPopup').css({
                    top: h - hpopup > 0 ? (h - hpopup) / 2 : 0,
                    left: (w - wpopup) / 2
                });
            }
        })
        jQuery(window).scroll(function() {
            offsetTop = jQuery(window).scrollTop();
            if (offsetTop > 0) {
                if (isIE6) {
                    jQuery('#bannerPopup').stop().animate({
                        top: offsetTop + (h - hpopup > 0 ? (h - hpopup) / 2 : 0)
                    }, 400);
                } else {
                    jQuery('#bannerPopup').addClass("fixedBanner")
                }
            } else {
                jQuery('#bannerPopup').removeClass("fixedBanner")
                jQuery('#bannerPopup').css({
                    top: h - hpopup > 0 ? (h - hpopup) / 2 : 0
                });
            }
        });

    } // end MethodOverlay

    this.ClosePopup = function(exptime) {
        jQuery("#thewindowbackground").css("display", "none");
        jQuery("#bannerPopup").css("display", "none");
        // set cookies

        var classCookieTime = new CookieTime();
        classCookieTime.MethodSetCookie(CodeProduct + "_Cookie", CodeProduct, exptime);
    }

    this.checkDate = function(_date, delay) {

    }
    this.MethodBannerPopup = function(CodeProduct, exptime) {
        var self = this;
        var eventName = jQuery("#bannerPopup > div > a > img").attr("alt");


        if (eventName == "" || eventName == undefined) {
            eventName = CodeProduct + "_popupcenter"
        }
        if ((jQuery("#bannerPopup > div > a > img").length > 0) || (jQuery("#bannerPopup  embed").length > 0)) {


            self.MethodOverlay();
            var typePopup = jQuery("#typePopup").length > 0 && jQuery("#typePopup").val() != "" && !isNaN(jQuery("#typePopup").val()) ? parseFloat(jQuery("#typePopup").val()) : 0;

            if (jQuery("#bannerPopup > div > a > img").length > 0) {

                var linkBanner = jQuery("#bannerPopup img").attr('src');
                var typeImg = linkBanner.substr(linkBanner.length - 3, 3);
                if (typeImg == "png" || typeImg == "PNG" || typePopup == 1) {
                    jQuery("#bannerPopup").css({
                        "background": 'none'
                    });
                }
            }
            jQuery("#bannerPopup > div > a").click(function() {
                self.ClosePopup(exptime);
                
				

            });
            jQuery("#thewindowbackground").click(function() {
                ga('send', 'event','Popup Center', 'overlay-close', eventName);
                self.ClosePopup(exptime);
                
				
            });
            jQuery("#bannerPopup > div > a > img").click(function() {
                
				
            });
            jQuery("#btClose").click(function() {
                self.ClosePopup(exptime);
                
				
                return false;
            });
            jQuery("#popupBtnClose").click(function() {
                if (jQuery("#chkClose").is(':checked')) {
                    var cookiesTimeSecond = jQuery("#cookiesTimeSecond").length > 0 && jQuery("#cookiesTimeSecond").val() != "" && !isNaN(jQuery("#cookiesTimeSecond").val()) ? parseFloat(jQuery("#cookiesTimeSecond").val()) : 120;
                    exptime = 60000 * cookiesTimeSecond;
                }
                self.ClosePopup(exptime);
                
				
                return false;
            });

            //jQuery("#btClose").append("<img src='http://event.game.zing.vn/intro/banner_ads/close70x35.gif'/>");
            jQuery("#thewindowbackground").css({
                "display": "block"
            });
            jQuery("#bannerPopup").css({
                "display": "block"
            });
            return true;
        }
    } // end MethodBannerPopup
    return this;
}


BannerPopupBottom = function() {
    /* Field */

    /* Method */

    this.MouseScroll = function() {
        var h = jQuery(window).height();
        if (jQuery(".MenuFooter").length > 0) {
            h = h - jQuery(".MenuFooter").height();
        }
        var w = jQuery(window).width();
        var offsetTop = jQuery(window).scrollTop();
        var hdoc = jQuery(document).height();
        var hpopup = jQuery('#bannerPopupBottom').outerHeight();
        var wpopup = jQuery('#bannerPopupBottom').width();
        jQuery("#thewindowbackground").css({
            "height": hdoc,
            "width": w
        });
        jQuery('#bannerPopupBottom').css({
            top: h - hpopup - 2,
            right: 0
        });
        if (offsetTop > 0) {
            if (isIE6) {
                jQuery('#bannerPopupBottom').stop().animate({
                    top: offsetTop + h - hpopup - 2
                }, 400);
            } else {
                jQuery('#bannerPopupBottom').addClass("fixedBanner")
            }
        }
        jQuery('#bannerPopupBottom').css({
            top: h - hpopup - 2

        });
        jQuery(window).resize(function() {
            offsetTop = jQuery(window).scrollTop();
            h = jQuery(window).height();
            if (jQuery(".MenuFooter").length > 0) {
                h = h - jQuery(".MenuFooter").height();
            }
            w = jQuery(window).width();
            jQuery("#thewindowbackground").css({
                "height": hdoc,
                "width": w
            });
            if (isIE6) {
                jQuery('#bannerPopupBottom').css({
                    top: offsetTop + h - hpopup - 2

                });
            } else {
                jQuery('#bannerPopupBottom').css({
                    top: h - hpopup - 2

                });
            }
        })
        jQuery(window).scroll(function() {
            offsetTop = jQuery(window).scrollTop();
            if (offsetTop > 0) {
                if (isIE6) {
                    jQuery('#bannerPopupBottom').stop().animate({
                        top: offsetTop + h - hpopup - 2
                    }, 400);
                } else {
                    jQuery('#bannerPopupBottom').addClass("fixedBanner")
                }
            } else {
                jQuery('#bannerPopupBottom').removeClass("fixedBanner")
                jQuery('#bannerPopupBottom').css({
                    top: h - hpopup - 2
                });
            }
        });
        jQuery(window).load(function() {
            var document_height = jQuery(document).height();
            jQuery("#thewindowbackground").css({
                "height": document_height
            });
        });
    } // end MethodOverlay
    this.checkDate = function(_date, delay) {}
    this.ClosePopupBottom = function() {
        jQuery("#bannerPopupBottom").css("display", "none");
    }
    this.MethodBannerPopupBottom = function(CodeProduct, exptime) {
        var self = this;
        // Trường hợp Banner Zone tồn tại
        var eventName = jQuery("#bannerPopupBottom > div > a > img").attr("alt");
        if (eventName == "" || eventName == undefined) {
            eventName = CodeProduct + "_popupbottom"
        }
        if (jQuery("#bannerPopupBottom > div > a > img").length > 0) {
            self.MouseScroll();
            jQuery("#btCloseBottom").click(function() {
                self.ClosePopupBottom();
                
				
                var classCookieTimeBottom = new CookieTime();
                classCookieTimeBottom.MethodSetCookie(CodeProduct + "_CookieBottom", CodeProduct, exptime);
                return false;
            });
            jQuery("#bannerPopupBottom > div > a > img").click(function() {
                
				
            });
            jQuery("#bannerPopupBottom").css({
                "display": "block"
            });
        }

    } // end MethodBannerPopup
    var timer = setTimeout("jQuery('#bannerPopupBottom').fadeOut('slow')", 30000);
    return this;
    /* Contructor */
}

BannerPopupBottomIdLogin = function() {
    /* Field */

    /* Method */

    this.MouseScroll = function() {
        var h = jQuery(window).height();
        if (jQuery(".MenuFooter").length > 0) {
            h = h - jQuery(".MenuFooter").height();
        }

        var w = jQuery(window).width();
        var offsetTop = jQuery(window).scrollTop();
        var hdoc = jQuery(document).height();
        var hpopup = jQuery('#bannerPopupBottom').outerHeight();
        var wpopup = jQuery('#bannerPopupBottom').width();
        jQuery("#thewindowbackground").css({
            "height": hdoc,
            "width": w
        });
        jQuery('#bannerPopupBottom').css({
            top: h - hpopup - 2,
            right: 0
        });
        if (offsetTop > 0) {
            if (isIE6) {
                jQuery('#bannerPopupBottom').stop().animate({
                    top: offsetTop + h - hpopup - 2
                }, 400);
            } else {
                jQuery('#bannerPopupBottom').addClass("fixedBanner")
            }
        }
        jQuery('#bannerPopupBottom').css({
            top: h - hpopup - 2

        });
        jQuery(window).resize(function() {
            offsetTop = jQuery(window).scrollTop();
            h = jQuery(window).height();
            if (jQuery(".MenuFooter").length > 0) {
                h = h - jQuery(".MenuFooter").height();
            }
            w = jQuery(window).width();
            jQuery("#thewindowbackground").css({
                "height": hdoc,
                "width": w
            });
            if (isIE6) {
                jQuery('#bannerPopupBottom').css({
                    top: offsetTop + h - hpopup - 2

                });
            } else {
                jQuery('#bannerPopupBottom').css({
                    top: h - hpopup - 2

                });
            }
        })
        jQuery(window).scroll(function() {
            offsetTop = jQuery(window).scrollTop();
            if (offsetTop > 0) {
                if (isIE6) {
                    jQuery('#bannerPopupBottom').stop().animate({
                        top: offsetTop + h - hpopup - 2
                    }, 400);
                } else {
                    jQuery('#bannerPopupBottom').addClass("fixedBanner")
                }
            } else {
                jQuery('#bannerPopupBottom').removeClass("fixedBanner")
                jQuery('#bannerPopupBottom').css({
                    top: h - hpopup - 2
                });
            }
        });
        jQuery(window).load(function() {
            var document_height = jQuery(document).height();
            jQuery("#thewindowbackground").css({
                "height": document_height
            });
        });
    } // end MethodOverlay
    this.checkDate = function(_date, delay) {}
    this.ClosePopupBottom = function() {
        jQuery("#bannerPopupBottom").css("display", "none");
    }
    this.MethodBannerPopupBottom = function(CodeProduct, exptime) {
        var self = this;
        // Trường hợp Banner Zone tồn tại
        var eventName = jQuery("#bannerPopupBottom > div > a > img").attr("alt");
        if (eventName == "" || eventName == undefined) {
            eventName = CodeProduct + "_popupbottom"
        }
        if (jQuery("#bannerPopupBottom > div > a > img").length > 0) {
            self.MouseScroll();
            jQuery("#btCloseBottom").click(function() {
                self.ClosePopupBottom();
                
				
                var classCookieTimeBottom = new CookieTime();
                classCookieTimeBottom.MethodSetCookie(CodeProduct + "_CookieBottom2", CodeProduct, exptime);
                return false;
            });
            jQuery("#bannerPopupBottom > div > a > img").click(function() {
                
				
            });
            jQuery("#bannerPopupBottom").css({
                "display": "block"
            });
        }

    } // end MethodBannerPopup
    var timer = setTimeout("jQuery('#bannerPopupBottom').fadeOut('slow')", 30000);
    return this;
    /* Contructor */
}

CookieTime = function() {
    /* Field */
    var expiredays = 0;
    /* Method */

    this.MethodGetCookie = function(CookieName) {
        if (document.cookie.length > 0) {
            CookieStart = document.cookie.indexOf(CookieName + "=");
            if (CookieStart != -1) {
                CookieStart = CookieStart + CookieName.length + 1;
                CookieEnd = document.cookie.indexOf(";", CookieStart);
                if (CookieEnd == -1) CookieEnd = document.cookie.length;
                return unescape(document.cookie.substring(CookieStart, CookieEnd));
            }
        }
        return "";

    } // end MethodGetCookie

    this.MethodSetCookie = function(CookieName, value, expiredays) {
        var exdate = new Date();
        exdate.setTime(exdate.getTime() + expiredays);
        document.cookie = CookieName + "=" + escape(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString());

    } // end MethodSetCookie


}