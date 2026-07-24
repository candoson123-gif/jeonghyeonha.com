/*
 * works-data.js
 * ★ 새 작품을 추가할 때는 이 파일에 객체 하나만 추가하면 됩니다.
 *   works.html(목록), work.html(상세) 페이지는 이 배열을 읽어서 자동으로 만들어집니다.
 *   새 HTML 파일을 만들 필요가 없습니다.
 *
 * 필드 설명
 * - id            : 영문/숫자, URL에 쓰이는 고유 값 (work.html?id=이값)
 * - titleKo/titleEn
 * - year          : 목록의 연도 탭 필터링에 사용
 * - medium        : 매체 (예: "Single-channel video, C-print")
 * - size          : 전시 사이즈 (없으면 "")
 * - duration      : 영상 러닝타임 (없으면 "")
 * - thumb         : 목록에 쓰일 썸네일 이미지 경로
 * - images        : 상세 페이지에 세로로 나열될 이미지 경로 배열
 * - video         : { type: "vimeo" | "youtube", id: "숫자ID", hash: "비공개 링크의 h= 값(선택)" } — 영상이 없으면 null
 * - statementKo/statementEn : 작품 설명 (줄바꿈은 그대로 유지됨)
 */

const WORKS = [
  {
    id: "mirihyeonhaneun-gangsan",
    titleKo: "미리 변하는 강산",
    titleEn: "The Ever-Changing Rivers and Mountains",
    year: 2025, // 연도 탭 필터링 기준 (아래 yearLabel로 "2024-2025" 표기)
    yearLabel: "2024–2025",
    medium: "Single channel video, HD (16:9), stereo",
    size: "",
    duration: "15min 12sec",
    thumb: "images/works/gangsan-thumb.jpg", // 보내주신 스틸컷에서 3:2로 크롭한 썸네일
    images: ["images/works/gangsan-01.jpg"], // 보내주신 스틸컷 원본 (스캔/포토그래메트리 컷)
    // ★ 이미지를 더 추가하려면 images 배열에 경로를 더 넣어주세요. 새 작품 이미지는 images/works/ 폴더에 넣어주세요.
    video: { type: "youtube", id: "tA_MorDDKtI", hash: "" },
    statementKo:
      "재개발 지역 근교의 천, 표면이 찢어지고 바래진 낡은 강산의 모습이 보인다. 하수 시설의 벽에 붙은 강산의 사진은 민족적 의미에서 탈피하여 도외시되어 있는 상태로 존재한다. 강산은 과거 마을을 구분하는 지리적 경계이자 그 자체로 측량할 수 없는 '자연'이었다. 그러나 식민지화의 과정에서 제작된 지도 속 강산은 근대의 기입물이 된다. 그럼에도 여전히 강물은 예상하지 못한 방향에서 흘러들어온다. 정해진 배관의 경로를 이탈해 집 천장으로 들어온 물은 그러한 강산의 먼 기원을 상상하는 계기가 된다. 지도를 제작한 측량사의 손짓에는 오차가 존재하고 그 미세한 틈으로 침입하는 시간은 어떻게 기념할 수 있을까. 고장난 피아노와 낡은 집 그리고 흩어지는 동네의 사람들은 이야기가 될 수 있을까.",
    statementEn:
      "A stream on the outskirts of a redevelopment site: its surface torn, faded, worn thin — an aging image of rivers and mountains. A photograph of that same land, fixed to the wall of a drainage facility, exists estranged from any national meaning, cast aside and overlooked. Rivers and mountains once marked the geographic boundaries between villages, an unmeasurable 'nature' in their own right. But in the maps drawn through the process of colonization, they became inscriptions of modernity. And yet water still flows in from unexpected directions. Water that strays from its designated pipeline and seeps into the ceiling of a house becomes an occasion to imagine the land's distant origins. There is always some margin of error in the hand of the surveyor who made the map — so how might we commemorate the time that infiltrates through that faint crack? Can a broken piano, an aging house, and the townspeople drifting apart become a story?",
  },

  // ↓ 새 작품을 추가할 때는 위 객체를 복사해서 이 자리에 붙여넣고 내용만 바꾸면 됩니다.
];

// year 목록 (내림차순, 중복 제거)
const WORK_YEARS = [...new Set(WORKS.map((w) => w.year))].sort((a, b) => b - a);

function getWorkById(id) {
  return WORKS.find((w) => w.id === id);
}

function getRelatedWorks(work, count = 3) {
  return WORKS.filter((w) => w.id !== work.id && w.year === work.year)
    .concat(WORKS.filter((w) => w.id !== work.id && w.year !== work.year))
    .slice(0, count);
}
