(function ($) {
    $(document).ready(function(){
        var contentHeight = $('#main-panel').height();
        $('#side-nav').height(contentHeight);

        $(window).resize(function () {
            var width = $(window).width();
            if (width < 768) {
                $('#side-nav').height('auto');
            }
        })
    });
})(jQuery);
