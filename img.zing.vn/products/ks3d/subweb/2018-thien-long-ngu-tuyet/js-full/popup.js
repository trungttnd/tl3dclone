//var IE6 = jQuery.browser.msie && jQuery.browser.version == 6.0;
function createOverlays (id) {
  
    var thewindowbackground = jQuery("#thewindowbackground");
    var _width = jQuery(window).width()/2;
    var _height = jQuery(window).height()/2;
    var _scrolltop = jQuery(window).scrollTop();
   // jQuery("body").append(thewindowbackground);
	/*if (IE6){
		thewindowbackground.css({
			width: jQuery(document).width() -18,
			height: jQuery(document).height(),
			position: "absolute",
			top: 0,
			left: 0,
			zIndex: 900,
			background: "#000000",
			opacity: 0
		});
	}*/
	
	thewindowbackground.css({
		width: jQuery(document).width(),
		height: jQuery(document).height(),
		position: "absolute",
		top: 0,
		left: 0,
		zIndex: 900,
		background: "#000000",
		opacity: 0
	});
	
	
    thewindowbackground.fadeTo("fast", 0.7, function(){
        jQuery("#" + id).css({
            display: "block",
            top: _height + _scrolltop - jQuery("#" + id).outerHeight() /2,
            left: _width - jQuery("#" + id).outerWidth()/2
        })
    });
    jQuery(window).resize(function(){
        var newh = jQuery(window).height()/2;
        var neww = jQuery(window).width()/2;
        var newscroll = jQuery(window).scrollTop();
        
		
			thewindowbackground.css({
				width: jQuery(document).width()
			});
		
        jQuery("#" + id).css({
            top: newh + newscroll - jQuery("#" + id).outerHeight()/2,
            left: neww - jQuery("#" + id).outerWidth()/2
        })
    });
	
    jQuery(window).scroll(function(){
        var newh = jQuery(window).height()/2;
        var neww = jQuery(window).width()/2;
        var newscroll = jQuery(window).scrollTop();
        
		
			thewindowbackground.css({
				width: jQuery(document).width(),
				height: jQuery(document).height()
			});
		
        jQuery("#" + id).css({
            top: newh + newscroll - jQuery("#" + id).outerHeight()/2,
            left: neww - jQuery("#" + id).outerWidth()/2
        })
    });
	
	
    if( jQuery("#fbPopupMenu_" + id).find("li.Hilite").hasClass("ha")){
        autoPlay(jQuery("#img_" + id), id);
    }
    jQuery(thewindowbackground).bind("click", function () {
        closeVideo(id);
        return false;
    });
	
    jQuery("#fbclose_" + id).bind("click", function () {
        closeVideo(id);
        return false;
    });
	
	jQuery('#'+id+' .PopupCloseBtn').bind("click", function () {
        closeVideo(id);
        return false;
    });
}

function closeVideo (id) {
   
    jQuery("#" + id).css({
        display: "none"
    });
	
    jQuery("#thewindowbackground").fadeOut("fast", function () {      
        jQuery("#" + id).css({
            display: "none"
        });
    })
	if (id == "MusicOverlays"){
		jQuery("#" + id).remove();
	}
}
