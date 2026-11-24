#!/usr/bin/env bash
#
# Commit and push the current work to origin.
#
#   bash scripts/push.sh                 # auto message
#   bash scripts/push.sh "feat: add tooltip"
#
# Auth comes from the GITHUB_TOKEN secret, read at call time by the
# credential helper (see .home/.git-credentials-helper.sh). Nothing is
# written to disk and the token never appears in .git/config.
#
# Requires the secret to be present in the environment:
#   mavis secret create --name=GITHUB_TOKEN --value=<pat>
set -euo pipefail

cd "$(dirname "$0")/.."

if ! git remote get-url origin >/dev/null 2>&1; then
  echo "error: no 'origin' remote configured." >&2
  exit 1
fi

if [ -z "${GITHUB_TOKEN:-}" ]; then
  echo "error: GITHUB_TOKEN is not set in this environment." >&2
  echo "       store it with: mavis secret create --name=GITHUB_TOKEN --value=<pat>" >&2
  exit 1
fi

msg="${1:-chore: sync $(date '+%Y-%m-%d %H:%M:%S')}"

if git diff --quiet && git diff --cached --quiet && [ -z "$(git ls-files --others --exclude-standard)" ]; then
  echo "no local changes — pushing existing HEAD"
else
  git add -A
  git commit -m "$msg"
fi

git push origin HEAD
echo
git status -sb
