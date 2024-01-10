jQuery.fn.extend({
	addScrollControl: function () {
		//core
		var _self = this;
		$adsControl = function (jEl, options) {
			
			var self = this;
			this.el = jEl;
			var isIE6 = (/MSIE 6\.0/).test(navigator.userAgent);			

			this.options = {
				initTop: typeof(options) != "undefined" && typeof(options.initTop) != "undefined" ? options.initTop : 5,
				offsetToScroll:typeof(options) != "undefined" && typeof(options.offsetToScroll) != "undefined" ? options.offsetToScroll : 0,
				offsetTop: typeof(options) != "undefined" && typeof(options.offsetTop) != "undefined" ? options.offsetTop : 5,
				offsetLeft: typeof(options) != "undefined" && typeof(options.offsetLeft) != "undefined" ? options.offsetLeft : 0,
				RelativeID: typeof(options) != "undefined" && typeof(options.RelativeID) != "undefined" ? options.RelativeID : "body",	
				animation: typeof(options) != "undefined" && typeof(options.animation) != "undefined" ? options.animation : false
			}
				
			this.applyPosition = "absolute";
			this.left = this.options.offsetLeft;
           
			//init
			this.el.css({
				position: this.applyPosition,
				top: self.options.initTop,
				left: this.left
				// left: "1027px"
			});
			//binding events
			if ( isIE6 || self.options.animation) {
						
				_self.smoothscroll(self.el,self.options.initTop,self.options.offsetTop,self.options.offsetToScroll,self.options.RelativeID);
					
			} else {

				jQuery(window).scroll(function () {
				
					if ( jQuery(document).scrollTop() > self.options.offsetToScroll ) {
						
							self.el.css({
								position: "fixed",
								left: self.options.offsetLeft +jQuery("#" + self.options.RelativeID).offset().left ,
								// left: "1027px",
								top: parseInt(self.options.offsetTop)
							});					
					}
					else {
						self.el.css({
							position: "absolute",
							left: self.options.offsetLeft,
							// left: "1027px",
							top: parseInt(self.options.initTop)
						});
					}
				});
				jQuery(window).resize(function(){
					var _scrollTop = jQuery(document).scrollTop();
					var wWidth = jQuery(document).width(); 
					if(_scrollTop > self.options.offsetToScroll){
						if(!isIE6 && !self.options.animation){
							self.el.css({
								left: self.options.offsetLeft +jQuery("#" + self.options.RelativeID).offset().left 
								// left: "1027px"
							});
						}
					}
				});
			}
		}
		this.smoothscroll = function(jEl,initTop,offsetTop,offsetToScroll,RelativeID){
			 var __self = this;
			 this.el = jEl;
			 
			 jQuery(window).scroll(function (evt) {				
				var scrollTop = jQuery(document).scrollTop();
				if(scrollTop > offsetToScroll){
					scrollTop = scrollTop + offsetTop - jQuery('#'+RelativeID).offset().top; 
					__self.el.animate({top:scrollTop},{duration:800,queue:false},function(){
						var _scrollTop = jQuery(document).scrollTop();
						
						if(_scrollTop <= offsetToScroll){
							
							__self.el.animate({
								top: initTop
							});
						}
					});
				} else{
					
					__self.el.animate({top:initTop},{duration:800,queue:false});
				}
			});
		}
		//setup
		var options = arguments[0];
		var _self= this;
		this.each(function() {
			new $adsControl(jQuery(this), options);
		});
	}
	
});