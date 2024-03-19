import express from "express";
import {test} from '../controllers/Item.controller.js';

const router = express.Router();

//getting a test massage to check API route
router.get('/',test);

export default router;