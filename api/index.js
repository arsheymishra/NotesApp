// Root-level API index.js to help Vercel detect the API directory
import app from '../Backend/server.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Check if it's a health check request
  if (req.url === '/api' || req.url === '/api/') {
    return res.status(200).json({
      status: 'OK',
      message: 'API is running from root-level index.js',
      timestamp: new Date().toISOString()
    });
  }
  
  try {
    // Forward to backend Express app
    return app(req, res);
  } catch (error) {
    console.error('Error in API handler:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
} 