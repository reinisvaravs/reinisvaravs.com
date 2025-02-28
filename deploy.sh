#!/bin/bash

# Step 1: Remove old folders and clone the latest Portfolio
echo "Cloning the latest Portfolio..."
rm -rf portfolio
git clone https://github.com/YOUR_USERNAME/portfolio.git

# Step 2: Remove old Padlet Clone, clone latest, and build it
echo "Cloning and building the latest Padlet Clone..."
rm -rf padlet-clone
git clone https://github.com/YOUR_USERNAME/padlet-clone.git
cd padlet-clone
npm install
npm run build
cd ..

# Step 3: Move built React app to the correct folder
echo "Moving built React app..."
rm -rf server/padlet-clone/dist  # Remove only the dist folder, not the entire repo
mv padlet-clone/dist server/padlet-clone/

# Step 4: Commit and Push everything
echo "Committing and pushing to GitHub..."
git add .
git commit -m "Auto-deploy latest versions"
git push origin main

echo "✅ Deployment complete!"
