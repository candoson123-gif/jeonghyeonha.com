/*
 * sound.js — sound.html 전용
 * 유튜브 썸네일 + 제목 그리드. 썸네일을 클릭하면 화면 중앙에 팝업으로 영상이 재생됩니다.
 */

function soundThumbSrc(s) {
  return s.thumb || `https://img.youtube.com/vi/${s.videoId}/maxresdefault.jpg`;
}

function renderSoundGrid() {
  const grid = document.getElementById("sound-grid");
  grid.innerHTML = SOUND.map(
    (s) => `
    <button type="button" class="work-card" data-video="${s.videoId}">
      <div class="thumb">
        <img src="${soundThumbSrc(s)}" alt="${s.titleEn}">
      </div>
      <div class="caption">
        <span class="ko">${s.titleKo}</span><span class="en">${s.titleEn}</span>, ${s.yearLabel || s.year}
      </div>
    </button>`
  ).join("");

  grid.querySelectorAll("button.work-card").forEach((btn) => {
    btn.addEventListener("click", () => openSoundVideo(btn.dataset.video));
  });
}

function openSoundVideo(videoId) {
  const overlay = document.getElementById("sound-video-overlay");
  overlay.innerHTML = `
    <div class="video-modal-backdrop" id="video-modal-backdrop">
      <div class="video-modal">
        <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
      </div>
    </div>
  `;
  document.getElementById("video-modal-backdrop").addEventListener("click", (e) => {
    if (e.target.id === "video-modal-backdrop") closeSoundVideo();
  });
}

function closeSoundVideo() {
  document.getElementById("sound-video-overlay").innerHTML = "";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSoundVideo();
});

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("sound-grid");

  if (!SOUND.length) {
    grid.innerHTML = `<p class="empty-state"><span class="ko">아직 등록된 사운드 작업이 없습니다.</span><span class="en">No sound works yet.</span></p>`;
    return;
  }

  renderSoundGrid();
});
