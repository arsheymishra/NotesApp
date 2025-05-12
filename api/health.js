// Simple root-level health check endpoint
// This is a standalone serverless function directly at the root level

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  res.status(200).json({
    status: 'OK',
    message: 'Root-level health check is working',
    timestamp: new Date().toISOString(),
    path: req.url,
    query: req.query,
    headers: req.headers
  });
} 