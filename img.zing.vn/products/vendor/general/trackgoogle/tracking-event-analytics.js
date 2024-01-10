jQuery.fn.extend({
	setTracking : function (title, type, page) {
		return this.each(function () {
			var $this = $(this);
			var onclick = $this.attr("onclick") || $this.attr("onClick") || "";
			if (onclick.indexOf("ga(") < 0 && onclick.indexOf("_gaq.push(") < 0) {
				$this.removeAttr("onClick");
				$this.attr('onclick', onclick + "ga('send', 'event', '" + title + "', '" + type + "', '" + page + "', 1);");
			}
		});
	}
});
var gaTracking = (function (window) {
	var locl = {};
	var specialLinks = {
		'Tai khoan' : 'id.zing.vn',
		'Nap the' : 'pay.zing.vn'
	};

	var campaign = '';
	var medium = '';

	function param(name) {
		return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(window.location.search) || [, null])[1]);
	}

	function unPascalCase(s) {
		return s.replace(/([a-z])([A-Z])/g, '$1 $2');
	}

	function capitalizeFirst(s) {
		return s.replace(/^[a-z]/, function (m) {
			return m.toUpperCase()
		});
	}

	function convertCase(s) {
		s = unPascalCase(s);
		s = s.toLowerCase();
		s = capitalizeFirst(s);

		return s;
	}

	function linkProcess() {
		var urlSplitt = [];
		var $body = $("body");
		var currentUrl = window.location.href;
		currentUrl = currentUrl.split("?")[0];
		currentUrl = currentUrl.split("#")[0];

		currentUrl = currentUrl.replace("http://", "");
		urlSplitt = currentUrl.split("../../index.html");

		var title = "";
		var type = "Button Image";
		var page = "Homepage";

		if ($body.hasClass("Teaser") || (urlSplitt.length > 4 && urlSplitt[1] == "intro" && (urlSplitt[3] == "teaser"))) {
			// for L.P
			page = "Teaser";
		} else if ($body.hasClass("Landingpage") || (urlSplitt.length > 4 && urlSplitt[1] == "intro" && (urlSplitt[3] == "landing"))) {
			// for L.P
			type = capitalizeFirst(urlSplitt[2].replace(/[-]/ig, " "));
			page = "Landingpage";
		} else if ($body.hasClass("Subpage") || urlSplitt.length >= 3 && urlSplitt[1] == "tin-tuc") {
			page = "Subpage";
		} else if ($body.hasClass("Subpage") || urlSplitt.length >= 3 && urlSplitt[1] == "su-kien" && (urlSplitt[2].split("."))[0] == "danh-sach") {
			page = "Subpage";
		} else if ($body.hasClass("Subpage") || urlSplitt.length >= 4 && urlSplitt[1] == "bai-viet" && urlSplitt[2] == "huong-dan") {
			page = "Subpage";
		} else if ($body.hasClass("Subpage") || urlSplitt.length >= 4 && urlSplitt[1] == "cam-nang" ) {
			page = "Subpage";
		} else if ($body.hasClass("Event") || (urlSplitt.length >= 2 && urlSplitt[1] == "su-kien")) {
			type = capitalizeFirst(urlSplitt[2].replace(/[-]/ig, " "));
			page = "Subweb";
		} else {
			page = "Homepage";
		}
		var trackingObj = {
			"Nap the" : $(".NapThe"),
			"Quen mat khau" : $(".ForgotPassword, .ForgotPass"),
			"Dang ky" : $(".QuickRegister, .DangKyNhanh"),
			"Download" : $(".TaiGame, .Download"),
			"PlayNow" : $(".Playnow, .ChoiNgay"),
			"Downloadhttp" : $(".DownloadHttp")
		};
		for (inx in trackingObj) {
			var obj = trackingObj[inx];
			obj.size() && obj.setTracking(inx, type, page);
		}
		// type = "ab";
		locl.trackingPlaynow = function () {
			ga('send', 'event', "PlayNow", type, page, 1);
		};
		locl.trackingDownload = function () {
			ga('send', 'event', 'Download', type, page, 1);
		};

		$(".DownloadBin").each(function (inx) {
			$(this).setTracking("Downloadhttp Bin" + (inx + 2), type, page);
		})
		$(".DownloadVdownloader").each(function (inx) {
			$(this).setTracking("Downloadhttp Vdownloader", type, page);
		})
		$(".DownloadTorrent").each(function (inx) {
			$(this).setTracking("Downloadhttp Torrent", type, page);
		})

		// tracking cs
		$("[class*=_track_]").each(function (index, el) {
			var $this = $(this);
			var hset = this.className.match(/\b_track_[^\s]+\b/);
			if (hset.length <= 0) {
				return;
			}
			var c = this.className.match(/\b_track_[^\s]+\b/)[0];
			// console.log(c);
			var mcs = c.split("_");
			if (mcs.length == 3) {
				var title = convertCase(unPascalCase(mcs[2]))
					$this.setTracking(title, "Link", page);
			} else if (mcs.length > 3) {
				// ["", "track", "img", "GopY"]
				// type = "Button Image";
				// console.log("[" + mcs[3] + "]")
				switch (mcs[2]) {
				case "img":
					type = "Button Image";
					break;
				default:
					type = "Link";
					break;
				}
				title = convertCase(unPascalCase(mcs[3]));
				$this.setTracking(title, type, page);
			}
		});
	}

	function addInlineEvt($objs, category, campaign, medium) {
		$objs.each(function () {
			var $this = $(this);
			var onclick = $this.attr('onclick');
			onclick = (onclick == undefined) ? '' : (onclick + ";");

			if (onclick.indexOf("ga(") < 0) {
				$this.attr('onclick', onclick + "ga('send', 'event', '" + category + "', '" + campaign + "', '" + medium + "', 1);");
			}
		});
	}

	function addTrack(el, category) {
		var onclick = $(el).attr('onclick');

		category = convertCase(category);
		campaign = unPascalCase(campaign);
		medium = unPascalCase(medium);

		onclick = onclick == undefined ? '' : onclick;

		// if (onclick.indexOf("_gaq.push") < 0) {
		// $(el).attr('onclick', onclick += ";ga('send', 'event', '" + category + "', '" + campaign + "', '" + medium + "', 1);");
		// }

	}

	return {
		"addTrack" : addTrack,
		"convertCase" : convertCase,
		"capitalizeFirst" : capitalizeFirst,
		"unPascalCase" : unPascalCase,
		"linkProcess" : linkProcess,
		// "trackingDownload": locl.trackingDownload,
		// "trackingPlaynow": locl.trackingPlaynow,
		init : function () {
			// console.log(locl.trackingDownload);
			linkProcess();
			this.trackingDownload = locl.trackingDownload;
			this.trackingPlaynow = locl.trackingPlaynow;
			return "init";
			var self = this;
			campaign = param('utm_campaign');
			medium = param('utm_medium');
			var gaMediumClass = document.body.className.match(/\bGaMedium[^\s]+\b/);

			campaign = campaign == 'null' ? 'NoCampaign' : campaign.split('_')[0];
			medium = (medium != 'null') ? medium : 'NoMedium';

			if (gaMediumClass != null && gaMediumClass.length) {
				medium = gaMediumClass[0].replace('GaMedium', '');
			}

			$('a, area').each(function () {
				var gaCategoryClass = this.className.match(/\bGaCategory[^\s]+\b/);
				var href = this.href;

				if (gaCategoryClass) {
					var category = gaCategoryClass[0].replace('GaCategory', '');

					addTrack(this, category);
				} else {
					if (jQuery(this).is('#ppregister_link')) {
						addTrack(this, 'Dang ky');
					}

					for (var name in specialLinks) {
						if (href.indexOf(specialLinks[name]) >= 0) {
							addTrack(this, name);
						}
					}
				}
			});
		}
	}

})(window, undefined);
jQuery(document).ready(function () {
	if (typeof ga != 'undefined' || typeof _gaq != 'undefined') {
		gaTracking.init();
		if (typeof _gaq == 'undefined') {
			_gaq = {
				push : function (arr) {
					ga('send', 'event', arr[1], arr[2], arr[3], 1);
				}
			};
		} else if (typeof ga == 'undefined') {
			ga = function (a, b, c, d, e, f) {
				// _gaq.push();
				_gaq.push(['_trackEvent', c, d, e, f]);
			}
		}
	}
});