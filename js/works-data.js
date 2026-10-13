/*
 * works-data.js
 * ★ 새 작품을 추가할 때는 이 파일에 객체 하나만 추가하면 됩니다.
 *   works.html(목록), work.html(상세) 페이지는 이 배열을 읽어서 자동으로 만들어집니다.
 *   새 HTML 파일을 만들 필요가 없습니다.
 *
 * 필드 설명
 * - id            : 영문/숫자, URL에 쓰이는 고유 값 (work.html?id=이값)
 * - titleKo/titleEn
 * - year          : 상세 모달의 메타 정보(연도)에 표시됨 (목록 화면에는 연도 탭 없음)
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
    id: "farewell",
    category: "film-video",
    titleKo: "Farewell",
    titleEn: "Farewell",
    year: 2026,
    yearLabel: "",
    medium: "Single channel video, HD (16:9), silent",
    size: "",
    duration: "5'55\"",
    thumb: "",
    images: [
      "images/works/farewell-01.jpg",
      "images/works/farewell-02.jpg",
      "images/works/farewell-03.jpg",
    ],
    video: null,
    statementKo: "",
    statementEn: "",
  },

  {
    id: "mul-geonneogan-geotdeul",
    category: "film-video",
    titleKo: "물 건너간 것들",
    titleEn: "Things That Have Sailed",
    year: 2026,
    yearLabel: "",
    medium: "Single channel video with photo, HD(16:9), live streaming in shitchu",
    size: "",
    duration: "",
    thumb: "",
    images: [
      "images/works/sea-01.jpg",
      "images/works/sea-02.jpg",
      "images/works/sea-03.jpg",
      "images/works/sea-04.jpg",
      "images/works/sea-05.jpg",
      "images/works/sea-06.jpg",
    ],
    video: null,
    statementKo: "",
    statementEn: "",
  },

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
    images: [
      "images/works/gangsan-01.jpg",
      "images/works/gangsan-02.jpg",
      "images/works/gangsan-03.jpg",
      "images/works/gangsan-04.jpg",
      "images/works/gangsan-05.jpg",
      "images/works/gangsan-06.jpg",
    ], // 보내주신 스틸컷 원본 (스캔/포토그래메트리 컷)
    // ★ 이미지를 더 추가하려면 images 배열에 경로를 더 넣어주세요. 새 작품 이미지는 images/works/ 폴더에 넣어주세요.
    video: { type: "vimeo", id: "1235261765", hash: "" },
    statementKo:
      "재개발 지역 근교의 천, 표면이 찢어지고 바래진 낡은 강산의 모습이 보인다. 하수 시설의 벽에 붙은 강산의 사진은 민족적 의미에서 탈피하여 도외시되어 있는 상태로 존재한다. 강산은 과거 마을을 구분하는 지리적 경계이자 그 자체로 측량할 수 없는 '자연'이었다. 그러나 식민지화의 과정에서 제작된 지도 속 강산은 근대의 기입물이 된다. 그럼에도 여전히 강물은 예상하지 못한 방향에서 흘러들어온다. 정해진 배관의 경로를 이탈해 집 천장으로 들어온 물은 그러한 강산의 먼 기원을 상상하는 계기가 된다. 지도를 제작한 측량사의 손짓에는 오차가 존재하고 그 미세한 틈으로 침입하는 시간은 어떻게 기념할 수 있을까. 고장난 피아노와 낡은 집 그리고 흩어지는 동네의 사람들은 이야기가 될 수 있을까.",
    statementEn:
      "A stream on the outskirts of a redevelopment site: its surface torn, faded, worn thin — an aging image of rivers and mountains. A photograph of that same land, fixed to the wall of a drainage facility, exists estranged from any national meaning, cast aside and overlooked. Rivers and mountains once marked the geographic boundaries between villages, an unmeasurable 'nature' in their own right. But in the maps drawn through the process of colonization, they became inscriptions of modernity. And yet water still flows in from unexpected directions. Water that strays from its designated pipeline and seeps into the ceiling of a house becomes an occasion to imagine the land's distant origins. There is always some margin of error in the hand of the surveyor who made the map — so how might we commemorate the time that infiltrates through that faint crack? Can a broken piano, an aging house, and the townspeople drifting apart become a story?",
  },

  {
    id: "bit-nabang-geurigo-bit",
    titleKo: "빛, 나방 그리고 빛",
    titleEn: "Light, Moth and Light",
    year: 2025,
    yearLabel: "2025",
    medium: "Single-channel video, HD (16:9), stereo",
    size: "",
    duration: "21'15\"",
    thumb: "",
    images: [
      "images/works/moth-01.jpg",
      "images/works/moth-02.jpg",
      "images/works/moth-03.jpg",
      "images/works/moth-04.jpg",
      "images/works/moth-05.jpg",
    ],
    video: { type: "vimeo", id: "1235251809", hash: "" },
    statementKo: "",
    statementEn: "",
  },

  {
    id: "nat-jam",
    portrait: true,
    titleKo: "낮+잠",
    titleEn: "Day + Sleep",
    year: 2024,
    yearLabel: "2024",
    medium: "Single-channel video, HD (9:16)",
    size: "",
    duration: "6'25\"",
    thumb: "",
    images: [
      "images/works/doze-01.jpg",
      "images/works/doze-02.jpg",
      "images/works/doze-03.jpg",
      "images/works/doze-04.jpg",
      "images/works/doze-05.jpg",
    ],
    video: null,
    statementKo: "",
    statementEn: "",
  },

  {
    id: "release-a",
    titleKo: "릴리즈 A",
    titleEn: "Release A",
    year: 2023,
    yearLabel: "2023",
    medium: "Single-channel video, HD (16:9), stereo",
    size: "",
    duration: "11'57\"",
    thumb: "",
    images: [
      "images/works/relasea-02.jpg",
      "images/works/relasea-03.jpg",
      "images/works/relasea-04.jpg",
      "images/works/relasea-05.jpg",
      "images/works/relasea-06.jpg",
    ],
    video: { type: "vimeo", id: "1229593098", hash: "9916a70295" },
    statementKo: "",
    statementEn: "",
  },

  {
    id: "air-gun",
    category: "space",
    titleKo: "Air gun",
    titleEn: "Air gun",
    year: 2026,
    yearLabel: "",
    medium: "3-channel audio",
    size: "",
    duration: "11'10\", LDK",
    thumb: "",
    images: [
      "images/works/airgun-01.jpg",
      "images/works/airgun-02.jpg",
      "images/works/airgun-03.jpg",
      "images/works/airgun-04.jpg",
    ],
    video: { type: "vimeo", id: "1230230275", hash: "cbb54f9951" },
    creditsKo:
      "본 작업의 음향 자료는 극지연구소 나형술 박사님께서 제공해 주셨으며, 쇄빙연구선 아라온호의 극지 관측을 통해 수집되었습니다. 자료를 제공해 주신 나형술 박사님과 극지연구소에 깊이 감사드립니다.",
    creditsEn:
      "Underwater acoustic recordings used in this work were kindly provided by Dr. Hyoung Sul La (Korea Polar Research Institute, KOPRI), collected aboard the icebreaking research vessel Araon. The artist thanks Dr. La and KOPRI for their generous support.",
    statementKo: "",
    statementEn: "",
  },

  {
    id: "35-wires-36-strings",
    category: "space",
    titleKo: "35개의 철사와 36개의 줄",
    titleEn: "35 Wires and 36 Strings",
    year: 2024,
    yearLabel: "",
    medium: "제작 좌대 위에 오브제 설치 / A4 용지에 드로잉 전사",
    size: "",
    duration: "",
    portraitImages: ["images/works/line-02.jpg"],
    thumb: "",
    images: [
      "images/works/line-01.jpg",
      "images/works/line-02.jpg",
    ],
    video: null,
    statementKo: "",
    statementEn: "",
  },

  {
    id: "pirouette",
    category: "film-video",
    titleKo: "자기노출적 스크린 - 삐루엣",
    titleEn: "Self-Exposing Screen - Pirouette",
    year: "",
    yearLabel: "",
    medium: "",
    size: "",
    duration: "",
    thumb: "",
    images: [
      "images/works/pirouette-01.jpg",
      "images/works/pirouette-02.jpg",
      "images/works/pirouette-03.jpg",
      "images/works/pirouette-04.jpg",
    ],
    video: { type: "vimeo", id: "1230125379", hash: "bf18d00e2a" },
    statementKo: "",
    statementEn: "",
  },

  {
    id: "gyeonggye-sangsil-seoul",
    category: "space",
    titleKo: "경계를 상실한 서울을 위한 도해",
    titleEn: "Diagram for a Seoul That Has Lost Its Boundaries",
    year: 2022,
    yearLabel: "2022",
    medium: "Wood, component pallets, small-sized clamp",
    size: "Variable size",
    duration: "",
    thumb: "",
    images: [
      "images/works/diagram-01.jpg",
      "images/works/diagram-02.jpg",
    ],
    video: null,
    statementKo: "",
    statementEn: "",
  },

  {
    id: "geumida-geum",
    titleKo: "금이다 금!",
    titleEn: "Gold, It's Gold!",
    year: 2022,
    yearLabel: "2022",
    medium: "Video installation, HD (16:9)",
    size: "Dimensions variable",
    duration: "27'10\"",
    thumb: "",
    images: [
      "images/works/gold-01.jpg",
      "images/works/gold-02.jpg",
      "images/works/gold-03.jpg",
      "images/works/gold-04.jpg",
    ],
    video: { type: "vimeo", id: "1230124883", hash: "57c1c8738f" },
    statementKo: "",
    statementEn: "",
  },

  {
    id: "image-sourcing",
    titleKo: "Image Sourcing",
    titleEn: "Image Sourcing",
    year: 2022,
    yearLabel: "2022",
    medium: "Single-channel video (16:9), installed on a transparent acrylic pedestal",
    size: "",
    duration: "7'20\"",
    thumb: "",
    images: [
      "images/works/imagesourcing-01.jpg",
      "images/works/imagesourcing-02.jpg",
      "images/works/imagesourcing-03.jpg",
    ],
    video: { type: "vimeo", id: "1230127522", hash: "e7b9adfbd4" },
    statementKo: "",
    statementEn: "",
  },

  {
    id: "slology",
    category: "text",
    titleKo: "느림술",
    titleEn: "Slology",
    year: "",
    yearLabel: "",
    detailTitleKo: "느림술, 2025",
    detailTitleEn: "Slology, 2025",
    medium: "",
    size: "",
    duration: "",
    thumb: "",
    images: [],
    video: null,
    pdf: "files/slology.pdf",
    statementKo: "",
    statementEn: "",
  },

  {
    id: "atlas-of-tomorrow",
    category: "text",
    titleKo: "내일의 아틀라스: 표류하는 미술관, 예언하는 오네이로이",
    titleEn: "Atlas of Tomorrow: The Drifting Museum, the Prophesying Oneiroi",
    year: "",
    yearLabel: "",
    detailTitleKo: "내일의 아틀라스: 표류하는 미술관, 예언하는 오네이로이",
    detailTitleEn: "Atlas of Tomorrow: The Drifting Museum, the Prophesying Oneiroi",
    medium: "",
    size: "",
    duration: "",
    thumb: "",
    images: [],
    video: null,
    pdf: "files/재난과사이버공간.pdf",
    statementKo: "",
    statementEn: "",
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
