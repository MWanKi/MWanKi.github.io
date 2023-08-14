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
    $('.card').remove();
    $('.box-content').append('<h1 style="padding: 40px 0; text-align:center;">403 Forbidden<br/><br/>잘못된 접근입니다.</h1><p style="text-align:center; font-size:13px;">이 페이지를 다시 보시려면 <br/>보내드린 이메일 링크를 통해 접속해주세요.</p>');
}

function removeComingSoon(eq) {
    for (let i = 0; i < eq; i++) {
        $('.ul-lecture').find('> li').eq(i).removeClass('li-coming-soon');
    }
}

function videoEmbedCodeGen(id) {
    let result = `<div style="padding:75% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/`+id+`?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen frameborder="0" style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div>`
    return result;
}

$(function(){
    let videoData = {
        '1': '845025024',
        '2': '845331296',
        '3': '845946605',
        '4': '846887098',
        '5': '848213500',
        '6': '848399755',
        '7': '848618400',
        '8': '848669011',
        '9': '849151553',
        '10': '850776056',
        '11': '851335998',
        '12': '852216443',
        '13': '852618883',
        '14': '853320442',
        '15': '853364133',
        '16': '853705596',
    }

    if (params.course_id == null) {
        blockPage();
        return;
    } 

    switch(params.course_id) {
        case "f1st":
            $('.video-container').append(videoEmbedCodeGen('1'));
            removeComingSoon(1);
            break;
        case "s2nd":
            $('.video-container').append(videoEmbedCodeGen('1'));
            removeComingSoon(2);
            break;
        case "t3rd":
            $('.video-container').append(videoEmbedCodeGen('1'));
            removeComingSoon(3);
            break;
        case "f4th":
            $('.video-container').append(videoEmbedCodeGen('1'));
            removeComingSoon(4);
            break;
        case "f5th":
            $('.video-container').append(videoEmbedCodeGen('1'));
            removeComingSoon(5);
            break;
        case "s16th":
            $('.video-container').append(videoEmbedCodeGen('16'));
            removeComingSoon(16);
            break;
        default:
            blockPage();
            break;
    }

    history.pushState(null, null, './c2VlZF9zcHJvdXRfc2Vjb25kX3N0ZXA.html');

    $('.btn-load-video').click(function() {
        $('.ul-lecture li a').removeClass('active');
        $(this).addClass('active');
        if ($(this).parent().hasClass('li-coming-soon')) return;
        let eq = $(this).parent().index()+1;
        let content = videoData[eq];
        $('.video-container').html(content);
        $('html, body').animate({scrollTop:0}, 'fast');

        return false;
    })
})