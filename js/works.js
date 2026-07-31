/*
 * works.js — index.html(Works, 사이트 첫 화면) 전용
 * 제목을 클릭하면 전체 화면으로 작업 이미지가 크게 표시됩니다.
 * 상단 중앙에 제목과 정보만 표시되고, 작업 설명글은 표시하지 않습니다.
 * 이미지가 아닌 빈 공간을 클릭하거나 Esc를 누르면 닫힙니다.
 */

let currentWorkId = null;
let stopAutoScroll = null;

function startAutoScroll(container) {
  const SPEED = 8; // 초당 스크롤 픽셀 수 — 작을수록 더 천천히
  const RESUME_DELAY = 533; // 사용자가 스크롤을 멈춘 뒤 재개까지 기다리는 시간(ms)

  let paused = false;
  let resumeTimer = null;
  let lastTime = null;
  let rafId = null;
  let position = container.scrollTop;

  function pauseForUser() {
    paused = true;
    lastTime = null;
    if (resumeTimer) clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => {
      position = container.scrollTop;
      paused = false;
    }, RESUME_DELAY);
  }

  const userEvents = ["wheel", "touchstart", "touchmove", "mousedown", "keydown"];
  userEvents.forEach((type) =>
    container.addEventListener(type, pauseForUser, { passive: true })
  );

  function step(now) {
    if (lastTime === null) lastTime = now;
    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    if (!paused) {
      const max = container.scrollHeight - container.clientHeight;
      if (max > 0) {
        position = Math.min(position + SPEED * dt, max);
        container.scrollTop = position;
      }
    }
    rafId = requestAnimationFrame(step);
  }

  rafId = requestAnimationFrame(step);

  return function stop() {
    cancelAnimationFrame(rafId);
    if (resumeTimer) clearTimeout(resumeTimer);
    userEvents.forEach((type) => container.removeEventListener(type, pauseForUser));
  };
}

function renderTitleRow() {
  const row = document.getElementById("works-title-row");
  row.innerHTML = WORKS.map(
    (w) => `
    <button type="button" class="${w.id === currentWorkId ? "active" : ""}" data-id="${w.id}">
      <span class="ko">${w.titleKo} ${w.yearLabel || w.year}</span><span class="en">${w.titleEn} ${w.yearLabel || w.year}</span>
    </button>`
  ).join("");

  row.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      if (id === currentWorkId) {
        closeWorkDetail();
      } else {
        selectWork(id);
      }
    });
  });
}

function workDetailHtml(work) {
  const metaParts = [work.medium, work.size, work.duration].filter(Boolean);
  const titleEnPart =
    work.titleEn && work.titleEn !== work.titleKo
      ? ` <span class="detail-title-en">${work.titleEn}</span>`
      : "";
  const imageBlock = (src) => `<div class="detail-media"><img src="${src}" alt="${work.titleEn}"></div>`;
  const videoBlock = work.video
    ? `<div class="detail-media">
         <div class="video-embed" data-video-type="${work.video.type}" data-video-id="${work.video.id}" data-video-hash="${work.video.hash || ""}">
           <span class="video-note">${work.video.type === "vimeo" ? "Vimeo" : "YouTube"}</span>
         </div>
       </div>`
    : "";
  const mediaHtml =
    (work.images[0] ? imageBlock(work.images[0]) : "") +
    videoBlock +
    work.images.slice(1).map(imageBlock).join("");

  return `
    <div class="detail-header">
      <h1 class="detail-title"><span class="detail-title-ko">${work.titleKo}</span>${titleEnPart}</h1>
      <div class="detail-meta">${metaParts.join("   \u00b7   ")}</div>
    </div>
    ${mediaHtml}
  `;
}

function openWorkDetail(work) {
  const overlay = document.getElementById("work-detail-overlay");
  overlay.innerHTML = `
    <div class="work-detail-backdrop" id="work-detail-backdrop">
      <div class="work-detail-modal">${workDetailHtml(work)}</div>
    </div>
  `;
  overlay.querySelectorAll(".video-embed[data-video-id]").forEach(mountClickToPlay);

  const backdrop = document.getElementById("work-detail-backdrop");
  backdrop.addEventListener("click", (e) => {
    if (e.target.tagName !== "IMG" && !e.target.closest(".video-embed")) {
      closeWorkDetail();
    }
  });

  if (stopAutoScroll) stopAutoScroll();
  stopAutoScroll = startAutoScroll(backdrop);

  document.title = `${work.titleEn} — ${SITE.artistNameEn}`;
}

function closeWorkDetail() {
  if (stopAutoScroll) {
    stopAutoScroll();
    stopAutoScroll = null;
  }
  const overlay = document.getElementById("work-detail-overlay");
  overlay.innerHTML = "";
  currentWorkId = null;
  document.querySelectorAll("#works-title-row button.active").forEach((b) => b.classList.remove("active"));
  document.title = `Works — ${SITE.artistNameEn}`;
  history.replaceState(null, "", "index.html");
}

function selectWork(id) {
  const work = getWorkById(id);
  if (!work) return;
  currentWorkId = id;
  renderTitleRow();
  openWorkDetail(work);
  history.replaceState(null, "", `index.html?id=${work.id}`);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && currentWorkId) closeWorkDetail();
});

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const requestedId = params.get("id");

  if (requestedId && getWorkById(requestedId)) {
    selectWork(requestedId);
    return;
  }

  renderTitleRow();
});
