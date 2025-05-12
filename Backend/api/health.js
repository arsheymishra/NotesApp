// Simple health check endpoint 
// This is a standalone serverless function

export default function handler(req, res) {
  res.status(200).json({
    status: 'OK',
    message: 'Health check endpoint is working',
    timestamp: new Date().toISOString(),
    url: req.url,
    method: req.method,
    headers: req.headers
  });
} 