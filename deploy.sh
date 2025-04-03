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

echo "[ecom] Getting it"
rm -rf frontend-ecom
git clone https://github.com/reinisvaravs/frontend-ecom.git
cd frontend-ecom
npm install
npm run build
cd ..

echo "[ecom] Placing it in temp/"
mkdir -p temp/frontend-ecom
mv frontend-ecom/dist ./temp/frontend-ecom
rm -rf frontend-ecom
mv ./temp/frontend-ecom ../reinisvaravs
rm -rf temp

echo "[server] Pushing changes"
git add .
git commit -m "Auto-deploy latest versions"
git push origin main

echo "✅✅✅ Deployment complete!"
