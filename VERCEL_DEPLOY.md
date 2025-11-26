# Vercel Deployment Guide

This guide explains how to deploy the Web Tools application to Vercel, configure a custom domain, and set up automatic deployments from GitHub.

## Prerequisites

- A [Vercel](https://vercel.com) account.
- A [GitHub](https://github.com) account.
- A domain name (optional, for custom domain).

## Step 1: Push to GitHub

1.  Create a new repository on GitHub.
2.  Push your code to the repository:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin <your-repo-url>
    git push -u origin main
    ```

## Step 2: Import Project in Vercel

1.  Log in to your Vercel dashboard.
2.  Click **"Add New..."** -> **"Project"**.
3.  Select **"Continue with GitHub"**.
4.  Find your repository (`web-tool`) and click **"Import"**.
5.  **Configure Project**:
    - **Framework Preset**: Vercel should automatically detect **Vite**. If not, select it.
    - **Root Directory**: `./` (default).
    - **Build Command**: `npm run build` (default).
    - **Output Directory**: `dist` (default).
6.  Click **"Deploy"**.

Vercel will build and deploy your application. Once finished, you will get a production URL (e.g., `web-tool.vercel.app`).

## Step 3: Configure Custom Domain

1.  Go to your project dashboard on Vercel.
2.  Click on the **"Settings"** tab.
3.  Select **"Domains"** from the left menu.
4.  Enter your custom domain (e.g., `tools.yourdomain.com`) in the input field and click **"Add"**.
5.  Follow the instructions to configure your DNS records (usually adding a CNAME record pointing to `cname.vercel-dns.com` or an A record).

## Step 4: Automatic Deployments

By connecting your GitHub repository, Vercel automatically sets up CI/CD:

- **Production**: Every push to the `main` branch will trigger a new production deployment.
- **Preview**: Every pull request will trigger a preview deployment with a unique URL, allowing you to test changes before merging.

You can verify this by making a small change to your code, pushing it to GitHub, and watching the deployment start automatically in the Vercel dashboard.
