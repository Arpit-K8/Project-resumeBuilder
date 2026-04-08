import express from 'express';
import { createResume, deleteResume, getResumeById, updateResume, getPublicResumeById } from '../controllers/resumeController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { imagekitRateLimit } from '../middlewares/imagekitRateLimit.js';
import upload from '../configs/multer.js';

const resumeRouter = express.Router();

resumeRouter.post('/create',protect, createResume);
resumeRouter.put('/update', protect, imagekitRateLimit, upload.single('image'), updateResume);
resumeRouter.delete('/delete/:resumeId',protect, deleteResume);
resumeRouter.get('/get/:resumeId',protect, getResumeById);
resumeRouter.get('/public/:resumeId', getPublicResumeById);

export default resumeRouter;