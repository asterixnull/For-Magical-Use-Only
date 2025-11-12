# Deployment Instructions: Connecting to Contentful Securely

Your website is now built to load content (tours, products, etc.) dynamically from Contentful. To do this securely, we can't store your secret API keys directly in the code. Instead, we use a secure practice called **environment variables**.

Your hosting provider (like Netlify, Vercel, or others) will securely store these keys and make them available to your website when it's running. This guide will walk you through setting this up.

## Step 1: Find Your Contentful API Keys

You will need two pieces of information from your Contentful account.

1.  **Space ID:**
    *   Log in to [Contentful](https://app.contentful.com/).
    *   Go to **Settings** > **General settings**.
    *   You will find the **Space ID** listed there. Copy it.

2.  **Content Delivery API - Access Token:**
    *   Go to **Settings** > **API keys**.
    *   Click on your active API key (it should be named something like "FOR Magical Use Only Key").
    *   Copy the key labeled **Content Delivery API - access token**. It should **not** start with `CFPAT-`.

## Step 2: Add Keys to Your Hosting Provider

Log in to the dashboard of your website's hosting provider (e.g., Netlify, Vercel, GitHub Pages). Find the settings for your site and look for a section named **"Environment Variables,"** "Environment," or "Secrets."

You need to create two new variables:

1.  **Variable Name:** `CONTENTFUL_SPACE_ID`
    *   **Value:** Paste the **Space ID** you copied in Step 1.

2.  **Variable Name:** `CONTENTFUL_ACCESS_TOKEN`
    *   **Value:** Paste the **Content Delivery API - access token** you copied in Step 1.

## Step 3: How It Works (Script Injection)

Our website code (`static/js/contentful-config.js`) expects to find these keys on the `window` object. Your hosting provider can automatically inject these server-side environment variables into your HTML files during the build process.

Most modern hosting platforms for static sites (like Netlify and Vercel) have a feature called **"Snippet Injection"** or **"Post-processing"** that can do this.

Go to your site's build or deploy settings and look for "Snippet Injection." You'll want to add the following snippet **before the closing `</head>` tag** of your pages:

```html
<script>
  window.CONTENTFUL_SPACE_ID = "{{ .Env.CONTENTFUL_SPACE_ID }}";
  window.CONTENTFUL_ACCESS_TOKEN = "{{ .Env.CONTENTFUL_ACCESS_TOKEN }}";
</script>
```

**Note:** The exact syntax (`{{ .Env.VAR_NAME }}`) might vary slightly depending on your hosting provider.
*   **For Netlify:** The syntax above is correct for Netlify's snippet injection.
*   **For Vercel:** You might need a different approach, potentially using a serverless function to serve the variables, or using the `env` property in `vercel.json` for build-time variables. Please consult their documentation for the most up-to-date method.

Once you have configured this, your hosting provider will automatically replace the placeholders with your actual keys every time you deploy the site. This keeps your keys safe and your website functional.
