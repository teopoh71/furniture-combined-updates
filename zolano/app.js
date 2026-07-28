(() => {
  const rows = [
    ...(Array.isArray(window.BAIDU_ZOLANO_SOFA_DATA) ? window.BAIDU_ZOLANO_SOFA_DATA : []),
    ...(Array.isArray(window.BAIDU_ZOLANO_RECOMMENDED_COMBOS) ? window.BAIDU_ZOLANO_RECOMMENDED_COMBOS : []),
  ];

  (Array.isArray(window.BAIDU_ZOLANO_IMPORTED_SCREENSHOTS) ? window.BAIDU_ZOLANO_IMPORTED_SCREENSHOTS : []).forEach((group) => {
    (group.items || []).forEach((item, index) => {
      rows.push({
        id: `${group.series.replace(/[^A-Z0-9]/gi, "")}-${index}`,
        brand: "Zolano",
        series: group.series,
        model: group.series,
        configuration: item.configuration,
        description: item.dimensions,
        dimensions: item.dimensions,
        price: item.price || 0,
        priceOptions: [],
        materials: ["人民币待确认"],
        photo: group.photo,
        source: group.source,
        importedFromScreenshot: true,
        matchNote: group.matchNote,
        materialsText: group.materialsText,
      });
    });
  });

  const photoOverrides = window.BAIDU_PHOTO_OVERRIDES || {};
  const boardModules = window.BAIDU_ZOLANO_BOARD_MODULES || {};
  const boardModuleMap = window.BAIDU_ZOLANO_BOARD_MODULE_MAP || {};
  const IMPORT_FACTOR = 7.3 / 0.66;
  const RETAIL_MARKUP = 2.8;
  const state = { query: "", filter: "all", sort: "series" };
  const grid = document.querySelector("#grid");
  const search = document.querySelector("#searchInput");
  const count = document.querySelector("#resultCount");
  const sort = document.querySelector("#sortSelect");
  const dialog = document.querySelector("#dialog");

  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[char]));
  const norm = (value) => String(value || "").toLowerCase().replace(/[\s/_-]+/g, "");
  const money = (value) => {
    const number = Number(value);
    if (!Number.isFinite(number) || number <= 0) return "人民币待确认";
    return `¥ ${Math.round(number).toLocaleString("zh-CN")}`;
  };
  const itemPhoto = (item) => photoOverrides[item.series] || item.photo || "";
  const rawToRetail = (item, value) => {
    const raw = Number(value);
    if (!Number.isFinite(raw) || raw <= 0) return 0;
    const factor = Number(item?.priceFactor);
    const importFactor = Number.isFinite(factor) && factor > 0 ? factor : IMPORT_FACTOR;
    return raw * importFactor * RETAIL_MARKUP;
  };
  const positivePrices = (item) => (Array.isArray(item.priceOptions) ? item.priceOptions : [item.price])
    .map((value) => rawToRetail(item, value)).filter((value) => value > 0);
  const minPrice = (items) => {
    const prices = items.flatMap(positivePrices);
    return prices.length ? Math.min(...prices) : 0;
  };
  const isCombo = (item) => {
    const configuration = String(item.configuration || "");
    return configuration.includes("+") || (Array.isArray(item.partCodes) && item.partCodes.length > 1)
      || item.name === "Excel combo" || item.showroomFullSet;
  };
  const isDimensionOnly = (item) => /^(侧面尺寸|side|尺寸说明)$/i.test(String(item.configuration || "").trim());
  const optionPrices = (item) => {
    const options = Array.isArray(item.priceOptions) ? item.priceOptions : [];
    if (!options.some((value) => Number(value) > 0)) return "人民币待确认";
    return options.map((value, index) => {
      const material = (item.materials || [])[index] || `价格 ${index + 1}`;
      return `${material}: ${money(rawToRetail(item, value))}`;
    }).join(" / ");
  };

  const bySeries = new Map();
  rows.forEach((item) => {
    if (!item?.series) return;
    if (!bySeries.has(item.series)) {
      bySeries.set(item.series, {
        series: item.series,
        photo: itemPhoto(item),
        items: [],
        importedFromScreenshot: false,
        matchNote: "",
        materialsText: "",
      });
    }
    const group = bySeries.get(item.series);
    if (!group.photo) group.photo = itemPhoto(item);
    if (item.importedFromScreenshot) group.importedFromScreenshot = true;
    if (!group.matchNote && item.matchNote) group.matchNote = item.matchNote;
    if (!group.materialsText && item.materialsText) group.materialsText = item.materialsText;
    group.items.push(item);
  });

  const groups = [...bySeries.values()].map((group) => ({
    ...group,
    minPrice: minPrice(group.items),
    hasFinal: group.items.some((item) => item.priceIsFinal || positivePrices(item).length),
    hasCombo: group.items.some(isCombo),
  }));

  const filtered = () => {
    const query = norm(state.query);
    return groups.filter((group) => {
      if (state.filter === "final" && !group.hasFinal) return false;
      if (state.filter === "combo" && !group.hasCombo) return false;
      if (state.filter === "single" && group.hasCombo) return false;
      if (state.filter === "photo" && !group.photo) return false;
      if (state.filter === "imported" && !group.importedFromScreenshot) return false;
      if (!query) return true;
      return norm([
        group.series, group.matchNote, group.materialsText,
        ...group.items.flatMap((item) => [item.configuration, item.description, item.dimensions, item.source]),
      ].join(" ")).includes(query);
    }).sort((a, b) => {
      if (state.sort === "price-asc") return (a.minPrice || 999999999) - (b.minPrice || 999999999);
      if (state.sort === "price-desc") return b.minPrice - a.minPrice;
      if (state.sort === "count-desc") return b.items.length - a.items.length;
      return a.series.localeCompare(b.series, "zh-Hans-CN", { numeric: true });
    });
  };

  const render = () => {
    const list = filtered();
    count.textContent = String(list.length);
    grid.replaceChildren(...list.map((group) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "card";
      button.innerHTML = `
        <span class="photo">${group.photo ? `<img src="${escapeHtml(group.photo)}" alt="${escapeHtml(group.series)}" loading="lazy" decoding="async">` : '<span class="no-photo">暂无照片</span>'}</span>
        <span class="copy">
          <strong>${escapeHtml(group.series)}</strong>
        </span>`;
      button.addEventListener("click", () => openGroup(group));
      const image = button.querySelector("img");
      if (image) image.addEventListener("error", () => {
        image.replaceWith(Object.assign(document.createElement("span"), { className: "no-photo", textContent: "暂无照片" }));
      });
      return button;
    }));
  };

  const widthFrom = (item) => {
    const text = String(item.dimensions || item.description || "");
    const match = text.match(/(?:L|宽)\s*[:：]?\s*([\d.]+)\s*mm/i) || text.match(/([\d.]+)\s*mm/i);
    return match ? Number(match[1]) : 0;
  };
  const moduleCode = (item) => String(item.configuration || item.name || "模块").trim();
  const canonicalCode = (code) => {
    const value = norm(code);
    if (value === "c" || value === "corner") return "corner";
    return value.replace(/\(.*?\)/g, "");
  };
  const schematicClass = (code) => {
    const value = norm(code);
    if (value.includes("corner") || value === "c") return "corner";
    if (value.includes("stool") || value.includes("ottoman")) return "stool";
    if (value.startsWith("2")) return "double";
    return "single";
  };
  const chooseBest = (oldItem, newItem) => {
    if (!oldItem) return newItem;
    const oldScore = (oldItem.priceIsFinal ? 100 : 0) + positivePrices(oldItem).length * 10 + (widthFrom(oldItem) ? 1 : 0);
    const newScore = (newItem.priceIsFinal ? 100 : 0) + positivePrices(newItem).length * 10 + (widthFrom(newItem) ? 1 : 0);
    return newScore > oldScore ? newItem : oldItem;
  };
  const priceForMaterial = (item, selectedMaterial, materialIndex) => {
    if (!item) return 0;
    const options = Array.isArray(item.priceOptions) ? item.priceOptions : [];
    const materials = Array.isArray(item.materials) ? item.materials : [];
    let index = materials.findIndex((value) => norm(value) === norm(selectedMaterial));
    if (index < 0 && options.length > materialIndex) index = materialIndex;
    return rawToRetail(item, options[index] ?? item.price);
  };
  const moduleImage = (group, item) => {
    const code = moduleCode(item).toUpperCase();
    const mapped = boardModuleMap[group.series]?.[code];
    return {
      src: mapped || "",
      isExactCrop: Boolean(mapped),
      isIndividualSpec: false,
    };
  };

  const selectSpec = (group, item, material, price) => {
    if (!item) return;
    document.querySelector("#selectedSpec").innerHTML = `
      <div><span>当前模块</span><strong>${escapeHtml(moduleCode(item))}</strong></div>
      <div><span>规格尺寸</span><strong>${escapeHtml(item.dimensions || item.description || "待确认")}</strong></div>
      <div><span>${escapeHtml(material || "人民币")}店面零售价</span><strong>${money(price)}</strong></div>
      <div><span>价格来源</span><strong>${escapeHtml(item.matchNote || group.matchNote || item.source || "Excel / 产品资料匹配")}</strong></div>
      <div><span>材质结构</span><strong>${escapeHtml(item.materialsText || group.materialsText || (item.materials || []).join(" / ") || "待确认")}</strong></div>`;
  };

  const openGroup = (group) => {
    document.querySelector("#detailImage").src = group.photo || "";
    document.querySelector("#detailImage").alt = group.series;
    document.querySelector("#detailSource").textContent = group.items.find((item) => item.source)?.source || "ZOLANO";
    document.querySelector("#detailTitle").textContent = group.series;
    document.querySelector("#detailMeta").textContent = `${group.items.length} 条规格 · 店面零售价 = 原价 × 7.3 ÷ 0.66 × 2.8`;

    const presetMap = new Map();
    group.items.filter((item) => isCombo(item) && !item.showroomFullSet).forEach((item) => {
      const key = norm(item.configuration || item.description);
      presetMap.set(key, chooseBest(presetMap.get(key), item));
    });
    const presets = [...presetMap.values()];
    const moduleMap = new Map();
    group.items.filter((item) => !isCombo(item) && !isDimensionOnly(item)).forEach((item) => {
      const key = canonicalCode(moduleCode(item));
      moduleMap.set(key, chooseBest(moduleMap.get(key), item));
    });
    const modules = [...moduleMap.values()].sort((a, b) => moduleCode(a).localeCompare(moduleCode(b), "en", { numeric: true }));
    const originalModules = boardModules[group.series] || [];
    const materialSource = modules.slice().sort((a, b) => positivePrices(b).length - positivePrices(a).length)[0];
    const materials = (materialSource?.materials || []).filter(Boolean);
    if (!materials.length) materials.push("人民币待确认");

    const selected = new Map();
    let selectedMaterial = materials[0];
    let focusedItem = modules[0];
    const comboBuilder = document.querySelector("#comboBuilder");

    const addModule = (item, amount = 1) => {
      const key = canonicalCode(moduleCode(item));
      const current = selected.get(key) || { item, quantity: 0 };
      current.quantity = Math.max(0, current.quantity + amount);
      if (current.quantity) selected.set(key, current);
      else selected.delete(key);
      focusedItem = item;
    };
    const applyPreset = (preset) => {
      selected.clear();
      const parts = (Array.isArray(preset.partCodes) && preset.partCodes.length)
        ? preset.partCodes : String(preset.configuration || "").split("+");
      parts.map((part) => canonicalCode(part)).forEach((part) => {
        const item = moduleMap.get(part);
        if (item) addModule(item);
      });
    };

    const refreshConfigurator = () => {
      const materialIndex = Math.max(0, materials.findIndex((value) => value === selectedMaterial));
      const chosen = [...selected.values()];
      const totalPieces = chosen.reduce((sum, line) => sum + line.quantity, 0);
      const totalWidth = chosen.reduce((sum, line) => sum + widthFrom(line.item) * line.quantity, 0);
      const totalPrice = chosen.reduce((sum, line) => sum + priceForMaterial(line.item, selectedMaterial, materialIndex) * line.quantity, 0);
      const pendingPieces = chosen.reduce((sum, line) => sum + (priceForMaterial(line.item, selectedMaterial, materialIndex) ? 0 : line.quantity), 0);
      const signature = chosen
        .map((line) => `${canonicalCode(moduleCode(line.item))}:${line.quantity}`)
        .sort().join("|");
      const knownFootprint = norm(group.series).includes("montierizl2628")
        && signature === "1ert:1|1na:1|2el:1|2na:1|corner:1"
        ? "3.45m / 2.84m × 1.32m"
        : "";
      const sizeSummary = knownFootprint || (totalWidth ? `模块总宽 ${(totalWidth / 1000).toFixed(2)}m` : "");

      comboBuilder.innerHTML = `
        <section class="config-summary">
          <div>
            <span>可用组合</span>
            <strong>组合 ${totalPieces} 件${sizeSummary ? ` · ${sizeSummary}` : ""}</strong>
          </div>
          <div class="total-price">
            <span>${escapeHtml(selectedMaterial)} 店面零售总价</span>
            <strong>${totalPieces ? (pendingPieces ? `${money(totalPrice)} + ${pendingPieces} 件待确认` : money(totalPrice)) : "尚未选择"}</strong>
          </div>
          <button id="clearCombo" type="button">清空全部</button>
        </section>

        <section class="material-panel">
          <label for="materialSelect">材质</label>
          <select id="materialSelect">${materials.map((material) => `<option${material === selectedMaterial ? " selected" : ""}>${escapeHtml(material)}</option>`).join("")}</select>
          <small>切换材质后，每个模块与组合总价会自动更新。</small>
        </section>

        ${presets.length ? `<section class="preset-panel">
          <div class="section-heading"><strong>推荐组合</strong><span>一点自动加入整套模块</span></div>
          <div class="preset-list">${presets.slice(0, 12).map((preset, index) => `<button type="button" data-preset="${index}">${escapeHtml(preset.configuration || preset.description || "组合")}</button>`).join("")}</div>
        </section>` : ""}

        ${originalModules.length ? `<section class="board-module-panel">
          <div class="section-heading"><strong>原厂独立模块线图</strong><span>${originalModules.length} 个 · 每张只保留一个模块</span></div>
          <div class="board-module-grid">${originalModules.map((module) => `<figure>
            <img src="${escapeHtml(module.src)}" alt="${escapeHtml(module.label)} 原厂模块线图" loading="lazy">
            <figcaption>${escapeHtml(module.label)}</figcaption>
          </figure>`).join("")}</div>
        </section>` : ""}

        <section class="picked-panel">
          <div class="section-heading"><strong>已选位置</strong><span>${totalPieces ? "可继续加减数量" : "点击下面模块，每点一次加 1 件"}</span></div>
          <div class="picked-list">${chosen.length ? chosen.map((line, index) => {
            const price = priceForMaterial(line.item, selectedMaterial, materialIndex);
            return `<div><span class="position-number">${index + 1}</span><strong>${escapeHtml(moduleCode(line.item))} × ${line.quantity}</strong><span>${escapeHtml(line.item.dimensions || line.item.description || "")}</span><em>${price ? money(price * line.quantity) : "待确认"}</em></div>`;
          }).join("") : '<p>空位置</p>'}</div>
        </section>

        <section class="module-panel">
          <div class="section-heading"><strong>${escapeHtml(group.series)} 模块</strong><span>点击一次加 1 件</span></div>
          <div class="module-grid">${modules.map((item, index) => {
            const key = canonicalCode(moduleCode(item));
            const quantity = selected.get(key)?.quantity || 0;
            const price = priceForMaterial(item, selectedMaterial, materialIndex);
            const visual = moduleImage(group, item);
            return `<article class="module-card${quantity ? " selected" : ""}" data-module="${index}">
              <button class="module-add" type="button" data-add="${index}" aria-label="增加 ${escapeHtml(moduleCode(item))}">
                ${visual.src ? `<span class="module-visual ${visual.isExactCrop ? "exact-crop" : "individual-spec"}"><img src="${escapeHtml(visual.src)}" alt="${escapeHtml(moduleCode(item))} 独立规格图"></span>` : '<span class="module-visual no-module-image">暂无独立规格图</span>'}
                <strong>${escapeHtml(moduleCode(item))}</strong>
                <span>${escapeHtml(item.dimensions || item.description || "尺寸待确认")}</span>
                <em>${money(price)} <small>零售</small></em>
              </button>
              <div class="quantity-control">
                <button type="button" data-minus="${index}" aria-label="减少">−</button>
                <b>${quantity}</b>
                <button type="button" data-plus="${index}" aria-label="增加">＋</button>
              </div>
            </article>`;
          }).join("")}</div>
        </section>`;

      comboBuilder.querySelector("#clearCombo").addEventListener("click", () => {
        selected.clear();
        refreshConfigurator();
      });
      comboBuilder.querySelector("#materialSelect").addEventListener("change", (event) => {
        selectedMaterial = event.target.value;
        refreshConfigurator();
        const price = priceForMaterial(focusedItem, selectedMaterial, materials.indexOf(selectedMaterial));
        selectSpec(group, focusedItem, selectedMaterial, price);
      });
      comboBuilder.querySelectorAll("[data-preset]").forEach((button) => button.addEventListener("click", () => {
        applyPreset(presets[Number(button.dataset.preset)]);
        refreshConfigurator();
      }));
      comboBuilder.querySelectorAll("[data-add], [data-plus]").forEach((button) => button.addEventListener("click", () => {
        const index = Number(button.dataset.add ?? button.dataset.plus);
        addModule(modules[index], 1);
        refreshConfigurator();
        selectSpec(group, modules[index], selectedMaterial, priceForMaterial(modules[index], selectedMaterial, materialIndex));
      }));
      comboBuilder.querySelectorAll("[data-minus]").forEach((button) => button.addEventListener("click", () => {
        const item = modules[Number(button.dataset.minus)];
        addModule(item, -1);
        refreshConfigurator();
        selectSpec(group, item, selectedMaterial, priceForMaterial(item, selectedMaterial, materialIndex));
      }));
    };

    refreshConfigurator();
    document.querySelector("#detailRows").innerHTML = "";
    selectSpec(group, focusedItem || group.items[0], selectedMaterial, priceForMaterial(focusedItem, selectedMaterial, 0));
    dialog.showModal();
  };

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.filter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("active", item === button));
      render();
    });
  });
  search.addEventListener("input", () => { state.query = search.value.trim(); render(); });
  sort.addEventListener("change", () => { state.sort = sort.value; render(); });
  document.querySelector("#closeDialog").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  document.querySelector("#topButton").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  render();
})();
