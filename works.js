/*
 * works.js — works.html 전용
 * WORKS 배열(works-data.js)을 읽어서 연도 탭과 그리드를 그립니다.
 */

function renderYearTabs(activeYear) {
  const tabs = document.getElementById("year-tabs");
  tabs.innerHTML = WORK_YEARS.map(
    (y) => `<button data-year="${y}" class="${y === activeYear ? "active" : ""}">${y}</button>`
  ).join("");

  tabs.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const year = Number(btn.dataset.year);
      renderYearTabs(year);
      renderGrid(year);
      history.replaceState(null, "", `works.html?year=${year}`);
    });
  });
}

function renderGrid(year) {
  const grid = document.getElementById("works-grid");
  const filtered = WORKS.filter((w) => w.year === year);
  grid.innerHTML = filtered
    .map(
      (w) => `
    <a class="work-card" href="work.html?id=${w.id}">
      <div class="thumb">
        <img src="${w.thumb}" alt="${w.titleEn}">
        ${w.video ? '<span class="play-icon"></span>' : ""}
      </div>
      <div class="caption">
        <span class="ko">${w.titleKo}</span><span class="en">${w.titleEn}</span>, ${w.yearLabel || w.year}
      </div>
    </a>`
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const requestedYear = Number(params.get("year"));
  const startYear = WORK_YEARS.includes(requestedYear) ? requestedYear : WORK_YEARS[0];
  renderYearTabs(startYear);
  renderGrid(startYear);
});
