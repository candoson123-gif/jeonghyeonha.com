/*
 * common.js
 * 모든 페이지 상단/하단에 들어가는 내비게이션·푸터를 이 파일 한 곳에서만 관리합니다.
 * 메뉴 이름, 링크, 작가명, SNS 계정 등을 바꾸고 싶으면 이 파일만 수정하면 전체 페이지에 반영됩니다.
 */

// ── 여기만 바꾸면 사이트 전체에 반영됩니다 ──────────────────────────────
const SITE = {
  artistNameKo: "하정현",
  artistNameEn: "Ha Jeonghyeon",
  email: "haalyra@gmail.com",
  instagram: "https://instagram.com/hahe_on20",
  vimeo: "", // Vimeo 계정 생기면 URL 채워주세요 (비워두면 푸터에 표시 안 됨)
};
// ──────────────────────────────────────────────────────────────────────

// ★ 내비게이션(목차)은 언어 토글과 무관하게 항상 영어로만 표시됩니다.
//   KO/EN 전환은 각 페이지 "본문 콘텐츠"에만 적용됩니다.
const NAV_ITEMS = [
  { href: "works.html", en: "Works", key: "works" },
  { href: "movement.html", en: "Movement", key: "movement" },
  { href: "sound.html", en: "Sound", key: "sound" },
  { href: "research.html", en: "Research", key: "research" },
  { href: "cv.html", en: "CV", key: "cv" },
  { href: "contact.html", en: "Contact", key: "contact" },
];

function renderHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;
  const current = document.body.getAttribute("data-page");

  const links = NAV_ITEMS.map((item) => {
    const isCurrent = item.key === current;
    return `<li><a href="${item.href}" ${isCurrent ? 'aria-current="page"' : ""}>${item.en}</a></li>`;
  }).join("");

  header.innerHTML = `
    <div class="nav-inner">
      <a href="index.html" class="logo"><span class="ko">${SITE.artistNameKo}</span><span class="en">${SITE.artistNameEn}</span></a>
      <ul class="nav-links" id="nav-links">
        ${links}
        <li><button id="lang-toggle" type="button">KO / EN</button></li>
      </ul>
    </div>
  `;

  document.getElementById("lang-toggle").addEventListener("click", toggleLang);
}

function renderFooter() {
  const footer = document.getElementById("site-footer");
  if (!footer) return;
  const links = [
    `<a href="mailto:${SITE.email}">${SITE.email}</a>`,
    SITE.instagram ? `<a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram</a>` : "",
    SITE.vimeo ? `<a href="${SITE.vimeo}" target="_blank" rel="noopener">Vimeo</a>` : "",
  ].filter(Boolean).join(" &nbsp;·&nbsp; ");

  footer.innerHTML = `
    <span>&copy; ${new Date().getFullYear()} ${SITE.artistNameEn}</span>
    <span>${links}</span>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  initLang();
});
