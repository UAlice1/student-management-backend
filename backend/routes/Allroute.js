// routes/Allroute.js
import express from 'express';
import authRoutes from './AuthRoutes.js';   // <-- path correct?
import studentRoutes from './StudentRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);            // <-- mounts auth routes at /api/auth
router.use('/students', studentRoutes);

export default router;
