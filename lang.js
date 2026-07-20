/*
 * lang.js — 한/영 전환
 * 텍스트를 두 번 쓰는 대신 <span class="ko">...</span><span class="en">...</span>로
 * 감싸두면 이 스크립트가 알아서 언어에 맞게 보여주고 숨깁니다.
 */

// 일부 브라우저는 file:// 로 직접 열었을 때 localStorage를 막기도 해서 안전하게 감쌉니다.
function safeGetLang() {
  try {
    return localStorage.getItem("site-lang");
  } catch (e) {
    return null;
  }
}
function safeSetLang(lang) {
  try {
    localStorage.setItem("site-lang", lang);
  } catch (e) {
    /* 저장 실패해도 화면 전환 자체는 계속 동작 */
  }
}

let currentLang = "ko";

function initLang() {
  currentLang = safeGetLang() || "ko";
  applyLang(currentLang);
}

function applyLang(lang) {
  currentLang = lang;
  document.body.classList.remove("lang-ko", "lang-en");
  document.body.classList.add(lang === "en" ? "lang-en" : "lang-ko");
  document.documentElement.setAttribute("lang", lang === "en" ? "en" : "ko");
  safeSetLang(lang);
}

function toggleLang() {
  applyLang(currentLang === "ko" ? "en" : "ko");
}
