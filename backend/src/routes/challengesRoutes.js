import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
const router = Router();
import { getRandomChallengeTemplate } from '../controllers/challengesController.js';

router.use(authenticateToken);

router.get('/random', getRandomChallengeTemplate);

export default router;
