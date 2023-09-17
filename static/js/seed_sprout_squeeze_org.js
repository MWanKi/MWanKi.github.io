var queryString = window.location.search;
queryString = queryString.substring(1);

var params = {};
var paramPairs = queryString.split('&');
for (var i = 0; i < paramPairs.length; i++) {
    var pair = paramPairs[i].split('=');
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1]);
    params[key] = value;
}

let html_title = '밍잔 | ';
let course_name = '';
let course_detail = '';
let img_src = '';
let tag = '';

$(function () {
    // 이미 제출한 이력이 있는 경우 바로 시청 페이지로 이동
    if (localStorage.getItem('has_submitted_seed_sprout') == "true") {
        location.href = "./c2VlZF9zcHJ.html?course_id=f1st";
    }

    var name = $('#name').val();
    var email = $('#email').val();

    if (name.length) {
        $('#name').parent().addClass('hasValue');
        return;
    }

    if (email.length) {
        $('#email').parent().addClass('hasValue');
        return;
    }

    function showLoading() {
        $('i.fa-spinner').css({ 'display': 'inline-block' });
        $('i.fa-ticket').hide();
    }

    function hideLoading() {
        $('i.fa-spinner').hide();
        $('i.fa-ticket').css({ 'display': 'inline-block' });
    }

    $('#contact-form').submit(function (e) {
        e.preventDefault();
        if ($('#contact-form button').hasClass('disabled')) {
            return;
        }

        showLoading();

        var name = $('#name').val();
        if (!name) {
            $('#name').focus();
            hideLoading();
            return;
        }

        var email = $('#email').val();
        if (!email) {
            $('#email').focus();
            hideLoading();
            return;
        }

        if (name.length && email.length) {
            $('#contact-form button').attr('disabled', 'disabled');
            $('#contact-form button').addClass('disabled');

            $.ajax({
                url: "https://script.google.com/macros/s/AKfycbznmuRLAH6hr_pVDHSFDDkUE5Z0wK_2y_ZCaJAn2UzIgc2MtLeEafXSUrwbdPmFUyKG/exec",
                data: {
                    name: name,
                    email: email,
                    tag: 'seed_sprout',
                },
                type: "POST",
                success: function (data) {
                    hideLoading();
                    location.href = "./c2VlZF9zcHJ.html?course_id=f1st";

                    // 로컬 스토리지에 저장
                    localStorage.setItem('has_submitted_seed_sprout', 'true');
                },
                error: function (request, status, error) {
                    console.log('Error');
                    hideLoading();
                    alert("문제가 발생했습니다. @mingzan.dev로 DM주세요!")
                }
            });
        }
    });

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

    // 현재 시간 구하기
    var now = new Date();

    // 현재 시간으로부터 1~5분 뒤 랜덤으로 구하기
    var random = Math.floor(Math.random() * 5) + 1;
    var randomTime = new Date(now.getTime() + random * 60000);

    // 분이 0으로 끝나지 않으면 0으로 끝나게 올림
    if (randomTime.getMinutes() % 10 != 0) {
        randomTime.setMinutes(randomTime.getMinutes() + (10 - randomTime.getMinutes() % 10));
    }

    // 1초씩 카운트다운해서 적용하기
    var timer = setInterval(function () {
        var now = new Date();
        var diff = randomTime - now;

        var hour = Math.floor(diff / 1000 / 60 / 60);
        var min = Math.floor(diff / 1000 / 60) % 60;
        var sec = Math.floor(diff / 1000) % 60;

        // 2자리수로 변경
        hour = hour < 10 ? '0' + hour : hour;
        min = min < 10 ? '0' + min : min;
        sec = sec < 10 ? '0' + sec : sec;

        $('.box-hour .box-value').text(hour);
        $('.box-min .box-value').text(min);
        $('.box-sec .box-value').text(sec);

        // .txt-time에 randomTime 시:분 넣기
        let minute = randomTime.getMinutes();
        // 2자리수로 변경
        minute = minute < 10 ? '0' + minute : minute;
        var time = randomTime.getHours() + ':' + minute;
        $('.txt-time').text(time);

        // txt-ampm에 오전 오후 넣기
        var ampm = now.getHours() < 12 ? 'AM' : 'PM';
        $('.txt-ampm').text(ampm);


        if (diff <= 0) {
            clearInterval(timer);
            $('.box-hour .box-value').text('00');
            $('.box-min .box-value').text('00');
            $('.box-sec .box-value').text('00');
        }
    }, 1000);
})