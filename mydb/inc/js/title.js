$(document).ready(function() {

    $( document ).tooltip({
        position: {
            my: "center bottom-5",
            at: "center top"
      }
    });

    //actions for sorting buttons
    if(window.location.href.indexOf("sorted/year") > -1) // This doesn't work, any suggestions?
    {
        $('#sort-year').addClass('selected');
        $('#sort-year').removeClass('disabled');
        $('#sort-title').addClass('disabled');
    }

    $('#sort-year').click(function() {
        window.location = '/sorted/year/';
    });

    $('#sort-title').click(function() {
        window.location = '/';
    });

    //init raiting stars
    $('.star').raty({ 
        path: '/static/img', 
        half: true, 
        width: false, 
        space: false,
        score: function() {
            return $(this).attr('data-score')/2;
        },
        click: function(score, evt) {
            var pk = $(this).siblings('input').val();
            var data = [pk, score*2];
            var jsonText = JSON.stringify(data);
            updateRating(jsonText);
        }
    });

    //select/uncheck all checkboxes
    $('#select-all').click(function() {
        if ($(this).hasClass('selected')) {
            $('.table-row input:checkbox').prop('checked', false);
            $(this).text('Select all');
            $(this).removeClass('selected');
        } else {
            $('.table-row input:checkbox').prop('checked', true);
            $(this).text('Uncheck all');
            $(this).addClass('selected');
        }
    });
});

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
};

var csrftoken = getCookie('csrftoken');

function updateRating(pk_and_score) {
    $.ajax({
        url: '/titles/update_rating/',
        data: pk_and_score,
        type: 'POST',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
        },
        error: function(result) {
            alert("Some error occurred. Please try later.");
        }
    });
};