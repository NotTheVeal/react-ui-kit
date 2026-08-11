#!/usr/bin/env bash
# Headless-Storybook fidelity screenshots.
# Renders each story of a component to a real-content PNG so a build can be
# diffed against the Figma reference. Works around Storybook's /react-ui-kit/
# base path (serving storybook-static at server root 404s every asset and
# produces a blank render) by symlinking storybook-static under that base path.
#
# Usage:
#   scripts/fidelity-shots.sh <story-id-prefix> <story1> [story2 ...]
# Example:
#   scripts/fidelity-shots.sh components-aidetailcard full drawer all-detail-rows no-ai-summary no-feedback
#
# Output: fidelity-shots/<story>.png (2x DPR, real content, ~50-90KB each)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

PREFIX="${1:?story-id prefix required, e.g. components-aidetailcard}"
shift
STORIES=("$@")
[ "${#STORIES[@]}" -gt 0 ] || { echo "no stories given"; exit 1; }

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || { echo "Google Chrome not found at $CHROME"; exit 1; }

# 1. Build Storybook if the static bundle is missing or stale.
if [ ! -f storybook-static/iframe.html ]; then
  echo "Building Storybook..."
  npm run build-storybook >/dev/null 2>&1
fi

# 2. Serve under the /react-ui-kit/ base path via a symlink.
SBROOT="$(mktemp -d)"
ln -s "$ROOT/storybook-static" "$SBROOT/react-ui-kit"
PORT=6266
npx http-server "$SBROOT" -p "$PORT" -s >/dev/null 2>&1 &
HTTP_PID=$!
trap 'kill "$HTTP_PID" 2>/dev/null || true; rm -rf "$SBROOT"' EXIT
sleep 2

# 3. Screenshot each story.
OUT="$ROOT/fidelity-shots"
mkdir -p "$OUT"
for story in "${STORIES[@]}"; do
  url="http://localhost:$PORT/react-ui-kit/iframe.html?viewMode=story&id=${PREFIX}--${story}"
  "$CHROME" --headless=new --no-sandbox --disable-gpu --hide-scrollbars \
    --force-device-scale-factor=2 --window-size=760,820 \
    --virtual-time-budget=30000 --run-all-compositor-stages-before-draw \
    --screenshot="$OUT/$story.png" "$url" >/dev/null 2>&1
  size=$(wc -c < "$OUT/$story.png" | tr -d ' ')
  if [ "$size" -lt 20000 ]; then
    echo "FAIL  $story.png is only ${size}B — likely a blank render"
    exit 1
  fi
  echo "OK    $story.png (${size}B)"
done
echo "Fidelity shots written to $OUT"
