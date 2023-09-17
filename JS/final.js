window.addEventListener('load', function () {
    var nickname = getQueryStringValue("nickname");
    var hearts = parseInt(getQueryStringValue("hearts"), 10);
    var points = parseInt(getQueryStringValue("points"), 10);
    var finalhearts = hearts * 1000;
    var finalpoints = finalhearts + points;

    if (nickname) {
        typeEffect(nickname + "님의 최종 점수😉\n" +
            "❤️" + hearts + " X " + "1000" + " = +" + finalhearts +
            "\n🪙 = +" + points, function () {
                // document.getElementById("final-points").style.display = "block";
                document.getElementById("final-points").innerText = finalpoints + "🎉";
                document.getElementById("final-points").classList.add("show");
                setTimeout(function () {
                document.getElementById("f-button").classList.add("show");
            }, 500);
            });
    }
});

function typeEffect(str, callback) {
    var i = 0;
    var teacherBox = document.getElementById('final-box-id');
    var typingInterval = setInterval(function () {
        if (i < str.length) {
            teacherBox.textContent += str.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
            callback();  // typingInterval이 종료된 후 콜백 함수를 호출
        }
    }, 50);
}
function getQueryStringValue(key) { //URL파라미터에서 값을 가져오는 함수
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
}
function goToNextPage_reset(gotopage) { //페이지 URL을 지속하는 함수
    var nickname = getQueryStringValue("nickname");
    location.href = gotopage + '?nickname=' + encodeURIComponent(nickname) + '&hearts=3' + '&points=0';
}