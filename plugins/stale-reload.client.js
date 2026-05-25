// Recover from stale assets on a statically generated, force-pushed site.
//
// Each `nuxt generate` writes hashed JS chunks and per-route payloads under a
// fresh /_nuxt/static/<timestamp>/ directory, and the gh-pages force-push
// removes the previous one. A tab that loaded before a deploy (or has cached
// HTML) then requests an old chunk/payload URL that no longer exists. GitHub
// Pages answers with its 404 HTML page, which Nuxt tries to evaluate or parse
// as JSON — surfacing as "Loading chunk ... failed" or
// "Unexpected token '<' ... is not valid JSON". The fix is to detect that
// signature and do a single hard reload so the browser pulls current assets.

const STALE_PATTERNS = [
  /Loading chunk \S+ failed/i,
  /Loading CSS chunk \S+ failed/i,
  /Importing a module script failed/i, // Safari chunk failure
  /Unexpected token '<'/i,
  /<!DOCTYPE/i,
  /is not valid JSON/i,
];

function isStaleAssetError(message) {
  return STALE_PATTERNS.some((re) => re.test(message || ""));
}

function reloadOnce() {
  // Bound reloads to at most one per 30s so an unfixable error can't loop.
  const key = "stale-asset-reloaded-at";
  const last = Number(window.sessionStorage.getItem(key) || 0);
  if (Date.now() - last > 30000) {
    window.sessionStorage.setItem(key, String(Date.now()));
    window.location.reload();
  }
}

export default ({ app }) => {
  window.addEventListener("error", (event) => {
    if (isStaleAssetError(event && event.message)) reloadOnce();
  });

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event && event.reason;
    const message = reason && (reason.message || String(reason));
    if (isStaleAssetError(message)) reloadOnce();
  });

  if (app.router) {
    app.router.onError((error) => {
      if (isStaleAssetError(error && error.message)) reloadOnce();
    });
  }
};
