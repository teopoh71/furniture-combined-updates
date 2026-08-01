(() => {
  const products = [
    ...(Array.isArray(window.HAIYIJIA_PRODUCTS) ? window.HAIYIJIA_PRODUCTS : []),
    ...(Array.isArray(window.HAIYIJIA_LEISURE_PRODUCTS) ? window.HAIYIJIA_LEISURE_PRODUCTS : []),
  ];
  const labels = {
    all: "全部产品",
    "full-leather": "全皮专区",
    other: "其他皮料",
    chair: "餐椅 · 马鞍椅 · 休闲椅 · 吧椅",
    "tea-chair": "茶椅 · 茶凳",
    "leisure-chair": "休闲椅系列 · 4.28 报价表",
    classic: "经典老款",
  };
  const styleLabels = {
    "all-style": "全部款式",
    dining: "餐椅",
    tea: "茶椅",
    bar: "吧椅",
    single: "单椅",
    saddle: "马鞍椅",
    leisure: "休闲椅",
    table: "桌几",
    classic: "经典单椅",
  };
  const state = { filter: "all", style: "all-style", query: "", limit: 48 };
  const grid = document.querySelector("#productGrid");
  const searchInput = document.querySelector("#searchInput");
  const clearSearch = document.querySelector("#clearSearch");
  const loadSentinel = document.querySelector("#loadSentinel");
  const emptyState = document.querySelector("#emptyState");
  const resultCount = document.querySelector("#resultCount");
  const catalogTitle = document.querySelector("#catalogTitle");
  const dialog = document.querySelector("#productDialog");

  const CHAIR_RETAIL_MULTIPLIER = 2.8;

  const retailChairPrice = (rawPrice) => String(rawPrice).replace(/\d+(?:\.\d+)?/g, (value, offset, fullText) => {
    const number = Number(value);
    // Keep material grades such as "2.0生态皮" unchanged; prices and option add-ons
    // are whole-number amounts in the supplier price sheet.
    if (!Number.isFinite(number) || (number < 100 && value.includes(".") && /[\u4e00-\u9fff]/.test(fullText.slice(offset + value.length, offset + value.length + 4)))) {
      return value;
    }
    const retail = number * CHAIR_RETAIL_MULTIPLIER;
    return Number.isInteger(retail) ? String(retail) : retail.toFixed(2).replace(/\.00$/, "");
  });

  const priceText = (product) => {
    const raw = String(product.price || "").trim().replace(/[\r\n]+/g, " / ");
    if (!raw) return "价格待确认";
    return `¥ ${productStyle(product) === "table" ? raw : retailChairPrice(raw)}`;
  };

  const normalized = (value) => String(value || "").toLowerCase().replace(/\s+/g, "");
  const stockLabel = (product) => {
    const value = String(product.stockClass || "").toUpperCase();
    if (value.includes("A")) return "有货";
    if (value.includes("B")) return "低库存";
    if (value.includes("C")) return "缺货";
    return "未分数量";
  };
  const productStyle = (product) => {
    const text = [product.model, product.material, product.spec, product.colors, product.code].join(" ");
    if (product.sourceSection === "leisure-chair") return "leisure";
    if (/吧椅|吧凳|高脚|升降|坐高6\d|坐高7\d/.test(text) || /^YA8\d{2}$/i.test(product.model || "")) return "bar";
    if (/马鞍/.test(text)) return "saddle";
    if (/休闲|躺椅|摇椅|转椅|旋转|单人沙发/.test(text)) return "leisure";
    if (product.sourceSection === "tea-chair" || /茶椅|茶凳/.test(text)) return "tea";
    if (/台面|餐桌|茶几|边几|洽谈桌|岩板|大理石|微晶石/.test(text)) return "table";
    if (product.sourceSection === "chair" && /1张1箱/.test(product.spec || "")) return "single";
    if (product.sourceSection === "chair") return "dining";
    return "classic";
  };
  const filteredProducts = () => products.filter((product) => {
    const matchesFilter = state.filter === "all" || product.materialGroup === state.filter;
    const matchesStyle = state.style === "all-style" || productStyle(product) === state.style;
    if (!matchesFilter || !matchesStyle) return false;
    if (!state.query) return true;
    const haystack = normalized([product.model, product.colors, product.material, product.spec, product.code].join(" "));
    return haystack.includes(normalized(state.query));
  });

  const productCard = (product, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "product-card";
    button.style.animationDelay = `${Math.min(index, 12) * 24}ms`;
    const badge = styleLabels[productStyle(product)];
    button.innerHTML = `
      <span class="product-image">
        <img src="${product.image}" alt="${product.model}" loading="lazy" decoding="async" />
        <span class="product-badge ${product.materialGroup}">${badge}</span>
      </span>
      <span class="product-info">
        <strong class="product-model">${product.model}</strong>
        <span class="product-price">${priceText(product)}</span>
        <span class="product-stock">${stockLabel(product)}</span>
        <span class="product-material">${product.material || "材质以订单为准"}</span>
      </span>`;
    button.addEventListener("click", () => openProduct(product));
    return button;
  };

  const render = () => {
    const matched = filteredProducts();
    const visible = matched.slice(0, state.limit);
    grid.replaceChildren(...visible.map(productCard));
    resultCount.textContent = String(matched.length);
    const materialTitle = state.filter === "all" ? "" : labels[state.filter];
    const styleTitle = state.style === "all-style" ? "" : styleLabels[state.style];
    catalogTitle.textContent = state.query
      ? `搜索“${state.query}”`
      : [materialTitle, styleTitle].filter(Boolean).join(" · ") || "全部产品";
    emptyState.hidden = matched.length !== 0;
    loadSentinel.hidden = visible.length >= matched.length;
  };

  const openProduct = (product) => {
    document.querySelector("#dialogImage").src = product.image;
    document.querySelector("#dialogImage").alt = product.model;
    document.querySelector("#dialogBadge").textContent = product.materialGroup === "full-leather" ? "全皮专区" : "其他皮料";
    document.querySelector("#dialogSection").textContent = labels[product.sourceSection] || "嗨一家产品";
    document.querySelector("#dialogModel").textContent = product.model;
    document.querySelector("#dialogPrice").textContent = priceText(product);
    document.querySelector("#dialogStyle").textContent = styleLabels[productStyle(product)];
    document.querySelector("#dialogMaterial").textContent = product.material || "以订单为准";
    document.querySelector("#dialogColors").textContent = product.colors || "常规产品";
    document.querySelector("#dialogSpec").textContent = product.spec || "以订单为准";
    document.querySelector("#dialogStock").textContent = product.stockClass || "未分类";
    dialog.showModal();
  };

  document.querySelectorAll("[data-filter]").forEach((button) => {
    const count = products.filter((product) => button.dataset.filter === "all" || product.materialGroup === button.dataset.filter).length;
    button.querySelector("[data-count]").textContent = `${count} 款`;
    button.addEventListener("click", () => {
      state.filter = button.dataset.filter;
      state.limit = 48;
      document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("active", item === button));
      updateStyleCounts();
      render();
      document.querySelector(".catalog").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const updateStyleCounts = () => {
    const materialProducts = products.filter((product) => state.filter === "all" || product.materialGroup === state.filter);
    document.querySelectorAll("[data-style]").forEach((button) => {
      const count = materialProducts.filter((product) => button.dataset.style === "all-style" || productStyle(product) === button.dataset.style).length;
      button.querySelector("[data-style-count]").textContent = String(count);
    });
  };

  document.querySelectorAll("[data-style]").forEach((button) => {
    button.addEventListener("click", () => {
      state.style = button.dataset.style;
      state.limit = 48;
      document.querySelectorAll("[data-style]").forEach((item) => item.classList.toggle("active", item === button));
      render();
      document.querySelector(".catalog").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  searchInput.addEventListener("input", () => { state.query = searchInput.value.trim(); state.limit = 48; render(); });
  clearSearch.addEventListener("click", () => { searchInput.value = ""; state.query = ""; render(); searchInput.focus(); });
  const loadObserver = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    const matched = filteredProducts();
    if (state.limit >= matched.length) return;
    state.limit += 48;
    render();
  }, { rootMargin: "640px 0px" });
  loadObserver.observe(loadSentinel);
  document.querySelector("#closeDialog").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  document.querySelector("#scrollTopButton").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  updateStyleCounts();
  render();
})();
