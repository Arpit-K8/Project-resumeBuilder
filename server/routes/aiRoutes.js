import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { aiRateLimiter } from '../middlewares/rateLimiters.js';
import {enhanceProfessionalSummary,enhanceJobDescription, uploadResume} from '../controllers/aiController.js';

const aiRouter = express.Router();

aiRouter.post('/enhance-pro-sum', protect, aiRateLimiter, enhanceProfessionalSummary);
aiRouter.post('/enhance-job-desc', protect, aiRateLimiter, enhanceJobDescription);
aiRouter.post('/upload-resume', protect, aiRateLimiter, uploadResume);

export default aiRouter;