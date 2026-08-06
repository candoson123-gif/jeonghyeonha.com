/*
 * sound-data.js
 * ★ 새 사운드 작업을 추가할 때는 이 파일에 객체 하나만 추가하면 됩니다.
 *
 * 필드 설명
 * - id        : 영문/숫자 고유 값
 * - titleKo/titleEn
 * - artist    : 작가 이름 (제목과 연도 사이에 표시)
 * - year      : 연도 (숫자)
 * - yearLabel : "2024–2025" 처럼 표기하고 싶을 때만 (없으면 year가 표시됨)
 * - note      : 이미지 아래 오른쪽에 회색으로 표시될 문구 (없으면 "")
 * - type      : "youtube" 또는 "soundcloud" (링크가 아직 없으면 "")
 * - videoId   : (유튜브용) 영상 ID
 * - url       : (사운드클라우드용) 트랙 주소
 * - thumb     : 목록에 뜨는 이미지 경로
 */

const SOUND = [
  // 잠시 숨김 — 다시 표시하려면 아래 주석(//)을 지우면 됩니다.
  // {
  //   id: "piano-as-aged-as-the-house",
  //   titleKo: "Piano as aged as the house",
  //   titleEn: "Piano as aged as the house",
  //   artist: "",
  //   year: 2025,
  //   yearLabel: "",
  //   note: "",
  //   type: "youtube",
  //   videoId: "x5iEssGprcs",
  //   url: "",
  //   thumb: "",
  // },

  {
    id: "nightmare-long-bridge",
    titleKo: "긴 다리의 악몽",
    titleEn: "A Nightmare with a Long Bridge",
    artist: "김윤서",
    year: 2026,
    yearLabel: "",
    note: "《Palm to Palm》",
    type: "soundcloud",
    videoId: "",
    url: "https://soundcloud.com/bso3n1ctm3cb/a-nightmare-with-a-long-bridge",
    thumb: "images/sound/Nightmare.jpg",
  },

  {
    id: "the-esquisse-for-sun",
    titleKo: "the esquisse for sun",
    titleEn: "the esquisse for sun",
    artist: "장햇빛",
    year: 2025,
    yearLabel: "",
    note: "",
    type: "soundcloud",
    videoId: "",
    url: "https://soundcloud.com/bso3n1ctm3cb/the-esquisse",
    thumb: "images/sound/esquisse.jpg",
  },

  {
    id: "pas-de-deux",
    titleKo: "Pas de deux",
    titleEn: "Pas de deux",
    artist: "이지현",
    year: 2025,
    yearLabel: "",
    note: "",
    type: "soundcloud",
    videoId: "",
    url: "https://soundcloud.com/bso3n1ctm3cb/pas-de-deux-solide",
    thumb: "images/sound/Pas.jpg",
  },

  // ↓ 새 작업을 추가할 때는 위 객체를 복사해서 이 자리에 붙여넣고 내용만 바꾸면 됩니다.
];
