/*
 * sound-detail.js — sound-detail.html 전용
 * URL의 ?id= 값으로 SOUND 배열에서 작업을 찾아 상세 페이지를 그립니다. work-detail.js와 동일한 구조입니다.
 */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const work = getSoundById(id);
  const root = document.getElementById("sound-detail-root");

  if (!work) {
    root.innerHTML = `<p>작업을 찾을 수 없습니다. <a href="sound.html">Sound로 돌아가기</a></p>`;
    return;
  }

  document.title = `${work.titleEn} — ${SITE.artistNameEn}`;

  const metaParts = [work.yearLabel || work.year, work.medium, work.size, work.duration].filter(Boolean);

  const imageBlock = (src) => `<div class="detail-media"><img src="${src}" alt="${work.titleEn}"></div>`;

  const videoBlock = work.video
    ? `<div class="detail-media">
         <div class="video-embed" data-video-type="${work.video.type}" data-video-id="${work.video.id}" data-video-hash="${work.video.hash || ""}">
           <span class="video-note">${work.video.type === "vimeo" ? "Vimeo" : "YouTube"} — <span class="ko">비공개 링크 가능</span><span class="en">private link available</span></span>
         </div>
       </div>`
    : "";

  // 첫 이미지 → 영상(있으면) → 나머지 이미지 순으로 배치
  const mediaHtml =
    (work.images[0] ? imageBlock(work.images[0]) : "") +
    videoBlock +
    work.images.slice(1).map(imageBlock).join("");

  const related = getRelatedSound(work);
  const relatedHtml = related
    .map(
      (s) => `
      <a class="work-card" href="sound-detail.html?id=${s.id}">
        <div class="thumb"><img src="${s.thumb}" alt="${s.titleEn}">${s.video ? '<span class="play-icon"></span>' : ""}</div>
        <div class="caption"><span class="ko">${s.titleKo}</span><span class="en">${s.titleEn}</span>, ${s.yearLabel || s.year}</div>
      </a>`
    )
    .join("");

  root.innerHTML = `
    <a class="detail-back" href="sound.html">&larr; <span class="ko">Sound로</span><span class="en">Back to Sound</span></a>
    <h1 class="detail-title">${work.titleKo} <span class="muted">/ ${work.titleEn}</span></h1>
    <div class="detail-meta">${metaParts.join("   ·   ")}</div>
    ${mediaHtml}
    <div class="detail-statement">
      <span class="ko">${work.statementKo}</span><span class="en">${work.statementEn}</span>
    </div>
    ${
      related.length
        ? `<div class="related-title"><span class="ko">관련 작업</span><span class="en">Related works</span></div>
           <div class="related-grid">${relatedHtml}</div>`
        : ""
    }
  `;

  // 방금 삽입한 .video-embed에 클릭-재생 바인딩
  root.querySelectorAll(".video-embed[data-video-id]").forEach(mountClickToPlay);
});
