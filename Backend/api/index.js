import app from '../server.js';

// This file is specifically for Vercel serverless functions
export default async function handler(req, res) {
  // Forward the request to the Express app
  return app(req, res);
} 