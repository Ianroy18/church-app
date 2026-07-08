# 🚀 Grace and Truth Church App - Deployment Guide

This guide will help you get your application live on the internet for **FREE** using Vercel.

## Step 1: Push to GitHub (Recommended)
This is the best way to manage your project. 

1. **Create a GitHub Account**: If you don't have one, sign up at [github.com](https://github.com/).
2. **Create a New Repository**: Name it something like `church-app`.
3. **Upload your code**:
   - If you use **GitHub Desktop**: Drag this folder into the app and click "Publish".
   - If you use the **Terminal**:
     ```bash
     git add .
     git commit -m "Ready for deployment"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/church-app.git
     git push -u origin main
     ```

## Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com/) and sign in with GitHub.
2. Click **"Add New"** > **"Project"**.
3. Import your `church-app` repository.
4. **IMPORTANT**: Expand the **"Environment Variables"** section and add these:
   - `VITE_SUPABASE_URL`: (Copy from your .env)
   - `VITE_SUPABASE_ANON_KEY`: (Copy from your .env)
   - `GEMINI_API_KEY`: (Copy your Gemini API key from `.env.local` — needed for the LCC Assistant chatbot)
   - Or `OPENAI_API_KEY` if you use OpenAI instead of Gemini
5. Click **"Deploy"**.

> **Note:** After adding or changing environment variables, redeploy the project so the chatbot works on the live site.

## Step 3: Your Live URL
Once finished, Vercel will give you a link like `church-app.vercel.app`. Your app is now LIVE!

---
> [!TIP]
> **Why GitHub?** Whenever you change your code in the future and "Push" it to GitHub, Vercel will automatically update your live website!
