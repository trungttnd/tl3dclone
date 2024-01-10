/* VARIABLE */
/* regex expression */
var myRegExp = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
var myHashExp = /[#]+[A-Za-z0-9-_]+/g;
/*class active default */
var attrActive = 'active';


/* PROTOTYPE */
if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

/* FUNCTION */
var setActiveNavigation = function(navigation, classActive) {
    try {
        var Regex = new RegExp(myRegExp);
        var regexHash = new RegExp(myHashExp);

        /* check class 'active' choose variable default or varialbe argument */
        if (classActive != undefined && classActive.length > 0) {
            attrActive = classActive;
        }


        if (jQuery(navigation).size()) {

            /*get url location and slipt string parameter after char '?'*/
            var url = (window.location.href).split('?')[0];
            /*slipt string parameter after char '#'*/
            // url = url.split('#')[0],
            /* validate href without index.html or not */
            // url = (url.length == 1) ? url + 'index.html' : url;

            var hashAnchor = regexHash.exec(url);

            /* get result href matches regex expression ex: www.abc.com/su-kien/danh-sach.1.html => result get index 4 : /su-kien/danh-sach.1.html*/
            var regexRoot = Regex.exec(url)[5],
                regexRoot = (regexRoot.length == 1) ? regexRoot + 'index.html' : regexRoot;

            jQuery(navigation).filter(function() {

                /*remove class active all element has class active tag li*/
                if (jQuery(this).closest('li').hasClass(attrActive)) {
                    jQuery(this).removeClass(attrActive);
                }

                /* get href attr anchor*/
                urlAnchor = jQuery(this).attr('href').split('?')[0];

                /*if (href matches regex expression) ? return result regex : return href string */
                regexAnchor = (Regex.exec(urlAnchor) != null) ? Regex.exec(urlAnchor)[5] : urlAnchor;
                if (regexAnchor != undefined) {

                    if (hashAnchor != null) {
                        if ($.trim(hashAnchor[0]) == $.trim(regexAnchor + hashAnchor[0])) {
                            activeElementNav(jQuery(this));
                        }
                    } else {
                        if ($.trim(regexRoot) == $.trim(regexAnchor)) {
                            activeElementNav(jQuery(this));
                        }
                    }
                };
            });
        }
    } catch (err) {
        console.log(err);
    }
}

function activeElementNav(el) {
    /* get tag LI parent direct anchor */
    tagLI = jQuery(el).closest('li');
    tagLI.addClass(attrActive);

    /* find tag li parent of nav root*/
    tagLIparent = jQuery(tagLI).parent().parents('li');

    /* if (find it) ? add class active tag Li*/
    if (tagLIparent.length > 0) {
        jQuery(tagLIparent).addClass(attrActive);
    }
}