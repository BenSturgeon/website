#!/usr/bin/env sh
# abort on errors
set -e
# build
npm run build
# navigate into the build output directory
cd dist
# if you are deploying to a custom domain
echo 'www.benjaminsturgeon.com' > CNAME
git init
git add -A
git commit -m 'deploy'
# git branch -m master main
git push -f git@github.com:BenSturgeon/website.git main:gh-pages
cd -