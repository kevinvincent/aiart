# AI Art Generator

A full-stack Next.js application that generates AI images using OpenAI's DALL-E 3 and displays them with real-time updates and smooth fade transitions.

## Features

- 🎨 AI image generation using OpenAI DALL-E 3
- 💾 Automatic image storage in Vercel Blob
- 🔄 Real-time image updates with polling
- ✨ Smooth fade transitions between images
- 🆔 Unique user identification system
- 📱 Full-screen responsive design
- ⚡ Fast deployment on Vercel

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI DALL-E 3
- **Storage**: Vercel Blob
- **Deployment**: Vercel
- **Real-time**: Polling-based updates

## Prerequisites

- Node.js 18+ 
- OpenAI API key
- Vercel account
- GitHub account

## Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd aiart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

### Option 2: Deploy via GitHub Integration

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables:
     - `OPENAI_API_KEY`: Your OpenAI API key

3. **Deploy**
   - Vercel will automatically build and deploy your app

## Environment Variables

Set these in your Vercel project settings:

- `OPENAI_API_KEY`: Your OpenAI API key (required)

## API Endpoints

### POST `/api/generate-image`
Generates an AI image using the provided prompt.

**Request Body:**
```json
{
  "prompt": "A beautiful sunset over mountains",
  "userId": "user_123"
}
```

**Response:**
```json
{
  "imageUrl": "https://blob.vercel-storage.com/...",
  "prompt": "A beautiful sunset over mountains",
  "userId": "user_123"
}
```

### GET `/api/get-latest-image?userId=user_123`
Retrieves the latest image for a specific user.

**Response:**
```json
{
  "imageUrl": "https://blob.vercel-storage.com/...",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## How It Works

1. **User Identification**: Each user gets a unique ID stored in localStorage
2. **Image Generation**: Users submit prompts via the form
3. **AI Processing**: OpenAI DALL-E 3 generates the image
4. **Storage**: Images are automatically saved to Vercel Blob
5. **Display**: Images are displayed full-screen with fade transitions
6. **Real-time Updates**: The app polls for new images every 5 seconds

## Project Structure

```
aiart/
├── app/
│   ├── api/
│   │   ├── generate-image/
│   │   │   └── route.ts
│   │   └── get-latest-image/
│   │       └── route.ts
│   ├── components/
│   │   ├── ImageGenerator.tsx
│   │   └── ImageViewer.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── package.json
├── next.config.js
├── tsconfig.json
├── vercel.json
└── README.md
```

## Customization

- **Polling Interval**: Change the polling interval in `ImageViewer.tsx` (currently 5 seconds)
- **Image Size**: Modify the size parameter in the OpenAI API call
- **Styling**: Update `globals.css` for custom styling
- **Storage**: Replace the in-memory store with a proper database

## Troubleshooting

### Common Issues

1. **OpenAI API Key Error**
   - Ensure your API key is correctly set in environment variables
   - Check that you have sufficient credits in your OpenAI account

2. **Vercel Blob Storage Error**
   - Verify Vercel Blob is enabled in your project
   - Check your Vercel project settings

3. **Build Errors**
   - Ensure all dependencies are installed: `npm install`
   - Check TypeScript errors: `npm run lint`

## License

MIT License - feel free to use this project for your own applications!

## Support

For issues and questions:
1. Check the troubleshooting section above
2. Review the Vercel and OpenAI documentation
3. Open an issue in the GitHub repository
