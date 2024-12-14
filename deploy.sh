#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Starting deployment process...${NC}"

# Step 1: Install dependencies
echo -e "${GREEN}Installing dependencies...${NC}"
npm install

# Step 2: Run tests (if any)
echo -e "${GREEN}Running tests...${NC}"
npm test -- --passWithNoTests

# Step 3: Build the project
echo -e "${GREEN}Building the project...${NC}"
npm run build

# Step 4: Optimize images
echo -e "${GREEN}Optimizing images...${NC}"
find public/images -type f \( -name "*.jpg" -o -name "*.png" \) -exec convert {} -strip -quality 85 {} \;

# Step 5: Deploy to GitHub Pages
echo -e "${GREEN}Deploying to GitHub Pages...${NC}"
git add build
git commit -m "Deploy: $(date)"
git subtree push --prefix build origin gh-pages

echo -e "${YELLOW}Deployment completed!${NC}"
