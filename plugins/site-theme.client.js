const THEME_KEY = "site-theme-mode";

function getAccentForLocalTime() {
  const hour = new Date().getHours();
  return hour >= 18 || hour < 6 ? "green" : "blue";
}

function applyTheme(mode) {
  const themeMode = mode || localStorage.getItem(THEME_KEY) || "dark";
  document.documentElement.dataset.theme = themeMode;
  document.documentElement.dataset.accent = getAccentForLocalTime();
  window.dispatchEvent(
    new CustomEvent("site-theme-change", {
      detail: {
        mode: themeMode,
        accent: document.documentElement.dataset.accent,
      },
    })
  );
}

export default function () {
  applyTheme();

  window.siteTheme = {
    getMode() {
      return document.documentElement.dataset.theme || "dark";
    },
    getAccent() {
      return document.documentElement.dataset.accent || getAccentForLocalTime();
    },
    toggleMode() {
      const nextMode = this.getMode() === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, nextMode);
      applyTheme(nextMode);
    },
  };
}
