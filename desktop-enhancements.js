(() => {
  const sourceImage = document.querySelector("#dialogImage");
  if (!sourceImage) return;

  const viewer = document.createElement("dialog");
  viewer.className = "desktop-image-viewer";
  viewer.innerHTML = `
    <button class="desktop-zoom-close" type="button" aria-label="关闭大图">×</button>
    <div class="desktop-zoom-stage"><img alt="产品高清大图"></div>
    <div class="desktop-zoom-controls">
      <button type="button" data-zoom="-1" aria-label="缩小">−</button>
      <span>100%</span>
      <button type="button" data-zoom="1" aria-label="放大">＋</button>
    </div>`;
  document.body.append(viewer);

  const image = viewer.querySelector("img");
  const stage = viewer.querySelector(".desktop-zoom-stage");
  const level = viewer.querySelector(".desktop-zoom-controls span");
  let scale = 1;
  let panX = 0;
  let panY = 0;
  let dragging = null;

  const apply = () => {
    image.style.transform = `translate3d(${panX}px, ${panY}px, 0) scale(${scale})`;
    level.textContent = `${Math.round(scale * 100)}%`;
  };

  const setScale = (next) => {
    scale = Math.min(4, Math.max(1, next));
    if (scale === 1) {
      panX = 0;
      panY = 0;
    }
    apply();
  };

  sourceImage.title = "点击查看高清大图";
  sourceImage.addEventListener("click", () => {
    image.src = sourceImage.currentSrc || sourceImage.src;
    image.alt = sourceImage.alt;
    scale = 1;
    panX = 0;
    panY = 0;
    apply();
    viewer.showModal();
  });

  viewer.querySelector(".desktop-zoom-close").addEventListener("click", () => viewer.close());
  viewer.querySelectorAll("[data-zoom]").forEach((button) => {
    button.addEventListener("click", () => setScale(scale + Number(button.dataset.zoom) * .5));
  });
  image.addEventListener("dblclick", () => setScale(scale === 1 ? 2.5 : 1));
  stage.addEventListener("wheel", (event) => {
    event.preventDefault();
    setScale(scale + (event.deltaY < 0 ? .25 : -.25));
  }, { passive: false });
  stage.addEventListener("pointerdown", (event) => {
    if (scale === 1) return;
    dragging = { x: event.clientX, y: event.clientY, panX, panY };
    stage.setPointerCapture(event.pointerId);
  });
  stage.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    panX = dragging.panX + event.clientX - dragging.x;
    panY = dragging.panY + event.clientY - dragging.y;
    apply();
  });
  stage.addEventListener("pointerup", () => { dragging = null; });
  stage.addEventListener("pointercancel", () => { dragging = null; });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && viewer.open) viewer.close();
  });
})();
