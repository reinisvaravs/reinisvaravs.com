#!/bin/bash

# rm -rf portfolio
# git clone https://github.com/reinisvaravs/portfolio.git

rm -rf frontend-todo
git clone https://github.com/reinisvaravs/frontend-todo.git
cd frontend-todo
npm install
npm run build
cd ..

mkdir -p temp/frontend-todo
mv frontend-todo/dist ./temp/frontend-todo
rm -rf frontend-todo
mv ./temp/frontend-todo ../reinisvaravs

rm -rf frontend-ecom
git clone https://github.com/reinisvaravs/frontend-ecom.git
cd frontend-ecom
npm install
npm run build
cd ..

mkdir -p temp/frontend-ecom
mv frontend-ecom/dist ./temp/frontend-ecom
rm -rf frontend-ecom
mv ./temp/frontend-ecom ../reinisvaravs
rm -rf temp

git add .
git commit -m "Auto-deploy latest versions"
git push origin main

echo "✅ Deployment complete!"
