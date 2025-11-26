const modal = document.querySelector("#loginModal");
const btn = document.querySelector("#login-button");
const closeBtns = document.querySelectorAll(".close");
const logpopup = document.querySelector(".modal-content")
const goReg = document.querySelector("#goRegister");
const regpopup = document.querySelector(".regmodal-content")

const register = document.querySelector("#register")
const clkLogin = document.getElementById("clickLogin")
const usid = document.getElementById("ID")
const usPassword = document.getElementById("PASSWORD")
const newUsid = document.getElementById("NewID")
const newUsPassword = document.getElementById("NewPASSWORD")
const configNewUsPasswrod = document.getElementById("ConfirmPASSWORD")

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

goReg.addEventListener("click", () => {
    logpopup.style.display = "none";
    regpopup.style.display = "block";
    const inputpye = document.querySelectorAll("#registerModal > input")
    inputpye.forEach(inputElement => {
        inputElement.value = "";
    }) 
});

//로그인
clkLogin.addEventListener("click", () => {
    const savedID = localStorage.getItem("newUsid")
    const savedPW = localStorage.getItem("newUsPassword")

    if (usid.value === savedID && usPassword.value === savedPW){
        alert("로그인 완료");
        } else {
            alert("회원정보가 일치하지 않습니다.");
        }
    });

//회원가입
register.addEventListener("click", () => {

    if (newUsPassword.value === configNewUsPasswrod.value) {
        localStorage.setItem("newUsid", newUsid.value)
        localStorage.setItem("newUsPassword", newUsPassword.value)
        alert("회원가입이 완료되었습니다.")
        regpopup.style.display = "none";
        logpopup.style.display = "block";
    } else {
        alert("비밀번호가 일치하지 않습니다.")
    }
});
