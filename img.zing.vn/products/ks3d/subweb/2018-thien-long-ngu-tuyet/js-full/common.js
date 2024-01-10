$window = $(window);
_ww = $window.width();
_wh = $window.height();
_fw = 2000;
_fh = 1000;
_scaleW = _ww / _fw;
_scaleH = _wh / _fh;

$rzObj = $('.page-header');
//$rzObj = $('.wrapper');
_rzWidth = _fw;
_rzHeight = _fh;
_rzLeft = 0;

$(function ($) {
	$window.resize(function (evt) {
		_ww = $window.width();
		_wh = $window.height();
		_scaleW = _ww / _fw;
		_scaleH = _wh / _fh;
		_rzLeft = 0;	
	
		// if (_scaleW > _scaleH) {
		// 	_rzWidth = _fw * _scaleW;
		// 	_rzHeight = _fh * _scaleW;
		// } else {
		// 	_rzWidth = _fw * _scaleH;
		// 	_rzHeight = _fh * _scaleH;
		// 	_rzLeft = (_rzWidth - _ww) / -2;
		// 	_scaleW = _scaleH;
		// }
		// $rzObj.css({
		// 	'width': _rzWidth,
		// 	'height': _rzHeight,
		// 	'left': _rzLeft
		// });
		$(".page-header").css({
			"transform": "scale(" + _wh / _fh + ", " + _wh / _fh + ")"
		});
		$("#page-main").css({
			'top': _wh - $('#topbar').outerHeight() - $('#nav').outerHeight()*(_wh / _fh) + 90*(_wh / _fh),
			"transform": "scale(" + _wh / _fh + ", " + _wh / _fh + ")",
			"transform-origin": "top center",
			"height" : $(".main-content--loop").outerHeight() * (_wh/ _fh),
		});
		$("footer").css({
			"transform": "scale(" + _fh / _wh + "," + _fh / _wh + ")",
		});
		$(".Popup").css({
			"transform": "scale(" + _wh / _fh + ", " + _wh / _fh + ")"
		});
		$("#nav").css({
			"transform": "scale(" + _wh / _fh + ", " + _wh / _fh + ")"
		});
		$("#list-function").css({
			//"transform": "scale(" + _fh / _wh + "," + _fh / _wh + ")",
		})
		// $("#nav ul li").eq(0).css({'width' : '20%'});
		// $("#nav ul li").eq(1).css({'width' : '18.5%'});
		// $("#nav ul li").eq(2).css({'width' : '23%'});
		// $("#nav ul li").eq(3).css({'width' : '18.5%'});
		// $("#nav ul li").eq(4).css({'width' : '20%'});
		// $("#nav ul li a").css({
		// 	"transform": "scale(" + _wh / _fh + ", " + _wh / _fh + ")",
		// 	"transform-origin": "0 100%"
		// });
	}).resize();
});


jQuery(document).ready(function () {
	if (jQuery('#scrolltop').size()) {
		$('#scrolltop').addScrollControl({
			initTop: 400,
			offsetTop: 600,
			animation: true,
			offsetToScroll: _wh + $('#nav').outerHeight() + 70,
			offsetLeft: 918,
			RelativeID: 'main-content'
		});
	}
	jQuery('.top').unbind('click').bind('click', function () {
		jQuery('html, body').animate({
			scrollTop: 0,
		}, 500, 'linear');
		return false;
	});
	if (jQuery('.article__detail .tab__detail').length > 0 && jQuery('#tabHeader').length > 0) {
		jQuery('#tabHeader li').eq(0).find('a').addClass('active');
		var curId = jQuery('#tabHeader li').eq(0).find('a').data('href');
		jQuery('.article__detail').find(curId).show();
		jQuery('#tabHeader > li > a').click(function () {
			jQuery('.article__detail .tab__detail').hide();
			jQuery('#tabHeader > li > a').removeClass('active');
			jQuery(this).addClass('active');
			var curId = jQuery(this).data('href');
			jQuery('.article__detail').find(curId).show();
			return false;
		});
	} else {
		jQuery('.tab__detail').show();
	}

	// $("body").bind("mousewheel", function(e, delta){
	// 	toScroll = _wh + $('#nav').outerHeight() + 70;
	// 	//console.log($("body, html").scrollTop() + "\n" + toScroll);

	// })

	// $("body").bind("mousewheel", function(e, delta){
	// 	_wh = $window.height();
	// 	hmove = _wh - $('#topbar').outerHeight() - $('#nav').outerHeight() + 90
	// 	if (delta < 0 && $("body, html").scrollTop() == 0) {
	// 		$("body, html").animate({
	// 			scrollTop: hmove
	// 		}, 500);
	// 	} else if (delta > 0 && $("body, html").scrollTop() < hmove + 90) {
	// 		$("body, html").animate({
	// 			scrollTop: 0
	// 		}, 500);
	// 	} 
	// })
	
});
