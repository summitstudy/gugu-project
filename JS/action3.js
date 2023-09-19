let timerInterval;
let timeset = 150; //이 값은 스테이지별로 수정될 수 있어야한다.
let timeLeft;
let x, y, z, w, step = 0; //step은 단계내의 단계를 나타내는 듯
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
        if (step < 5) {
            checkAnswer(); // check 함수를 호출하면서 동시에 타이머 초기화
        }
    }
}
function mux() { //모든 변수 값 재설정 하는 부분
    var questionElem = document.getElementById("question");

    if (step < 5) {
        x = Math.floor(Math.random() * 9) + 1;
        y = Math.floor(Math.random() * 4) + 2;
        z = Math.floor(Math.random() * 9) + 1;
        w = Math.floor(Math.random() * 4) + 2;
        questionElem.classList.remove("fadeInUpText");
        void questionElem.offsetWidth;
        questionElem.classList.add("fadeInUpText");

        questionElem.innerText = x + " X " + y + " X " + z + " X " + w + " = ?";
        setTimeout(() => {
            questionElem.classList.remove("fadeInUpText");
        }, 500);
        startTimer();
        updateStepDisplay(1);
    } else {
        timeCheck = 1;
        updateStepDisplay(1);
        setTimeout(function () {
            console.log("This message will be logged after 2 seconds");
            var upstage = confirm("와우~! 게임 클리어🤩 결산 페이지로 이동합니다.");
            if (upstage) {
                goToNextPage_load('final.html');
            } else {
                reset_hamsu();
            }
        }, 250);
    }
}

async function checkAnswer() { //정답을 맞췄을 때와 틀렸을 때
    var A = document.getElementById("input").value * 1;
    console.log(A);
    document.getElementById("input").value = "";

    if (x * y * z * w === A) {
        console.log("Correct");
        document.body.style.backgroundColor = "#e2f3ea";
        step++;
        increasepoint();
        mux(); // startTimer 함수가 끝난 후에 mux 함수를 실행
    }
    else {
        let currentHearttmp = parseInt(getQueryStringValue("hearts")) || 0;
        if (currentHearttmp == 1) {
            ending_hamsu();
        } else {
            console.log("Incorrect");
            var retry = confirm("💔틀렸습니다. 하트-1점 \n재시도 하시겠습니까?");
            if (retry) {
                decreaseHeartCount(); // 바로 하트를 차감하고 화면에 반영
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