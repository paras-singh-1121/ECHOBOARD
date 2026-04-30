import express from 'express';
// Match the name from the controller exactly
import { handleCaptionGeneration } from '../controllers/ai.controller.js';
import  protectRoute from '../middleware/auth.middleware.js';

const router = express.Router();

// Use the imported function here
router.post('/generate-caption', protectRoute, handleCaptionGeneration);

export default router;