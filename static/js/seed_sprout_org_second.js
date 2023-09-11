let queryString = window.location.search;
let durationChecker;
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
    $('.box-vod-content').remove();
    $('.box-content').append('<h1 style="padding: 40px 0; text-align:center;">403 Forbidden<br/><br/>잘못된 접근입니다.</h1><p style="text-align:center; font-size:13px;">이 페이지를 다시 보시려면 <br/>보내드린 이메일 링크를 통해 접속해주세요.</p>');
}


function removeComingSoon(eq) {
    for (let i = 0; i < eq; i++) {
        $('.ul-lecture-new').find('> li').eq(i).removeClass('li-coming-soon');
    }
}

function videoEmbedCodeGen(id) {
    let videoData = {
        '1': '848213500',
        '2': '848399755',
        '3': '848618400',
        '4': '848669011',
    }
    let result = `<div style="padding:56.25% 0 0 0;position:relative;"><iframe id="player" src="https://player.vimeo.com/video/` + videoData[id] + `?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen frameborder="0" style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div>`
    return result;
}

$(function () {
    if (params.course_id == null) {
        blockPage();
        return;
    }

    switch (params.course_id) {
        case "f5th":
            removeComingSoon(1);
            loadVideo($('.btn-load-video').eq(0));
            break;
        case "s6th":
            removeComingSoon(2);
            loadVideo($('.btn-load-video').eq(1));
            break;
        case "s7th":
            removeComingSoon(3);
            loadVideo($('.btn-load-video').eq(2));
            $('.box-next-video').css({ 'display': 'block' });
            break;
        case "e8th":
            removeComingSoon(4);
            loadVideo($('.btn-load-video').eq(3));
            break;
        default:
            blockPage();
            break;
    }

    history.pushState(null, null, './cNAslEinSVe.html');

    function loadVideo(a) {
        if (a.parent().hasClass('li-coming-soon')) {
            alert('다음 강의는 이메일로 발송됩니다.');
            return;
        }
        clearInterval(durationChecker);
        $('.txt-vod-title').text(a.find('.txt-title').text());
        $('.ul-lecture-new li a').removeClass('active');
        a.addClass('active');
        let eq = a.parent().index() + 1;
        let content = videoEmbedCodeGen(eq);
        $('.box-next-video').hide();
        $('.video-container-new').html(content);
        $('html, body').animate({ scrollTop: 0 }, 'fast');

        try {
            if (params.course_id == "e8th" ||
                params.course_id == "s7th" ||
                params.course_id == "s6th") {
                checkPlayTime();
            }
        } catch (e) {
            console.log(e);
        }
    }

    $('.btn-load-video').click(function () {
        loadVideo($(this));
        return false;
    })

    $('.box-next-video button').click(function () {
        try {
            let nextLi = $('.ul-lecture-new li a.active').parent().next();

            if (nextLi.length == 0) {
                alert('다음 강의는 이메일로 발송됩니다. 메일함을 확인해주세요!')
                return;
            }

            nextLi.removeClass('li-coming-soon');
            let next = nextLi.find('a');
            loadVideo(next);
        } catch (e) {
            console.log(e);
        }

        return false;
    })

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
})