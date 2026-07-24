/*
 * sound.js — sound.html 전용
 * SOUND 배열(sound-data.js)을 읽어서 연도 탭과 그리드를 그립니다. works.js와 동일한 구조입니다.
 */

function renderSoundYearTabs(activeYear) {
  const tabs = document.getElementById("sound-year-tabs");
  tabs.innerHTML = SOUND_YEARS.map(
    (y) => `<button data-year="${y}" class="${y === activeYear ? "active" : ""}">${y}</button>`
  ).join("");

  tabs.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const year = Number(btn.dataset.year);
      renderSoundYearTabs(year);
      renderSoundGrid(year);
      history.replaceState(null, "", `sound.html?year=${year}`);
    });
  });
}

function renderSoundGrid(year) {
  const grid = document.getElementById("sound-grid");
  const filtered = SOUND.filter((s) => s.year === year);
  grid.innerHTML = filtered
    .map(
      (s) => `
    <a class="work-card" href="sound-detail.html?id=${s.id}">
      <div class="thumb">
        <img src="${s.thumb}" alt="${s.titleEn}">
        ${s.video ? '<span class="play-icon"></span>' : ""}
      </div>
      <div class="caption">
        <span class="ko">${s.titleKo}</span><span class="en">${s.titleEn}</span>, ${s.yearLabel || s.year}
      </div>
    </a>`
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.getElementById("sound-year-tabs");
  const grid = document.getElementById("sound-grid");

  if (!SOUND.length) {
    tabs.innerHTML = "";
    grid.innerHTML = `<p class="empty-state"><span class="ko">아직 등록된 사운드 작업이 없습니다.</span><span class="en">No sound works yet.</span></p>`;
    return;
  }

  const params = new URLSearchParams(location.search);
  const requestedYear = Number(params.get("year"));
  const startYear = SOUND_YEARS.includes(requestedYear) ? requestedYear : SOUND_YEARS[0];
  renderSoundYearTabs(startYear);
  renderSoundGrid(startYear);
});
