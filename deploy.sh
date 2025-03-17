#!/bin/bash

rm -rf portfolio
git clone https://github.com/reinisvaravs/portfolio.git

rm -rf padlet-clone
git clone https://github.com/reinisvaravs/padlet-clone.git
cd padlet-clone
npm install
npm run build
cd ..

mkdir -p temp/padlet-clone
mv padlet-clone/dist ./temp/padlet-clone
rm -rf padlet-clone
mv ./temp/padlet-clone ../server
rm -rf temp

# git add .
# git commit -m "Auto-deploy latest versions"
# git push origin main

echo "✅ Deployment complete!"
