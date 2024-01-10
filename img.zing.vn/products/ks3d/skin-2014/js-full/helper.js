// VARIABLE

//html image loading when load ajax
var _htmlImageloading = "<img src=images/loading-icon.gif alt=''>";

// element selectbox ranking by type.
var selectboxType = "#rankingByType";

// element selectbox ranking by server.
var selectboxServer = "#rankingByServer";

var activeCarousel = function(element, prev, next) {
    if (jQuery(element).size()) {

        $(element).jcarousel({
            wrap: 'both'
        });

        $(element).jcarouselAutoscroll({
            interval: 4000
        });

        $(prev)
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $(next)
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });

        $('.jcarousel-pagination')
            .on('jcarouselpagination:active', 'a', function() {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function() {
                $(this).removeClass('active');
            })
            .jcarouselPagination();
    }
}

var setCenter = function(objSV) {
    windowWidth = jQuery(window).width();
    windowHeight = jQuery(window).height();
    popupWidth = objSV.width();
    popupHeight = objSV.height();
    // objSV.css('top', (windowHeight - popupHeight) / 2);
    objSV.css('left', (windowWidth - popupWidth) / 2);
    objSV.fadeIn();
    jQuery('.overlay').fadeIn();
    $(window).resize(function() {
        windowWidth = jQuery(window).width();
        windowHeight = jQuery(window).height();
        // objSV.css('top', (windowHeight - popupHeight) / 2);
        objSV.css('left', (windowWidth - popupWidth) / 2);
    });
}


var setActiveTab = function(ulTab) {
    if (jQuery(ulTab).length > 0) {
        var tab = jQuery(ulTab);
        tab.unbind().bind('click', function(event) {
            event.preventDefault();
            var idBlock = jQuery(this).attr('href');
            var parentBlock = jQuery(idBlock).parent('div');
            if (jQuery(idBlock).length > 0) {
                tab.closest('li').removeClass('active');
                jQuery(this).closest('li').addClass('active');
                jQuery(parentBlock).children('.tab-content').fadeOut();
                jQuery(idBlock).fadeIn();
            }
        });
    };
}



var setTextInputSearch = function(elInput) {
    if (jQuery(elInput).length > 0) {
        jQuery(elInput).on('focus', function() {
            if (!jQuery(this).data('defaultText')) jQuery(this).data('defaultText', jQuery(this).val());
            if (jQuery(this).val() == jQuery(this).data('defaultText')) jQuery(this).val('');
        });
        jQuery(elInput).on('blur', function() {
            if (jQuery(this).val() == '') jQuery(this).val(jQuery(this).data('defaultText'));
        });
    }
};

var activeFancybox = function(el) {
    if ($(el).length > 0) {
        $(el).fancybox({
            openEffect: 'elastic',
            autoCenter: true,
            padding: [7, 7, 7, 7],
            helpers: {
                title: {
                    type: 'inside'
                },
                media: {}
            },
            nextEffect: 'elastic',
            prevEffect: 'elastic'
        });
    }
};

var getDataAjax = function(urlData) {
    var $objAjax;
    var result;
    if ($objAjax != undefined) {
        $objAjax.abort();
    }

    $objAjax = $.ajax({
        url: urlData,
        dataType: 'json',
        beforeSend: loadingPage(obj),
        success: function(output) {
            result = output;
        }
    });
    if (result != undefined) return result;
};

var postDataAjax = function(urlData, dataPost) {
    var $objAjax;
    var _dataPost;
    var result;
    if ($objAjax != undefined) {
        $objAjax.abort();
    }
    (dataPost != undefined) ? _dataPost = dataPost : _dataPost = "";

    $objAjax = $.ajax({
        url: urlData,
        dataType: 'json',
        type: 'post',
        data: _dataPost,
        beforeSend: loadingPage(obj),
        success: function(output) {
            result = output;
        }
    });
    if (result != undefined) return result;
};



function loadingPage(obj) {
    _html = _htmlImageloading;
    if (typeof jQuery(obj) != "undefined") {
        jQuery(obj).html(_html);
    }
}

function scrollHtml(posScroll) {
    $('html, body').animate({
        scrollTop: posScroll
    }, 500, "linear", function() {

    });
}



function centerElement(element, parent) {
    if (jQuery(element).length > 0) {
        wElemnt = jQuery(element).width();
        wParent = jQuery(parent).width();
        rs = (wParent - wElemnt) / 2;
        jQuery(element).css('left', rs);
    }
}


$.fn.clickToggle = function(func1, func2) {
    var funcs = [func1, func2];
    this.data('toggleclicked', 0);
    this.bind('click', function(e) {
        e.preventDefault();
        var data = $(this).data();
        var tc = data.toggleclicked;
        $.proxy(funcs[tc], this)();
        data.toggleclicked = (tc + 1) % 2;
    });
    return this;
};