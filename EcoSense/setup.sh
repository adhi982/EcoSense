#!/bin/bash

# Create necessary directories
mkdir -p app/components
mkdir -p app/lib
mkdir -p app/types
mkdir -p public/icons
mkdir -p styles

# Install dependencies
npm install

# Create .env.local from template
cp .env.example .env.local

echo "Setup complete! Please:"
echo "1. Update .env.local with your API keys"
echo "2. Add your PWA icons to public/icons/"
echo "3. Run 'npm run dev' to start the development server" 