#!/usr/bin/env bash
# build-resume-pdf.sh — Generate static/resume.pdf from data/resume.json
#
# Uses local HTML generator (scripts/generate-resume-html.mjs),
# then Chrome headless to print the HTML to PDF.
#
# Environment:
#   CHROME_PATH  — override Chrome binary path
#
# Locally on macOS, Chrome is detected automatically.
# In CI (ubuntu-latest), install Chromium via apt.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMP_DIR="${RUNNER_TEMP:-$ROOT/.tmp}"
mkdir -p "$TMP_DIR"
HTML_TMP="$(mktemp "$TMP_DIR/resume-XXXXXX.html")"
PDF_OUT="$ROOT/static/resume.pdf"

cleanup() { rm -f "$HTML_TMP"; }
trap cleanup EXIT

echo "→ Rendering HTML with custom template..."
node "$ROOT/scripts/generate-resume-html.mjs" "$HTML_TMP"

# Detect Chromium/Chrome binary
if [ -n "${CHROME_PATH:-}" ]; then
  CHROME="$CHROME_PATH"
elif [ "$(uname)" = "Darwin" ]; then
  CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
else
  if command -v chromium >/dev/null 2>&1; then
    CHROME="chromium"
  elif command -v chromium-browser >/dev/null 2>&1; then
    CHROME="chromium-browser"
  else
    CHROME="${CHROME:-google-chrome-stable}"
  fi
fi

echo "→ Printing to PDF..."
"$CHROME" \
  --headless=new \
  --no-sandbox \
  --disable-gpu \
  --allow-file-access-from-files \
  --run-all-compositor-stages-before-draw \
  --print-to-pdf="$PDF_OUT" \
  --no-pdf-header-footer \
  "file://$HTML_TMP"

SIZE=$(stat -f%z "$PDF_OUT" 2>/dev/null || stat -c%s "$PDF_OUT")
if [ "$SIZE" -le 1024 ]; then
  echo "→ Error: generated PDF is too small (${SIZE} bytes)."
  exit 1
fi
echo "→ Done: static/resume.pdf ($(( SIZE / 1024 )) KB)"
