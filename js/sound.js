/*
 * sound.js — sound.html 전용
 * 썸네일 + 제목 그리드. 유튜브는 화면 중앙 팝업, 사운드클라우드는 화면 하단 재생바로 재생됩니다.
 * 하단 재생바는 다른 페이지로 이동해도 계속 유지됩니다 (common.js에서 복원).
 */

function soundThumbSrc(s) {
  if (s.thumb) return s.thumb;
  if (s.type === "youtube") return `https://img.youtube.com/vi/${s.videoId}/maxresdefault.jpg`;
  return "";
}

function renderSoundGrid() {
  const grid = document.getElementById("sound-grid");
  grid.innerHTML = SOUND.map((s, i) => {
    const playable = s.type === "youtube" || s.type === "soundcloud";
    const tag = playable ? "button" : "div";
    const attrs = playable ? ` type="button" data-index="${i}"` : ' style="cursor: default;"';
    const yr = s.yearLabel || s.year;
    const meta = (s.artist ? " - " + s.artist : "") + (yr ? ", " + yr : "");
    return `
    <${tag} class="work-card"${attrs}>
      <div class="thumb">
        <img src="${soundThumbSrc(s)}" alt="${s.titleEn}">
      </div>
      <div class="caption">
        <span><span class="ko">${s.titleKo}</span><span class="en">${s.titleEn}</span>${meta}</span>
        <span class="note">${s.note || ""}</span>
      </div>
    </${tag}>`;
  }).join("");

  grid.querySelectorAll("button.work-card").forEach((btn) => {
    btn.addEventListener("click", () => openSoundPlayer(SOUND[Number(btn.dataset.index)]));
  });
}

function openSoundPlayer(s) {
  if (s.type === "soundcloud") {
    const state = { url: s.url, position: 0 };
    sessionStorage.setItem(SC_KEY, JSON.stringify(state));
    mountSoundBar(state, true);
    return;
  }

  const overlay = document.getElementById("sound-video-overlay");
  overlay.innerHTML = `
    <div class="video-modal-backdrop" id="video-modal-backdrop">
      <div class="video-modal">
        <iframe src="https://www.youtube.com/embed/${s.videoId}?autoplay=1&rel=0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
      </div>
    </div>
  `;
  document.getElementById("video-modal-backdrop").addEventListener("click", (e) => {
    if (e.target.id === "video-modal-backdrop") closeSoundPlayer();
  });
}

function closeSoundPlayer() {
  const overlay = document.getElementById("sound-video-overlay");
  if (overlay) overlay.innerHTML = "";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSoundPlayer();
});

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("sound-grid");

  if (!SOUND.length) {
    grid.innerHTML = `<p class="empty-state"><span class="ko">아직 등록된 사운드 작업이 없습니다.</span><span class="en">No sound works yet.</span></p>`;
    return;
  }

  renderSoundGrid();
});
