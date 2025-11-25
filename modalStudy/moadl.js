const modal = document.querySelector("#loginModal");
const btn = document.querySelector("#login-button");
const closeBtns = document.querySelectorAll(".close");
const logpopup = document.querySelector(".modal-content")
const reg = document.querySelector("#goRegister");
const regpopup = document.querySelector(".regmodal-content")

// 1. 열기
btn.addEventListener("click", () => {
    modal.style.display = "block";
    regpopup.style.display = "none"
    logpopup.style.display = "block"
    
});

//2. x 버튼으로 닫기
closeBtns.forEach(closeBtn => {  
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        regpopup.style.display = "none";  
    });
});

//3. 배경 클릭으로 닫기
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

reg.addEventListener("click", () => {
    logpopup.style.display = "none";
    regpopup.style.display = "block";
});