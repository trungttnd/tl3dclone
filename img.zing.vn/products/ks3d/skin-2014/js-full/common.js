
var flashvars = {};
var attributes = {};
var params = {};
params.wmode = "transparent";
params.allowfullscreen = "true";
params.scale = "noscale";
params.quality = "high";
params.allowScriptAccess = "always";

jQuery(document).ready(function($) {
    $('#btn-baochi').unbind('click').bind('click', function(e) {
        if (e) e.preventDefault();
        $('#baochi').animate({
            left: '0px'
        }, 500, function() {
            $('#baochi .btn-close').unbind('click').bind('click', function(e) {
                if (e) e.preventDefault();
                $('#baochi').animate({
                    left: '-379px'
                }, 500);
            });
        });
    });
    $('.btn-download').unbind('click').bind('click', function(e) {
         trackButtonFlash(1);
         return false;
    });
    /* Call active navigation*/
    /*
    if($('#left-nav').length) {
        setActiveNavigation('#left-nav ul li a', 'active');
    }
    if($('.tabHeader').length) {
        setActiveNavigation('.tabHeader li a', 'Active');
    }*/


    // set active banner 
    activeCarousel(".jcarousel", "", "");

    // set active tab action daily
    //setActiveTab('ul.tab-daily li a');
	ActiveBlockDaily();
	function ActiveBlockDaily(){
		jQuery('ul.tab-daily li a').each(function(index){
			var aEl = $(this);
			aEl.unbind('click').bind('click',function(e){
				e.preventDefault();
				if($('.tab-daily').find('li.active').index() == 0){
					$.ajax({
						type: 'GET',
						url:$('#siteURL').val()+'/hoat-dong-ajax/home-activate.1.html?cate=hoat-dong-hang-tuan',
						success: function(msg){
							$( "div.block-daily" ).replaceWith($(JSON.parse(msg)));
							ActiveBlockDaily();
							setActiveAction('#act-tomorrow .frame-thumb-act a');
							setActiveAction('#act-today .frame-thumb-act a');
							setTimeout(function(){
								jQuery('ul.tab-daily li').removeClass('active');
								jQuery('ul.tab-daily li').eq(1).addClass('active');
							},1000);
						}
					});
				}
				else{
					$.ajax({
						type: 'GET',
						url:$('#siteURL').val()+'/hoat-dong-ajax/home-activate.1.html?cate=hoat-dong-hang-ngay',
						success: function(msg){
							$( "div.block-daily" ).replaceWith($(JSON.parse(msg)));
							ActiveBlockDaily();
							setActiveAction('#act-tomorrow .frame-thumb-act a');
							setActiveAction('#act-today .frame-thumb-act a');
							setTimeout(function(){
								jQuery('ul.tab-daily li').removeClass('active');
								jQuery('ul.tab-daily li').eq(0).addClass('active');
							},1000);
						}
					});
				}
			});
		});
	}
	

    // set active tab action guide
    setActiveTab('ul.tab-guide li a');

    // set replace format date
    replayFormatDate();

    // set event focus and bur for block search
    setTextInputSearch('.form-search input[type=text]');

    centerElement('a.btn-slide-sect', '#main-action');

    // set event click for list character
    activeClickChar();

    // set active fancybox for video clip
    activeFancybox(".fancybox");


    // set active content detail action daily
    setActiveAction('#act-tomorrow .frame-thumb-act a');
    setActiveAction('#act-today .frame-thumb-act a');

    //  call quick register
    $('.QuickRegister').click(function(evt) {
        evt.preventDefault();
        zmeOpenWidget.doRegister();
    });

    // set blink button Scroll
    replyButtonScroll();



    /* active scroll Top in subpage */
    if (jQuery(".btn-top-page").size()) {
        $(".btn-top-page").addScrollControl({
            initTop: 120,
            offsetTop: 400,
            animation: true,
            offsetToScroll: 60,
            offsetLeft: 686,
            RelativeID: "content-top"
        });
    }

    /*active flash in Homepage */
    activeFlash();


    /* set active social plugin */
    showPopupSocial.init({
        RelativeID: 'popup-social-home',
        typePage: 'home'
    });


    if ($("#btn-survey").size() > 0) {
        $("#btn-survey").click(function(evt) {
            evt.preventDefault();
            jQuery('#ifr-survey').attr('src', 'http://www.surveygizmo.com/s3/1832698/TTL3D-Mainsite');
            jQuery('#ifr-survey').load(function() {
                jQuery('.iframe img').remove();
            });
            setCenter($('div.survey'));
            return false;
        });
    }
    if ($("div.overlay, #survey-close").size()) {
        $("div.overlay, #survey-close").click(function(event) {
            $("div.overlay").hide();
            $("div.survey").fadeOut();
            jQuery('#ifr-survey').attr('src', '');
        });
    };
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "../../../connect.facebook.net/en_US/sdk.js#xfbml=1&appId=781279451938935&version=v2.0";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
});


$(window).resize(function() {
    centerElement('a.btn-slide-sect', '#main-action');
});

function cheatNavigation() {
    if (jQuery('a.nav-gallery').length > 0) jQuery('a.nav-gallery').closest('li').css('margin-left', '161px');
}

function replyButtonScroll() {
    aScroll = jQuery('a.scroll-down');
    if (aScroll.length > 0) {
        setTimeout(function() {
            if (aScroll.hasClass('active')) {
                aScroll.removeClass('active');
            } else {
                aScroll.addClass('active');
            }
            replyButtonScroll();
        }, 500);
    }
}

var replayFormatDate = function() {
    var elm = jQuery('.post-date');
    if (elm.length > 0) {
        elm.each(function(index, el) {
            value = jQuery(el).html();
            arrV = value.split('-');
            rs = "&nbsp;" + arrV[0] + "&nbsp;" + arrV[1];
            if (!jQuery.support.leadingWhitespace) {
                rs = "&nbsp;" + arrV[0] + "&nbsp;" + arrV[1];
            }
            jQuery(el).html(rs);
        });
    }
};

var activeClickChar = function() {
    if (jQuery('#main-sect').length > 0) {

        var elementClick = jQuery('#main-sect ul.tab-sect li a');
        var elmDetailChar = jQuery('.detail-sect');
        var btnviewmoreChar = jQuery('a.btn-slide-sect');
        var sectPos = jQuery('#main-sect').position().top;
        var pathImgSect = 'http://img.zing.vn/products/ks3d/skin-2014/images/char/';

        if (jQuery(elementClick).length > 0) {

            elementClick.each(function(index, el) {

                jQuery(el).click(function(e) {
                    classElm = jQuery(this).attr('class');


                    // if block detail char hidden => active block when click
                    if (elmDetailChar.is(':hidden')) {
                        if (!jQuery(this).closest('li').hasClass('active')) {
                            elmDetailChar.slideDown(function() {
                                setFlashSect(classElm);
                            });
                            btnviewmoreChar.slideUp();


                            jQuery('#main-sect ul.tab-sect li.active').removeClass('active');
                            jQuery(this).closest('li').addClass('active');

                            elmDetailChar.addClass('active');



                        }
                    } else {
                        if (jQuery(this).closest('li').hasClass('active')) {
                            elmDetailChar.slideUp();
                            elmDetailChar.removeClass('active');
                            btnviewmoreChar.slideDown();


                            jQuery(this).closest('li').removeClass('active');
                        } else {


                            jQuery('#main-sect ul.tab-sect li.active').removeClass('active');
                            jQuery(this).closest('li').addClass('active');
                        }
                    }
                    jQuery('#main-sect .detail-sect .block-mp').velocity({
                        opacity: 0,
                        'z-index': 1
                    }, function() {
                        removeFlashSect();
                    });
                    jQuery("#" + classElm).velocity({
                        opacity: 1,
                        'z-index': 2
                    }, function() {
                        setFlashSect(classElm);
                    });
                    scrollHtml(sectPos);
                    return false;
                });

            });
        }

        if (jQuery(btnviewmoreChar).length > 0) {
            btnviewmoreChar.click(function(event) {
                if (elmDetailChar.is(':hidden')) {
                    elmDetailChar.addClass('active').slideDown();
                    jQuery("#nga-my").velocity({
                        opacity: 1
                    });
                    btnviewmoreChar.slideUp();
                    elementClick.filter(function(index, elm) {
                        return jQuery(elm).hasClass('nga-my');
                    }).closest('li').addClass('active');
                    setFlashSect('nga-my');
                }
                scrollHtml(sectPos);
                return false;
            });
        }

        if (jQuery('.close-Sect').length > 0) {
            jQuery('.close-Sect').click(function(event) {
                if (!elmDetailChar.is(':hidden')) {
                    elmDetailChar.slideUp();
                    elmDetailChar.removeClass('active');
                    btnviewmoreChar.slideDown();

                    removeFlashSect();
                    jQuery('#main-sect ul.tab-sect li.active').removeClass('active');

                }
            });
        };

        if (jQuery('a.scroll-down').length > 0) {
            jQuery('a.scroll-down').click(function(event) {
                scrollHtml(sectPos);
                return false;
            });
        }
    }
};

/* set active flash môn phái */
var setFlashSect = function(classSect) {
    var divFlash = 'flash-' + classSect;
    var fileName = classSect + '.swf';
    swfobject.embedSWF("http://img.zing.vn/products/ks3d/skin-2014/swf/" + fileName, divFlash, "100%", "100%", "8.0.0", "http://imgs.csm.zing.vn/general/swf/expressInstall.swf", flashvars, params, attributes);
    jQuery("#" + divFlash).css('z-index', '1');
};

/* remove flash deactive */
var removeFlashSect = function() {
    var objFlash = jQuery('.block-mp').find('object');
    var idFlash = undefined;
    if (jQuery(objFlash).length > 0) {
        idFlash = jQuery(objFlash).attr('id');
        htmlFlash = '<div id="' + idFlash + '"></div>';
        jQuery(objFlash).after(htmlFlash);
        jQuery(objFlash).remove();
    }
};



var setActiveTab = function(ulTab) {
    if (jQuery(ulTab).length > 0) {

        var tab = jQuery(ulTab);
        tab.unbind().bind('click', function(event) {
            event.preventDefault();
            if (!jQuery(this).closest('li').hasClass('none')) {
				var idBlock = jQuery(this).attr('href');
				var parentBlock = jQuery(idBlock).parent('div');
				if (jQuery(idBlock).length > 0) {
					tab.closest('li').removeClass('active');
					jQuery(this).closest('li').addClass('active');
					jQuery(parentBlock).children('.tab-content').removeClass('active').hide();
					jQuery(idBlock).addClass('active');
					jQuery(idBlock).fadeIn();

				}
 
            } else {
                window.open(jQuery(this).attr('href'),'_self');
            }
        });
    }
};

var setActiveAction = function(ulTab) {
    if (jQuery(ulTab).length > 0) {
        var tab = jQuery(ulTab);
        var parentTab = tab.parents()[1];
        tab.bind('click', function(event) {
            event.preventDefault();
            var idBlock = jQuery(this).attr('href');
            if (jQuery(idBlock).length > 0) {
                tab.removeClass('active');
                jQuery(this).addClass('active');
                jQuery(parentTab).find('.detail-act').velocity({
                    opacity: "0"
                }, function() {
                    jQuery(this).removeClass('active');
                    jQuery(parentTab).find(idBlock).addClass('active');
                });
            }
        });
    }
};

var onChangeRanking = function(params) {
    var _typeSelect = jQuery(selectboxType).val();
    var _serverSelect = jQuery(selectboxServer).val();
    var splitParam = params.split("&");
    var postData = 'pageLoad=0&hiddenData=0&block={"' + splitParam[0] + '":{}}&' + splitParam[1];
    var urlInput = splitParam[2] == "''" ? '' : splitParam[2];
    var idBlogOutput = splitParam[0];
    var result;

    if (_typeSelect == undefined) _typeSelect = "";
    if (_serverSelect == undefined) _serverSelect = "";

    try {
        result = postDataAjax(urlInput, postData + '&typeRanking=' + type + '&serverRanking=' + server);
        if (result != undefined) {
            jQuery("#" + idBlogOutput).html(result[idBlogOutput]);
        }
    } catch (err) {
        console.log(err);
    }

}

function activeFlash() {
    //swfobject.embedSWF("http://img.zing.vn/products/ks3d/skin-2014/swf/header-tet-2015.swf", "flashHeader", "100%", "100%", "8.0.0", "http://imgs.csm.zing.vn/general/swf/expressInstall.swf", flashvars, params, attributes);
    if (jQuery("body.Home").size()) {
        //swfobject.embedSWF("http://img.zing.vn/products/ks3d/skin-2014/swf/caidat.swf", "flashDownload", "100%", "100%", "8.0.0", "http://imgs.csm.zing.vn/general/swf/expressInstall.swf", flashvars, params, attributes);
    }
    //swfobject.embedSWF("http://img.zing.vn/products/ks3d/skin-2014/swf/trailer.swf", "flashTrailer", "100%", "100%", "8.0.0", "http://imgs.csm.zing.vn/general/swf/expressInstall.swf", flashvars, params, attributes);

}
function trackButtonFlash(solution) {
    switch (solution) {

        /* button download */
        case 1:
            paramVmas = getParamVMAS();
            if (paramVmas == undefined) {
                paramVmas = "";
            } else {
                paramVmas = "?" + paramVmas;
            }
            window.open('../../bai-viet/huong-dan/tai-game-ttl.html' + paramVmas, '_blank');
            // _gaq.push(['_trackEvent','Download', 'Button Image', 'Homepage', 1]);
            //ga('send', 'event', 'Download', 'Button Image', 'Homepage', 1);
            break;
        /*    // flash Thiên Sơn
        case 2:
            activeClickSect('thien-son');
            ga('send', 'event', 'thien son', 'Mon Phai', 'Homepage', 1);
            break;
            // button trailer
        case 3:
            jQuery(".frame-video a.icon-video").trigger('click');
            ga('send', 'event', 'trailer', 'Button Image', 'Homepage', 1);
            break;
            // flash Đường môn
        case 4:
            activeClickSect('duong-mon');
            ga('send', 'event', 'duong mon', 'Mon Phai', 'Homepage', 1);
            break;
            // flash minh giáo
        case 5:
            activeClickSect('minh-giao');
            ga('send', 'event', 'minh giao', 'Mon Phai', 'Homepage', 1);
            break;
            // flash cái bang
        case 6:
            activeClickSect('cai-bang');
            ga('send', 'event', 'cai bang', 'Mon Phai', 'Homepage', 1);
            break;

            // flash mô dung
        case 7:
            activeClickSect('mo-dung');
            ga('send', 'event', 'mo dung', 'Mon Phai', 'Homepage', 1);
            break;

            // flash thiếu lâm
        case 8:
            activeClickSect('thieu-lam');
            ga('send', 'event', 'thieu lam', 'Mon Phai', 'Homepage', 1);
            break;

            // flash Tinh Túc
        case 9:
            activeClickSect('tinh-tuc');
            ga('send', 'event', 'tinh tuc', 'Mon Phai', 'Homepage', 1);
            break;

            // flash Nga my
        case 10:
            activeClickSect('nga-my');
            ga('send', 'event', 'nga my', 'Mon Phai', 'Homepage', 1);
            break;

            // flash Tiêu Dao
        case 11:
            activeClickSect('tieu-dao');
            ga('send', 'event', 'tieu dao', 'Mon Phai', 'Homepage', 1);
            break;
            // flash Võ Đang
        case 12:
            activeClickSect('vo-dang');
            ga('send', 'event', 'vo dang', 'Mon Phai', 'Homepage', 1);
            break;
            // flash Thiên Long
        case 13:
            activeClickSect('thien-long');
            ga('send', 'event', 'thien long', 'Mon Phai', 'Homepage', 1);
            break;
		*/
    }
}

/* set event click flash môn phái */
function activeClickSect(classSect) {
    var divFlash = 'flash-' + classSect;
    jQuery("#" + divFlash).siblings('a').trigger('click');
}

function getParamVMAS() {
    var selfUrl = window.location.href;
    var splitParam = selfUrl.split("?");
    tempParam = splitParam[1];
    return tempParam;
}