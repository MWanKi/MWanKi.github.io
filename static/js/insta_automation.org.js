
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

function isOutsider() {
    let referrer = document.referrer;
    alert(referrer)
    let outsider = true;

    // referrer에 30945536이 있는지 체크
    if (referrer.indexOf('30945536') > -1) {
        return false;
    }

    return outsider;
}


function blockPage() {
    $('.box-input-password').remove();
    $('.box-title').remove();
    $('.video-container-new').remove();
    $('.box-next-video').remove();
    $('.box-content').append('<h1 style="padding: 40px 0; text-align:center;">403 Forbidden<br/><br/>잘못된 접근입니다.</h1><p style="text-align:center; font-size:13px;">이 페이지를 다시 보시려면 <br/>네이버 카페 커리큘럼 링크를 통해 접속해주세요.</p>');
}

function checkPlayTime() {
    var player = new Vimeo.Player($("#player")[0]);
    var currentPos, percentage, vdoEndTym = "";

    player.on('timeupdate', function (getAll) {
        currentPos = getAll.seconds;
        vdoEndTym = getAll.duration;
        percentage = (getAll.percent * 100);

        if (percentage > 80) {
            $('.box-next-video').fadeIn();
        } else {
            $('.box-next-video').fadeOut();
        }
    });
}

function loadVideo(id) {
    $('.box-input-password').remove();
    $('.box-title').show();
    let content = videoEmbedCodeGen(id);
    $('.video-container-new').html(content);
    $('.video-container-new').show();

    try {
        checkPlayTime();
    } catch (e) {
        console.log(e);
    }
}

function videoEmbedCodeGen(id) {
    let videoData = {
        '1': '883305389',
        '2': '',
        '3': '',
        '4': '',
    }
    let result = `<div style="padding:56.25% 0 0 0;position:relative;"><iframe id="player" src="https://player.vimeo.com/video/` + videoData[id] + `?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen frameborder="0" style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div>`
    return result;
}

$(function () {
    if (params.course_id == null || isOutsider()) {
        // blockPage();
        return;
    }

    history.pushState(null, null, './insta_automation.html');

    $('input').focus(function () {
        $(this).parent().addClass('elInputFocused');
    });

    $('input').blur(function () {
        $(this).parent().removeClass('elInputFocused');

        if ($(this).val().length) {
            $(this).parent().addClass('hasValue');
        } else {
            $(this).parent().removeClass('hasValue');
        }
    });

    loadVideo($('.btn-load-video').eq(0));

    switch (params.course_id) {
        case "f1st":
            $('.video-container').append(videoEmbedCodeGen('1'));
            break;
        case "s2nd":
            $('.video-container').append(videoEmbedCodeGen('2'));
            break;
        case "t3rd":
            $('.video-container').append(videoEmbedCodeGen('3'));
            break;
        case "f4th":
            $('.video-container').append(videoEmbedCodeGen('4'));
            break;
        default:
            blockPage();
            break;
    }
})

$(document).on('click', '#btn-manychat', function (e) {
    e.preventDefault();

    // 새창에서 열기
    window.open('https://cafe.naver.com/incomefunnel?iframe_url=/ArticleList.nhn%3Fsearch.clubid=30945536%26search.menuid=23%26search.boardtype=L', '_blank');
    return false;
});


$(document).on('submit', '#password-form', function (e) {
    e.preventDefault();

    var password = $('#password').val();
    if (!password) {
        $('#password').focus();
        return;
    }

    // base64 encoding
    // 1일차 : 4475890759 => NDQ3NTg5MDc1OQ==
    // 2일차 : 0018655121 => MDAxODY1NTEyMQ==
    // 3일차 : 5898052114 => NTg5ODA1MjExNA==
    // 네이버 후기 : 9677347197 => OTY3NzM0NzE5Nw==
    switch (btoa(password)) {
        case "NDQ3NTg5MDc1OQ==":
            loadVideo('1');
            break;
        case "MDAxODY1NTEyMQ==":
            loadVideo('2');
            break;
        case "NTg5ODA1MjExNA==":
            loadVideo('3');
            break;
        case "OTY3NzM0NzE5Nw==":
            loadVideo('4');
            break;
        default:
            alert('비밀번호가 틀렸습니다.');
            break;
    }
});