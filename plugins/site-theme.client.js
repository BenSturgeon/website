const THEME_KEY = "site-theme-mode";

// Time of day picks the *default* mode (until the user toggles): day = light,
// night = dark. Once the user toggles, their choice is stored and wins.
function defaultModeForLocalTime() {
  const hour = new Date().getHours();
  return hour >= 18 || hour < 6 ? "dark" : "light";
}

function applyTheme(mode, app) {
  const themeMode =
    mode || localStorage.getItem(THEME_KEY) || defaultModeForLocalTime();
  document.documentElement.dataset.theme = themeMode;

  if (document.body) {
    document.body.dataset.theme = themeMode;
  }

  if (app && app.vuetify && app.vuetify.framework) {
    app.vuetify.framework.theme.dark = themeMode === "dark";
  }

  window.dispatchEvent(
    new CustomEvent("site-theme-change", { detail: { mode: themeMode } })
  );
}

export default function ({ app }) {
  applyTheme(null, app);

  window.siteTheme = {
    getMode() {
      return document.documentElement.dataset.theme || defaultModeForLocalTime();
    },
    toggleMode() {
      const nextMode = this.getMode() === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_KEY, nextMode);
      applyTheme(nextMode, app);
    },
  };
}
