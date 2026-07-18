#!/usr/bin/env bash
# Renders page 1 of every PDF in public/catalogue-pdfs/ to a JPG cover in
# public/e-catalogue-covers/. Run after adding new PDFs (macOS only, uses sips).
set -euo pipefail
cd "$(dirname "$0")/.."

mkdir -p public/e-catalogue-covers
for f in public/catalogue-pdfs/*.pdf; do
  base=$(basename "$f" .pdf)
  slug=$(echo "$base" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]\{1,\}/-/g; s/^-//; s/-$//')
  out="public/e-catalogue-covers/$slug.jpg"
  if [ ! -f "$out" ]; then
    sips -s format jpeg -s formatOptions 80 --resampleWidth 480 "$f" --out "$out" >/dev/null \
      && echo "generated: $slug.jpg" || echo "failed: $base"
  fi
done
