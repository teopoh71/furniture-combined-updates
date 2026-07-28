(() => {
  const labelMap = {
    all: "默认",
    stockDesc: "数量多",
    stockAsc: "数量少",
    model: "型号",
  };
  let mode = "all";

  const dock = document.createElement("div");
  dock.className = "sort-dock";
  dock.innerHTML = `
    <button class="sort-toggle" type="button" aria-expanded="false">
      <span>数量</span><strong>默认</strong>
    </button>
    <div class="sort-menu" hidden>
      <button type="button" data-sort-mode="all">默认顺序</button>
      <button type="button" data-sort-mode="stockDesc">数量多到少</button>
      <button type="button" data-sort-mode="stockAsc">数量少到多</button>
      <button type="button" data-sort-mode="model">型号排序</button>
    </div>`;
  document.body.appendChild(dock);

  const rank = (card) => {
    const text = card.textContent || "";
    if (/A类|有货/.test(text)) return 3;
    if (/B类|低库存/.test(text)) return 2;
    if (/C类|缺货/.test(text)) return 1;
    return 0;
  };
  const model = (card) => card.querySelector(".product-model")?.textContent || "";
  const reorder = () => {
    const grid = document.querySelector("#productGrid");
    if (!grid || mode === "all") return;
    const cards = [...grid.children];
    cards.sort((a, b) => {
      if (mode === "stockDesc") return rank(b) - rank(a) || model(a).localeCompare(model(b), "zh-Hans-CN", { numeric: true });
      if (mode === "stockAsc") return rank(a) - rank(b) || model(a).localeCompare(model(b), "zh-Hans-CN", { numeric: true });
      return model(a).localeCompare(model(b), "zh-Hans-CN", { numeric: true });
    });
    grid.replaceChildren(...cards);
  };

  const grid = document.querySelector("#productGrid");
  if (grid) new MutationObserver(reorder).observe(grid, { childList: true });

  dock.querySelector(".sort-toggle").addEventListener("click", () => {
    const menu = dock.querySelector(".sort-menu");
    menu.hidden = !menu.hidden;
    dock.querySelector(".sort-toggle").setAttribute("aria-expanded", String(!menu.hidden));
  });
  dock.querySelectorAll("[data-sort-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      mode = button.dataset.sortMode;
      dock.querySelector("strong").textContent = labelMap[mode] || "默认";
      dock.querySelector(".sort-menu").hidden = true;
      dock.querySelector(".sort-toggle").setAttribute("aria-expanded", "false");
      reorder();
    });
  });
  document.addEventListener("click", (event) => {
    if (!dock.contains(event.target)) {
      dock.querySelector(".sort-menu").hidden = true;
      dock.querySelector(".sort-toggle").setAttribute("aria-expanded", "false");
    }
  });
})();
