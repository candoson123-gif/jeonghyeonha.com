# 포트폴리오 사이트 — 시작 템플릿

정적 HTML/CSS/JS로만 만든 사이트라 별도 서버나 빌드 도구 없이 그대로 호스팅할 수 있습니다.

## 폴더 구조

```
site/
  index.html          Home
  works.html          Works 목록 (연도 탭 + 그리드)
  work.html           Works 상세 (works-data.js를 읽어 자동 생성)
  movement.html       Movement — 장소 이름을 클릭하면 그 자리에서 사진이 열리고 닫힘 (아코디언, 한 번에 하나만 열림)
  sound.html          Sound 목록 (연도 탭 + 그리드, Works와 동일한 구조)
  sound-detail.html   Sound 상세 (sound-data.js를 읽어 자동 생성)
  research.html       Research
  cv.html             CV
  contact.html        Contact
  css/style.css        전체 스타일
  js/common.js          상단 내비게이션·하단 푸터, 작가명/이메일/SNS 설정
  js/lang.js             한/영 전환
  js/works-data.js       ★ 작품 데이터 (여기만 수정하면 Works 목록/상세에 자동 반영)
  js/works.js             works.html 렌더링
  js/work-detail.js       work.html 렌더링
  js/movement-data.js    ★ 장소별 사진 데이터 (여기만 수정하면 Movement에 자동 반영)
  js/movement.js           movement.html 렌더링 (아코디언)
  js/sound-data.js       ★ 사운드 작업 데이터 (여기만 수정하면 Sound 목록/상세에 자동 반영)
  js/sound.js              sound.html 렌더링
  js/sound-detail.js       sound-detail.html 렌더링
  js/video-embed.js      영상 클릭 후 재생 처리
  images/works/        Works 이미지
  images/movement/     Movement 이미지
  images/sound/         Sound 이미지
  images/site/           홈 히어로, Research 노트 등 페이지 공용 이미지
  files/cv.pdf          CV PDF (현재 페이지에는 다운로드 링크로 노출되지 않음)
```

`about.html` 파일은 폴더에 남아있지만 메뉴에서는 빠져있습니다 (필요하면 `js/common.js`의 `NAV_ITEMS`에 다시 추가하면 됩니다).

## 가장 먼저 할 일

1. `js/common.js` 맨 위 `SITE` 객체에 실제 작가명, 이메일, Instagram/Vimeo 주소를 입력하세요.
2. `files/cv.pdf`를 실제 이력서 PDF로 교체하세요.
3. `contact.html`의 폼 `action="https://formspree.io/f/YOUR_FORM_ID"`를 [Formspree](https://formspree.io)(무료 티어 있음)에서 발급받은 주소로 바꿔야 문의 폼이 실제로 이메일을 보냅니다. 폼이 필요 없으면 `<form>...</form>` 블록을 지우고 이메일 링크만 남겨도 됩니다.

## 자료를 지속적으로 추가하는 법 (Works / Movement / Sound 공통)

세 섹션 모두 같은 방식으로 동작합니다 — **이미지 파일을 정해진 폴더에 넣고, 해당 데이터 파일에 정보 한 덩어리를 추가**하면 끝입니다. 새 HTML 파일을 만들 필요가 없습니다.

**추천하는 준비 방법**: 새 작업/장소가 생기면, 로컬 컴퓨터에서 아래처럼 종류별·이름별 폴더로 사진을 미리 정리해서 Claude와의 대화에 연결된 폴더에 넣어주세요. 그러면 어떤 작업/장소의 사진인지 헷갈리지 않고 바로 반영할 수 있습니다.

```
(연결된 폴더)/
  Works/작품명/       예: Works/새작품/스틸컷1.jpg …
  Movement/장소명/    예: Movement/제주도/사진1.jpg …
  Sound/작업명/       예: Sound/새작업/사진1.jpg …
```

폴더를 만들어 넣어주신 뒤 "○○ 폴더에 넣었어" 라고 알려주시면, 사진을 웹에 맞게 리사이즈해서 아래 폴더에 넣고 데이터 파일도 함께 수정해드립니다.

### Works 추가 — `js/works-data.js`

이미지는 `images/works/` 폴더에 넣고, `WORKS` 배열에 아래 형태로 객체를 추가하세요.

```js
{
  id: "새-작품-고유id",
  titleKo: "제목",
  titleEn: "Title",
  year: 2026,
  medium: "매체",
  size: "사이즈 (없으면 빈 문자열)",
  duration: "러닝타임 (없으면 빈 문자열)",
  thumb: "images/works/파일명.jpg",
  images: ["images/works/파일명1.jpg", "images/works/파일명2.jpg"],
  video: { type: "vimeo", id: "비디오ID", hash: "비공개 링크 h값(선택)" }, // 영상 없으면 null
  statementKo: "작품 설명",
  statementEn: "Artist statement",
}
```

### Movement 추가 — `js/movement-data.js`

이미지는 `images/movement/` 폴더에 넣고, `LOCATIONS` 배열에 아래 형태로 객체를 추가하세요.
목록에는 "연도 장소이름(Location Name)" 형식으로 표시되고, 클릭하면 사진이 가로로 나열됩니다 (한 번에 하나의 장소만 열림).

```js
{
  id: "새-장소-고유id",
  year: 2026,
  nameKo: "장소 이름",
  nameEn: "Location Name",
  photos: [
    { src: "images/movement/파일명1.jpg", captionKo: "", captionEn: "" },
  ],
}
```

### Sound 추가 — `js/sound-data.js`

Works와 완전히 동일한 구조입니다 (목록/상세 페이지 레이아웃도 동일). 이미지는 `images/sound/` 폴더에 넣고, `SOUND` 배열에 아래 형태로 객체를 추가하세요.

```js
{
  id: "새-작업-고유id",
  titleKo: "제목",
  titleEn: "Title",
  year: 2026,
  medium: "매체 (예: Sound installation, stereo)",
  size: "",
  duration: "",
  thumb: "images/sound/파일명.jpg",
  images: ["images/sound/파일명.jpg"],
  video: { type: "vimeo", id: "비디오ID", hash: "" }, // 없으면 null
  statementKo: "",
  statementEn: "",
}
```

`SOUND` 배열이 비어 있는 동안(현재 상태)은 Sound 페이지에 "아직 등록된 사운드 작업이 없습니다" 안내 문구만 표시됩니다.

## 로컬에서 미리보기

더블클릭으로 `index.html`을 열어도 대부분 동작하지만, 일부 브라우저는 로컬 파일에서 fetch를 제한할 수 있습니다.
문제가 있으면 터미널에서 이 폴더로 이동한 뒤:

```
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000` 접속.

## 배포 (무료)

가장 간단한 방법 — [Netlify Drop](https://app.netlify.com/drop)에 이 `site` 폴더를 통째로 드래그 앤 드롭하면 즉시 URL이 생깁니다.
이후 Netlify 설정에서 원하는 도메인(구매한 커스텀 도메인)을 연결할 수 있습니다.

GitHub Pages를 쓰고 싶다면: 이 폴더 내용을 GitHub 저장소에 올리고, 저장소 설정의 Pages 메뉴에서 배포하면 됩니다.

## 영상

- 홈 트레일러와 작품/사운드 상세의 영상은 클릭해야 재생되는 방식입니다 (모바일 데이터 절약, 로딩 속도 개선).
- Vimeo 무료/Starter 플랜의 공개 영상 ID를 그대로 넣으면 됩니다.
- 비공개(unlisted) 링크는 Vimeo 공유 설정에서 "도메인 제한 없음 + 비공개" 링크를 만들면 URL에 `?h=` 뒤 값이 붙는데, 그 값을 `hash` 필드에 넣으세요.
