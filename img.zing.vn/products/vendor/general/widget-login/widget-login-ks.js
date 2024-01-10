window.zAsyncInit = function() {
    zmeOpenWidget.init({
        apikey: 'da092f706d214c318be258ddedaf1ff5', // apikey de test, can doi khi tich hop vao san pham
        pid: '239', // product id de test, can doi khi tich hop vao san pham
        callback: 'cb', // Ten ham callback
        tpl: '6', // Template ID, quickregister - 5
        css: 'http://static.onion.vn/eventgame/intro/general/css/widget-register/css/login_quickreg_1.05.css' // link css, doi link neu muon custom layout
    });
};

function cb(cbdata, acn, zid, uin, autcode, obj) {
    // if (confirm("Bạn đã đăng ký thành công tài khoản: " + acn + "\nBấm OK để tải game ngay")) {
    //     window.open(
    //         'http://game.zing.vn/kiem-the/download/kiemthe.html',
    //         '_blank'
    //     );
    // }
    linkDownload = '';
    validLoginSuccess.ExcuteValidLogin(zid, acn, obj, linkDownload);

};
(function(d) {
    var js, id = 'widget-jssdk',
        ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    var t = Math.floor(Math.random() * 10000);
    js.src = "../../../open.id.zing.vn/widget/_static/openwidgetff1d.js?type=2&amp;t=" + t;
    ref.parentNode.insertBefore(js, ref);
}(document));


var validLoginSuccess = {
    addPopHTML: function() {
        html_pop_va = '<div class="alert-bregis"><a href="#" title="close">X</a><div class="content-alert-bregis"><h3></h3><div class="logout"></div></div></div>';
        jQuery('body').append(html_pop_va);
    },

    addStylePopHTML: function() {
        style_pop_va = '<style type="text/css">.alert-bregis{background-color:#FFF;color:#333;height:180px;left:35%;position:absolute;top:100px;width:400px;z-index:991;box-shadow:0 5px 15px rgba(0,0,0,0.5)}.alert-bregis > .content-alert-bregis{height:100%;width:100%}.alert-bregis > .content-alert-bregis > h3{font-size:17px;line-height: 30px;padding-top:20px;text-align:center;margin:0 auto}.alert-bregis > .content-alert-bregis > h3 > span.imp{color:red}.alert-bregis > .content-alert-bregis > .logout{padding-top:20px;text-align:center;margin:0 auto}.alert-bregis > .content-alert-bregis > .logout > a{background-color:#428BCA;border-radius:5px;color:#FFF;display:block;font-size:20px;font-weight:700;height:50px;line-height:50px;text-decoration:none;width:185px;margin:0 auto}.alert-bregis > .content-alert-bregis > .logout > a:hover{background-color:#3276B1}.alert-bregis > a{display: block;height: 25px;line-height: 25px;position: absolute;right: 0;text-align: center;width: 25px; font-weight: bold; color: #000;}</style>';
        jQuery('body').append(style_pop_va);
    },
    ExcuteCenter: function(el) {
        var windowWidth = jQuery(window).width();
        var windowHeight = jQuery(window).height();
        var popupWidth = jQuery(el).width();
        var popupHeight = jQuery(el).height();
        $(el).css('top', (windowHeight - popupHeight) / 2);
        $(el).css('left', (windowWidth - popupWidth) / 2);

        $(window).resize(function() {
            windowWidth = jQuery(window).width();
            windowHeight = jQuery(window).height();
            $(el).css('top', (windowHeight - popupHeight) / 2);
            $(el).css('left', (windowWidth - popupWidth) / 2);
        });

        if (!jQuery('#thewindowbackground').size()) {
            jQuery('body').append('<div id="thewindowbackground"></div>');
        }

        jQuery('#thewindowbackground').css({
            width: '100%',
            height: '100%'
        }).show();



        $('.alert-bregis > a').click(function() {
            $(el).hide();
            jQuery('#thewindowbackground').hide();
        });
    },

    ExcuteValidLogin: function(zid, acn, obj, linkDownload) {
        if (zid > 0) {

            // check trường hợp user đăng kí mới hay đã login trước đó.
            if (obj['logged'] === undefined) { // đăng kí mới. 
                if (confirm("Bạn đã đăng ký thành công tài khoản: " + acn + "\nBấm OK để tải game ngay")) {
                    window.open(
                        linkDownload,
                        '_blank'
                    );
                }
            } else { // đã login trước đó.
                validLoginSuccess.addPopHTML(); // add HTML Popup
                validLoginSuccess.addStylePopHTML(); // Style CSS cho Popup.
                validLoginSuccess.ExcuteCenter('.alert-bregis');

                linkdirect = (window.location.href).split('?')[0]; //filter những param phía sau dấu ?

                if (linkdirect.split('zing').length > 1) { // check domain .zing.vn
                    apiPro = ''; // có domain .zing.vn
                } else {
                    apiPro = '&apikey=848dfc7c1dfe4da3b8dd3c58f8d34be8'; // ko có domain .zing.vn
                }

                htmlA = '<a href="https://sso3.zing.vn/logout?return=' + linkdirect + apiPro + '"' + 'title="Logout">Logout</a>';

                if (typeof acn != undefined) {
                    jQuery('.content-alert-bregis > h3').append('Bạn hiện đang đăng nhập với tài khoản : <span class="imp"> ' + acn + '</span>');
                }
                jQuery('.content-alert-bregis > .logout').append(htmlA);
            }
        }
    }

};
    $('.QuickRegister').click(function(evt) {
        evt.preventDefault();
        zmeOpenWidget.doRegister();
    })