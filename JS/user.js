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
        location.href = 'selectpage.html?nickname=' + encodeURIComponent(nickname) + '&hearts=3&points=0';
    }
}
function goToNextPage_load(gotopage) { //페이지 URL을 지속하는 함수
    var nickname = getQueryStringValue("nickname");
    var hearts = getQueryStringValue("hearts");
    var points = getQueryStringValue("points");
    location.href = gotopage + '?nickname=' + encodeURIComponent(nickname) + '&hearts=' +
        encodeURIComponent(hearts) + '&points=' + encodeURIComponent(points);
}

function getQueryStringValue(key) { //URL파라미터에서 값을 가져오는 함수
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
}

window.addEventListener('load', function () { //하트 세팅
    const heartCount = getQueryStringValue("hearts");
    updateHearts(heartCount);
});

/*세부 사항*/
window.addEventListener('load', function () { //맨 처음 인사 함수
    var nickname = getQueryStringValue("nickname");
    var points = getQueryStringValue("points");
    if (nickname) {
        typeEffect("😀안녕, " + nickname + "!" + " 컴퓨터교육과 웹서비스에 온 걸 환영해!");
    }
    if (document.getElementById('nickname-box') !== null) {
        document.getElementById('nickname-box').textContent = nickname;
    }
    if (document.getElementById('point-box') !== null) {
        document.getElementById('point-box').textContent = points;
    }
});
function typeEffect(str) {
    var i = 0;
    var teacherBox = document.getElementById('teacher-box-id');
    var typingInterval = setInterval(function () {
        if (i < str.length) {
            teacherBox.textContent += str.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
        }
    }, 50);
}
function increasepoint() {
    let currentPoints = parseInt(getQueryStringValue("points")) || 0;
    currentPoints += timeLeft * 10;
    const currentNickname = getQueryStringValue("nickname");
    const currentHeartCount = parseInt(getQueryStringValue("hearts"));
    const pointBox = document.getElementById('point-box');
    if (pointBox !== null) {
        pointBox.textContent = currentPoints;

        // 금색 그라데이션과 크기 변화 애니메이션 적용
        pointBox.classList.add('gold-and-scale-text-animation');

        // 애니메이션이 끝나면 클래스 제거
        pointBox.addEventListener('animationend', function () {
            pointBox.classList.remove('gold-and-scale-text-animation');
        }, { once: true });
    }
    // URL에 반영하려면, history API를 사용할 수 있습니다:
    const newURL = window.location.pathname + `?nickname=${currentNickname}&hearts=${currentHeartCount}&points=${currentPoints}`;
    history.pushState({}, '', newURL);

    return currentPoints;
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
function updateStepDisplay(state) {
    let stepElem = document.getElementById("stepDisplay");
    if (state == 1) {
        if (step > 0) {
            stepElem.innerText = step + " 문제 성공!🥳";
            stepElem.classList.add("celebrate");
            setTimeout(() => {
                stepElem.classList.remove("celebrate");
            }, 1000);
        } else {
            stepElem.innerText = "화이팅!😀";
        }
    } else if (state == 2) {
        stepElem.innerText = "할 수 있어🔥";
        stepElem.classList.add("celebrate");
        setTimeout(() => {
            stepElem.classList.remove("celebrate");
        }, 1000);
    }
}
function ending_hamsu() {
    document.getElementById("input").value = "";
    x = y = -10000;
    decreaseHeartCount();
    document.body.style.backgroundColor = "#EDC6C6";
    let stepElem = document.getElementById("stepDisplay");
    stepElem.classList.remove("celebrate");
    void stepElem.offsetWidth;  // Force a reflow by the browser
    stepElem.innerText = "게임 종료👏 💔남은 하트가 없습니다.";
    stepElem.classList.add("celebrate");
    setTimeout(() => {
        stepElem.classList.remove("celebrate");
    }, 1000);
    setTimeout(function () {
        alert("📢: 결산 화면으로 이동합니다.");
        goToNextPage_load('final.html');
    }, 500);
}
function reset_hamsu() {
    var nickname = getQueryStringValue("nickname");
    alert("초기화면으로 돌아갑니다.");
    location.href = 'selectpage.html?nickname=' + encodeURIComponent(nickname) + '&hearts=3' + '&points=0';
}
let timeCheck = 0;
async function startTimer() { //비동기 타이머 부분
    clearInterval(timerInterval);
    timeLeft = timeset;
    function updateTimer() {
        if (timeLeft >= 0) {
            document.getElementById("timer").textContent = "⏰" + (timeLeft / 10).toFixed(1) + "초";
            timeLeft--;
        } else if(timeCheck == 0) {
            document.getElementById("input").value = "";
            clearInterval(timerInterval);
            let currentHearttmp = parseInt(getQueryStringValue("hearts")) || 0;
            decreaseHeartCount(); // 바로 하트를 차감하고 화면에 반영
            if (currentHearttmp <= 1) {
                ending_hamsu();
            } else {
                alert("💔시간이 초과되었습니다. 하트-1점");
                var retry = confirm("재시도 하시겠습니까?");
                if (retry) {
                    document.getElementById("input").value = "";
                    document.body.style.backgroundColor = "#FAE0D4";
                    mux();
                    updateStepDisplay(2);
                }
                else {
                    reset_hamsu();
                }
            }
        }
    }
    updateTimer();
    return new Promise((resolve) => {
        timerInterval = setInterval(() => {
            updateTimer();
            if (timeLeft < 0) resolve(); // 타이머가 끝나면 Promise를 resolve
        }, 100);
    });
}
