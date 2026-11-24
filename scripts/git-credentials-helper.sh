#!/bin/sh
#
# GitHub credential helper for metabox-ai/appforge.
#
# Reads the token from the GITHUB_TOKEN environment variable at call time.
# Nothing is written to disk, so the credential never lands in .git/config
# or in a credentials file.
#
# The token is injected into the shell environment by the Mavis secret store:
#   mavis secret create --name=GITHUB_TOKEN --value=<pat>
#
# Configured as a repo-local relative path, so it keeps working no matter
# where the repository is checked out:
#   git config --local credential.helper "scripts/git-credentials-helper.sh"

case "$1" in
  get)
    echo "username=x-access-token"
    echo "password=$GITHUB_TOKEN"
    ;;
  *)
    # Deliberately no-op for store/erase: never persist credentials.
    ;;
esac
