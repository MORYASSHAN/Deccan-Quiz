import express from'express'
import authMiddleware from '../middleware/auth.js'
import { createResult, ListResults } from '../controllers/resultController.js';

const resultRouter=express.Router();

resultRouter.post('/',authMiddleware,createResult);
resultRouter.get('/',authMiddleware,ListResults);

export default resultRouter;
