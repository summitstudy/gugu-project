let timerInterval;
const timeset = 50;
let timeLeft = timeset;
let x, y, step = 0; //step은 단계내의 단계를 나타내는 듯
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
            timeLeft = timeset;
            checkAnswer(); // check 함수를 호출하면서 동시에 타이머 초기화
        }
    }
}
function updateStepDisplay() {
    let stepElem = document.getElementById("stepDisplay");

    if (step > 0) {
        stepElem.innerText = step + " 연속 성공!🥳";
        stepElem.classList.add("celebrate");
        setTimeout(() => {
            stepElem.classList.remove("celebrate");
        }, 1000);
    } else {
        stepElem.innerText = "화이팅!😀";
    }
}


function mux() { //모든 변수 값 재설정 하는 부분
    var questionElem = document.getElementById("question");

    if (step < 5) {
        x = Math.floor(Math.random() * 9) + 1;
        y = Math.floor(Math.random() * 9) + 1;

        questionElem.classList.remove("fadeInUpText");
        void questionElem.offsetWidth;
        questionElem.classList.add("fadeInUpText");

        questionElem.innerText = x + " X " + y + " = ?";
        setTimeout(() => {
            questionElem.classList.remove("fadeInUpText");
        }, 500);
        timeLeft = timeset;
        startTimer();
        updateStepDisplay();
    } else {
        var upstage = confirm("1단계 성공🎇 더 높은 단계에 도전하시겠습니까?");
        const currentHeartCount = getHeartCountFromURL();
        if (upstage) {
            location.href = 'secondstage.html?hearts=' + currentHeartCount;
        } else {
            location.href = 'open.html?hearts=' + currentHeartCount;
            alert("초기화면으로 돌아갑니다.");
        }
    }
}

async function checkAnswer() { //정답을 맞췄을 때와 틀렸을 때
    var A = document.getElementById("input").value * 1;
    console.log(A);
    document.getElementById("input").value = "";

    if (x * y === A) {
        console.log("Correct");
        document.body.style.backgroundColor = "#e2f3ea";
        step++;
        mux(); // startTimer 함수가 끝난 후에 mux 함수를 실행
        await startTimer(); // startTimer 함수를 비동기적으로 실행
    }
    else {
        console.log("Incorrect");
        var retry = confirm("💔틀렸습니다. 하트-1점 \n재시도 하시겠습니까?");
        if (retry) {
            decreaseHeartCount(); // 바로 하트를 차감하고 화면에 반영
            step = 0;
            document.body.style.backgroundColor = "#FAE0D4";
            mux();
            updateStepDisplay();
        }
        else {
            location.href = 'open.html';
            alert("초기화면으로 돌아갑니다.");
        }
    }
}

async function startTimer() { //비동기 타이머 부분
    clearInterval(timerInterval);
    timeLeft = timeset;

    function updateTimer() {
        if (timeLeft >= 0) {
            document.getElementById("timer").textContent = "⏰" + (timeLeft / 10).toFixed(1) + "초";
            timeLeft--;
        } else {
            clearInterval(timerInterval);
            alert("💔시간이 초과되었습니다. 하트-1점");
            var retry = confirm("재시도 하시겠습니까?");
            if (retry) {
                decreaseHeartCount(); // 바로 하트를 차감하고 화면에 반영
                document.body.style.backgroundColor = "#FAE0D4";
                step = 0;
                mux();
            }
            else {
                location.href = 'open.html';
                alert("초기화면으로 돌아갑니다.");
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

