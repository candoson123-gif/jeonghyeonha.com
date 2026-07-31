/*
 * video-embed.js
 * 영상은 처음부터 iframe을 불러오지 않고, 재생 버튼을 눌렀을 때만
 * Vimeo/YouTube 임베드를 삽입합니다. (모바일 데이터 절약 + 로딩 속도 개선)
 *
 * 사용법:
 * <div class="video-embed" data-video-type="vimeo" data-video-id="000000000"></div>
 * 비공개(unlisted) Vimeo 링크는 data-video-hash="xxxxxxx" 로 h 파라미터를 추가하세요.
 */

function mountClickToPlay(container) {
  const type = container.dataset.videoType || "vimeo";
  const id = container.dataset.videoId;
  const hash = container.dataset.videoHash;

  if (!id) {
    container.innerHTML = `<span class="video-note">video id 없음 — data-video-id를 채워주세요</span>`;
    return;
  }

  const playBtn = document.createElement("div");
  playBtn.className = "play-button";
  container.appendChild(playBtn);

  container.addEventListener(
    "click",
    () => {
      let src = "";
      if (type === "vimeo") {
        src = `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0${hash ? "&h=" + hash : ""}`;
      } else if (type === "youtube") {
        src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
      }
      const iframe = document.createElement("iframe");
      iframe.src = src;
      iframe.allow = "autoplay; fullscreen; picture-in-picture";
      iframe.allowFullscreen = true;
      container.innerHTML = "";
      container.appendChild(iframe);
    },
    { once: true }
  );
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".video-embed[data-video-id]").forEach(mountClickToPlay);
});
