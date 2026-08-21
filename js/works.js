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

const CATEGORIES = [
  { key: "film-video", label: "film&video" },
  { key: "space", label: "space" },
  { key: "text", label: "text" },
  { key: "workshop", label: "workshop" },
];

let currentCategory = CATEGORIES[0].key;

function renderTitleRow() {
  const row = document.getElementById("works-title-row");

  const tabs = CATEGORIES.map(
    (c) =>
      `<button type="button" class="cat-tab ${c.key === currentCategory ? "active" : ""}" data-cat="${c.key}">${c.label}</button>`
  ).join("");

  const items = WORKS.filter((w) => (w.category || "film-video") === currentCategory);
  const titles = items
    .map(
      (w) => `
    <button type="button" class="${w.id === currentWorkId ? "active" : ""}" data-id="${w.id}">
      <span class="ko">${w.titleKo}${w.yearLabel || w.year ? " " + (w.yearLabel || w.year) : ""}</span><span class="en">${w.titleEn}${w.yearLabel || w.year ? " " + (w.yearLabel || w.year) : ""}</span>
    </button>`
    )
    .join("");

  row.innerHTML = `<div class="works-cat-tabs">${tabs}</div><div class="works-title-list">${titles}</div>`;

  row.querySelectorAll("button.cat-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentCategory = btn.dataset.cat;
      renderTitleRow();
    });
  });

  row.querySelectorAll(".works-title-list button").forEach((btn) => {
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
  const pdfBlock = work.pdf
    ? `<div class="detail-pdf" data-pdf="${work.pdf}"></div>`
    : "";
  const mediaHtml =
    (work.images[0] ? imageBlock(work.images[0]) : "") +
    videoBlock +
    pdfBlock +
    work.images.slice(1).map(imageBlock).join("");

  return `
    <div class="detail-header${metaParts.length ? "" : " centered"}">
      <h1 class="detail-title"><span class="detail-title-ko">${work.detailTitle || work.titleKo}</span>${work.detailTitle ? "" : titleEnPart}</h1>
      ${metaParts.length ? `<div class="detail-meta">${metaParts.join("   ·   ")}</div>` : ""}
      <button type="button" class="detail-back-btn" aria-label="back">«</button>
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
  overlay.querySelectorAll(".detail-pdf[data-pdf]").forEach(mountPdfReader);

  const backdrop = document.getElementById("work-detail-backdrop");
  backdrop.addEventListener("click", (e) => {
    if (e.target.tagName !== "IMG" && !e.target.closest(".video-embed") && !e.target.closest(".detail-pdf")) {
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
