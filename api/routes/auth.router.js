import express from 'express';
import { logOut, login, register } from '../controllers/auth.controller.js';



const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get ("/logout", logOut);

export default router;