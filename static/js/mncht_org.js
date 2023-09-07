let queryString = window.location.search;
queryString = queryString.substring(1);
let params = {};
let paramPairs = queryString.split('&');

for (let i = 0; i < paramPairs.length; i++) {
    let pair = paramPairs[i].split('=');
    let key = decodeURIComponent(pair[0]);
    let value = decodeURIComponent(pair[1]);
    params[key] = value;
}


function blockPage() {
    $('.box-input-password').remove();
    $('.box-title').remove();
    $('.video-container-new').remove();
    $('.box-next-video').remove();
    $('.box-content').append('<h1 style="padding: 40px 0; text-align:center;">403 Forbidden<br/><br/>잘못된 접근입니다.</h1><p style="text-align:center; font-size:13px;">이 페이지를 다시 보시려면 <br/>보내드린 이메일 링크를 통해 접속해주세요.</p>');
}


let durationChecker;

function videoEmbedCodeGen() {
    return `<div style="padding:56.25% 0 0 0;position:relative;"><iframe id="player" src="https://player.vimeo.com/video/862089809?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen frameborder="0" style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div>`;
}

$(function(){
    if (params.course_id == null) {
        blockPage();
        return;
    }

    $('input').focus(function() {
        $(this).parent().addClass('elInputFocused');
    });

    $('input').blur(function() {
        $(this).parent().removeClass('elInputFocused');

        if ($(this).val().length) {
            $(this).parent().addClass('hasValue');
        } else {
            $(this).parent().removeClass('hasValue');
        }
    });

    loadVideo($('.btn-load-video').eq(0));

    function loadVideo(a) {
        if (a.parent().hasClass('li-coming-soon')) {
            alert('이전 강의를 먼저 시청하세요.');
            return;
        }
        clearInterval(durationChecker);
        let content = videoEmbedCodeGen();
        $('.video-container-new').html(content);

        if (params.offer == "ns") {
            $('html, body').animate({scrollTop:$('#nextStep').offset().top}, 'fast');
        } else {
            $('html, body').animate({scrollTop:0}, 'fast');
        }
    }

    $('#btn-manychat').click(function(){
        location.href = 'https://forms.gle/rHNd9WqFeiLse6UVA';
        return;
    });
    
    $('#password-form').submit(function (e) {
        e.preventDefault();

        var password = $('#password').val();
        if (!password) {
            $('#password').focus();
            return;
        }

        if (password === 'mncht0907') {
            $('.box-input-password').remove();
            $('.box-title').show();
            $('.video-container-new').show();
            $('.box-next-video').show();
            loadVideo($('.btn-load-video').eq(0));

        } else {
            alert('비밀번호가 틀렸습니다.');
        }
    });
})