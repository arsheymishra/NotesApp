import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: 'Profile route', user: req.user });

});

export default router;
