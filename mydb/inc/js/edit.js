$(document).ready(function() {
    //init raiting stars
    $('#popup_star').raty({ 
        path: '/static/img', 
        half: true, 
        width: false, 
        space: false,
        score: function() {
            return $(this).attr('data-score')/2;
        },
        click: function(score, evt) {
            $('#id_rating').val(score*2);
        }
    });

    $('.close').click(function() { 
        var scrollPos = $(window).scrollTop();
        $('[id^=popup-box]').hide(); 
        $('.error-message').hide();
        $('#blackout').hide(); 
        $("html,body").css("overflow","auto");
        $('html').scrollTop(scrollPos);
    });
    $('#no').click(function(e) {
        //prevent form submitting and hide popup 
        e.preventDefault();
        e.stopPropagation();
        var scrollPos = $(window).scrollTop();
        $('[id^=popup-box]').hide(); 
        $('.error-message').hide();
        $('#blackout').hide(); 
        $("html,body").css("overflow","auto");
        $('html').scrollTop(scrollPos);
    });
});