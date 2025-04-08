# Trump Tariff Analysis Website - Deployment Guide

This document provides instructions for deploying the Trump Tariff Analysis website to a hosting platform.

## Website Structure

The website consists of the following components:

- `index.html`: Main entry point for the website
- `styles/main.css`: CSS styling for the website
- `scripts/main.js`: JavaScript functionality
- `public/images/`: Directory containing visualization images
- `public/data/`: Directory containing data files (CSV, MD)

## Deployment Options

### Option 1: Deploy to Manus Live Link

To deploy the website to a Manus live link:

1. Ensure all files are properly organized in the project directory
2. Use the `deploy_apply_deployment` tool with type "static" and the project directory
3. The tool will return a permanent public URL for accessing the website

### Option 2: Deploy to Static Hosting Service

The website can be deployed to any static hosting service such as:

- Netlify
- Vercel
- GitHub Pages
- Amazon S3
- Firebase Hosting

Follow the specific instructions for your chosen hosting service.

## Post-Deployment Steps

After deployment:

1. Verify all pages load correctly
2. Test responsive design on different devices
3. Ensure all images and data files are accessible
4. Test interactive features and data persistence functionality

## Troubleshooting

If you encounter issues during deployment:

- Check that all file paths are correct
- Verify all required files are included in the deployment
- Check browser console for JavaScript errors
- Ensure hosting service supports static website hosting
