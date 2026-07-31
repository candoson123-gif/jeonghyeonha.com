/*
 * sound-data.js
 * ★ 새 사운드 작업을 추가할 때는 이 파일에 객체 하나만 추가하면 됩니다.
 *
 * 필드 설명
 * - id        : 영문/숫자 고유 값
 * - titleKo/titleEn
 * - year      : 연도 (숫자)
 * - yearLabel : "2024–2025" 처럼 표기하고 싶을 때만 (없으면 year가 표시됨)
 * - videoId   : 유튜브 영상 ID (주소의 v= 뒤에 오는 값)
 *               썸네일 이미지는 이 ID로 유튜브에서 자동으로 가져옵니다.
 * - thumb     : (선택) 유튜브 썸네일 대신 직접 지정할 이미지 경로
 */

const SOUND = [
  {
    id: "piano-as-aged-as-the-house",
    titleKo: "Piano as aged as the house",
    titleEn: "Piano as aged as the house",
    year: 2025,
    yearLabel: "",
    videoId: "x5iEssGprcs",
    thumb: "",
  },

  // ↓ 새 작업을 추가할 때는 위 객체를 복사해서 이 자리에 붙여넣고 내용만 바꾸면 됩니다.
];
