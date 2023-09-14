function updateHearts(heartCount) {
    const heartContainer = document.getElementById('hearts');
    let hearts = "";
    for (let i = 0; i < heartCount; i++) {
        hearts += "❤️";
    }
    heartContainer.textContent = hearts;
}
// URL에서 'hearts' 쿼리 파라미터 값 가져오기
function getHeartCountFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('hearts') || 5; // 기본 값은 5
}

// 페이지 로드 시에 호출
window.onload = function () {
    const heartCount = getHeartCountFromURL();
    updateHearts(heartCount);
}
function goToOtherPage() {
    const currentHeartCount = getHeartCountFromURL();
    const newURL = `otherpage.html?hearts=${currentHeartCount}`;
    window.location.href = newURL;
}
function decreaseHeartCount() {
    let currentHeartCount = getHeartCountFromURL();
    currentHeartCount = (currentHeartCount > 0) ? currentHeartCount - 1 : 0;

    const heartContainer = document.getElementById('hearts');
    heartContainer.classList.add('animatedHeart'); // 애니메이션 클래스 추가

    // 애니메이션이 끝난 후 클래스를 제거하여 다음번 애니메이션을 위해 준비
    heartContainer.addEventListener('animationend', () => {
        heartContainer.classList.remove('animatedHeart');
    });

    updateHearts(currentHeartCount); // 화면에 바로 하트를 업데이트

    // URL에 반영하려면, history API를 사용할 수 있습니다:
    const newURL = window.location.pathname + "?hearts=" + currentHeartCount;
    history.pushState({}, '', newURL);

    return currentHeartCount;
}
//하트하트하트하트