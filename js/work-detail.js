/*
 * work-detail.js — work.html 전용
 * URL의 ?id= 값으로 WORKS 배열에서 작품을 찾아 상세 페이지를 그립니다.
 */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const work = getWorkById(id);
  const root = document.getElementById("work-detail-root");

  if (!work) {
    root.innerHTML = `<p>작품을 찾을 수 없습니다. <a href="works.html">Works로 돌아가기</a></p>`;
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

  const related = getRelatedWorks(work);
  const relatedHtml = related
    .map(
      (w) => `
      <a class="work-card" href="work.html?id=${w.id}">
        <div class="thumb"><img src="${w.thumb}" alt="${w.titleEn}">${w.video ? '<span class="play-icon"></span>' : ""}</div>
        <div class="caption"><span class="ko">${w.titleKo}</span><span class="en">${w.titleEn}</span>, ${w.yearLabel || w.year}</div>
      </a>`
    )
    .join("");

  root.innerHTML = `
    <a class="detail-back" href="works.html">&larr; <span class="ko">작업으로</span><span class="en">Back to Works</span></a>
    <h1 class="detail-title">${work.titleKo} <span class="muted">/ ${work.titleEn}</span></h1>
    <div class="detail-meta">${metaParts.join("   ·   ")}</div>
    ${mediaHtml}
    <div class="detail-statement">
      <span class="ko">${work.statementKo}</span><span class="en">${work.statementEn}</span>
    </div>
    ${
      related.length
        ? `<div class="related-title"><span class="ko">관련 작품</span><span class="en">Related works</span></div>
           <div class="related-grid">${relatedHtml}</div>`
        : ""
    }
  `;

  // 방금 삽입한 .video-embed에 클릭-재생 바인딩
  root.querySelectorAll(".video-embed[data-video-id]").forEach(mountClickToPlay);
});
