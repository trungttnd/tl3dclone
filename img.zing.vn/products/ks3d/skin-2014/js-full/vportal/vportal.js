$(function() {

    var currentSection = $('#currentSection').val();
    var shortUri = $('#shortUri').val();
    var itemTotal = $('#itemTotal').val();
    var totalPages = 0;

    if (itemTotal > 0) {
        if ($('.pagination-container').length > 0) {
            pagination();
        }
    }

    $('#category-item li a').click(function(event) {
        $('#category-item li').removeClass('Active');
        currentSection = $(this).data('target');
        $(this).parent('li').addClass('Active');
        loadNews(1, 'loadTab');
        
        /*

        if ($('#itemTotal').val() > 0) {
            pagination();
        } else {
            $('.pagination >li').remove();
        }*/

        return false;
    });

    function pagination(){
        
        var itemTotal = $('#itemTotal').val();
        var itemPerPage = $('#itemPerPage').val();

        var modulusPage = itemTotal % itemPerPage > 0 ? 1 : 0;

        totalPages = parseInt(itemTotal / itemPerPage) + modulusPage;

        var shortUri = $('#shortUri').val();
        var searchPage = 1;
        if ($('#resultSearch').val() == 1) {
            searchPage = parseInt($('#searchPage').val()) + 1;
        }    
        

        if(totalPages>1) {

            $('#pagination').twbsPagination({
                startPage:searchPage,
                totalPages: totalPages,
                visiblePages: 3,
                first:'&laquo;',
                prev :'&lsaquo;',
                next : '&rsaquo;',
                last :'&raquo;',
                onPageClick: function (event, page) {                             
               
                    if ($('#resultSearch').val() == 1) {
                        $('#searchPage').val(page - 1);
                        $('#custom-search-form').submit();
                    } else {
                        loadNews(page, 'paging');
                    }                
                }
            });
           
        } else {
           
            $('#pagination').empty();
            $('#pagination').removeData("twbs-pagination");
            $('#pagination').unbind("page");
         
        }      
    }
        
    function pagination2() {

        var itemTotal = $('#itemTotal').val();
        var itemPerPage = $('#itemPerPage').val();

        var modulusPage = itemTotal % itemPerPage > 0 ? 1 : 0;
        var totalPages = parseInt(itemTotal / itemPerPage) + modulusPage;

        var shortUri = $('#shortUri').val();
        var searchPage = 1;
        if ($('#resultSearch').val() == 1) {
            searchPage = parseInt($('#searchPage').val()) + 1;
        }

        if(totalPages>1) {
            
            $('.pagination-container').bootpag({
                total: totalPages,
                page: searchPage,
                maxVisible: 10
            }).on('page', function(event, num) {
                if ($('#resultSearch').val() == 1) {
                    $('#searchPage').val(num - 1);
                    $('#custom-search-form').submit();
                } else {
                    loadNews(num, 'paging');
                }
            });
        } 
    }

    function loadNews(page, type) {
        console.log(currentSection)
        
        $.ajax({
            url: shortUri + currentSection + '.' + page + '.html',
            dataType: 'json',
            success: function(result) {
                $('#content').html(result);              

                if (type == 'loadTab') {
                    if ($('#itemTotal').val() > 0) {                    
                        pagination();
                    } else {                        
                        $('#pagination').empty();
                        $('#pagination').removeData("twbs-pagination");
                        $('#pagination').unbind("page");
                    }

                }
            }
        });
    }

});