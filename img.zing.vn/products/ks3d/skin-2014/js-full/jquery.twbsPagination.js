/*!
 * jQuery pagination plugin v1.2.1
 * http://esimakin.github.io/twbs-pagination/
 *
 * Copyright 2014, Eugene Simakin
 * Released under Apache 2.0 license
 * http://apache.org/licenses/LICENSE-2.0.html
 */
;
(function ($, window, document, undefined) {

    'use strict';

    var old = $.fn.twbsPagination;

    // PROTOTYPE AND CONSTRUCTOR

    var TwbsPagination = function (element, options) {       

        this.$element = $(element);
        this.options = $.extend({}, $.fn.twbsPagination.defaults, options);

        if (this.options.startPage < 1 || this.options.startPage > this.options.totalPages) {
            throw new Error('Start page option is incorrect');
        }

        this.options.totalPages = parseInt(this.options.totalPages);
        if (isNaN(this.options.totalPages)) {
            throw new Error('Total pages option is not correct!');
        }

        this.options.visiblePages = parseInt(this.options.visiblePages);
        if (isNaN(this.options.visiblePages)) {
            throw new Error('Visible pages option is not correct!');
        }

        if (this.options.totalPages < this.options.visiblePages) {
            this.options.visiblePages = this.options.totalPages;
        }

        if (this.options.onPageClick instanceof Function) {
            this.$element.first().bind('page', this.options.onPageClick);
        }

        var tagName = (typeof this.$element.prop === 'function') ?
            this.$element.prop('tagName') : this.$element.attr('tagName');

        if (tagName === 'UL') {
            this.$listContainer = this.$element;
        } else {
            this.$listContainer = $('<ul></ul>');
        }

        this.$listContainer.addClass(this.options.paginationClass);

        if (tagName !== 'UL') {
            this.$element.append(this.$listContainer);
        }

        this.render(this.getPages(this.options.startPage));
        this.setupEvents();

        return this;
    };

    TwbsPagination.prototype = {

        constructor: TwbsPagination,

        destroy: function () {
            this.$element.empty();
            this.$element.removeData('twbs-pagination');
            this.$element.unbind('page');
            return this;
        },

        show: function (page) {
            if (page < 1 || page > this.options.totalPages) {
                throw new Error('Page is incorrect.');
            }

            this.render(this.getPages(page));
            this.setupEvents();

            this.$element.trigger('page', page);
            return this;
        },

        buildListItems: function (pages) {
            var $listItems = $();

            if (this.options.first) {
                $listItems = $listItems.add(this.buildItem('first', 1, this.options.firstClass));
            }

            if (this.options.prev) {
                var prev = pages.currentPage > 1 ? pages.currentPage - 1 : 1;
                $listItems = $listItems.add(this.buildItem('prev', prev, this.options.prevClass));
            }

            for (var i = 0; i < pages.numeric.length; i++) {
                $listItems = $listItems.add(this.buildItem('page', pages.numeric[i], this.options.pageClass));
            }

            if (this.options.next) {
                var next = pages.currentPage >= this.options.totalPages ? this.options.totalPages : pages.currentPage + 1;
                $listItems = $listItems.add(this.buildItem('next', next, this.options.nextClass));
            }

            if (this.options.last) {
                $listItems = $listItems.add(this.buildItem('last', this.options.totalPages, this.options.lastClass));
            }

            return $listItems;
        },

        buildItem: function (type, page, el_class) {
            var itemContainer = $('<li></li>'),
                itemContent = $('<a></a>'),
                itemText = null;

            itemContainer.addClass(el_class);
            itemContainer.data('page', page);

            switch (type) {
                case 'page':
                    itemText = page;
                    break;
                case 'first':
                    itemText = this.options.first;
                    break;
                case 'prev':
                    itemText = this.options.prev;
                    break;
                case 'next':
                    itemText = this.options.next;
                    break;
                case 'last':
                    itemText = this.options.last;
                    break;
                default:
                    break;
            }

            itemContainer.append(itemContent.attr('href', this.href(page)).html(itemText));
            return itemContainer;
        },

        getPages: function (currentPage) {
            var pages = [];

            var half = Math.floor(this.options.visiblePages / 2);
            var start = currentPage - half + 1 - this.options.visiblePages % 2;
            var end = currentPage + half;

            // handle boundary case
            if (start <= 0) {
                start = 1;
                end = this.options.visiblePages;
            }
            if (end > this.options.totalPages) {
                start = this.options.totalPages - this.options.visiblePages + 1;
                end = this.options.totalPages;
            }

            var itPage = start;
            while (itPage <= end) {
                pages.push(itPage);
                itPage++;
            }

            return {"currentPage": currentPage, "numeric": pages};
        },

        render: function (pages) {
            this.$listContainer.children().remove();
            this.$listContainer.append(this.buildListItems(pages));

            this.$listContainer.find('.'+this.options.pageClass).removeClass(this.options.activeClass).filter(function () {
                return $(this).data('page') === pages.currentPage;
            }).addClass(this.options.activeClass);

            if (pages.currentPage === 1) {
                this.$listContainer.find('.'+this.options.prevClass+' a,.'+this.options.firstClass+' a');
            }

            if (pages.currentPage === this.options.totalPages) {
                this.$listContainer.find('.'+this.options.nextClass+' a,.'+this.options.lastClass+' a');
            }

            this.$listContainer.find('.'+this.options.firstClass)
                .toggleClass(this.options.disabledClass, pages.currentPage === 1);

            this.$listContainer.find('.'+this.options.lastClass)
                .toggleClass(this.options.disabledClass, pages.currentPage === this.options.totalPages);

            this.$listContainer.find('.'+this.options.prevClass)
                .toggleClass(this.options.disabledClass, pages.currentPage === 1);

            this.$listContainer.find('.'+this.options.nextClass)
                .toggleClass(this.options.disabledClass, pages.currentPage === this.options.totalPages);
        },

        setupEvents: function () {
            var base = this;
            this.$listContainer.find('li').each(function () {
                var $this = $(this);
                $this.off();
                if ($this.hasClass(base.options.disabledClass) || $this.hasClass(base.options.activeClass)) return;
                $this.click(function (evt) {
                    evt.preventDefault();
                    base.show(parseInt($this.data('page'), 10));
                });
            });
        },

        href: function (c) {
            return this.options.href.replace(this.options.hrefVariable, c);
        }

    };

    // PLUGIN DEFINITION

    $.fn.twbsPagination = function (option) {
        var args = Array.prototype.slice.call(arguments, 1);
        var methodReturn;

        var $this = $(this);
        var data = $this.data('twbs-pagination');
        var options = typeof option === 'object' && option;

        if (!data) $this.data('twbs-pagination', (data = new TwbsPagination(this, options) ));
        if (typeof option === 'string') methodReturn = data[ option ].apply(data, args);

        return ( methodReturn === undefined ) ? $this : methodReturn;
    };

    $.fn.twbsPagination.defaults = {
        totalPages: 0,
        startPage: 1,
        visiblePages: 5,
        href: '#',
        hrefVariable: '{{number}}',
        first: 'First',
        prev: 'Previous',
        next: 'Next',
        last: 'Last',
        onPageClick: null,
        paginationClass: 'pagination',
        nextClass: 'next',
        prevClass: 'prev',
        lastClass: 'last',
        firstClass: 'first',
        pageClass: 'page',
        activeClass: 'active',
        disabledClass: 'disabled'
    };

    $.fn.twbsPagination.Constructor = TwbsPagination;

    $.fn.twbsPagination.noConflict = function () {
        $.fn.twbsPagination = old;
        return this;
    };

})(jQuery, window, document);
