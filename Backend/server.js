import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import profileRoutes from './routes/profile.js';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';

dotenv.config();

const app = express();

// CORS Configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL || 'https://notes-app-blush-one.vercel.app'] 
    : 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Health check route for Vercel
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'API is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    env_vars_set: {
      DATABASE_URL: !!process.env.DATABASE_URL,
      JWT_SECRET: !!process.env.JWT_SECRET,
      FRONTEND_URL: !!process.env.FRONTEND_URL
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api', profileRoutes);
app.use('/api/notes', notesRoutes);

// Only start the server if not in Vercel serverless environment
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Export the app for Vercel serverless functions
export default app;