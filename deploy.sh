#!/bin/bash

# Step 1: Remove old Portfolio and clone the latest version
echo "Fetching latest Portfolio..."
rm -rf portfolio
git clone https://github.com/reinisvaravs/portfolio.git

# Step 2: Remove old Padlet Clone, clone latest, and build it
echo "Fetching latest Padlet Clone..."
rm -rf padlet-clone
git clone https://github.com/reinisvaravs/padlet-clone.git
cd padlet-clone
npm install
npm run build
cd ..

# Step 3: Move built React app to the correct folder
echo "Moving built React app..."
rm -rf padlet-clone/dist
mv padlet-clone/dist server/padlet-clone/

# Step 4: Commit and Push everything
echo "Committing and pushing to GitHub..."
git add .
git commit -m "Auto-deploy latest versions"
git push origin main

echo "✅ Deployment complete!"
