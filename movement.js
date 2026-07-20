/*
 * movement.js — movement.html 전용
 * LOCATIONS 배열(movement-data.js)을 읽어서 장소 이름을 텍스트 목록으로 그립니다.
 * 페이지 이동 없이, 이름을 클릭하면 그 자리에서 사진 행이 열리고/닫힙니다 (아코디언).
 * 한 번에 하나의 장소만 열립니다 — 다른 장소를 열면 열려있던 장소는 자동으로 닫힙니다.
 */

function photoRowHtml(loc) {
  return loc.photos
    .map(
      (p) => `
      <figure class="photo-item">
        <img src="${p.src}" alt="${loc.nameEn}" loading="lazy">
        ${
          p.captionKo || p.captionEn
            ? `<figcaption><span class="ko">${p.captionKo || ""}</span><span class="en">${p.captionEn || ""}</span></figcaption>`
            : ""
        }
      </figure>`
    )
    .join("");
}

function renderLocationList() {
  const list = document.getElementById("movement-list");
  list.innerHTML = LOCATIONS.map(
    (loc) => `
    <li class="location-item" data-id="${loc.id}">
      <button type="button" class="location-name" aria-expanded="false">
        ${loc.year}年 ${loc.nameKo}(${loc.nameEn})
      </button>
      <div class="location-panel">
        <div class="photo-row">${photoRowHtml(loc)}</div>
      </div>
    </li>`
  ).join("");

  list.querySelectorAll(".location-name").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".location-item");
      const willOpen = !item.classList.contains("open");

      // 열려있는 다른 장소는 모두 닫습니다 (한 번에 하나만 열림)
      list.querySelectorAll(".location-item.open").forEach((openItem) => {
        openItem.classList.remove("open");
        openItem.querySelector(".location-name").setAttribute("aria-expanded", "false");
      });

      if (willOpen) {
        item.classList.add("open");
      }
      btn.setAttribute("aria-expanded", String(willOpen));
    });
  });
}

document.addEventListener("DOMContentLoaded", renderLocationList);
