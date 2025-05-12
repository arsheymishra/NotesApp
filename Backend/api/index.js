import app from '../server.js';

// This file is specifically for Vercel serverless functions
export default async function handler(req, res) {
  // Check if we're getting a 404 on an API request
  if (req.url && !req.url.startsWith('/api/')) {
    // Rewrite the URL to include /api/ prefix if it's missing
    req.url = `/api${req.url.startsWith('/') ? req.url : `/${req.url}`}`;
  }
  
  // Forward the request to the Express app
  return app(req, res);
} 