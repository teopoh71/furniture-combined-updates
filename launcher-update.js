(() => {
  const manifestUrl = "https://raw.githubusercontent.com/teopoh71/furniture-combined-updates/main/manifest.json";
  const fallbackSite = "https://teopoh71.github.io/furniture-combined-updates/index.html";
  const button = document.querySelector("#syncButton");
  const status = document.querySelector("#syncStatus");
  const dot = document.querySelector("#syncDot");
  const version = document.querySelector("#syncVersion");

  const setState = (text, state) => {
    status.textContent = text;
    dot.className = `sync-dot ${state || ""}`;
  };

  async function checkOnline(openAfterCheck) {
    button.disabled = true;
    button.textContent = "连接中…";
    setState("正在检查线上资料", "loading");
    try {
      const response = await fetch(`${manifestUrl}?cb=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const manifest = await response.json();
      const target = new URL(manifest.siteUrl || fallbackSite);
      target.searchParams.set("v", manifest.contentVersion || Date.now());
      target.searchParams.set("cb", Date.now());
      version.textContent = manifest.contentVersion || "在线版";
      setState("线上资料可用", "online");
      if (openAfterCheck) {
        if (window.CombinedApp?.refreshOnline) window.CombinedApp.refreshOnline();
        else location.href = target.toString();
        return;
      }
    } catch (error) {
      setState("网络不可用，继续使用离线资料", "offline");
    }
    button.disabled = false;
    button.textContent = "在线更新";
  }

  button.addEventListener("click", () => checkOnline(true));
  if (location.protocol === "https:" && location.hostname === "teopoh71.github.io") {
    setState("当前为线上同步版", "online");
    button.textContent = "刷新资料";
  } else {
    setTimeout(() => checkOnline(false), 450);
  }
})();
