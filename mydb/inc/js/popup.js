$(document).ready(function() {

    //div for grey background when popup is visible
    $('body').append('<div id="blackout"></div>');
    
    $(window).resize(centerBox);
    $(window).scroll(centerBox);
    centerBox();    

    $('[class*=popup-link]').click(function(e) {
    
        //prevent default actions
        e.preventDefault();
        e.stopPropagation();
        
        //get the method nad pk
        var method = $(this).attr('data-method');
        var pk = $(this).parent().siblings('input').val();
        var scrollPos = $(window).scrollTop();
        

        //show the correct popup box, show the blackout and disable scrolling
        $('#blackout').show();
        $('html,body').css('overflow', 'hidden');
        if (method == 'delete') {
            $('#popup-box').show();
            var title = $(this).parent().siblings('.title').text();
            $('.top h2 i').text(title);
            $('#popup-box').attr('data-pk', pk);
        }
        if (method == 'edit') {
            $('#popup-box-edit').show();
            $('#popup-box-edit').load('/titles/' + pk);
        }
        if (method == 'create') {
            $('#popup-box-edit').show();
            $('#popup-box-edit').load('/titles/add');
        }
        //fixes a bug in Firefox
        $('html').scrollTop(scrollPos);
    });
    $('.popup-box').click(function(e) {
        e.stopPropagation(); 
    });
    $('html').click(function() { 
        hidePopup();
    });
    $('.close').click(function() { 
        hidePopup();
    });
    $('#no').click(function(e) { 
        e.preventDefault();
        e.stopPropagation();
        hidePopup();
    });

    $('#delete-selected').click(function(e) {
        //collect all selected titles
        var allVals = [];
        $('input[name="element"]:checked').each(function() {
            allVals.push($(this).val());
        });
        //ajax query
        deleteMultipleTitles(allVals);
    });
    
    $('#delete').click(function(e) {
        var pk = $('#popup-box').attr('data-pk');
        deleteTitle(pk);
    });

});

function centerBox() {
    var boxWidth = 400;
    //preliminary information
    var winWidth = $(window).width();
    var winHeight = $(document).height();
    var scrollPos = $(window).scrollTop();
    
    //calculate positions
    var disWidth = (winWidth - boxWidth) / 2;
    var disHeight = scrollPos + 150;
    
    //move stuff
    $('.popup-box').css({'width' : boxWidth+'px', 'left' : disWidth+'px', 'top' : disHeight+'px'});
    $('#blackout').css({'width' : winWidth+'px', 'height' : winHeight+'px'});

    return false;
}

function hidePopup() {
    var scrollPos = $(window).scrollTop();
    //hHide the popup and blackout when clicking outside the popup
    $('[id^=popup-box]').hide(); 
    $('.error-message').hide();
    $('#blackout').hide(); 
    $("html,body").css("overflow","auto");
    $('html').scrollTop(scrollPos);
};

//functions for csrf_token
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');

function deleteTitle(pk) {
    $.ajax({
        url: '/titles/' + pk + '/delete/',
        data: pk,
        type: 'POST',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
        },
        success: function(result) {
            //hide popup and remove selected title from the page without reload
            var row_to_remove = $("input[type='checkbox'][value='" + pk + "']").parent();
            row_to_remove.hide('slow', function(){ row_to_remove.remove();});
            hidePopup();
        },
        error: function(result) {
            $('.error-message').show();
        }
    });
};

function deleteMultipleTitles(allVals) {
    var jsonText = JSON.stringify(allVals);
    $.ajax({
        url: '/titles/delete_selected/',
        data: jsonText,
        type: 'POST',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
        },
        success: function(result) {
            //hide popup and remove titles from the page without reload
            
            $.each(allVals, function() {
                var row_to_remove = $("input[type='checkbox'][value='" + this + "']").parent();
                row_to_remove.hide('slow', function(){ row_to_remove.remove();});
            }); 
             
            hidePopup();
        },
        error: function(result) {
            //show error if there is some error
            $('.error-message').show();
        }
    });
};