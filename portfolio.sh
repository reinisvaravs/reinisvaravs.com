#!/bin/bash

echo "[portfolio] Getting it"
rm -rf portfolio
git clone https://github.com/reinisvaravs/portfolio.git
cd portfolio
npm install
npm run build
cd ..

echo "[portfolio] Placing it in temp/"
mkdir -p temp/portfolio
mv portfolio/dist ./temp/portfolio
rm -rf portfolio
mv ./temp/portfolio ../reinisvaravs

echo "[server] Pushing changes"
git add .
git commit -m "Auto-deploy latest portfolio"
git push origin main

echo "✅✅✅ Deployment complete! [portfolio only]"
