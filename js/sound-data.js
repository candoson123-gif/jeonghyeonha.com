/*
 * sound-data.js
 * ★ 새 사운드 작업을 추가할 때는 이 파일에 객체 하나만 추가하면 됩니다.
 *   sound.html(목록), sound-detail.html(상세) 페이지는 이 배열을 읽어서 자동으로 만들어집니다.
 *   구조는 works-data.js와 동일합니다 — 필드 설명은 그쪽 파일 상단 주석을 참고하세요.
 *   사진/스틸 이미지는 images/sound/ 폴더에 넣어주세요.
 */

const SOUND = [
  // ↓ 새 사운드 작업을 추가할 때는 아래 형태로 객체를 복사해서 붙여넣고 내용만 바꾸면 됩니다.
  // {
  //   id: "고유-id",
  //   titleKo: "제목",
  //   titleEn: "Title",
  //   year: 2026,
  //   medium: "Sound installation, stereo",
  //   size: "",
  //   duration: "",
  //   thumb: "images/sound/파일명.jpg",
  //   images: ["images/sound/파일명.jpg"],
  //   video: { type: "vimeo", id: "숫자ID", hash: "" }, // 영상/오디오 임베드 없으면 null
  //   statementKo: "",
  //   statementEn: "",
  // },
];

// year 목록 (내림차순, 중복 제거)
const SOUND_YEARS = [...new Set(SOUND.map((s) => s.year))].sort((a, b) => b - a);

function getSoundById(id) {
  return SOUND.find((s) => s.id === id);
}

function getRelatedSound(work, count = 3) {
  return SOUND.filter((s) => s.id !== work.id && s.year === work.year)
    .concat(SOUND.filter((s) => s.id !== work.id && s.year !== work.year))
    .slice(0, count);
}
