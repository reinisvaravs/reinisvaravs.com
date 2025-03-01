#!/bin/bash

set -e  # Stop script on error

# Step 1: Fetch latest Portfolio
echo "Fetching latest Portfolio..."
if [ -d "portfolio" ]; then
  cd portfolio
  git pull origin main
  cd ..
else
  git clone https://github.com/reinisvaravs/portfolio.git
fi

# Step 2: Fetch latest Padlet Clone and build
echo "Fetching latest Padlet Clone..."
if [ -d "padlet-clone" ]; then
  cd padlet-clone
  git pull origin main
  npm install
  npm run build
  cd ..
else
  git clone https://github.com/reinisvaravs/padlet-clone.git
  cd padlet-clone
  npm install
  npm run build
  cd ..
fi

# Step 3: Move built `dist/` to `server/padlet-clone/`
echo "Moving built React app..."
rm -rf server/padlet-clone/dist
mkdir -p server/padlet-clone  # Ensure the folder exists
mv padlet-clone/dist server/padlet-clone/

# Step 4: Commit and Push changes inside the `server` repo
echo "Committing and pushing to GitHub..."
cd server
git add .
git commit -m "Auto-deploy latest versions"
git push origin main
cd ..

echo "✅ Deployment complete!"
