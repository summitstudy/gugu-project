let timerInterval;
let timeLeft;
let x, y, step = 0;
let timeset = 100; //시간초 설정
function mux() {
    var questionElem = document.getElementById("question");

    if (step < 10000) {
        x = Math.floor(Math.random() * 9) + 1; //난수 설정
        y = Math.floor(Math.random() * 9) + 1; //난수 설정

        questionElem.classList.remove("fadeInUpText");
        void questionElem.offsetWidth;
        questionElem.classList.add("fadeInUpText");

        questionElem.innerText = x + " X " + y + " = ?";
        setTimeout(() => {
            questionElem.classList.remove("fadeInUpText");
        }, 500);
        startTimer();
        updateStepDisplay(1);
    } else {
        updateStepDisplay(1);
        setTimeout(function () {
            console.log("This message will be logged after 2 seconds");
            var upstage = confirm("1단계 성공🎇 더 높은 단계에 도전하시겠습니까?");
            if (upstage) {
                goToNextPage_load('secondstage.html');
            } else {
                reset_hamsu();
            }
        }, 250);
    }
}
function startGame() { //셋팅
    document.getElementById("btn").style.display = "none";
    document.getElementById("input").style.display = "block";
    document.getElementById("descriptionBox").style.display = "none";
    clearInterval(timerInterval);
    startTimer();
    mux();
}
window.onkeypress = function (e) {
    var inputElem = document.getElementById("input");
    inputElem.focus();
    if (e.keyCode === 13 && inputElem.value !== "") {
        if (step < 10000) {
            checkAnswer(); // check 함수를 호출하면서 동시에 타이머 초기화
        }
    }
}
async function checkAnswer() { //정답을 맞췄을 때와 틀렸을 때
    var A = document.getElementById("input").value * 1;
    console.log(A);
    document.getElementById("input").value = "";

    if (x * y === A) {
        console.log("Correct");
        step++;
        increasepoint();
        mux(); // startTimer 함수가 끝난 후에 mux 함수를 실행
    }
    else {
        let currentHearttmp = parseInt(getQueryStringValue("hearts")) || 0;
        if (0) {
        } else {
            console.log("Incorrect");
            var retry = confirm("💔틀렸습니다. 하트-1점 \n재시도 하시겠습니까?");
            if (retry) {
                decreaseHeartCount(); // 바로 하트를 차감하고 화면에 반영
                mux();
                updateStepDisplay(2);
            }
            else {
                reset_hamsu();
            }
        }
    }
}
function goToNextPage_reset(gotopage) { //페이지 URL을 지속하는 함수
    var nickname = getQueryStringValue("nickname");
    location.href = gotopage + '?nickname=' + encodeURIComponent(nickname) + '&hearts=3' + '&points=0';
}
