/*
 * pdf-reader.js
 * PDF를 한 장씩 보여주고, 좌우 화살표(스와이프/방향키 포함)로 넘겨서 읽는 뷰어입니다.
 * works-data.js의 작업에 pdf: "files/파일명.pdf" 를 넣으면 상세 화면에 자동으로 나타납니다.
 */

const PDFJS_SRC = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const PDFJS_WORKER = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

function loadPdfJs(cb) {
  if (window.pdfjsLib) return cb();
  const el = document.createElement("script");
  el.src = PDFJS_SRC;
  el.onload = () => {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
    cb();
  };
  document.head.appendChild(el);
}

function mountPdfReader(el) {
  const url = el.dataset.pdf;
  if (!url) return;

  el.innerHTML =
    '<div class="pdf-stage"><canvas></canvas></div>' +
    '<div class="pdf-nav">' +
    '<button type="button" class="pdf-prev" aria-label="previous page">\u2039</button>' +
    '<span class="pdf-count">\u2026</span>' +
    '<button type="button" class="pdf-next" aria-label="next page">\u203a</button>' +
    "</div>";

  const stage = el.querySelector(".pdf-stage");
  const canvas = el.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const countEl = el.querySelector(".pdf-count");

  let doc = null;
  let page = 1;
  let rendering = false;
  let pending = null;

  function draw(n) {
    if (!doc) return;
    if (rendering) {
      pending = n;
      return;
    }
    rendering = true;
    doc.getPage(n).then((pg) => {
      const base = pg.getViewport({ scale: 1 });
      const maxW = stage.clientWidth || 800;
      const maxH = window.innerHeight * 0.72;
      const scale = Math.min(maxW / base.width, maxH / base.height);
      const vp = pg.getViewport({ scale: scale * (window.devicePixelRatio || 1) });

      canvas.width = vp.width;
      canvas.height = vp.height;
      canvas.style.width = base.width * scale + "px";
      canvas.style.height = base.height * scale + "px";

      pg.render({ canvasContext: ctx, viewport: vp }).promise.then(() => {
        rendering = false;
        countEl.textContent = n + " / " + doc.numPages;
        if (pending !== null) {
          const next = pending;
          pending = null;
          draw(next);
        }
      });
    });
  }

  function go(delta) {
    if (!doc) return;
    const next = Math.min(Math.max(page + delta, 1), doc.numPages);
    if (next === page) return;
    page = next;
    draw(page);
  }

  el.querySelector(".pdf-prev").addEventListener("click", () => go(-1));
  el.querySelector(".pdf-next").addEventListener("click", () => go(1));

  el.tabIndex = 0;
  el.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
  });

  let startX = null;
  stage.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX), { passive: true });
  stage.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    startX = null;
  }, { passive: true });

  window.addEventListener("resize", () => draw(page));

  loadPdfJs(() => {
    window.pdfjsLib.getDocument(url).promise.then((d) => {
      doc = d;
      draw(page);
    });
  });
}
