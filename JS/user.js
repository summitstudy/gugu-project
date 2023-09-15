function updateHearts(heartCount) { 
    const heartContainer = document.getElementById('hearts');
    let hearts = "";
    for (let i = 0; i < heartCount; i++) {
        hearts += "❤️";
    }
    heartContainer.textContent = hearts;
}
function goToNextPage_set() { //페이지 URL을 세팅하는 함수
    var nickname = document.getElementById("nicknameInput").value;
    if (nickname === "") {
        alert("닉네임을 입력해주세요!");
    } else {
        location.href = 'selectpage.html?nickname=' + encodeURIComponent(nickname) + '&hearts=5&points=0';
    }
}
function goToNextPage_load() { //페이지 URL을 지속하는 함수
    var nickname = getQueryStringValue("nickname");
    var hearts = getQueryStringValue("hearts");
    var points = getQueryStringValue("points");
    location.href = 'firststage.html?nickname=' + encodeURIComponent(nickname) + '&hearts='+
    encodeURIComponent(hearts)+'&points='+encodeURIComponent(points);
}

function getQueryStringValue(key) { //URL파라미터에서 값을 가져오는 함수
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
}

window.addEventListener('load', function() { //하트 세팅
    const heartCount = getQueryStringValue("hearts");
    updateHearts(heartCount);
});

/*세부 사항*/
window.addEventListener('load', function() { //맨 처음 인사 함수
    var nickname = getQueryStringValue("nickname");
    if (nickname) {
        typeEffect("😀안녕, " + nickname + "!" + " 컴퓨터교육과 웹서비스에 온 걸 환영해!");
    }
});
function typeEffect(str) {
    var i = 0;
    var teacherBox = document.getElementById('teacher-box-id');
    var typingInterval = setInterval(function() {
        if (i < str.length) {
            teacherBox.textContent += str.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval); 
        }
    }, 50); 
}

function decreaseHeartCount() {
    const currentNickname = getQueryStringValue("nickname");
    const currentPoints = getQueryStringValue("points");

    let currentHeartCount = parseInt(getQueryStringValue("hearts")) || 0; // 기본값 0 추가
    currentHeartCount = (currentHeartCount > 0) ? currentHeartCount - 1 : 0;
    updateHearts(currentHeartCount); // 화면에 바로 하트를 업데이트

    const heartContainer = document.getElementById('hearts');
    heartContainer.classList.add('animatedHeart'); // 애니메이션 클래스 추가

    // 애니메이션이 끝난 후 클래스를 제거하여 다음번 애니메이션을 위해 준비
    heartContainer.addEventListener('animationend', () => {
        heartContainer.classList.remove('animatedHeart');
    });

    // URL에 반영하려면, history API를 사용할 수 있습니다:
    const newURL = window.location.pathname + `?nickname=${currentNickname}&hearts=${currentHeartCount}&points=${currentPoints}`;
    history.pushState({}, '', newURL);

    return currentHeartCount;
}
