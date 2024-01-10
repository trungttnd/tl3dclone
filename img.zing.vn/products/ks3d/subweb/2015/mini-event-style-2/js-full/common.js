$(window).load(function() {
	
    $(".QuickRegister").click(function(evt) {
        evt.preventDefault();
        zmeOpenWidget.doRegister();
    });
	
	if (jQuery(".MenuLeft").outerHeight() < jQuery(window).height() ) {
		$(".MenuLeft").addScrollControl({
			initTop: 0,
			offsetTop: 0,
			animation: false,
			offsetToScroll: 400,
			offsetLeft: 0,
			RelativeID: "MainContent"
		});
    }

    if (jQuery("#top").size()) {
        $("#top").addScrollControl({
            initTop: 700,
            offsetTop: 500,
            animation: false,
            offsetToScroll: 600,
            offsetLeft: 965,
            RelativeID: "MainContent"
        });

        $("#top").click(function(event) {
            $('html, body').animate({
                scrollTop: 0
            }, 500, "linear", function() {

            });
            return false;
        });
    }
	
	if (jQuery(".StaticMain div.MainTab").length > 0) {
		jQuery(".StaticMain div.MainTab:first ").show();
		jQuery("#tabHeader li").eq(0).addClass("Active");
		jQuery("#tabHeader > li > a").click(function(){
			jQuery(".StaticMain .MainTab").hide();
			jQuery("#tabHeader > li").removeClass("Active");
			jQuery(this).parent().addClass("Active");
			var curId = jQuery(this).attr("href");
			jQuery(".StaticMain").find(curId).show();
			return false;
		});
	}
});