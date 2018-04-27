(function ($) {
    $(document).ready(function(){
        var contentHeight = $('#main-panel').height();
        $('#side-nav').height(contentHeight);
        //判断移动端
        $(window).resize(function () {
            var width = $(window).width();
            if (width < 768) {
                $('#side-nav').height('auto');
            }
        });
        //按钮初始化
        var elem = document.querySelector('.fixed-action-btn');
        M.FloatingActionButton.init(elem);

        //工具提示
        var tooltipped = document.querySelector('.tooltipped');
        M.Tooltip.init(tooltipped);

        //返回顶部
        var showScrollToTop = 0,
            scroll_top_duration = 700;
        $(window).on('scroll', function () {
            var y_scroll_pos = window.pageYOffset;
            var scroll_pos_test = 450;
            if (y_scroll_pos > scroll_pos_test && showScrollToTop === 0) {
                $('.material-scroll-to-top').fadeIn();
                showScrollToTop = 1;
            }
            if (y_scroll_pos < scroll_pos_test && showScrollToTop === 1) {
                $('.material-scroll-to-top').fadeOut();
                showScrollToTop = 0;
            }
        });
        //smooth scroll to top
        $('.material-scroll-to-top').on('click', function (event) {
            event.preventDefault();
            $('body,html').animate({
                    scrollTop: 0,
                    behavior: 'smooth'
                }, scroll_top_duration
            );
        });
    });
})(jQuery);
