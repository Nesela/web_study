// ========== 날짜 계산 부분 ==========

// 오늘 날짜 객체 생성
const today = new Date();

// 3개월 전 날짜를 계산하기 위한 새로운 날짜 객체 생성
const setMonth = new Date();

// 오늘 기준 3개월 전으로 설정 (today.getMonth()는 현재 월을 가져옴, -3으로 3개월 빼기)
setMonth.setMonth(today.getMonth() - 3);

// 날짜를 "YYYY-MM-DD" 형식의 문자열로 변환하는 함수
const formatDate = (date) => {
    // 연도 가져오기 (예: 2024)
    const year = date.getFullYear();
    
    // 월 가져오기 (0부터 시작하니까 +1 해줌, 예: 12월 = 11 → 12)
    // String()으로 문자열 변환 후, padStart(2, '0')로 한 자리 숫자면 앞에 0 붙임 (예: 5 → 05)
    const month = String(date.getMonth() + 1).padStart(2, '0');
    
    // 일 가져오기 (1~31)
    // 마찬가지로 한 자리면 앞에 0 붙임 (예: 3 → 03)
    const day = String(date.getDate()).padStart(2, '0');
    
    // 백틱(`)과 ${}를 사용해서 "2024-12-03" 형식으로 반환
    return `${year}-${month}-${day}`;
};

// 3개월 전 날짜를 "YYYY-MM-DD" 형식으로 저장
const startDate = formatDate(setMonth);

// 오늘 날짜를 "YYYY-MM-DD" 형식으로 저장
const endDate = formatDate(today);


// ========== API 설정 부분 ==========

// RAWG API 키 (내 신분증 같은 것)
const API_KEY = "4db8554f6c524aacb7f4bd32f85783f8";

// API 요청 URL 만들기
// - key=${API_KEY}: API 키 전달
// - ordering=-rating: 평점 높은 순으로 정렬 (- 붙이면 내림차순)
// - dates=${startDate},${endDate}: 3개월 전 ~ 오늘까지 출시된 게임만
const url = `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-rating&dates=${startDate},${endDate}`;


// ========== 내가 선택한 게임 불러오기 ==========

// 내가 보여주고 싶은 게임들의 slug (게임 고유 이름)
const myGameSlugs = ["monster-hunter-world-2", "silent-hill-f"];

// map()으로 각 게임을 fetch하는 Promise들의 배열 만들기
// 예: [fetch(몬헌), fetch(사일런트힐)]
const promises = myGameSlugs.map(slug =>
    // 각 게임의 상세 정보를 API에 요청
    fetch(`https://api.rawg.io/api/games/${slug}?key=${API_KEY}`)
        // 응답을 JSON 형태로 변환
        .then(res => res.json())
);

// Promise.all()은 모든 fetch가 완료될 때까지 기다림
// 모든 게임 정보를 다 받으면 .then()이 실행됨
Promise.all(promises).then(games => {
    // HTML에서 id="myGame-list"인 요소 찾기
    const myGameList = document.querySelector("#myGame-list");
    
    // 기존 내용 지우기 (초기화)
    myGameList.innerHTML = '';

    // 받아온 게임들을 하나씩 처리 (forEach = 반복문)
    games.forEach(game => {
        // innerHTML += 는 "기존 내용에 추가"한다는 뜻
        myGameList.innerHTML += `
        <div>
            <img src="${game.background_image}">
            <p>${game.name}</p>
            <p>${game.genres.slice(0, 2).map(g => g.name).join(', ')}</p>
        </div>`;
        // slice(0, 2): 장르 배열에서 처음 2개만
        // map(g => g.name): 각 장르 객체에서 이름만 추출
        // join(', '): 배열을 쉼표로 연결해서 문자열로 만듦
    });
});


// ========== 인기 게임 리스트 불러오기 ==========

// 위에서 만든 url로 API 요청 (최근 3개월, 평점 높은 순)
fetch(url)
    // 응답을 JSON으로 변환
    .then(res => res.json())
    // 변환된 데이터로 작업
    .then(data => {
        // 콘솔에 전체 데이터 출력 (개발자 도구에서 확인용)
        console.log(data);
        
        // HTML에서 id="game-list"인 요소 찾기
        const gameList = document.querySelector("#game-list");

        // data.results에는 게임 20개가 들어있음
        // slice(0, 6)으로 처음 6개만 가져옴
        // forEach로 6개 게임을 하나씩 처리
        data.results.slice(0, 6).forEach(game => {
            // 게임 카드 HTML을 만들어서 추가
            gameList.innerHTML += `
        <div>
            <img src="${game.background_image}">
            <p>${game.name}</p>
            <p>${game.genres.slice(0, 2).map(g => g.name).join(', ')}</p>
        </div>`;
        });
    });