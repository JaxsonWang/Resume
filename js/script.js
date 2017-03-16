/**
 * Created by wangjin on 2016/11/27.
 */
//返回顶部
$('.back2top').hide();
$(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
        $('.back2top').fadeIn(200)
    } else {
        $('.back2top').fadeOut(200)
    }
    if ($(this).scrollTop() > 360) $('#index').addClass('fix');
    else $('#index').removeClass('fix');
});
$('.back2top').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 400);
    return false
});