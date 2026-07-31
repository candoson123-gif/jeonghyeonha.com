/*
 * movement-data.js
 * ★ 새 장소를 추가할 때는 이 파일에 객체 하나만 추가하면 됩니다.
 *   movement.html은 이 배열을 읽어서 목록과 (클릭 시 열리는) 사진 행을 자동으로 만듭니다.
 *   새 HTML 파일을 만들 필요가 없습니다.
 *
 * 필드 설명
 * - id           : 영문/숫자, 고유 값이면 됩니다
 * - year         : 촬영/방문 연도. 목록에 "연도 이름(Name)" 형식으로 표시됩니다.
 * - nameKo/nameEn: 장소 이름
 * - photos       : 클릭 시 가로로 나열될 사진 배열. 각 사진은
 *                  { src, captionKo, captionEn } — 캡션은 없으면 빈 문자열로 두면 됩니다.
 *                  사진 파일은 images/movement/ 폴더에 넣어주세요.
 */

const LOCATIONS = [
  {
    id: "gureopdo",
    year: 2026,
    nameKo: "굴업도",
    nameEn: "Gureopdo",
    photos: [
      { src: "images/movement/gureopdo-01.jpg", captionKo: "", captionEn: "" },
      { src: "images/movement/gureopdo-02.jpg", captionKo: "", captionEn: "" },
      { src: "images/movement/gureopdo-03.jpg", captionKo: "", captionEn: "" },
      { src: "images/movement/gureopdo-04.jpg", captionKo: "", captionEn: "" },
      { src: "images/movement/gureopdo-05.jpg", captionKo: "", captionEn: "" },
      { src: "images/movement/gureopdo-06.jpg", captionKo: "", captionEn: "" },
      { src: "images/movement/gureopdo-07.jpg", captionKo: "", captionEn: "" },
    ],
  },
  {
    id: "busan-museum",
    year: 2026,
    nameKo: "부산박물관",
    nameEn: "Busan Museum",
    photos: [
      { src: "images/movement/busan-museum-01.jpg", captionKo: "", captionEn: "" },
      { src: "images/movement/busan-museum-02.jpg", captionKo: "", captionEn: "" },
      { src: "images/movement/busan-museum-03.jpg", captionKo: "", captionEn: "" },
      { src: "images/movement/busan-museum-04.jpg", captionKo: "", captionEn: "" },
      { src: "images/movement/busan-museum-05.jpg", captionKo: "", captionEn: "" },
      { src: "images/movement/busan-museum-06.jpg", captionKo: "", captionEn: "" },
      { src: "images/movement/busan-museum-07.jpg", captionKo: "", captionEn: "" },
      { src: "images/movement/busan-museum-08.jpg", captionKo: "", captionEn: "" },
      { src: "images/movement/busan-museum-09.jpg", captionKo: "", captionEn: "" },
    ],
  },
  {
    id: "euljiro-sewoon",
    year: 2026,
    nameKo: "을지로 세운상가",
    nameEn: "Euljiro Sewoon Sangga",
    photos: [
      { src: "images/movement/euljiro-sewoon-01.jpg", captionKo: "", captionEn: "" },
      { src: "images/movement/euljiro-sewoon-02.jpg", captionKo: "", captionEn: "" },
      { src: "images/movement/euljiro-sewoon-03.jpg", captionKo: "", captionEn: "" },
      { src: "images/movement/euljiro-sewoon-04.jpg", captionKo: "", captionEn: "" },
      { src: "images/movement/euljiro-sewoon-05.jpg", captionKo: "", captionEn: "" },
      { src: "images/movement/euljiro-sewoon-06.jpg", captionKo: "", captionEn: "" },
    ],
  },
  // ↓ 새 장소를 추가할 때는 위 객체를 복사해서 이 자리에 붙여넣고 내용만 바꾸면 됩니다.
];

function getLocationById(id) {
  return LOCATIONS.find((l) => l.id === id);
}
