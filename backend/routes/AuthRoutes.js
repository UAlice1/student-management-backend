// routes/AuthRoutes.js
import express from 'express';
import { register, login } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/test', (req, res) => {
  res.send('Auth route is working');
});

export default router;
