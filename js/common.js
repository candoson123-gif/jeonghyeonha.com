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
  { href: "index.html", en: "Works", key: "works" },
  { href: "research.html", en: "Research", key: "research" },
  { href: "sound.html", en: "Sound", key: "sound" },
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
  return; // 하단 푸터 사용 안 함 (되살리려면 이 줄을 지우세요)
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


/* ── 화면 하단 사운드 재생바 (페이지를 옮겨도 유지됨) ────────────────── */
const SC_KEY = "sc-player";

function loadScApi(cb) {
  if (window.SC) return cb();
  const el = document.createElement("script");
  el.src = "https://w.soundcloud.com/player/api.js";
  el.onload = cb;
  document.head.appendChild(el);
}

function fmtTime(ms) {
  const t = Math.max(0, Math.floor(ms / 1000));
  return Math.floor(t / 60) + ":" + String(t % 60).padStart(2, "0");
}

function mountSoundBar(state, autoplay) {
  let bar = document.getElementById("sound-bar");
  if (!bar) {
    bar = document.createElement("div");
    bar.id = "sound-bar";
    document.body.appendChild(bar);
  }

  bar.innerHTML =
    '<iframe id="sound-bar-frame" allow="autoplay" src="https://w.soundcloud.com/player/?url=' +
    encodeURIComponent(state.url) +
    '&auto_play=' + (autoplay ? "true" : "false") + '&hide_related=true&show_comments=false&show_user=false"></iframe>' +
    '<button type="button" id="sb-play" aria-label="play">\u25b6</button>' +
    '<span id="sb-cur">0:00</span>' +
    '<div id="sb-track"><div id="sb-fill"></div></div>' +
    '<span id="sb-dur">0:00</span>' +
    '<span id="sb-title"></span>' +
    '<button type="button" id="sb-close" aria-label="close">\u00d7</button>';

  document.body.classList.add("has-sound-bar");

  document.getElementById("sb-close").addEventListener("click", () => {
    sessionStorage.removeItem(SC_KEY);
    bar.remove();
    document.body.classList.remove("has-sound-bar");
  });

  loadScApi(() => {
    const widget = SC.Widget(document.getElementById("sound-bar-frame"));
    const playBtn = document.getElementById("sb-play");
    const fill = document.getElementById("sb-fill");
    const track = document.getElementById("sb-track");
    const cur = document.getElementById("sb-cur");
    const durEl = document.getElementById("sb-dur");
    let duration = 0;

    widget.bind(SC.Widget.Events.READY, () => {
      widget.getCurrentSound((snd) => {
        if (snd) document.getElementById("sb-title").textContent = snd.title;
      });
      widget.getDuration((d) => {
        duration = d;
        durEl.textContent = fmtTime(d);
      });
      if (state.position) widget.seekTo(state.position);
      if (autoplay) widget.play();
    });

    widget.bind(SC.Widget.Events.PLAY, () => (playBtn.textContent = "\u2016"));
    widget.bind(SC.Widget.Events.PAUSE, () => (playBtn.textContent = "\u25b6"));
    widget.bind(SC.Widget.Events.FINISH, () => (playBtn.textContent = "\u25b6"));

    widget.bind(SC.Widget.Events.PLAY_PROGRESS, (e) => {
      state.position = e.currentPosition;
      sessionStorage.setItem(SC_KEY, JSON.stringify(state));
      cur.textContent = fmtTime(e.currentPosition);
      fill.style.width = (e.relativePosition * 100).toFixed(2) + "%";
    });

    playBtn.addEventListener("click", () => widget.toggle());

    track.addEventListener("click", (e) => {
      if (!duration) return;
      const r = track.getBoundingClientRect();
      widget.seekTo(duration * ((e.clientX - r.left) / r.width));
    });
  });
}

function restoreSoundBar() {
  const raw = sessionStorage.getItem(SC_KEY);
  if (!raw) return;
  try {
    mountSoundBar(JSON.parse(raw), true);
  } catch (err) {}
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  initLang();
  restoreSoundBar();
});
