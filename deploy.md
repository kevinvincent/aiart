# Deployment Guide

## Quick Deploy to Vercel

### Step 1: Push to GitHub

1. Initialize git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a new repository on GitHub and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/aiart.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

### Step 3: Configure Environment Variables

In your Vercel project settings, add these environment variables:

1. Go to your project dashboard
2. Click on "Settings" tab
3. Click on "Environment Variables"
4. Add the following variable:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key
   - **Environment**: Production, Preview, Development

### Step 4: Enable Vercel Blob Storage

1. In your Vercel project dashboard, go to "Storage" tab
2. Click "Create Database"
3. Select "Blob" as the storage type
4. Follow the setup instructions
5. The `BLOB_READ_WRITE_TOKEN` will be automatically configured

### Step 5: Deploy

1. Click "Deploy" in your Vercel dashboard
2. Wait for the build to complete
3. Your app will be available at `https://your-project-name.vercel.app`

## Testing Your Deployment

1. Visit your deployed URL
2. Enter a prompt like "A beautiful sunset over mountains"
3. Click "Generate Image"
4. Wait for the image to be generated and displayed
5. The image should fade in smoothly and take up the full screen

## Troubleshooting

### Common Issues:

1. **"OpenAI API key not configured"**
   - Make sure you've added the `OPENAI_API_KEY` environment variable in Vercel
   - Check that the API key is valid and has sufficient credits

2. **"Failed to generate image"**
   - Check your OpenAI API key and account status
   - Ensure you have sufficient credits in your OpenAI account

3. **Build errors**
   - Check the build logs in Vercel dashboard
   - Ensure all dependencies are properly installed

4. **Image not displaying**
   - Check that Vercel Blob storage is properly configured
   - Verify the image URLs are accessible

## Next Steps

After successful deployment:

1. **Custom Domain**: Add a custom domain in Vercel settings
2. **Analytics**: Enable Vercel Analytics for usage insights
3. **Database**: Consider upgrading to a proper database like Vercel KV or PostgreSQL for production use
4. **Rate Limiting**: Add rate limiting to prevent abuse
5. **Authentication**: Add user authentication for better security

## Support

If you encounter issues:
1. Check the Vercel deployment logs
2. Review the troubleshooting section in the README
3. Check OpenAI API status and documentation
4. Open an issue in the GitHub repository
