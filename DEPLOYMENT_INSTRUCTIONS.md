# Deployment Instructions: Connecting to Contentful Securely on Vercel

Your website is built to load content (tours, products, etc.) dynamically from Contentful. To do this securely, your secret API keys are stored as **Environment Variables** in your Vercel project.

This guide explains how this setup works and how to ensure it's configured correctly.

## Step 1: Find Your Contentful API Keys

You will need two pieces of information from your Contentful account.

1.  **Space ID:**
    *   Log in to [Contentful](https://app.contentful.com/).
    *   Go to **Settings** > **General settings**.
    *   You will find the **Space ID** listed there. Copy it.

2.  **Content Delivery API - Access Token:**
    *   Go to **Settings** > **API keys**.
    *   Click on your active API key (it should be named something like "FOR Magical Use Only Key").
    *   Copy the key labeled **Content Delivery API - access token**.

## Step 2: Add Keys to Your Vercel Project

Log in to your Vercel dashboard, select your project, and navigate to the project's settings.

1.  Click the **"Settings"** tab.
2.  In the menu on the left, click **"Environment Variables"**.
3.  Ensure you have the following two variables created:

| Key | Value |
| :--- | :--- |
| `CONTENTFUL_SPACE_ID` | (Paste your Space ID here) |
| `CONTENTFUL_ACCESS_TOKEN` | (Paste your Access Token here) |

Vercel will make these variables securely available to the backend of your project.

## Step 3: How It Works (Secure Serverless Function)

This project uses a **Serverless Function** (`/api/contentful.js`) to handle all communication with Contentful. This is the modern, secure way to protect your secret keys.

Here's the process:
1.  A page on the website (like `tours.html`) needs to load data.
2.  Instead of trying to connect to Contentful directly, the page sends a request to a local URL on your site: `/api/contentful`.
3.  Vercel automatically runs the code in `api/contentful.js` on its servers.
4.  This server-side code securely reads the Environment Variables (`CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN`).
5.  The function then uses these keys to fetch the requested data from Contentful.
6.  Finally, the function sends the data back to the browser to be displayed on the page.

This architecture ensures that your secret API keys are **never** exposed to the public, providing a secure and robust solution.
